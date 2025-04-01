import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modals/modalSlice";
import { authApi } from "@/features/auth/api/authApi";
import { authReducer } from "@/features/auth/model/authSlice";
import { api } from "@/services/api/api";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
