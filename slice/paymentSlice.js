import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getPayment = createAsyncThunk("payments/methods", async () => {
  const result = await instance.get(`${url}/ecommerce/payments/methods`);
  console.log("payment", result);
  
  return result.data.response;
});

export const postPayment = createAsyncThunk("payments", async (payment) => {
  
  const result = await instance.post(`${url}/payments`,payment);
  console.log("payment", result);
  
  return result.data.response;
});

const addPayment = createSlice({
  name: "payment",
  initialState: {
    paymentData: [],
    paymentAddData:'',
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
    builder.addCase(postPayment.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(postPayment.fulfilled, (state, action) => {
      state.paymentAddData = action.payload;
      state.loading = false;
    });
    builder.addCase(postPayment.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addPayment.reducer;
