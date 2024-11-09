'use client'
import React, { useState } from 'react';

type Category = {
  id: number;
  name: string;
};

const AccountForm = ({ accAction }: { accAction: (formData: FormData) => void }) => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Add a new category
  const handleCategoryChange = () => {
    if (categoryName.trim() !== '') {
      const newCategory: Category = {
        id: categories.length + 1,
        name: categoryName,
      };
      setCategories([...categories, newCategory]);
      setCategoryName('');
    }
  };

  // Rename an existing category
  const handleRenameCategory = (id: number, newName: string) => {
    setCategories(
      categories.map((category) => (category.id === id ? { ...category, name: newName } : category))
    );
  };

  // Delete a category
  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  // Submit form data to accAction
// Submit form data to accAction
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  const formData = new FormData();
  formData.append('categories', JSON.stringify(categories)); // Append categories as JSON
  
  console.log("Categories data:", categories); // Debug: Log categories to ensure they are populated
  
  accAction(formData); // Submit to the server action
};


  return (
    <form onSubmit={handleSubmit}>
      <div className='bg-slate-400 max-w-4xl mx-auto p-6 space-y-8 rounded-lg shadow-lg mt-20'>
        <h1 className='font-bold text-3xl text-center text-gray-800'>Manage Expense Categories</h1>
        <div className='flex justify-center space-x-4'>
          <input
            name='category'
            type='text'
            placeholder='Add a new Category'
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button
            type='button'
            className='px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200'
            onClick={handleCategoryChange}
          >
            Add Category
          </button>
        </div>
        
        <button
          type='submit'
          className='px-6 py-4 bg-black text-white rounded-lg font-semibold hover:bg-slate-500 transition duration-200'
        >
          Submit Categories
        </button>
        
        <div>
          <h2 className="text-2xl font-semibold text-gray-700">Categories</h2>
          <ul className="mt-4 space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="bg-gray-100 p-3 rounded-md shadow-sm hover:bg-gray-200 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  {/* Category Name */}
                  <span>{category.name}</span>
                  
                  {/* Buttons for renaming and deleting */}
                  <div className="space-x-2">
                    <button
                      onClick={() => {
                        const newName = prompt('Enter new category name', category.name);
                        if (newName) handleRenameCategory(category.id, newName); // Rename category if new name is provided
                      }}
                      className="px-3 py-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
                    >
                      Rename
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}  // Delete category by id
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </form>
  );
};

export default AccountForm;
