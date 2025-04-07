import { api } from "@/services/api/api";
import { IMovie, IMovieInfo } from "../types";

export const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<
      IMovie[],
      {
        genre?: number;
        category?: string;
        sortBy?: string;
        year?: string;
      }
    >({
      query: (params) => {
        const queryParams: Record<string, string | number> = {};

        if (params.sortBy) {
          queryParams.sortBy = params.sortBy;
        }

        if (params.category) {
          queryParams.categoryId = params.category;
        }

        if (params.genre) {
          queryParams.genreId = params.genre;
        }

        if (params.year) {
          queryParams.year = params.year;
        }

        return {
          url: "/movies",
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response: { result: IMovie[] }) => response.result,
      providesTags: ["Movies"],
    }),

    getMovieById: builder.query<IMovieInfo, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "GET",
      }),
      transformResponse: (response: { result: IMovieInfo }) => response.result,
      providesTags: ["Movies"],
    }),

    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieByIdQuery, useDeleteMovieMutation } = movieApi;
