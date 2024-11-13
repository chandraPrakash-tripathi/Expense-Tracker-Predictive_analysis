import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './slices/expenseSlice';
import transactionReducer from './slices/transactionSlice';
import userReducer from './slices/userSlice'


export const store  =configureStore({
    reducer:{
        expense: expenseReducer,
        transactions:transactionReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;