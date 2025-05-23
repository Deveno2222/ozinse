import { IAge } from "../age/types";
import { ICategory } from "../categories/types";
import { IGenre } from "../genre/types";

export interface IEpisode {
  movieId: number;
  seasonId: number;
  seriesId: number;
  link: string;
}

export interface IEpisodeFetch {
  movieId: number;
  seasonCount: number;
  seasonId: number;
  series: {
    seriesId: number;
    videoLink: string;
  }[];
}

export interface IMovie {
  movieId: number;
  title: string;
  imageSrc: File | null;
  categories: ICategory[];
  ageCategories: IAge[];
  genres: IGenre[];
  seriesCount: number;
  views: number;
}

export interface IMovieInfo {
  movieId: number;
  title: string;
  imageSrc: File | null;
  categories: ICategory[];
  ageCategories: IAge[];
  genres: IGenre[];
  seriesCount: number;
  views: number;
  description: string;
  director: string;
  producer: string;
  releaseYear: number;
  duration: number;
  keyWords: string;
  isFavorite: boolean;
  series: {
    movieId: number;
    seasonCount: number;
    seasonId: number;
    series: {
      seriesId: number;
      videoLink: string;
    }[];
  };
  createdAt: number;
  updatedAt: number;
  screenshots: File[] | null;
  createdBy: string;
}

export interface IMovieForm {
  movieId?: number;
  name: string;
  category: ICategory[];
  typeProject: IGenre[];
  age: IAge[];
  year: string;
  dur: string;
  keyWords: string;
  description: string;
  director: string;
  scripter: string;
  seasons: number;
  episodes: IEpisode[];
  coverImage: File | null;
  screenshots?: (File | string)[];
}
