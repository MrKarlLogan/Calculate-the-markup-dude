import axios from "axios";
import { config } from "@shared/config";

export const axios_instance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

axios_instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.data && typeof error.response.data === "object") {
      return Promise.resolve({
        ...error.response,
        data: error.response.data,
      });
    }

    
    return Promise.reject(error);
  },
);
