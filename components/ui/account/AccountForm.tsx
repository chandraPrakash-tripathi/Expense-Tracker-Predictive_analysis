"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/redux/store";
import { useDispatch,useSelector } from "react-redux";
import { addCategory,removeCategory } from "@/app/redux/slices/expenseSlice";




const AccountForm = ({
  accAction,
}: {
  accAction: (formData: FormData) => void;
}) => {



  const [categoryName, setCategoryName] = useState("");
  
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const dispatch = useDispatch()
  const categories = useSelector((state:RootState)=> state.expense.categories)

  const handleAddCategory = () => {
    if (!categoryName.trim()) return; // Prevent empty or whitespace-only values

    if (editIndex !== null) {

      dispatch(removeCategory(categories[editIndex]));
      dispatch(addCategory(categoryName.trim()));
      setEditIndex(null);
      

      
    } else {
      dispatch(addCategory(categoryName.trim()));
    }
    setCategoryName("");
  };

  const handleEditCategory = (index: number) => {
    setCategoryName(categories[index]);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    dispatch(removeCategory(categories[index]));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (categories.length === 0) {
      console.warn("Cannot submit with empty categories list");
      return;
    }
    const formData = new FormData();
    formData.append("categories", JSON.stringify(categories));
    console.log("Form data prepared:", categories);
    accAction(formData);
  };

  

  return (
    <form
      action={accAction}
      onSubmit={handleFormSubmit}
      className="max-w-lg mx-auto mt-10 p-5 bg-slate-100 shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-extrabold mb-4 text-center text-cyan-400 shadow-lg rounded-lg">
        CATEGORY MANAGER
      </h1>
      <div className="flex flex-col justify-center space-y-4">
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className="w-full p-2 border border-gray-500 rounded"
        />
        <div className="flex justify-center mt-4">
          <Button
            type="button"
            onClick={handleAddCategory}
            disabled={!categoryName.trim()} // Disable button if input is empty
            className={`w-40 text-white py-2 rounded ${
              categoryName.trim()
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {editIndex !== null ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </div>
      <table className="min-w-full mt-5 table-auto">
        <thead>
          <tr className="bg-gray-300">
            <th className="px-4 py-2 text-left">Category Name</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index} className="bg-gray-100 border-b">
              <td className="px-4 py-2">{category}</td>
              <td className="px-4 py-2 text-center">
                <Button
                  onClick={() => handleEditCategory(index)}
                  className="bg-yellow-400 hover:bg-yellow-600 px-4 py-1 rounded mx-2"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteCategory(index)}
                  className="bg-red-600 hover:bg-red-800 px-4 py-1 rounded mx-2"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Button
        type="submit"
        className="w-29 bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600 rounded-lg shadow-lg "
      >
        SUBMIT
      </Button></div>

      
    </form>
  );
};

export default AccountForm;
