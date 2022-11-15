import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';

export const getProfileData = createAsyncThunk(
    "profile/customers",
    async () => {
        const result = await instance.get(`${url}/customers`);

        return result.data.response;
    }
);


export const getNationalityData = createAsyncThunk(
    "profile/nationalities",
    async () => {
        const result = await instance.get(`${url}/nationalities`);

        return result.data.response;
    }
);

const getProfiles = createSlice({
    name: "profiles",
    initialState: {
        profilesData: {},
        nationalityData: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProfileData.pending, (state, action) => {
            return { ...state, loading: true };
        });
        builder.addCase(getProfileData.fulfilled, (state, action) => {
            state.profilesData = action.payload;
            state.loading = false;
        });
        builder.addCase(getProfileData.rejected, (state, action) => {
            return {
                ...state,
                loading: "rejected",
                error: action.payload,
            };
        });
        builder.addCase(getNationalityData.pending, (state, action) => {
            return { ...state, loading: true };
        });
        builder.addCase(getNationalityData.fulfilled, (state, action) => {
            state.profilesData = action.payload;
            state.loading = false;
        });
        builder.addCase(getNationalityData.rejected, (state, action) => {
            return {
                ...state,
                loading: "rejected",
                error: action.payload,
            };
        });
    },
});

export default getProfiles.reducer;
