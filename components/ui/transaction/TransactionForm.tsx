"use client";
import React, { useState, useEffect } from "react";
import AddTransactionCard from "@/components/ui/transaction/AddTransactionCard";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppDispatch } from "@/app/redux/store";
import { RootState } from "@/app/redux/store";
import {
  setSearchQuery,
  setCurrentPage,
  setRowsPerPage,
  deleteTransaction,
} from "@/app/redux/slices/transactionSlice";
import { Button } from "../button";
import { Transaction } from "@/lib/type";

const TransactionForm = () => {
  //1) App dispatch
  const dispatch = useDispatch<AppDispatch>();

  //2) transactionSlice useSelector
  const { filteredTransactions, searchQuery, currentPage, rowsPerPage } =
    useSelector((state: RootState) => state.transactions);
  useEffect(() => {
    dispatch(setRowsPerPage(5));
  }, [dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSearchClick = () => {
    dispatch(setCurrentPage(1)); // Reset to first page on new search
  };

  // 3) Get paginated transactions for current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };
  //4) delete transaction functionality
  const handleDeleteTransaction = (transactionId: string) => {
    console.log("Dispatching deleteTransaction with ID:", transactionId); // Debugging line
    dispatch(deleteTransaction(transactionId));
  };
  
  

  //Final:- HTML STRUCTURING
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center w-full lg:w-2/3">
          <Input
            type="text"
            placeholder="Search Transaction By Category"
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <Button
            variant="ghost"
            onClick={handleSearchClick}
            className="ml-2 p-2 rounded-md hover:bg-gray-200"
          >
            <CiSearch size={20} />
          </Button>
        </div>

        <AddTransactionCard />
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full bg-white shadow-md rounded-lg">
          <TableCaption className="text-gray-500">
            A list of your recent transactions.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="py-3">Transaction</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction, index) => (
              <TableRow key={index} className="hover:bg-gray-100">
                <TableCell className="py-3 px-4 font-medium text-gray-700">
                  {transaction.id}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {transaction.amount}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {transaction.description}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {transaction.type}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {transaction.category}
                </TableCell>
                <TableCell className="py-3 px-4 text-gray-600">
                  {transaction.date}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <div>
                    <Button
                      variant="link"
                      className="text-indigo-600 hover:text-indigo-800"
                      
                     
                    >
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-indigo-600 hover:text-indigo-800"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between mt-6">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          &lt; Previous
        </Button>
        <span className="text-gray-600">Page {currentPage}</span>
        <Button
          onClick={handleNextPage}
          disabled={startIndex + rowsPerPage >= filteredTransactions.length}
          className="bg-indigo-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default TransactionForm;
