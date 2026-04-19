import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProductRequest, TProductsResponse } from "../types/types";
import productsApi from "@shared/api/productsApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: TProductsResponse = await productsApi.getAllProducts();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при загрузке продуктов",
      );
    }
  },
);

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (data: TProductRequest, { rejectWithValue }) => {
    try {
      const response = await productsApi.createProduct(data);

      if (response.success) return response.data;
      if (response.validation) return rejectWithValue(response);

      return rejectWithValue(
        response.message || "Произошла ошибка при создании продукта",
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при создании продукта",
      );
    }
  },
);

export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async (
    { data, id }: { data: TProductRequest; id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await productsApi.updateProduct(data, id);

      if (response.success) return response.data;
      if (response.validation) return rejectWithValue(response);

      return rejectWithValue(
        response.message || "Произошла ошибка при обновлении продукта",
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обновлении продукта",
      );
    }
  },
);

export const removeProductThunk = createAsyncThunk(
  "products/removeProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productsApi.removeProducts(id);

      if (response.success) return id;

      return rejectWithValue(response.message || "Ошибка удаления продукта");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при удалении продукта",
      );
    }
  },
);
