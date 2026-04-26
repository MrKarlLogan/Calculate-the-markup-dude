import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData } from "@/entities/user/types/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as IAuthData | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<IAuthData>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
  selectors: {
    getUserId: (state) => state.user?.id,
    getLogin: (state) => state.user?.login,
    getUserName: (state) => state.user?.name,
    getRole: (state) => state.user?.role,
  },
});

export const { getUserId, getLogin, getUserName, getRole } =
  userSlice.selectors;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
