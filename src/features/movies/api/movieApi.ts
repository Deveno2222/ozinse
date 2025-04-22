import { api } from "@/services/api/api";
import { IEpisodeFetch, IMovieInfo } from "../types";

export const movieApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query<
      { data: IMovieInfo[]; totalCount: number },
      {
        genre?: number;
        category?: string;
        sortBy?: string;
        year?: string;
        page?: number;
        size?: number;
      }
    >({
      query: (params) => {
        const queryParams: Record<string, string | number> = {};

        if (params.sortBy) queryParams.sortBy = params.sortBy;
        if (params.category) queryParams.categoryId = params.category;
        if (params.genre) queryParams.genreId = params.genre;
        if (params.year) queryParams.year = params.year;

        if (params.page) queryParams.page = params.page;
        if (params.size) queryParams.size = params.size;

        return {
          url: "/movies",
          method: "GET",
          params: queryParams,
        };
      },
      transformResponse: (response: {
        result: IMovieInfo[];
        metadata: { additionalProp1: number };
      }) => ({
        data: response.result,
        totalCount: response.metadata.additionalProp1,
      }),
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

    getSeason: builder.query<
      IEpisodeFetch,
      { movieId: number; seasonId: number }
    >({
      query: ({ movieId, seasonId }) =>
        `movie/${movieId}/series?seasonId=${seasonId}`,
      transformResponse: (response: { result: IEpisodeFetch }) =>
        response.result,
    }),

    deleteMovie: builder.mutation<void, number>({
      query: (id) => ({
        url: `/movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),

    createMovie: builder.mutation<{ result: boolean; metadata: {} }, FormData>({
      query: (formData) => ({
        url: "/movies",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Movies"],
    }),

    updateMovie: builder.mutation<
      { result: boolean },
      { movieId: number; formData: FormData }
    >({
      query: ({ movieId, formData }) => ({
        url: `/movies/${movieId}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Movies"],
    }),

    addEpisodeVideoLink: builder.mutation<
      void,
      {
        movieId: number;
        seasonId: number;
        seriesId: number;
        formData: FormData;
      }
    >({
      query: ({ movieId, seasonId, seriesId, formData }) => ({
        url: `/movies/${movieId}/season/${seasonId}/series/${seriesId}/videoLink`,
        method: "POST",
        body: formData,
      }),
    }),

    addImages: builder.mutation<void, { movieId: number; formData: FormData }>({
      query: ({ movieId, formData }) => ({
        url: `/movies/${movieId}/images`,
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieByIdQuery,
  useDeleteMovieMutation,
  useCreateMovieMutation,
  useAddEpisodeVideoLinkMutation,
  useAddImagesMutation,
  useLazyGetSeasonQuery,
  useUpdateMovieMutation,
} = movieApi;
