import axios from "axios";
import {url} from "./config";


// const instance = axios.create({
//     baseURL: url
// });


 export const instance = axios.create({
    withCredentials:true,
    
    baseURL: url
 // timeout: 5000,
  
 
});

 instance.interceptors.response.use(response=>response,async error=>{
    if (error.response) {
        // Request made and server responded
        
        if(error.response.status===4003){
          
                let router=useRouter()
                let encrypt = "EYeg8Wha6Mz6NGeWzjIBJZGcrodlGkpRUUzHcjIaugV80IelDyLdGunDQ/E25/kNyMU5LY9wGqb5Na0a3SCFZdQHTulGjAn9HwkTZSfQ5PpaqwCsEWExt3FXWJPidZkV5kkn6gHFqDt8R4QuaWIc7FNpz0vy+CeS40oiZwiuSkYVl9FJz7EqmcoIL6ioEWYuISY88I1unM9btPTW/oimRKJ/47UEkJNCKCOjNxh4clfB/X3dHnBKKR1O7En7k1MTsrwVrQUBC+gAZ5S/CdmrttwxbkvusDGj4mFBh5CqW2/1NVPI85+g/ecPSoe7gpcwcE5dQd1osNscjjxpLi7BJyypiPZtiKdz/ORUgj4j4z171cDNIVB7QCHXpAmlkd8E"
              
                //aes helper function
              //  const encrypt = Encryption(dataEncrypt);
              
              
                const requestBody = {
                    requestBody: encrypt
                };
               
              const result = await axios.post(`${url}/customers/login`,requestBody);
                router.push("/login")
                }
      
        
      } 
 })

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
