import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getPayment = createAsyncThunk("payments/methods", async () => {
  const result = await instance.get(`${url}/ecommerce/payments/methods`);
  console.log("payment", result);
  return result.data.response;
});

const addPayment = createSlice({
  name: "payment",
  initialState: {
    paymentData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPayment.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getPayment.fulfilled, (state, action) => {
      state.paymentData = action.payload;
      state.loading = false;
    });
    builder.addCase(getPayment.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addPayment.reducer;
