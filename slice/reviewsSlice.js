import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getMerchantReviews = createAsyncThunk(
  "review/getMerchantReviews",
  async () => {
    const result = await instance.get(`${url}/ecommerce/reviews/summary`);

    return result.data.response;
  }
);

const getReviews = createSlice({
  name: "reviews",
  initialState: {
    reviewsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMerchantReviews.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getMerchantReviews.fulfilled, (state, action) => {
      state.reviewsData = action.payload;
      state.loading = false;
    });
    builder.addCase(getMerchantReviews.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default getReviews.reducer;
