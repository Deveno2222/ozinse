import { api } from "@/services/api/api";
import { IMainMovie } from "../types";

const mainMovieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainMovies: builder.query<IMainMovie[], void>({
      query: () => ({
        url: "/movies/main-page",
        method: "GET",
      }),
      providesTags: ["MainMovies"],
    }),

    deleteMainMovie: builder.mutation<void, { id: number }>({
      query: (id) => ({
        url: `/movies/${id}/main-page`,
        method: "DELETE",
      }),
      invalidatesTags: ["MainMovies"],
    }),

    addMainMovie: builder.mutation<
      void,
      { movieId: number; order: number; formData: FormData }
    >({
      query: ({ movieId, order, formData }) => ({
        url: `/movies/${movieId}/main-page?order=${order}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["MainMovies"],
    }),

    updateMainMovie: builder.mutation<
      void,
      { movieId: number; order: number; formData: FormData }
    >({
      query: ({ movieId, order, formData }) => ({
        url: `/movies/${movieId}/main-page?order=${order}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["MainMovies"],
    }),
  }),
});

export const {
  useAddMainMovieMutation,
  useDeleteMainMovieMutation,
  useGetMainMoviesQuery,
  useUpdateMainMovieMutation,
} = mainMovieApi;
