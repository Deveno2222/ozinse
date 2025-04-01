import { api } from "@/services/api/api";
import { IProfile } from "../types";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IProfile, void>({
      query: () => "/user/profile",
      transformResponse: (response: { result: any; metadata: any }) =>
        response.result,
      providesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = userApi;
