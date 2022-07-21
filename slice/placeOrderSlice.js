import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (order) => {
    
    const result = await instance.post(`${url}/ecommerce/orders`,order);
   
    return result.data.response;;
  }
);



const placeOrder = createSlice({
  name: "placeOrder",
  initialState: {
    placeOrderData: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrder.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      state.placeOrderData = action.payload;
      
      state.loading = false;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default placeOrder.reducer;
