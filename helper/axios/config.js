//export const url = "https://tijaricloud.com:9876";
console.log(process.env.BackEndUrl);

//192.168.1.84:9876/customers/login
export const url = process.env.BackEndUrl;

export const setHeaders = () => {
  const headers = {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  };

  return headers;
};
