import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getDiscounts = createAsyncThunk(
  "products/getDiscounts",
  async () => {
    const result = await instance.get(
      `${url}/ecommerce/promotions/discounts/products`
    );

    console.log(result);
    return result.data.response;
  }
);

const addDiscounts = createSlice({
  name: "discounts",
  initialState: {
    discountsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDiscounts.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getDiscounts.fulfilled, (state, action) => {
      state.discountsData = action.payload;
      state.loading = false;
    });
    builder.addCase(getDiscounts.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addDiscounts.reducer;
