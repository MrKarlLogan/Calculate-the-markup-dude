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
    getUser: (state) => state.user,
  },
});

export const { getUser } = userSlice.selectors;
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
