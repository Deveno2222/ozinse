import { api } from "@/services/api/api";

const mainMovieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMainMovies: builder.query({
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
  }),
});

export const {
  useAddMainMovieMutation,
  useDeleteMainMovieMutation,
  useGetMainMoviesQuery,
} = mainMovieApi;
