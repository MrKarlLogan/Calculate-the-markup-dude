import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductsState } from "../types/types";
import { fetchProducts } from "../api";

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<IProduct[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    getProducts: (state) => state.products,
    getStatusLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});

export const {} = productsSlice.actions;
export const { getProducts, getStatusLoading, getError } =
  productsSlice.selectors;
export default productsSlice.reducer;
