import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../helper/axios/httpRequest";
import { url, setHeaders } from "../helper/axios/config";
import Encryption from "../helper/encryption/encryptAes";
import localStorage from "localStorage";
import Cookies from "universal-cookie";

import { removeFromBasket } from "./basketSlice";

import { useSelector, useDispatch } from "react-redux";

const initialState = {
  token: localStorage.getItem("token"),
  phone: "",
  password: "",
  _id: "",
  data: localStorage.getItem("data"),
  name: localStorage.getItem("name"),
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  logOutStatus: "",
  logOutStatus: "",
  logOut: {},
  userLoaded: false,
  check: "",
  register: ''
};

export const checkUser = createAsyncThunk(
  "auth/check",
  async (values, { rejectWithValue }) => {
    try {
      let obj = { "requestBody": `{\"mobileNumber\":\"${values}\"}` }

      const result = await instance.post(`${url}/customers/check`, obj);
      console.log(result)
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const result = await instance.post(`${url}/customers/register`, values);

      return result.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      let cookiesWebsite = new Cookies();
      let dataEncrypt;
      // console.log(values.userName);
      // console.log(values.pwd);
      if (values?.userName) {
        dataEncrypt = {
          deviceId: "",
          // imsi: "",

          channelId: 1,
          mobileNumber: values?.userName,
          //  otp: "127484",
          password: values?.pwd,
          // registrationToken: ""
        };
      } else {
        localStorage.setItem("mobileNumber", values.phone.replace(/[^\d]/g, ""))
        dataEncrypt = {
          deviceId: "",
          // imsi: "",

          channelId: 1,
          mobileNumber: values.phone,
          //  otp: "127484",
          password: values.password,
          // registrationToken: ""
        };
      }


      //let encrypt = "EYeg8Wha6Mz6NGeWzjIBJZGcrodlGkpRUUzHcjIaugV80IelDyLdGunDQ/E25/kNyMU5LY9wGqb5Na0a3SCFZdQHTulGjAn9HwkTZSfQ5PpaqwCsEWExt3FXWJPidZkV5kkn6gHFqDt8R4QuaWIc7FNpz0vy+CeS40oiZwiuSkYVl9FJz7EqmcoIL6ioEWYuISY88I1unM9btPTW/oimRKJ/47UEkJNCKCOjNxh4clfB/X3dHnBKKR1O7En7k1MTsrwVrQUBC+gAZ5S/CdmrttwxbkvusDGj4mFBh5CqW2/1NVPI85+g/ecPSoe7gpcwcE5dQd1osNscjjxpLi7BJyypiPZtiKdz/ORUgj4j4z171cDNIVB7QCHXpAmlkd8E"

      //let encrypt = "EYeg8Wha6Mz6NGeWzjIBJZGcrodlGkpRUUzHcjIaugV80IelDyLdGunDQ/E25/kNyMU5LY9wGqb5Na0a3SCFZdQHTulGjAn9HwkTZSfQ5PpaqwCsEWExt3FXWJPidZkV5kkn6gHFqDt8R4QuaWIc7FNpz0vy+CeS40oiZwiuSkYVl9FJz7EqmcoIL6ioEWYuISY88I1unM9btPTW/oimRKJ/47UEkJNCKCOjNxh4clfB/X3dHnBKKR1O7En7k1MTsrwVrQUBC+gAZ5S/CdmrttwxbkvusDGj4mFBh5CqW2/1NVPI85+g/ecPSoe7gpcwcE5dQd1osNscjjxpLi7BJyypiPZtiKdz/ORUgj4j4z171cDNIVB7QCHXpAmlkd8E"

      //aes helper function
      //  const encrypt = Encryption(dataEncrypt);

      const requestBody = {
        requestBody: dataEncrypt,
      };

      const result = await instance.post(`${url}/customers/login`, requestBody);
      if (result.data.response) {
        localStorage.setItem("token", result.data.response);
        localStorage.setItem("data", requestBody);
        localStorage.setItem("login", 'true')
      }

      return result.data.response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ rejectWithValue }) => {
    try {
      const response = await instance.get(`${url}/customers`, setHeaders());

      localStorage.setItem("token", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logOutCustomer = createAsyncThunk(
  "auth/logOutCustomer",
  async () => {
    // try {

    const result = await instance.get(`${url}/customers/logout`);

    return result;
    // } catch (error) {
    // return rejectWithValue(error.response.data);
    // }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;

      if (token) {
        const user = token.data;

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
      //   let dispatch=useDispatch()
      //  const result = await instance.get(`${url}/customers/logout`);
      removeFromBasket();
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("cartItems");
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
      state.register = action.payload;
      state.loading = false;
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
        localStorage.setItem("name", user.firstName);

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


    builder.addCase(checkUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(checkUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = action.payload;
        localStorage.setItem("name", user.firstName);

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
    builder.addCase(checkUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });

    builder.addCase(logOutCustomer.pending, (state, action) => {
      return { ...state, logOutStatus: "pending" };
    });
    builder.addCase(logOutCustomer.fulfilled, (state, action) => {
      if (action.payload) {
        state.logOut = action.payload;
      }
    });
    builder.addCase(logOutCustomer.rejected, (state, action) => {
      return {
        ...state,
        logOutStatus: "rejected",
        logOutError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser, logIn } = authSlice.actions;

export default authSlice.reducer;
