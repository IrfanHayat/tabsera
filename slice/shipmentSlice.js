import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getShipments = createAsyncThunk("shipments/methods", async () => {
  const result = await instance.post(`${url}/ecommerce/shipments/methods`);
  console.log("shipments", result);
  return result.data.response;
});

const addShipments = createSlice({
  name: "shipments",
  initialState: {
    shipmentData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShipments.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getShipments.fulfilled, (state, action) => {
      state.shipmentData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getShipments.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addShipments.reducer;
