import usersApi from "@/shared/api/usersApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthData } from "../types/types";
import { normalizeError } from "@/shared/lib/helpers/normalizeError";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.getAllusers();
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const updateUsersRoleThunk = createAsyncThunk(
  "users/updateUsersRole",
  async (
    { data, id }: { data: Pick<IAuthData, "role">; id: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await usersApi.updateUser(data, id);
      if (response.success) return response.data;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUsers",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await usersApi.deleteUser(id);
      if (response.success) return id;
      return rejectWithValue(normalizeError(response));
    } catch (error) {
      return rejectWithValue(normalizeError(error));
    }
  },
);
