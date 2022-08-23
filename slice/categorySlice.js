import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async () => {
    const result = await instance.get(`${url}/ecommerce/categories/levels`);

    return result.data.response;;
  }
);


export const getCategoryBrand = createAsyncThunk(
  "category/getCategoryBrand",
  async () => {
    const result = await instance.get(`${url}/ecommerce/categories/`);

    return result.data.response;;
  }
);



export const getProductWithCategoryId = createAsyncThunk(
  "category/getCategoryWithId",
  async (id) => {

    const result = await instance.get(`${url}/ecommerce/categories/${id}/products`);

    return result.data.response;;
  }
);




const addCategory = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    categoryBrandData: [],
    productDataWithCategoryId: [],
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
    builder.addCase(getCategoryBrand.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCategoryBrand.fulfilled, (state, action) => {

      state.categoryBrandData = action.payload;
      state.loading = false;
    });
    builder.addCase(getCategoryBrand.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getProductWithCategoryId.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProductWithCategoryId.fulfilled, (state, action) => {
      state.productDataWithCategoryId = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductWithCategoryId.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addCategory.reducer;
