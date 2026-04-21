import {
  TCreateProductResponse,
  TDeleteProductResponse,
  TProductRequest,
  TProductsResponse,
  TUpdateProductResponse,
} from "@/entities/product/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

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
