'use client'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransaction, setSearchQuery, setCurrentPage, setRowsPerPage } from '@/app/redux/slices/transactionSlice';
import { RootState } from '@/app/redux/store';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { filteredTransactions, searchQuery, currentPage, rowsPerPage } = useSelector((state: RootState) => state.transactions);

  const [newTransaction, setNewTransaction] = useState({
    amount: 0,
    description: '',
    type: '',
    category: '',
    date: '',
  });

  

  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTransaction({ ...newTransaction, id: Date.now().toString() }));
    setNewTransaction({ amount: 0, description: '', type: '', category: '', date: '' });
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = filteredTransactions.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage: number) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRowsPerPage(Number(e.target.value)));
  };

  return (
    <div className="p-4">
      
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search transactions..."
        className="border p-2 mb-4 w-full"
      />

      
      <form onSubmit={handleAddTransaction} className="mb-4">
        <input
          type="number"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction({ ...newTransaction, amount: +e.target.value })}
          placeholder="Amount"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newTransaction.description}
          onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
          placeholder="Description"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newTransaction.type}
          onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
          placeholder="Type"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          value={newTransaction.category}
          onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
          placeholder="Category"
          className="border p-2 mr-2"
        />
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Transaction</button>
      </form>

      
      <table className="table-auto w-full border-collapse mb-4">
        <thead>
          <tr>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border p-2">{transaction.amount}</td>
              <td className="border p-2">{transaction.description}</td>
              <td className="border p-2">{transaction.type}</td>
              <td className="border p-2">{transaction.category}</td>
              <td className="border p-2">{transaction.date}</td>
              <td className="border p-2">
                <button className="bg-green-500 text-white p-2 mr-2">Edit</button>
                <button className="bg-red-500 text-white p-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      <div className="flex justify-between items-center">
        <div>
          <select onChange={handleRowsPerPageChange} value={rowsPerPage} className="border p-2">
            <option value={5}>5 rows per page</option>
            <option value={10}>10 rows per page</option>
            <option value={15}>15 rows per page</option>
          </select>
        </div>
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border p-2 mr-2"
          >
            &lt;
          </button>
          <span className="p-2">{currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage * rowsPerPage >= filteredTransactions.length}
            className="border p-2 ml-2"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
