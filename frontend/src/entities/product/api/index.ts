import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProductsResponse } from "../types/types";
import productsApi from "@shared/api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: TProductsResponse = await productsApi.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Ошибка загрузки продуктов",
      );
    }
  },
);
