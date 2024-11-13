'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction } from '@/app/redux/slices/transactionSlice';
import { AppDispatch, RootState } from '@/app/redux/store';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"


const TransactionForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.expense.categories);
  console.log(categories);
  

  const [transaction, setTransaction] = useState({
    id: '',
    amount: 0,
    description: '',
    type: '',
    category: '',
    date: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(transaction); // Log transaction before reset
    dispatch(addTransaction(transaction));
    setTransaction({
      id: '',
      amount: 0,
      description: '',
      type: '',
      category: '',
      date: '',
    });
    console.log(transaction);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none ml-9">
          +Add New Transaction
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">Add Transaction</DialogTitle>
          <DialogDescription className="text-gray-500">
            Fill in the details to add a new transaction.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={transaction.id}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={transaction.amount}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={transaction.description}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type:</label>
            <select
              id="type"
              name="type"
              value={transaction.type}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Type</option>
              <option value="revenue">Revenue</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <select
              id="category"
              name="category"
              value={transaction.category}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={transaction.date}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Transaction
          </Button>
        </form>
        <DialogClose asChild>
          <Button className="mt-4 w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionForm;
