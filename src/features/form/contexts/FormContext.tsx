import { IMovieForm } from "@/features/movies/types";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { FormContextType } from "../types/types";

const FormContext = createContext<FormContextType | null>(null);

interface Props {
  children: ReactNode;
  initialData?: IMovieForm;
}

const initialFormState: IMovieForm = {
  movieId: 0,
  name: "",
  category: [],
  typeProject: [],
  age: [],
  year: "",
  dur: "",
  keyWords: "",
  description: "",
  director: "",
  scripter: "",
  seasons: 1,
  episodes: [],
  coverImage: null,
  screenshots: [],
};

export const FormProvider = ({ children, initialData }: Props) => {
  const [formData, setFormData] = useState<IMovieForm>(
    initialData || initialFormState
  );

  const [isEditMode, setIsEditMode] = useState(!!initialData);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...initialFormState, ...initialData, ...prev }));
      setIsEditMode(true);
    } else {
      setFormData(initialFormState);
      setIsEditMode(false);
    }
  }, [initialData?.movieId]);

  const updateFormData = (data: Partial<IMovieForm>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData(
      initialData ? { ...initialFormState, ...initialData } : initialFormState
    );
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, resetForm, isEditMode, initialData }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within FormProvider");
  }
  return context;
};
