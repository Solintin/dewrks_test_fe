import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
// import { isLocal } from "./constant.util";
import { getFromSessionStorage } from "./helper";
// import { errorLogger } from "utils/helper";

const request = () => {
  const defaultOptions = {
    baseURL: "http://localhost:4000/api/v1",
  };
  // Create instance
  let instance = axios.create(defaultOptions);

  // Add request interceptor
  instance.interceptors.request.use(function (
    config: AxiosRequestConfig<any>,
  ):
    | InternalAxiosRequestConfig<any>
    | Promise<InternalAxiosRequestConfig<any>> {
    const token = getFromSessionStorage("TOKEN");
    const cleanToken = (token ?? "").replace(/^"|"$/g, "");

    config.headers = {
      Authorization: token ? `Bearer ${cleanToken}` : "",
    };
    return config as any;
  });

  // Add error interceptor
  // instance.interceptors.response.use(null, function (error) {
  //   // Handle the error
  //   if (error.response) {
  //     // The request was made and the server responded with a status code
  //     // that falls out of the range of 2xx
  //     // errorLogger(error);
  //     // console.log(error.response.data);
  //     // console.log(error.response.status);
  //     // console.log(error.response.headers);
  //   } else if (error.request) {
  //     // The request was made but no response was received
  //     // console.log(error.request);
  //   } else {
  //     // Something happened in setting up the request that triggered an Error
  //     // console.log("Error", error.message);
  //   }
  //   console.log(error.config);

  //   // You can return a new promise that rejects with the error, or throw the error,
  //   // or handle it in any other way you see fit.
  //   // For example, you might want to redirect the user to a login page if the token is invalid.
  //   // throw error;
  // });

  return instance;
};

export default request();
