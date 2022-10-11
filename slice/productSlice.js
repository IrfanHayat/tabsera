import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
import { useRouter } from "next/router";
//import Cookies from 'universal-cookie';
import Encryption from '../helper/encryption/encryptAes';
import { Router } from "next/router";
export const getProduct = createAsyncThunk("product/getProduct", async () => {
  const result = await instance.get(`${url}/ecommerce/products`);
  if (result.data.resultCode === 4003) {
    //   const dataEncrypt = {
    //     // deviceId: "",
    //     // imsi: "",

    //     channelId:1,
    //     mobileNumber: "+923235412298",
    //      //otp: "127484",
    //     password: "123456"
    //     // registrationToken: ""
    // };
    let router = useRouter()
    let encrypt = "EYeg8Wha6Mz6NGeWzjIBJZGcrodlGkpRUUzHcjIaugV80IelDyLdGunDQ/E25/kNyMU5LY9wGqb5Na0a3SCFZdQHTulGjAn9HwkTZSfQ5PpaqwCsEWExt3FXWJPidZkV5kkn6gHFqDt8R4QuaWIc7FNpz0vy+CeS40oiZwiuSkYVl9FJz7EqmcoIL6ioEWYuISY88I1unM9btPTW/oimRKJ/47UEkJNCKCOjNxh4clfB/X3dHnBKKR1O7En7k1MTsrwVrQUBC+gAZ5S/CdmrttwxbkvusDGj4mFBh5CqW2/1NVPI85+g/ecPSoe7gpcwcE5dQd1osNscjjxpLi7BJyypiPZtiKdz/ORUgj4j4z171cDNIVB7QCHXpAmlkd8E"

    //aes helper function
    //  const encrypt = Encryption(dataEncrypt);

    const requestBody = {
      requestBody: encrypt
    };

    const result = await instance.post(`${url}/customers/login`, requestBody);
    router.push("/")
  }
  return result.data.response;
});

export const getProductWithId = createAsyncThunk(
  "product/getProductWithId",
  async (id) => {
    const result = await instance.get(`${url}/ecommerce/products/${id}`);
    return result.data.response;
  }
);


export const getBrandWithId = createAsyncThunk(
  "product/getBrandWithId",
  async (id) => {
    const result = await instance.get(`${url}/ecommerce/bundles/${id}`);
    return result.data.response;
  }
);

export const getFeatureProduct = createAsyncThunk(
  "product/getFeatureProduct",
  async () => {
    const result = await instance.get(
      `${url}/ecommerce/products/featured/shop`
    );

    return result.data.response;
  }
);

export const getProductSearchWithHint = createAsyncThunk(
  "product/getProductSearchWithHint",
  async (hint) => {
    const result = await instance.get(`${url}/ecommerce/products/search/hint/${hint}`);
    return result.data.response;
  }
);


export const getProductSearch = createAsyncThunk(
  "product/getProductSearch",
  async (word) => {
    const result = await instance.get(`${url}/ecommerce/products/search/${word}`);
    return result.data.response;
  }
);


// export const getProductWithName = createAsyncThunk(
//   "product/getProductWithId",
//   async (id) => {
//     const result = await instance.get(`${url}/ecommerce/products/${id}`);

//     return result.data.response;
//   }
// );

const addProduct = createSlice({
  name: "product",
  initialState: {
    productData: [],
    filterProductData: {},
    featureProductData: [],
    filterProductData: {},
    loading: false,
    error: null,
    searchHintData: [],
    searchDetail: [],
    bundlesData: {}

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
    builder.addCase(getBrandWithId.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getBrandWithId.fulfilled, (state, action) => {

      state.bundlesData = action.payload;
      state.loading = false;
    });
    builder.addCase(getBrandWithId.rejected, (state, action) => {
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
    builder.addCase(getProductSearchWithHint.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProductSearchWithHint.fulfilled, (state, action) => {

      state.searchHintData = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductSearchWithHint.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });

    builder.addCase(getProductSearch.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getProductSearch.fulfilled, (state, action) => {

      state.searchDetail = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductSearch.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },

});

export default addProduct.reducer;
