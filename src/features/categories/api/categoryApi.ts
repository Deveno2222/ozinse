import { api } from "@/services/api/api";
import { ICategory } from "../types";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      transformResponse: (response: { result: ICategory[] }) => response.result,
      providesTags: ["Category"],
    }),

    createCategory: builder.mutation<void, Partial<ICategory>>({
      query: (body) => ({
        url: "/category",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    editCategory: builder.mutation<void,{ body: Partial<ICategory>; id: number }>({
      query: ({ body, id }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Category"],
    }),
    
  }),
});

export const { useGetCategoriesQuery, useCreateCategoryMutation, useDeleteCategoryMutation, useEditCategoryMutation } = categoryApi;
