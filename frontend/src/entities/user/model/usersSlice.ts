import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData, TUsersState } from "@/entities/user/types/types";
import { deleteUserThunk, fetchUsersThunk, updateUsersRoleThunk } from "../api";

const initialState: TUsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  selectors: {
    getUsers: (state) => state.users,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsersThunk.fulfilled,
        (state, action: PayloadAction<IAuthData[]>) => {
          state.loading = false;
          state.users = action.payload;
        },
      )
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUsersRoleThunk.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        const user = state.users.find((user) => user.id === id);
        if (user) user.role = role;
      })
      .addCase(updateUsersRoleThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(
        deleteUserThunk.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.users = state.users.filter(
            (user) => user.id !== action.payload,
          );
        },
      )
      .addCase(deleteUserThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { getUsers, getLoading, getError } = usersSlice.selectors;
export default usersSlice.reducer;
