import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getDeals = createAsyncThunk("bundles/getDeals", async () => {
  const result = await instance.get(`${url}/ecommerce/bundles`);

  return result.data.response;
});

const addDeals = createSlice({
  name: "deals",
  initialState: {
    dealsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDeals.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getDeals.fulfilled, (state, action) => {
      state.dealsData = action.payload;
      state.loading = false;
    });
    builder.addCase(getDeals.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addDeals.reducer;
