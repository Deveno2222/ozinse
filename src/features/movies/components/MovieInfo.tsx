import imagePrev from "../../../assets/PreviewImage.png";
import playBtn from "../../../assets/Play Button.png";
import { Button } from "@/components/ui/button";
import { EyeIcon, Share, Star, Trash2 } from "lucide-react";
import SeasonSeriesGroup from "./SeasonSeriesGroup";
import Modal from "@/features/modals/components/Modal";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import { IMovieInfo } from "../types";
import MovieScreenshots from "./MovieScreenshots";

interface Props {
  movieData: IMovieInfo;
}

const MovieInfo = ({ movieData }: Props) => {
  const dispatch = useDispatch();

  const handleOpen = (type: "delete" | "form" | null) => {
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    console.log("Логика удаления");
    dispatch(closeModal());
  };

  return (
    <div className="bg-background rounded-2xl mx-6">
      <div className="flex justify-between items-start p-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-bold">{movieData.title}</h2>
          {/* Статистика*/}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              {/* Количество просмотров */}
              <EyeIcon size={16} color="#8F92A1" />
              <span className="text-[#8F92A1] hover:underline cursor-default">
                {movieData.views}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Сохранено */}
              <Star size={16} color="#8F92A1" />
              <span className="text-[#8F92A1] hover:underline cursor-default">
                4
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Репост */}
              <Share size={16} color="#8F92A1" />
              <span className="text-[#8F92A1] hover:underline cursor-default">
                43
              </span>
            </div>
          </div>
        </div>
        {/* Группа кнопок */}
        <div className="flex items-center gap-4">
          <Button className="rounded-2xl bg-[#F3F6F8] hover:bg-[#e4e6e7] shadow-none text-dark text-base font-bold px-6 py-2">
            Редактировать
          </Button>
          <Button
            onClick={() => handleOpen("delete")}
            className="rounded-2xl bg-[#DE350B] hover:bg-[#bb2500] shadow-none w-9"
          >
            <Trash2 size={20} />
          </Button>
          <Modal title={"Удалить проект?"}>
            <div>
              <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
                Вы действительно хотите удаленить проект?
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={handleDelete}
                  className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px]"
                >
                  Да, удалить
                </Button>
                <Button
                  onClick={handleClose}
                  className="bg-[#8F92A11A] hover:bg-[#38383a1a] shadow-none text-dark rounded-2xl w-[134px]"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      {/* Видео */}
      <div className="relative px-8 w-full">
        <img src={imagePrev} alt="Фильм" className="w-full" />
        <img
          className="absolute top-1/2 left-1/2 w-[80px] h-[80px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
          src={playBtn}
          alt="Запуск"
        />
      </div>

      {/* Серии */}
      <SeasonSeriesGroup />

      {/* Описание */}
      <div className="p-8 border-b border-b-grayLine">
        <h3 className="text-dark text-[22px] font-bold mb-8 tracking-[-0.4px]">
          Описание
        </h3>
        <p className="text-base text-dark font-normal pb-[28px] tracking-[-0.4px]">
          {movieData.description}
        </p>
        <div>
          <div className="flex items-center flex-row gap-[38px]">
            <div className="text-[#8F92A1]">Режиссер:</div>
            <div className="text-base">{movieData.director}</div>
          </div>
          <div className="flex items-center flex-row gap-[35px]">
            <div className="text-[#8F92A1]">Продюсер:</div>
            <div className="text-base">{movieData.producer}</div>
          </div>
        </div>
      </div>

      {/* Скриншоты */}
      <div className="pt-[30px] pb-8 px-8">
        <h3 className="text-[22px] font-bold tracking-[-0.4px]">Скриншоты</h3>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {movieData.screenshots?.map((url) => (
            <MovieScreenshots key={String(url)} imgUrl={url} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
