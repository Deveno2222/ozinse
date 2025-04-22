import CustomButton from "@/components/CustomButton";
import { Button } from "@/components/ui/button";
import {
  useAddMainMovieMutation,
  useDeleteMainMovieMutation,
  useGetMainMoviesQuery,
  useUpdateMainMovieMutation,
} from "@/features/main/api/mainMovieApi";
import MainMoviePreview from "@/features/main/components/MainMoviePreview";

import { IMainMovie } from "@/features/main/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import ImageUpload from "@/features/movies/ui/ImageUpload";
import CustomSelect from "@/features/movies/ui/SelectInput";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const ProjectsOnMain = () => {
  // Модалка форма
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<IMainMovie>({ mode: "onSubmit" });

  const [selectedMovie, setSelectedMovie] = useState<IMainMovie | null>(null);

  // Модалка
  const dispatch = useDispatch();
  const { modalType } = useSelector((state: RootState) => state.modal);

  const { data, isLoading, isError } = useGetMainMoviesQuery();
  const [addMovie] = useAddMainMovieMutation();
  const [deleteMovie] = useDeleteMainMovieMutation();
  const [updateMovie] = useUpdateMainMovieMutation();

  const handleOpen = (
    type: "delete" | "form" | "success" | null,
    movie?: IMainMovie
  ) => {
    if (movie) {
      setSelectedMovie(movie);
      reset(movie);
    } else {
      setSelectedMovie(null);
      reset({});
    }
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedMovie(null);
    reset({});
  };

  const handleDelete = async () => {
    if (!selectedMovie) return;
    try {
      if (selectedMovie.movieId) {
        await deleteMovie({ id: selectedMovie.movieId }).unwrap();
        console.log("Фильм удален из главной");
      }
    } catch (error) {
      console.error("Ошибка при удалении фильма: ", error);
    }
    handleClose();
  };

  const submitForm = async (e: IMainMovie) => {
    const imageFormData = new FormData();

    if (e.previewImg instanceof File) {
      imageFormData.append("image", e.previewImg);
    }

    try {
      if (selectedMovie?.movieId) {
        await updateMovie({
          movieId: e.movieId ?? 0,
          order: e.order,
          formData: imageFormData,
        }).unwrap();
        console.log("Проект обновлен");
      } else {
        await addMovie({
          movieId: e.movieId ?? 0,
          order: e.order,
          formData: imageFormData,
        }).unwrap();
        console.log("Проект добавлен");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }

    handleClose();
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      {/*  */}
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">
            Проекты на главной
          </h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {data?.length ?? 0}
          </span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>

      <div className="flex flex-col xl:flex-row gap-[18px]">
        {isError && (
          <p className="text-xl text-red-600">Ошибка при загрузке данных</p>
        )}
        {isLoading && <Loader2 className="animate-spin w-6 h-6" />}
        {data?.map((item) => (
          <MainMoviePreview
            key={item.movieId}
            openModalDelete={() => handleOpen("delete", item)}
            openModalForm={() => handleOpen("form", item)}
            movieData={item}
          />
        ))}
        {/* <MainMoviePreview openModalDelete={() => handleOpen("delete")} />
        <MainMoviePreview openModalDelete={() => handleOpen("delete")} /> */}
      </div>
      {/*  */}
      {modalType == "delete" && (
        <Modal title={"Удалить проект из главной?"}>
          <div>
            <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
              Вы действительно хотите удалить проект из главной?
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
      )}
      {modalType == "form" && (
        <Modal
          title={selectedMovie ? "Редактировать проект" : "Добавить проект"}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-4 p-8">
              {/* Выберите проект */}
              <Controller
                name="project"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Выберите проект"
                    options={[
                      { value: "action", label: "Экшен" },
                      { value: "comedy", label: "Комедия" },
                      { value: "drama", label: "Драма" },
                    ]}
                    error={!!errors.project}
                    helperText={errors.project?.message}
                    {...field}
                  />
                )}
              />
              {/* Выберите очередность */}
              <Controller
                name="order"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Выберите очередность"
                    options={[
                      { value: 1, label: "1" },
                      { value: 2, label: "2" },
                      { value: 3, label: "3" },
                    ]}
                    error={!!errors.order}
                    helperText={errors.order?.message}
                    {...field}
                  />
                )}
              />
              {/* Картинка */}
              <Controller
                name="previewImg"
                control={control}
                rules={{ required: "Выберите изображение" }}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value ? field.value[0] : null}
                    onChange={(file) => field.onChange(file ? [file] : null)}
                  />
                )}
              />
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <CustomButton
                type="submit"
                disabled={!isValid}
                className="w-[134px]"
              >
                {selectedMovie ? "Сохранить" : "Добавить"}
              </CustomButton>
              <CustomButton
                type="button"
                onClick={handleClose}
                className="w-[134px] bg-[#8F92A11A] text-dark"
              >
                Отмена
              </CustomButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsOnMain;
