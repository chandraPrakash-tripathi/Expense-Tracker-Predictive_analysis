import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpenseCategoryState {
  categories: string[];
}

const initialState: ExpenseCategoryState = {
  categories: [],
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category !== action.payload);
    },
  },
});

export const { addCategory, removeCategory } = expenseSlice.actions;

export default expenseSlice.reducer;
