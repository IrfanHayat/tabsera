import axios from "axios";
import {url} from "./config";

// const instance = axios.create({
//     baseURL: url
// });


const instance = axios.create({
    withCredentials:true,
    
    baseURL: url
 // timeout: 5000,
  
 
});

// intercept the request and add these configuration with request
// instance.interceptors.request.use(
//     config => {
//         config.withCredentials = true;

//         return config;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
export default instance;
