import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getFreeShipping = createAsyncThunk(
  "bundles/getFreeShipping",
  async () => {
    const result = await instance.get(
      `${url}/marketplace/promotions/freeshipping/products`
    );

    console.log(result);
    return result.data.response;
  }
);

const addFreeShipping = createSlice({
  name: "freeShipping",
  initialState: {
    freeShippingData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFreeShipping.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getFreeShipping.fulfilled, (state, action) => {
      state.freeShippingData = action.payload;
      state.loading = false;
    });
    builder.addCase(getFreeShipping.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addFreeShipping.reducer;
