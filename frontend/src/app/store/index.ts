import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@entities/user/model/userSlice";
import productsReducer from "@entities/product/model/productsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
