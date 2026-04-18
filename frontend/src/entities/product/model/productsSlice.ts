import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductsState, TOption } from "../types/types";
import { fetchProducts } from "../api";

const initialState: IProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateProductOptions: (
      state,
      action: PayloadAction<{ productId: string; options: TOption[] }>,
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.productId,
      );

      if (product) product.options = action.payload.options;
    },
  },
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

    getProductById: (state, id: string) =>
      state.products.find((product) => product.id === id),
    getStatusLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});

export const { updateProductOptions } = productsSlice.actions;
export const { getProducts, getProductById, getStatusLoading, getError } =
  productsSlice.selectors;
export default productsSlice.reducer;
