interface IEpisode {
  id: string; 
  season: number;
  episode: string; 
}


export interface IMovieForm {
  name: string;
  category: string[];
  typeProject: string;
  age: string[];
  year: string;
  dur: string;
  keyWords: string;
  description: string;
  director: string;
  scripter: string;
  seasons: number;
  episodes: IEpisode[];
  coverImage: File | null;
  screenshots: File[] | null;
}
