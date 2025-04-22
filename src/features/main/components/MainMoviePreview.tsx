import PreviewImage from "../../../assets/MainPreview.png";
import { SquarePen, Trash2 } from "lucide-react";
import { IMainMovie } from "../types";

interface Props {
  openModalDelete: () => void;
  openModalForm?: () => void;
  movieData: IMainMovie;
}

const MainMoviePreview = ({
  openModalDelete,
  openModalForm,
  movieData,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-4 max-w-[538px]">
      <img src={PreviewImage} alt="" className="w-[506px] h-[276px]" />

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold">{movieData.project}</h3>
        <div className="flex items-center gap-1 text-[#9CA3AF] tracking-[0.5px]">
          {movieData.categories.length > 0 && (
            <p className="text-xs text-[#9CA3AF] hover:underline cursor-pointer">
              {movieData.categories.map((c) => c.name).join(" • ")}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p>Проект на главной #{movieData.order}</p>
        <div className="flex gap-4">
          <SquarePen
            size={16}
            color="#171717CC"
            onClick={openModalForm}
            className="hover:opacity-70 transition-opacity cursor-pointer"
          />
          <Trash2
            size={16}
            color="#171717CC"
            className="hover:opacity-70 transition-opacity cursor-pointer"
            onClick={openModalDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default MainMoviePreview;
