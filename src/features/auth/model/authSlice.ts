import { decryptToken, encryptToken } from "@/utils/cryptoUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const storedEncryptedKey = localStorage.getItem("authKey");
const decryptedKey = storedEncryptedKey
  ? decryptToken(storedEncryptedKey)
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: { authKey: decryptedKey },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      const encrypted = encryptToken(action.payload);
      state.authKey = action.payload;
      localStorage.setItem("authKey", encrypted);
    },
    logout: (state) => {
      state.authKey = null;
      localStorage.removeItem("authKey");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
