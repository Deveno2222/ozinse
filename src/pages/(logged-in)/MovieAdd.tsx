import MainInfoForm from "@/features/form/components/MultiSteps/MainInfoForm";
import MediaInfoForm from "@/features/form/components/MultiSteps/MediaInfoForm";
import SeasonsInfoForm from "@/features/form/components/MultiSteps/SeasonsInfoForm";
import { FormProvider } from "@/features/form/contexts/FormContext";
import {
  useGetMovieByIdQuery,
  useLazyGetSeasonQuery,
} from "@/features/movies/api/movieApi";
import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";

import { IEpisode, IMovieForm, IMovieInfo } from "@/features/movies/types";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const steps = ["Основная информация", "Видео", "Обложка и скриншоты"];

const MovieAdd = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;

  const [seasonsData, setSeasonsData] = useState<any[]>([]);
  const { data: movieData, isLoading: isMovieLoading } = useGetMovieByIdQuery(
    Number(id),
    {
      skip: !id,
    }
  );
  const [fetchSeasons] = useLazyGetSeasonQuery();

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
            {activeStep === 2 && <MediaInfoForm handleBack={handleBack} />}
          </Box>
        </div>
      </div>
    </FormProvider>
  );
};

export default MovieAdd;
