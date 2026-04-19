import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDiscount, TProduct, TProductsState, TOption } from "../types/types";
import {
  createProductThunk,
  fetchProducts,
  removeProductThunk,
  updateProductThunk,
} from "../api";

const initialState: TProductsState = {
  products: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createNewMode: (state, action: PayloadAction<TProduct>) => {
      state.products.push(action.payload);
    },
    updateProductName: (
      state,
      action: PayloadAction<{ productId: string; name: string }>,
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.productId,
      );

      if (product) product.name = action.payload.name;
    },
    updateProductOptions: (
      state,
      action: PayloadAction<{ productId: string; options: TOption[] }>,
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.productId,
      );

      if (product) product.options = action.payload.options;
    },
    updateProductDiscounts: (
      state,
      action: PayloadAction<{ productId: string; discounts: TDiscount[] }>,
    ) => {
      const product = state.products.find(
        (product) => product.id === action.payload.productId,
      );

      if (product) product.discounts = action.payload.discounts;
    },
    removeModel: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
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
        (state, action: PayloadAction<TProduct[]>) => {
          state.loading = false;
          state.products = action.payload;
        },
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id,
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        removeProductThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.products = state.products.filter(
            (product) => product.id !== action.payload,
          );
        },
      )
      .addCase(removeProductThunk.rejected, (state, action) => {
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

export const {
  createNewMode,
  updateProductName,
  updateProductOptions,
  updateProductDiscounts,
  removeModel,
} = productsSlice.actions;
export const { getProducts, getProductById, getStatusLoading, getError } =
  productsSlice.selectors;
export default productsSlice.reducer;
