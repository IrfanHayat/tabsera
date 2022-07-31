import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';
import Encryption from "../helper/encryption/encryptAes";

export const getLockers = createAsyncThunk(
  "customers/address/lockers",
  async () => {
    const result = await instance.get(`${url}/customers/addresses/lockers`);
    console.log(result);
    return result.data.response;
  }
);

export const addShipmentLockers = createAsyncThunk(
  "add/customers/addresses/lockers",
  async (shipmentData) => {
    // const encrypt = Encryption(shipmentData);

    const requestBody = {
      requestBody: shipmentData,
    };
    const result = await instance.post(
      `${url}/customers/addresses/lockers`,
      requestBody
    );

    return result.data.response;
  }
);

// export const getShipmentAddress = createAsyncThunk(
//   "get/customers/addresses",
//   async () => {
//     const result = await instance.get(`${url}/customers/addresses`);

//     return result.data.response;
//   }
// );

export const getCountry = createAsyncThunk("countries", async () => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/countries`
  );

  return result.data.response;
});

export const getState = createAsyncThunk("states", async (id) => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/states/${id}`
  );
  return result.data.response;
});

export const getCity = createAsyncThunk("cities", async (id) => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/cities/${id}`
  );
  return result.data.response;
});

const addLockers = createSlice({
  name: "lockers",
  initialState: {
    lockersAddressData: [],
    lockerLabels: [],
    countryData: [],
    states: [],
    cityData: [],
    // userData: {},
    // shippingAddressData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(addShipmentAddress.pending, (state, action) => {
    //   return { ...state, loading: true };
    // });
    // builder.addCase(addShipmentAddress.fulfilled, (state, action) => {
    //   // state.shipmentData = action.payload || [];
    //   state.loading = false;
    // });
    // builder.addCase(addShipmentAddress.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     loading: "rejected",
    //     error: action.payload,
    //   };
    // });
    builder.addCase(getLockers.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getLockers.fulfilled, (state, action) => {
      state.lockerLabels = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getLockers.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getCountry.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCountry.fulfilled, (state, action) => {
      state.countryData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getCountry.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getState.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getState.fulfilled, (state, action) => {
      state.states = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getState.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getCity.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCity.fulfilled, (state, action) => {
      state.cityData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getCity.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addLockers.reducer;
