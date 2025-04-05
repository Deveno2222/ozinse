import { IGenre } from "./../types";
import { api } from "@/services/api/api";

export const genreApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<IGenre[], void>({
      query: () => ({
        url: "/genre",
        method: "GET",
      }),
      transformResponse: (response: { result: IGenre[] }) => response.result,
      providesTags: ["Genre"],
    }),

    createGenre: builder.mutation<void, FormData>({
      query: (formData) => ({
        url: "/genre",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Genre"],
    }),

    deleteGenre: builder.mutation<void, number>({
      query: (id) => ({
        url: `/genre/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),

    editGenre: builder.mutation<void, { body: FormData; id: number }>({
      query: ({ body, id }) => ({
        url: `/genre/${id}`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Genre"],
    }),

    getImage: builder.query<Blob, string>({
      query: (imageSrc) => ({
        url: `/${imageSrc}`,
        method: "GET",
        responseHandler: async (response) => response.blob(), 
      }),
      providesTags: ["Image"],
    }),

  }),
});

export const {
  useGetGenresQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
  useLazyGetImageQuery
} = genreApi;
