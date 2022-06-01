import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/basketSlice";
import productReducer from '../slice/productSlice';
import authReducer from '../slice/authSlice';
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    product: productReducer,
    auth:authReducer,
  },
});