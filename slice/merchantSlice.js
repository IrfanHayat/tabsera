import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getMerchantWithId = createAsyncThunk(
  "merchant/getMerchantWithId",
  async (id) => {
    console.log(id);
    const result = await instance.get(`${url}/merchants/${id}`);
    console.log("merchant c ", result.data.response);
    return result.data.response;
  }
);

const getMerchant = createSlice({
  name: "merchant",
  initialState: {
    merchantData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMerchantWithId.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMerchantWithId.fulfilled, (state, action) => {
      console.log("data= ", action.payload);
      state.merchantData = action.payload;
      state.loading = false;
    });
    builder.addCase(getMerchantWithId.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default getMerchant.reducer;
