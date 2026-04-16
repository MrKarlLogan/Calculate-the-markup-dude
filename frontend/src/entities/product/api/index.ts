import { createAsyncThunk } from "@reduxjs/toolkit";
import { IProductsResponse } from "../types/types";
import productsApi from "@shared/api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: IProductsResponse = await productsApi.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ошибка загрузки продуктов",
      );
    }
  },
);
