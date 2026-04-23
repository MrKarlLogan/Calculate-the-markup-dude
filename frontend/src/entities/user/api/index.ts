import usersApi from "@/shared/api/usersApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IAuthData } from "../types/types";

export const fetchUsersThunk = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersApi.getAllusers();
      if (response.success) return response.data;
      else return rejectWithValue(response.message);
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при загрузке пользователей",
      );
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
      return rejectWithValue(
        response.message || "Ошибка при обновлении роли пользователя",
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при обновлении роли пользователя",
      );
    }
  },
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUsers",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await usersApi.deleteUser(id);
      if (response.success) return id;
      return rejectWithValue(
        response.message || "Ошибка при удалении пользователя",
      );
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при удалении пользователя",
      );
    }
  },
);
