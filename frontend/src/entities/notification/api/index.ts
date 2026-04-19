import { createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "@shared/api/notificationApi";
import { TNotificationRequest } from "../types/types";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getAllMessage();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при загрузке уведомлений",
      );
    }
  },
);

export const createNotificationThunk = createAsyncThunk(
  "notification/createNotification",
  async (data: TNotificationRequest, { rejectWithValue }) => {
    try {
      const response = await notificationApi.createMessage(data);
      if (response.success) return response.data;
      if (response.validation) return rejectWithValue(response);
      return rejectWithValue(response.message || "Ошибка создания уведомления");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при создании уведомления",
      );
    }
  },
);

export const updateNotificationThunk = createAsyncThunk(
  "notification/updateNotification",
  async (
    { data, id }: { data: TNotificationRequest; id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await notificationApi.updateMessage(data, id);
      if (response.success) return response.data;
      return rejectWithValue(
        response.message || "Ошибка обновления уведомления",
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обновлении уведомления",
      );
    }
  },
);

export const deleteNotificationThunk = createAsyncThunk(
  "notification/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await notificationApi.deleteMessage(id);
      if (response.success) return id;
      return rejectWithValue(response.message || "Ошибка удаления уведомления");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при удалении уведомления",
      );
    }
  },
);
