import ProductsApi from "@shared/api/ProductsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductsResponse } from "../types/types";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: IProductsResponse = await ProductsApi.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ошибка загрузки продуктов",
      );
    }
  },
);
