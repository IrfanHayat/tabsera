import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import productData from "../data/product";
import { url, setHeaders } from "../helper/axios/config";
//import Cookies from 'universal-cookie';
import Encryption from '../helper/encryption/encryptAes';



export const getLabels = createAsyncThunk("customers/address/labels", async () => {
  const result = await instance.get(`${url}/customers/address/labels`);
  
  return result.data.response;
});


export const addShipmentAddress = createAsyncThunk("add/customers/addresses", async (shipmentData) => {
 
  // const encrypt = Encryption(shipmentData);
  
  const requestBody = {
      requestBody: shipmentData
  };
  const result = await instance.post(`${url}/customers/addresses`,requestBody);
  
  return result.data.response;
});


export const getShipmentAddress = createAsyncThunk("get/customers/addresses", async () => {
  const result = await instance.get(`${url}/customers/addresses`);
  
  return result.data.response;
});


export const updateShipmentAddress = createAsyncThunk("put/customers/addresses", async (shipmentData) => {
  const result = await instance.put(`${url}/customers/addresses`,shipmentData);
  
  return result.data.response;
});


export const getCountry = createAsyncThunk("countries", async () => {
  const result = await instance.get(`${url}/countries`);
  
  return result.data.response;
});

export const getState = createAsyncThunk("states", async (id) => {
  const result = await instance.get(`${url}/states/${id}`);
  return result.data.response;
});

export const getCity = createAsyncThunk("cities", async (id) => {
  const result = await instance.get(`${url}/cities/${id}`);
  return result.data.response;
});

export const getCustomer = createAsyncThunk(
  "auth/getCustomer",
  async () => {
  
      const response = await instance.get(`${url}/customers`);

      return response.data.response;
    
  }
);


export const getShipmentsMethods = createAsyncThunk("ecommerce/shipments/methods", async (shipmentData) => {
  // const encrypt = Encryption(shipmentData);
        const requestBody = {
            requestBody: shipmentData
        };
  const result = await instance.post(`${url}/ecommerce/shipments/methods`,requestBody);
  
  return result.data.response;
});

export const getShipmentsCharges = createAsyncThunk("ecommerce/shipments/charges", async (shipmentData) => {
  const encrypt = Encryption(shipmentData);
  
        const requestBody = {
            requestBody: encrypt
        };
  const result = await instance.post(`${url}/ecommerce/shipments/charges`,requestBody);
  
  return result.data.response;
});



const addShipments = createSlice({
  name: "shipments",
  initialState: {
    shipmentMethodData: [],
    labels:[],
    countryData:[],
    states:[],
    cityData:[],
    userData:{},
    shippingCharges:[],
    shippingAddressData:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getShipmentsMethods.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getShipmentsMethods.fulfilled, (state, action) => {
      state.shipmentMethodData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getShipmentsMethods.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(addShipmentAddress.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(addShipmentAddress.fulfilled, (state, action) => {
      // state.shipmentData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(addShipmentAddress.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getLabels.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getLabels.fulfilled, (state, action) => {
      state.labels = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getLabels.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getShipmentAddress.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getShipmentAddress.fulfilled, (state, action) => {
      state.shippingAddressData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getShipmentAddress.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(updateShipmentAddress.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(updateShipmentAddress.fulfilled, (state, action) => {
     // state.labels = action.payload || [];
      state.loading = false;
    });
    builder.addCase(updateShipmentAddress.rejected, (state, action) => {
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
    builder.addCase(getCustomer.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.userData = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getCustomer.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
    builder.addCase(getShipmentsCharges.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(getShipmentsCharges.fulfilled, (state, action) => {
      
      state.shippingCharges = action.payload || [];
      state.loading = false;
    });
    builder.addCase(getShipmentsCharges.rejected, (state, action) => {
      return {
        ...state,
        loading: "rejected",
        error: action.payload,
      };
    });
  },
});

export default addShipments.reducer;
