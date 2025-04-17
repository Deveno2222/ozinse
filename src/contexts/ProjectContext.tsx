import { useGetAgesQuery } from "@/features/age/api/ageApi";
import { useGetCategoriesQuery } from "@/features/categories/api/categoryApi";
import { useGetGenresQuery } from "@/features/genre/api/genreApi";
import { createContext, ReactNode, useMemo } from "react";

export const ProjectContext = createContext<any>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { data: ages } = useGetAgesQuery();
  const { data: categories } = useGetCategoriesQuery();
  const { data: genres } = useGetGenresQuery();

  const values = useMemo(
    () => ({ ages, categories, genres }),
    [ages, categories, genres]
  );

  return (
    <ProjectContext.Provider value={values}>{children}</ProjectContext.Provider>
  );
};

export default ProjectContext;
