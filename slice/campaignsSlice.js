import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import categoryData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getCampaigns = createAsyncThunk(
  "bundles/getCampaigns",
  async () => {
    const result = await instance.get(`${url}/marketplace/campaigns/`);

    console.log(result);
    return result.data.response;
  }
);

const addCampaigns = createSlice({
  name: "campaigns",
  initialState: {
    campaignsData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCampaigns.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCampaigns.fulfilled, (state, action) => {
      state.campaignsData = action.payload;
      state.loading = false;
    });
    builder.addCase(getCampaigns.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addCampaigns.reducer;
