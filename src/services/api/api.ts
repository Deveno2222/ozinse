import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://185.100.67.64/",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("authKey")}`);
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: () => ({}),
});

export const apiReducer = api.reducer;
