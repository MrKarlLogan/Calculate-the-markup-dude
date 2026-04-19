import { TProductsResponse } from "@/entities/product/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

const productsApi = {
  getAllProducts: async () => {
    const response = await axios_instance.get<TProductsResponse>(
      URL_PATH.PRODUCTS,
    );
    return response.data;
  },
};

export default productsApi;
