import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://185.100.67.64/",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.authKey;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Profile",
    "Category",
    "Genre",
    "AgeCategory",
    "Image",
    "Movies",
    "MainMovies",
    "SearchMovie",
  ],
  endpoints: () => ({}),
});

export const apiReducer = api.reducer;
