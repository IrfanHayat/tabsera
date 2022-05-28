import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import productData from "../data/product";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ id }) => {
    return fetch("https://jsonplaceholder.typicode.com/posts/1")
      .then(response => response.json())
      .then(json => console.log(json));
  }
);

const addProduct = createSlice({
  name: "product",
  initialState: {
    productData,
    loading: false,
    error: null,
  },
    extraReducers: {
      [getProduct.pending]: (state, action) => {
        state.loading = true;
      },
      [getProduct.fulfilled]: (state, action) => {
        (state.loading = false), (state.product = [action.payload]);
      },
      [getProduct.rejected]: (state, action) => {
        (state.loading = false), (state.error = action.payload);
      },
    },
  },
);


export default addProduct.reducer;
