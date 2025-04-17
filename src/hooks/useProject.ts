import ProjectContext from "@/contexts/ProjectContext";
import { IAge } from "@/features/age/types";
import { ICategory } from "@/features/categories/types";
import { IGenre } from "@/features/genre/types";
import { useContext } from "react";

const UseProject = (): {
  categories?: ICategory[];
  ages?: IAge[];
  genres?: IGenre[];
} => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error(
      "useProject может использовать только внутри провайдера ProjectProvider"
    );
  }

  return context;
};

export default UseProject;
