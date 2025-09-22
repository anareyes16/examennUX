import { configureStore } from '@reduxjs/toolkit';
import  toursReducer from './tours/toursSlice';

export const store = configureStore({
  reducer: {
    tours: toursReducer,
  },
});