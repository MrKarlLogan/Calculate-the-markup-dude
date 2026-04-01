import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthData } from "@/shared/api/types";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null as IAuthData | null,
  },
  reducers: {
    setUser: (state, action: PayloadAction<IAuthData>) => {
      state.user = action.payload;
    },
  },
  selectors: {
    getUser: (state) => state.user?.name,
    getRole: (state) => state.user?.role,
  },
});

export const { getUser, getRole } = userSlice.selectors;
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
