import { createAsyncThunk } from "@reduxjs/toolkit";
import { TProductRequest, TProductsResponse } from "../types/types";
import productsApi from "@shared/api/productsApi";
import { normalizeError } from "@shared/lib/helpers/normalizeError";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response: TProductsResponse = await productsApi.getAllProducts();
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (data: TProductRequest, { rejectWithValue }) => {
    try {
      const response = await productsApi.createProduct(data);
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
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
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const removeProductThunk = createAsyncThunk(
  "products/removeProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await productsApi.removeProducts(id);
      if (response.success) return id;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
