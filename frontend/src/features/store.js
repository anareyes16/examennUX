import { configureStore } from '@reduxjs/toolkit';
import  from "./tours/toursSlice";

export const store = configureStore({
  reducer: {
    tours: toursReducer,
  },
});