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
  "add/customers/addresses/lockers/find",
  async (shipmentData) => {
    // const encrypt = Encryption(shipmentData);

    const requestBody = {
      requestBody: shipmentData,
    };
    const result = await instance.post(
      `${url}/customers/addresses/lockers/find`,
      requestBody
    );
    console.log(result.data.lockers);
    return result.data.lockers;
  }
);

// export const getShipmentAddress = createAsyncThunk(
//   "get/customers/addresses",
//   async () => {
//     const result = await instance.get(`${url}/customers/addresses`);

//     return result.data.response;
//   }
// );

export const getLockerCountry = createAsyncThunk("countries", async () => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/countries`
  );
  console.log(result.data.countries);
  return result.data.countries;
});

export const getLockerState = createAsyncThunk("states", async (id) => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/states/${id}`
  );

  return result.data.states;
});

export const getLockerCity = createAsyncThunk("cities", async (id) => {
  const result = await instance.get(
    `${url}/customers/addresses/lockers/cities/${id}`
  );
  console.log(result.data);
  return result.data.cities;
});

const addLockers = createSlice({
  name: "lockers",
  initialState: {
    lockersAddressData: [],
    lockerLabels: [],
    lockerCountryData: [],
    lockerStatesData: [],
    lockerCityData: [],
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

    builder.addCase(addShipmentLockers.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(addShipmentLockers.fulfilled, (state, action) => {
      state.lockersAddressData = action.payload;
      state.loading = false;
    });
    builder.addCase(addShipmentLockers.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });

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
    builder.addCase(getLockerCountry.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getLockerCountry.fulfilled, (state, action) => {
      state.lockerCountryData = action.payload;
      state.loading = false;
    });
    builder.addCase(getLockerCountry.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getLockerState.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getLockerState.fulfilled, (state, action) => {
      state.lockerStatesData = action.payload;
      state.loading = false;
    });
    builder.addCase(getLockerState.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getLockerCity.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getLockerCity.fulfilled, (state, action) => {
      state.lockerCityData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getLockerCity.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addLockers.reducer;
