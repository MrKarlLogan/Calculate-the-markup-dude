import {
  TCreateProductResponse,
  TDeleteProductResponse,
  TProductRequest,
  TProductsResponse,
  TUpdateProductResponse,
} from "@/entities/product/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

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

const productsApi = {
  getAllProducts: async () => {
    const response = await axios_instance.get<TProductsResponse>(
      URL_PATH.PRODUCTS,
    );
    return response.data;
  },

  createProduct: async (data: TProductRequest) => {
    const response = await axios_instance.post<TCreateProductResponse>(
      URL_PATH.PRODUCTS,
      data,
    );
    return response.data;
  },

  updateProduct: async (data: TProductRequest, id: string) => {
    const response = await axios_instance.put<TUpdateProductResponse>(
      `${URL_PATH.PRODUCTS}/${id}`,
      data,
    );
    return response.data;
  },

  removeProducts: async (id: string) => {
    const response = await axios_instance.delete<TDeleteProductResponse>(
      `${URL_PATH.PRODUCTS}/${id}`,
    );
    return response.data;
  },
};

export default productsApi;
