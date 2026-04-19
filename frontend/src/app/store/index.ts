import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@entities/user/model/userSlice";
import productsReducer from "@entities/product/model/productsSlice";
import notificationsReducer from "@entities/notification/model/notificationSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: productsReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
