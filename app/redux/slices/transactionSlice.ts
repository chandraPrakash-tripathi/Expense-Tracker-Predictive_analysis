import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
    id: string;
    amount: number;
    description: string;
    type: string;
    category: string;
    date: string;
  }

interface TransactionsState {
    transactions: Transaction[];
    filteredTransactions: Transaction[];
    searchQuery: string;
    currentPage: number;
    rowsPerPage: number;
  }

const initialState: TransactionsState = {
    transactions: [],
    filteredTransactions: [],
    searchQuery: '',
    currentPage: 1,
    rowsPerPage: 5,
  };

  const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
      addTransaction(state, action: PayloadAction<Transaction>) {
        state.transactions.push(action.payload);
        state.filteredTransactions.push(action.payload);
      },
      setSearchQuery(state, action: PayloadAction<string>) {
        state.searchQuery = action.payload;
        state.filteredTransactions = state.transactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(state.searchQuery.toLowerCase())
        );
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setRowsPerPage(state, action: PayloadAction<number>) {
        state.rowsPerPage = action.payload;
      },
    },
  });
  
export const {
    addTransaction,
    setSearchQuery,
    setCurrentPage,
    setRowsPerPage,
  } = transactionsSlice.actions;
  
  export default transactionsSlice.reducer;