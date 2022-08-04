import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getCoupons = createAsyncThunk("bundles/getCoupons", async () => {
  const result = await instance.get(
    `${url}/marketplace/promotions/coupons/products`
  );

  console.log(result);
  return result.data.response;
});

const addCoupons = createSlice({
  name: "coupons",
  initialState: {
    couponsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoupons.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCoupons.fulfilled, (state, action) => {
      state.couponsData = action.payload;
      state.loading = false;
    });
    builder.addCase(getCoupons.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addCoupons.reducer;
