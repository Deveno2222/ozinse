import { IAge } from "@/features/age/types";
import { ICategory } from "@/features/categories/types";
import { IGenre } from "@/features/genre/types";

import { api } from "@/services/api/api";

export interface IMainMovie {
  movieId: number;
  title: string;
  imageSrc: File | null;
  seriesCount: number;
  views: number;
  ageCategories: IAge[];
  categories: ICategory[];
  genres: IGenre[];
}

// !!!!!!!!!!! Временно !!!!!!!!!!
export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<IMainMovie[], { title: string }>({
      query: ({ title }) => ({
        url: `/movies?name=${encodeURIComponent(title)}`,
        method: "GET",
      }),
      transformResponse: (response: { result: IMainMovie[] }) =>
        response.result,
      providesTags: ["SearchMovie"],
    }),
  }),
});

export const { useLazyGetProjectsQuery } = searchApi;
