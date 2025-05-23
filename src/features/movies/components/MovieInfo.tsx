import { Button } from "@/components/ui/button";
import { EyeIcon, Share, Star, Trash2 } from "lucide-react";
import SeasonSeriesGroup from "./SeasonSeriesGroup";

import { IMovieInfo } from "../types";
import MovieScreenshots from "./MovieScreenshots";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  movieData: IMovieInfo;
  openModal: () => void;
  openDeleteModal: () => void;
}

const MovieInfo = ({ movieData, openModal, openDeleteModal }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeVideo, setActiveVideo] = useState<string>(
    movieData?.series?.series?.[0]?.videoLink || ""
  );

  // const handleOpen = (type: "delete" | "form" | null) => {
  //   dispatch(openModal({ modalType: type }));
  // };

  // const handleClose = () => {
  //   dispatch(closeModal());
  // };

  // const handleDelete = async () => {
  //   try {
  //     await deleteVideo(Number(id));
  //     navigate("/project");
  //     console.log("Проект удален");
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   handleClose();
  // };

  const PlayIcon = () => (
    <div className="flex items-center justify-center w-20 h-20 bg-[#7E2DFC] bg-opacity-75 rounded-full">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M8 5V19L19 12L8 5Z" fill="#fff" />
      </svg>
    </div>
  );

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
          <Button
            className="rounded-2xl bg-[#F3F6F8] hover:bg-[#e4e6e7] shadow-none text-dark text-base font-bold px-6 py-2"
            onClick={() => navigate(`/project/movie/${id}/edit`)}
          >
            Редактировать
          </Button>
          <Button
            onClick={openDeleteModal}
            className="rounded-2xl bg-[#DE350B] hover:bg-[#bb2500] shadow-none w-9"
          >
            <Trash2 size={20} />
          </Button>
        </div>
      </div>
      {/* Видео */}
      <div className="relative px-8 w-full">
        <div className="rounded-2xl overflow-hidden w-full max-w-[760px] aspect-video">
          {movieData.series.seasonCount > 0 ? (
            <ReactPlayer
              light
              width="100%"
              height="100%"
              url={activeVideo}
              playIcon={<PlayIcon />}
              controls
            />
          ) : (
            <div className="flex justify-center items-center w-[760px] h-[428px] bg-grayLine text-gray-500">
              Видео еще не загружены
            </div>
          )}
        </div>
      </div>
      {/* <VideoPlayer videoId={activeVideo}/> */}

      {/* Серии */}
      <SeasonSeriesGroup
        movieId={movieData.movieId}
        seasonCount={movieData.series.seasonCount}
        setActiveVideoLink={setActiveVideo}
      />

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
