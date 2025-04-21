import { Button } from "@/components/ui/button";
import MainInfoForm from "@/features/form/components/MultiSteps/MainInfoForm";
import MediaInfoForm from "@/features/form/components/MultiSteps/MediaInfoForm";
import SeasonsInfoForm from "@/features/form/components/MultiSteps/SeasonsInfoForm";
import { FormProvider } from "@/features/form/contexts/FormContext";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import {
  useGetMovieByIdQuery,
  useLazyGetSeasonQuery,
} from "@/features/movies/api/movieApi";
import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";

import { IEpisode, IMovieForm, IMovieInfo } from "@/features/movies/types";
import { RootState } from "@/store/store";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
const steps = ["Основная информация", "Видео", "Обложка и скриншоты"];

const MovieAdd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [seasonsData, setSeasonsData] = useState<any[]>([]);
  const { data: movieData, isLoading: isMovieLoading } = useGetMovieByIdQuery(
    Number(id),
    {
      skip: !id,
    }
  );
  const [fetchSeasons] = useLazyGetSeasonQuery();

  const handleOpenModal = () => {
    dispatch(openModal({ modalType: "form" }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    navigate("/project");
  };

  useEffect(() => {
    const fetchAllSeasons = async () => {
      if (movieData?.series.seasonCount) {
        try {
          const seasonsPromises = [];
          for (
            let season = 1;
            season <= movieData.series.seasonCount;
            season++
          ) {
            seasonsPromises.push(
              fetchSeasons({
                movieId: movieData.movieId,
                seasonId: season,
              }).unwrap()
            );
          }
          const results = await Promise.all(seasonsPromises);
          console.log(results);
          setSeasonsData(results);
        } catch (error) {
          console.error("Ошибка загрузки сезонов:", error);
        }
      }
    };

    if (isEditMode && movieData) {
      fetchAllSeasons();
    }
  }, [movieData, isEditMode, fetchSeasons]);

  const transformMovieToFormData = (
    movie: IMovieInfo,
    seasons: any[]
  ): IMovieForm => {
    console.log("Seasons", seasons);

    const episodes: IEpisode[] = seasons
      .map((seasonResponse, seasonIndex) => {
        const seasonNumber = seasonIndex + 1;

        return seasonResponse.series.map(
          (episode: any, episodeIndex: number) => ({
            movieId: movie.movieId,
            seasonId: seasonNumber,
            seriesId: episodeIndex + 1,
            link: episode.videoLink,
          })
        );
      })
      .flat();

    console.log("episodes", episodes);

    return {
      movieId: movie.movieId,
      name: movie.title,
      category: movie.categories,
      typeProject: movie.genres,
      age: movie.ageCategories,
      year: String(movie.releaseYear),
      dur: String(movie.duration),
      keyWords: movie.keyWords,
      description: movie.description,
      director: movie.director,
      scripter: movie.producer,
      seasons: movie.series.seasonCount,
      episodes: episodes,
      coverImage: movie.imageSrc,
      screenshots: movie.screenshots ?? [],
    };
  };

  const initialFormData =
    isEditMode && movieData && seasonsData.length > 0
      ? transformMovieToFormData(movieData, seasonsData)
      : undefined;

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  if (
    isEditMode &&
    (isMovieLoading ||
      seasonsData.length < (movieData?.series?.seasonCount ?? 0))
  ) {
    return <div>Загрузка данных...</div>;
  }

  return (
    <FormProvider initialData={initialFormData}>
      <div className="min-h-screen bg-[#8F92A10D] max-w-[872px] rounded-3xl">
        <MovieBreadCrumb
          page={isEditMode ? "Редактировать проект" : "Добавить проект"}
        />
        <div className="pl-8 pr-8 pb-8">
          <Box sx={{ bgcolor: "background.paper", p: 4, borderRadius: 4 }}>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <div
                  className="flex items-center bg-[#8F92A11A] rounded-md justify-center p-[5px] cursor-pointer"
                  onClick={handleBack}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.9407 9.16692V10.8336H6.25051L8.95258 13.5357L7.7741 14.7142L3.06006 10.0002L7.7741 5.28613L8.95258 6.46464L6.25032 9.16692H16.9407Z"
                      fill="#171717"
                    />
                  </svg>
                </div>
                <p className="text-dark font-bold text-[22px]">
                  {isEditMode ? (
                    `Редактировать "${movieData?.title}"`
                  ) : (
                    <>{steps[activeStep]}</>
                  )}
                </p>
              </div>
              {isEditMode && (
                <div className="flex gap-8 border-b border-[#8F92A11A] mt-3 mb-3">
                  {steps.map((label, index) => (
                    <div
                      key={label}
                      onClick={() => setActiveStep(index)}
                      className={`pb-3 cursor-pointer text-sm font-bold relative transition-colors duration-200 ${
                        activeStep === index
                          ? "text-blueUsed after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blueUsed after:rounded-t"
                          : "text-[#8F92A1] hover:text-black"
                      }`}
                    >
                      {label}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {activeStep === 0 && <MainInfoForm handleNext={handleNext} />}
            {activeStep === 1 && (
              <SeasonsInfoForm
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
            {activeStep === 2 && (
              <MediaInfoForm
                handleBack={handleBack}
                openModal={handleOpenModal}
                closeModal={handleCloseModal}
              />
            )}
          </Box>
        </div>
        {modalType === "form" && (
          <Modal title="" onClose={handleCloseModal}>
            <div>
              <div className="flex flex-col justify-center items-center gap-4 py-8">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.25"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.73799 13.0837C5.31825 8.69009 8.69009 5.31825 13.0837 4.73799C16.1042 4.33907 19.8825 4 24 4C28.1175 4 31.8958 4.33907 34.9163 4.73799C39.3099 5.31825 42.6818 8.69009 43.262 13.0837C43.6609 16.1042 44 19.8825 44 24C44 28.1175 43.6609 31.8958 43.262 34.9163C42.6818 39.3099 39.3099 42.6818 34.9163 43.262C31.8958 43.6609 28.1175 44 24 44C19.8825 44 16.1042 43.6609 13.0837 43.262C8.69009 42.6818 5.31825 39.3099 4.73799 34.9163C4.33907 31.8958 4 28.1175 4 24C4 19.8825 4.33907 16.1042 4.73799 13.0837Z"
                    fill="#1FBF79"
                  />
                  <path
                    d="M33.1809 14.5873C33.7532 13.8859 34.7629 13.8007 35.4362 14.3968C36.1095 14.9929 36.1914 16.0448 35.6191 16.7461L22.0191 33.4127C21.4378 34.1251 20.4078 34.2001 19.737 33.579L12.537 26.9123C11.8766 26.3008 11.8171 25.2474 12.4042 24.5594C12.9912 23.8714 14.0025 23.8095 14.663 24.421L20.6403 29.9556L33.1809 14.5873Z"
                    fill="#1FBF79"
                  />
                </svg>

                <p className="text-dark text-[22px] font-bold">
                  Проект добавлен успешно
                </p>
              </div>
              <div className="flex justify-center items-center">
                <Button
                  onClick={handleCloseModal}
                  className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px] font-bold"
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </FormProvider>
  );
};

export default MovieAdd;
