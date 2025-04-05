import { api } from "@/services/api/api";
import { IAge } from "../types";

export const ageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAges: builder.query<IAge[], void>({
      query: () => ({
        url: "/age-category",
        method: "GET",
      }),
      transformResponse: (response: { result: IAge[] }) => response.result,
      providesTags: ["AgeCategory"],
    }),

    deleteAge: builder.mutation<void, number>({
      query: (id) => ({
        url: `/age-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AgeCategory"],
    }),

    createAge: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/age-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["AgeCategory"],
    }),

    updateAge: builder.mutation<void, { body: FormData; id: number }>({
      query: ({ body, id }) => ({
        url: `/age-category/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["AgeCategory"],
    }),
  }),
});

export const {
  useCreateAgeMutation,
  useDeleteAgeMutation,
  useUpdateAgeMutation,
  useGetAgesQuery,
} = ageApi;
