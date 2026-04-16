import { IProductsResponse } from "@/entities/product/types/types";
import { URL_PATH } from "../config/constants";
import { axios_instance } from "./axios-instance";

const productsApi = {
  getAllProducts: async () => {
    const response = await axios_instance.get<IProductsResponse>(
      URL_PATH.PRODUCTS,
    );
    return response.data;
  },
};

export default productsApi;
