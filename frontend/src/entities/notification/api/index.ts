import { createAsyncThunk } from "@reduxjs/toolkit";
import notificationApi from "@shared/api/notificationApi";
import { TNotificationRequest } from "../types/types";
import { normalizeError } from "@shared/lib/helpers/normalizeError";

export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await notificationApi.getAllMessage();
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const createNotificationThunk = createAsyncThunk(
  "notification/createNotification",
  async (data: TNotificationRequest, { rejectWithValue }) => {
    try {
      const response = await notificationApi.createMessage(data);
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
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
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const deleteNotificationThunk = createAsyncThunk(
  "notification/deleteNotification",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await notificationApi.deleteMessage(id);
      if (response.success) return id;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
