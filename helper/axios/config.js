export const url = "http://137.74.4.23:9876";
//192.168.1.84:9876/customers/login
//export const url = process.env.BackEndUrl;


//export const url = "http://192.168.1.80:9876";


export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
