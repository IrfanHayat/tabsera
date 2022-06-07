import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { url, setHeaders } from "../helper/axios/config";
import Encryption from '../helper/encryption/encryptAes';
import localStorage from "localStorage";

const initialState = {
  token: localStorage.getItem("token"),
  phone: "",
  password: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {

      const result = await axios.post(`${url}/customers/login`, values);
      if (response.data.resultCode === 2000) {
        logIn(true, res.data.response, 'Successfully Login');
        
    }
      return result.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    console.log(values)
    try {
        const dataEncrypt = {
            // deviceId: "",
            // imsi: "",
            channelId:1,
            mobileNumber: '923235412298', // values.phone
             otp: "127484",
            password: values.password
            // registrationToken: ""
        };
        //let encrypt = "EYeg8Wha6Mz6NGeWzjIBJZGcrodlGkpRUUzHcjIaugV80IelDyLdGunDQ/E25/kNyMU5LY9wGqb5Na0a3SCFZdQHTulGjAn9HwkTZSfQ5PpaqwCsEWExt3FXWJPidZkV5kkn6gHFqDt8R4QuaWIc7FNpz0vy+CeS40oiZwiuSkYVl9FJz7EqmcoIL6ioEWYuISY88I1unM9btPTW/oimRKJ/47UEkJNCKCOjNxh4clfB/X3dHnBKKR1O7En7k1MTsrwVrQUBC+gAZ5S/CdmrttwxbkvusDGj4mFBh5CqW2/1NVPI85+g/ecPSoe7gpcwcE5dQd1osNscjjxpLi7BJyypiPZtiKdz/ORUgj4j4z171cDNIVB7QCHXpAmlkd8E"

        //aes helper function
       const encrypt = Encryption(dataEncrypt);
        console.log(encrypt)

        const requestBody = {
            requestBody: encrypt
        };
      const result = await axios.post(`${url}/customers/login`, requestBody);
      localStorage.setItem("token", result.data.response);
      console.log(result.data.response)
      return result.data.response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${url}/customers`, setHeaders());

      localStorage.setItem("token", response.data);

      return response.data;
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn(auth, account_detail, message) {
      // if (message.length > 0) {
      //     toast.success(message);
      // }
  
      return {
          type: LOG_IN,
          auth,
          account_detail,
      };
  },
    loadUser(state, action) {
      const token = state.token;
    
      if (token) {
        const user = token.data;
        console.log(user)
        return {
          ...state,
          token,
          name: user.first_name,
          email: user.email,
          _id: user.cust_id,
          userLoaded: true,
        };
      } else return { ...state, userLoaded: true };
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");

      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          registerStatus: "success",
        };
      } else return state;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = action.payload;
        console.log(user)
        return {
          ...state,
          token: action.payload,
          name: user.firstName,
          email: user.email,
          _id: user.customerUserId,
          loginStatus: "success",
        };
      } else return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(getUser.pending, (state, action) => {
      return {
        ...state,
        getUserStatus: "pending",
      };
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          _id: user._id,
          getUserStatus: "success",
        };
      } else return state;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      return {
        ...state,
        getUserStatus: "rejected",
        getUserError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser,logIn } = authSlice.actions;

export default authSlice.reducer;