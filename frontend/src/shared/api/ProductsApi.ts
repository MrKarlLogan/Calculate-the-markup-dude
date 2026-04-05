import { config } from "@shared/config";
import { URL_PATH } from "../config/constants";

const ProductsApi = {
  getAllProducts: async () => {
    const response = await fetch(`${config.API_URL}${URL_PATH.PRODUCTS}`, {
      credentials: "include",
    });

    return response.json();
  },
};

export default ProductsApi;
