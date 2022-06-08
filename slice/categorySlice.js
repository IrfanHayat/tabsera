import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const result = await instance.get(`${url}/ecommerce/categories/levels`);
    console.log(result)
    return result.data.response;;
  }
);

const addCategory = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategory.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.categoryData = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategory.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addCategory.reducer;
