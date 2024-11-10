'use client'
import React, { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


type Category = {
  id: number;
  name: string; 
};

const AccountForm = ({accAction}:{accAction:(formData:FormData)=>void}) => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddCategory = () => {
    if (editIndex !== null) {
      const updatedCategories = categories.map((category, index) => (
        index === editIndex ? { ...category, name: categoryName } : category
      ));
      setCategories(updatedCategories);
      setEditIndex(null);
    } else {
      setCategories([...categories, { id: categories.length + 1, name: categoryName }]);
    }
    setCategoryName('');
  };

  const handleEditCategory = (index: number) => {
    setCategoryName(categories[index].name);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (event:React.FormEvent)=>{
    event.preventDefault();
    const formData = new FormData();
    formData.append('categories',JSON.stringify(categories))
    console.log('Form data prepared:', categories);
    accAction(formData)
  }

  return (
    <form action={accAction} onSubmit={handleFormSubmit} className='max-w-lg mx-auto mt-10 p-5 bg-slate-100 shadow-lg rounded-lg'>
      <h1 className='text-2xl font-extrabold mb-4 text-center text-cyan-400 shadow-lg rounded-lg'>CATEGORY MANAGER</h1>
      <div  className='space-y-4'>
        <Input
          type="text"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          className='w-full p-2 border border-gray-500 rounded'
        />
        <Button type="button" onClick={handleAddCategory} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mt-4" >
          {editIndex !== null ? 'Update Category' : 'Add Category'}
        </Button>
      </div>
      <ul className='mt-5 space-y-2'>
        {categories.map((category, index) => (
          <li key={category.id} className='flex justify-between items-center p-2 border border-gray-500 rounded bg-gray-200'>
            {category.name}
            <Button onClick={() => handleEditCategory(index)} className='bg-yellow-400 hover:bg-yellow-600 px-4 py-1 rounded'>Edit</Button>
            <Button onClick={() => handleDeleteCategory(index)} className='bg-red-600 hover:bg-red-800 px-4 py-1 rounded'>Delete</Button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default AccountForm;
