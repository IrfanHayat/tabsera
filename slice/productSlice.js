import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async () => {
    const result = await axios.get(`${url}/ecommerce/products`,{withCredentials: true});
    
    return result.data.response;;
  }
);

const addProduct = createSlice({
  name: "product",
  initialState: {
    productData:[],
    loading: false,
    error: null,
  },
  reducers:{},
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      console.log(action)
      if (action.payload) {
        const user = action.payload;
        console.log(user)
      } else return state;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    
  },  
  },
);


export default addProduct.reducer;
