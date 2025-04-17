import { IMovieForm, IMovieInfo } from "@/features/movies/types";

export type FormContextType = {
  formData: IMovieForm;
  updateFormData: (data: Partial<IMovieForm>) => void;
  resetForm: () => void;
  isEditMode: boolean;
  initialData?: IMovieForm;
};
