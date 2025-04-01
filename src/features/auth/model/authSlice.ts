import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { authKey: localStorage.getItem("authKey") || null },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.authKey = action.payload;
      localStorage.setItem("authKey", action.payload);
    },
    logout: (state) => {
      state.authKey = null;
      localStorage.removeItem("authKey");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
