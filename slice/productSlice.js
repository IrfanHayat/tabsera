import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const result = await instance.get(`${url}/ecommerce/products`);
    
    return result.data.response;;
  }
);


export const getProductWithId = createAsyncThunk(
  "product/getProductWithId",
  async (id) => {
    const result = await instance.get(`${url}/ecommerce/products/${id}`);
    console.log(result)
    return result.data.response;;
  }
);

export const getFeatureProduct = createAsyncThunk(
  "product/getFeatureProduct",
  async () => {
    const result = await instance.get(`${url}/ecommerce/products/featured/shop`);
    
    return result.data.response;;
  }
);


const addProduct = createSlice({
  name: "product",
  initialState: {
    productData: [],
    filterProductData:{},
    featureProductData:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.productData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getProductWithId.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProductWithId.fulfilled, (state, action) => {
      console.log(action.payload)
      state.filterProductData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductWithId.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getFeatureProduct.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getFeatureProduct.fulfilled, (state, action) => {
      console.log(action.payload)
      state.featureProductData = action.payload;
      state.loading = false;
    });
    builder.addCase(getFeatureProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addProduct.reducer;
