import PreviewImage from "../../../assets/MainPreview.png";
import { SquarePen, Trash2 } from "lucide-react";

interface Props {
  openModalDelete: () => void;
  openModalForm?: () => void;
}

const MainMoviePreview = ({ openModalDelete, openModalForm }: Props) => {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-4 max-w-[538px]">
      <img src={PreviewImage} alt="" className="w-[506px] h-[276px]" />

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold">Қызғалдақтар мекені</h3>
        <div className="flex items-center gap-1 text-[#9CA3AF] tracking-[0.5px]">
          <p className="text-xs text-[#9CA3AF] hover:underline cursor-pointer">
            Телехикая
          </p>
          <svg
            width="4"
            height="4"
            viewBox="0 0 4 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2" cy="2" r="2" fill="#9CA3AF" />
          </svg>
          <p className="text-xs text-[#9CA3AF] hover:underline cursor-pointer">
            Мультфильм
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p>Проект на главной #1</p>
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
