import CustomInput from "@/components/CustomInput";
import { MovieTitle } from "@/features/movies/components/MovieTitleList";
import { IMovieForm } from "@/features/movies/types";
import { useEffect, useState } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import CustomSelect from "../ui/SelectInput";
import CustomTextarea from "../ui/CustomTextArea";
import PaginationButtons from "./PaginationButtons";
import { Trash2 } from "lucide-react";
import ImageUpload from "../ui/ImageUpload";
import { useNavigate } from "react-router-dom";
import Modal from "@/features/modals/components/Modal";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import { Button } from "@/components/ui/button";
import EditPagination from "./EditPagination";
import UseProject from "@/hooks/useProject";
import ImageUploader from "../ui/ImageUploader";

type MovieFormProps = {
  movie?: IMovieForm;
};

const MovieForm = ({ movie }: MovieFormProps) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [videoIds, setVideoIds] = useState<Record<string, string | null>>({});
  const navigate = useNavigate();
  const isEditing = !!movie;

  const { ages, categories, genres } = UseProject();

  const extractYouTubeVideoId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleVideoIdChange = (id: string, url: string) => {
    const videoId = extractYouTubeVideoId(url);
    setVideoIds((prev) => ({ ...prev, [id]: videoId }));
  };

  const form = useForm<IMovieForm>({
    mode: "onSubmit",
    defaultValues: movie
      ? {
          name: movie.name,
          category: movie.category,
          typeProject: movie.typeProject,
          age: movie.age,
          year: movie.year,
          dur: movie.dur,
          keyWords: movie.keyWords,
          description: movie.description,
          director: movie.director,
          scripter: movie.scripter,
          seasons: movie.seasons,
          episodes: movie.episodes,
          coverImage: movie.coverImage,
          screenshots: movie.screenshots,
        }
      : {
          seasons: 1,
          episodes: [{ id: Date.now().toString(), season: 1, episode: "" }],
        },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
    getValues
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "episodes",
    keyName: "id",
  });

  const serial = watch("seasons", 1);

  // Инициализация состояния при монтировании
  useEffect(() => {
    if (movie?.episodes) {
      const initialVideoIds: Record<string, string | null> = {};
      movie.episodes.forEach((episode) => {
        if (episode.episode) {
          const videoId = extractYouTubeVideoId(episode.episode);
          if (videoId) {
            initialVideoIds[episode.id] = videoId;
          }
        }
      });
      setVideoIds(initialVideoIds);
    }
  }, [movie]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "seasons") {
        const currentEpisodes = getValues("episodes");
        const filteredEpisodes = currentEpisodes.filter(
          ep => ep.season <= value.seasons
        );
        setValue("episodes", filteredEpisodes);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, setValue, getValues]);

  // Обновление состояния при изменении episodes
  useEffect(() => {
    const newVideoIds: Record<string, string | null> = {};
    fields.forEach((field) => {
      const videoId = field.episode
        ? extractYouTubeVideoId(field.episode)
        : null;
      newVideoIds[field.id] = videoId;
    });
    setVideoIds(newVideoIds);
  }, [fields]);

  // Закрытие модального окна
  const handleModal = () => {
    dispatch(closeModal());
    reset(); // Сброс данных после закрытия
    navigate("/project");
  };

  const onFormSubmit = (data: IMovieForm) => {
    dispatch(openModal({ modalType: "form" }));
    console.log(data);
    reset();
  };

  const addVideo = (seasonNumber: number) => {
    append({
      id: Date.now().toString(),
      season: seasonNumber,
      episode: "",
    });
  };

  // Шаги: Назад, вперед
  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleForward = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  return (
    <div className="w-full py-8 bg-white rounded-2xl">
      <MovieTitle step={step} onBack={handleBack} isEdit={isEditing} />
      {isEditing && (
        <div className="px-8 my-8 border-b border-grayLine">
          <EditPagination step={step} stepp={setStep} />
        </div>
      )}
      <form className="px-8" onSubmit={handleSubmit(onFormSubmit)}>
        {/* Первый шаг (step === 1) */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            {/* Название проекта */}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Название проекта обязательно" }}
              render={({ field }) => (
                <CustomInput
                  label="Название проекта"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  {...field}
                />
              )}
            />
            {/* Категория */}
            <Controller
              name="category"
              control={control}
              rules={{ required: "Выберите категорию" }}
              render={({ field }) => (
                <CustomSelect
                  label="Выберите категорию"
                  multiple={true}
                  options={
                    categories?.map((category) => ({
                      value: category.categoryId,
                      label: category.name,
                    })) ?? []
                  }
                  error={!!errors.category}
                  helperText={errors.category?.message}
                  {...field}
                  value={Array.isArray(field.value) ? field.value : ""}
                />
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              {/* Тип проекта */}
              <Controller
                name="typeProject"
                control={control}
                rules={{ required: "Выберите тип проекта" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Тип проекта"
                    multiple={true}
                    options={
                      genres?.map((genre) => ({
                        value: genre.genreId,
                        label: genre.name,
                      })) || []
                    }
                    error={!!errors.typeProject}
                    helperText={errors.typeProject?.message}
                    {...field}
                  />
                )}
              />
              {/* Возрастная категория */}
              <Controller
                name="age"
                control={control}
                rules={{ required: "Выберите возрастнную категорию" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Возрастная категория"
                    multiple={true}
                    options={
                      ages
                        ?.map((age) => ({
                          value: age.ageCategoryId,
                          label: age.name,
                        }))
                        .sort((a, b) => Number(a.label) - Number(b.label)) || []
                    }
                    error={!!errors.age}
                    helperText={errors.age?.message}
                    {...field}
                    value={Array.isArray(field.value) ? field.value : ""}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Год */}
              <Controller
                name="year"
                control={control}
                rules={{ required: "Укажите год" }}
                render={({ field }) => (
                  <CustomInput
                    type="number"
                    label="Год"
                    error={!!errors.year}
                    helperText={errors.year?.message}
                    {...field}
                  />
                )}
              />
              {/* Хронометраж */}
              <Controller
                name="dur"
                control={control}
                rules={{ required: "Укажите хронометраж" }}
                render={({ field }) => (
                  <CustomInput
                    type="number"
                    label="Хронометраж (мин)"
                    error={!!errors.dur}
                    helperText={errors.dur?.message}
                    {...field}
                  />
                )}
              />
            </div>
            {/* Ключевые слова */}
            <Controller
              name="keyWords"
              control={control}
              rules={{ required: "Укажите ключевые слова" }}
              render={({ field }) => (
                <CustomInput
                  label="Ключевые слова"
                  error={!!errors.keyWords}
                  helperText={
                    !field.value ? "Например: мультфильм, мультсериал" : ""
                  }
                  {...field}
                />
              )}
            />
            {/* Описание */}
            <Controller
              name="description"
              control={control}
              rules={{ required: "Введите описание" }}
              render={({ field }) => (
                <CustomTextarea
                  label="Добавьте описание"
                  error={!!errors.description?.message}
                  helperText={errors.description?.message}
                  {...field}
                />
              )}
            />
            {/* Режиссер */}
            <Controller
              name="director"
              control={control}
              rules={{ required: "Введите имя режиссера" }}
              render={({ field }) => (
                <CustomInput
                  label="Режиссер"
                  error={!!errors.director}
                  helperText={errors.director?.message}
                  {...field}
                />
              )}
            />

            {/* Продюсер */}
            <Controller
              name="scripter"
              control={control}
              rules={{ required: "Введите имя продюсера" }}
              render={({ field }) => (
                <CustomInput
                  label="Продюсер"
                  error={!!errors.scripter}
                  helperText={errors.scripter?.message}
                  {...field}
                />
              )}
            />
          </div>
        )}

        {/* Второй шаг */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <div className="max-w-[190px]">
              {/* Количество сезонов */}
              <Controller
                name="seasons"
                control={control}
                rules={{ required: "Количество сезонов" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Количество сезонов"
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                      { value: 4, label: "4" },
                      { value: 5, label: "5" },
                    ]}
                    error={!!errors.seasons}
                    helperText={errors.seasons?.message}
                    {...field}
                    onChange={(newValue) => {
                      const prevValue = getValues("seasons");
                      const currentEpisodes = getValues("episodes");
                      
                      // Фильтрация перед установкой нового значения
                      const filteredEpisodes = currentEpisodes.filter(
                        ep => ep.season <= newValue
                      );
        
                      // Полная синхронизация данных
                      setValue("episodes", filteredEpisodes, { shouldValidate: true });
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
            </div>

            {/* Итерация по сезонам */}
            {Array.from({ length: serial }, (_, seasonIndex) => {
              const seasonNumber = seasonIndex + 1;
              const seasonEpisodes = fields.filter(
                (field) => field.season === seasonNumber
              );

              return (
                <div key={seasonNumber} className="flex flex-col gap-4">
                  <h3 className="text-[22px] text-dark font-bold pb-[26px]">
                    {seasonNumber} сезон
                  </h3>

                  {seasonEpisodes.map((field) => {
                    const realIndex = fields.findIndex(
                      (f) => f.id === field.id
                    );
                    const videoId = videoIds[field.id] || null;

                    return (
                      <div key={field.id} className="flex flex-col">
                        {/* Инпут и кнопка Trash в одной строке */}
                        <div className="flex flex-row items-center gap-4">
                          {/* Инпут */}
                          <div className="flex-1">
                            <Controller
                              name={`episodes.${realIndex}.episode`}
                              control={control}
                              rules={{ required: "Вставьте ссылку на видео" }}
                              render={({ field: controllerField }) => (
                                <CustomInput
                                  label={`${
                                    realIndex + 1
                                  } серия / Youtube Video ID`}
                                  {...controllerField}
                                  onChange={(e) => {
                                    controllerField.onChange(e);
                                    handleVideoIdChange(
                                      field.id,
                                      e.target.value
                                    );
                                  }}
                                />
                              )}
                            />
                          </div>

                          {/* Кнопка Trash */}
                          <button
                            type="button"
                            onClick={() => remove(realIndex)}
                            className="p-2 hover:bg-grayLine rounded-lg"
                          >
                            <Trash2 size={16} color="#171717CC" />
                          </button>
                        </div>

                        {/* Превью видео */}
                        {videoId && (
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                            alt="Превью видео"
                            className="mt-4 mb-[26px] rounded-lg"
                            style={{ maxWidth: "160px", height: "90px" }}
                          />
                        )}
                      </div>
                    );
                  })}

                  <button
                    type="button"
                    onClick={() => addVideo(seasonNumber)}
                    className="flex max-w-[108px] gap-2 text-blueUsed hover:underline"
                  >
                    Добавить серию
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-4 ">
            {/* Обложка */}
            <div className="flex flex-col gap-4 border-b border-grayLine pb-4">
              <h3 className="text-[22px] font-bold">Обложка</h3>
              <p>
                Рекомендуется использовать картинки размером не менее 375×550px
              </p>
              <Controller
                name="coverImage"
                control={control}
                rules={{ required: "Добавьте изображение" }}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={(file) => {
                      field.onChange(file);
                    }}
                  />
                  // <ImageUpload
                  //   value={field.value ? field.value : null}
                  //   onChange={(file) => field.onChange(file ? file : null)}
                  // />
                )}
              />
            </div>

            {/* Скриншоты */}
            <div className="flex flex-col gap-4 border-b border-grayLine pb-4">
              <h3 className="text-[22px] font-bold">Скриншоты</h3>
              <p>
                Рекомендуется использовать картинки размером не менее 400×226px
              </p>
              <Controller
                name="screenshots"
                control={control}
                rules={{ required: "Добавьте изображение" }}
                render={({ field }) => (
                  <ImageUpload
                    isMultiple
                    value={field.value ? field.value[0] : null}
                    onChange={(file) => field.onChange(file ? [file] : null)}
                  />
                )}
              />
            </div>
          </div>
        )}

        <PaginationButtons
          onSubmit={handleSubmit(onFormSubmit)}
          step={step}
          handleBack={handleBack}
          handleForward={handleForward}
          isValid={isValid}
          cancel={reset}
          isEdit={isEditing}
        />
      </form>
      <Modal title="">
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
              onClick={handleModal}
              className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px] font-bold"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MovieForm;
