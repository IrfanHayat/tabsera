import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getMerchantStore = createAsyncThunk(
  `merchants/products/getMerchantStore`,
  async (id) => {
    const result = await instance.get(`${url}/merchants/${id}/products`);

    return result.data.response;
  }
);

const addmerchantStore = createSlice({
  name: "merchantStore",
  initialState: {
    merchantStoreData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMerchantStore.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMerchantStore.fulfilled, (state, action) => {
      state.merchantStoreData = action.payload;
      state.loading = false;
    });
    builder.addCase(getMerchantStore.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addmerchantStore.reducer;
