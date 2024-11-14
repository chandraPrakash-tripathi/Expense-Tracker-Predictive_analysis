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
          transaction.category.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.currentPage = 1; // Reset to first page on new search
      },
      setCurrentPage(state, action: PayloadAction<number>) {
        state.currentPage = action.payload;
      },
      setRowsPerPage(state, action: PayloadAction<number>) {
        state.rowsPerPage = action.payload;
      },
      updateTransaction:(state,action:PayloadAction<Transaction>)=>{
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if(index !==-1){
          state.transactions[index] = action.payload
          const filterIndex = state.filteredTransactions.findIndex(t=> t.id === action.payload.id)
          if(filterIndex!==-1){
            state.filteredTransactions[filterIndex] =action.payload
          }
        }
      }
    },
  });
  
export const {
    addTransaction,
    setSearchQuery,
    setCurrentPage,
    setRowsPerPage,
    updateTransaction
  } = transactionsSlice.actions;
  
  export default transactionsSlice.reducer;