import { ICategory } from "../categories/types";

export interface IMainMovie {
  movieId?: number;
  project: string;
  order: number;
  previewImg: File[] | null;
  categories: ICategory[];
}
