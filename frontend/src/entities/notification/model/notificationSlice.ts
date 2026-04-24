import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TNotificationState, TNotification } from "../types/types";
import {
  fetchNotifications,
  createNotificationThunk,
  updateNotificationThunk,
  deleteNotificationThunk,
} from "../api";

const initialState: TNotificationState = {
  messages: [],
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchNotifications.fulfilled,
        (state, action: PayloadAction<TNotification[]>) => {
          state.loading = false;
          state.messages = action.payload;
        },
      )
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNotificationThunk.fulfilled, (state, action) => {
        if (action.payload) {
          state.messages.push(action.payload);
        }
      })
      .addCase(createNotificationThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateNotificationThunk.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.messages.findIndex(
            (message) => message.id === action.payload?.id,
          );
          if (index !== -1) state.messages[index] = action.payload;
        }
      })
      .addCase(updateNotificationThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        deleteNotificationThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.messages = state.messages.filter(
            (msg) => msg.id !== action.payload,
          );
        },
      )
      .addCase(deleteNotificationThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
  selectors: {
    getMessages: (state) => state.messages,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});

export const { getMessages, getLoading, getError } =
  notificationSlice.selectors;
export default notificationSlice.reducer;
