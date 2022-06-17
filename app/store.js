import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slice/basketSlice";
import productReducer from "../slice/productSlice";
import authReducer from "../slice/authSlice";
import categoryReducer from "../slice/categorySlice";
import { productsApi } from "../RTK/productApi";
import merchantReducer from "../slice/categorySlice";
import shipmentsReducer from "../slice/shipmentSlice";
export const store = configureStore({
  reducer: {
    basket: basketReducer,
    product: productReducer,
    auth: authReducer,
    category: categoryReducer,
    merchant: merchantReducer,
    shipments: shipmentsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
