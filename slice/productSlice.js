import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const result = await instance.get(`${url}/ecommerce/products`);
    
    return result.data.response;;
  }
);

const addProduct = createSlice({
  name: "product",
  initialState: {
    productData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addProduct.reducer;
