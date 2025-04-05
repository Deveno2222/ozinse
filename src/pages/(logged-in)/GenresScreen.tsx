import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import {
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
  useGetGenresQuery,
} from "@/features/genre/api/genreApi";
import GenreCard from "@/features/genre/components/GenreCard";
import { IGenre } from "@/features/genre/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import ImageUploader from "@/features/movies/ui/ImageUploader";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const GenresScreen = () => {
  const [selectedGenre, setSelectedGenre] = useState<IGenre | null>(null);
  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<Partial<IGenre>>({ mode: "onSubmit" });

  const { data: genresData, isLoading, isError } = useGetGenresQuery();
  const [deleteGenre] = useDeleteGenreMutation();
  const [editGenre] = useEditGenreMutation();
  const [createGenre] = useCreateGenreMutation();

  const handleOpen = (type: "delete" | "form" | null, genre?: IGenre) => {
    if (genre) {
      setSelectedGenre(genre);
      reset(genre);
    } else {
      setSelectedGenre(null);
      reset({});
    }

    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedGenre(null);
    reset({});
  };

  const handleDelete = async () => {
    if (!selectedGenre) return;
    try {
      await deleteGenre(selectedGenre.genreId).unwrap();
      console.log("deleted genre", selectedGenre.genreId);
    } catch (error) {
      console.error("Error deleting genre:", error);
    }
    handleClose();
  };

  const submitForm = async (e: Partial<IGenre>) => {
    const formData = new FormData();

    formData.append("name", e.name || "");
    if (e.imageSrc instanceof File) {
      formData.append("image", e.imageSrc);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    try {
      if (selectedGenre) {
        await editGenre({
          body: formData,
          id: selectedGenre.genreId,
        }).unwrap();
        console.log("edited genre", e, selectedGenre.genreId);
      } else {
        await createGenre(formData).unwrap();
        console.log("created genre", e);
      }
      handleClose();
    } catch (error) {
      console.error("Error creating/editing genre:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Жанры</h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {genresData?.length}
          </span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {genresData?.map((genre) => (
          <GenreCard
            key={genre.genreId}
            data={genre}
            openModal={() => handleOpen("delete", genre)}
            onEdit={() => handleOpen("form", genre)}
          />
        ))}
      </div>

      {/* Модалки */}

      {modalType == "delete" && (
        <Modal title={"Удалить жанр?"}>
          <div>
            <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
              Вы действительно хотите удалить жанр?
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
          title={selectedGenre ? "Редактировать жанр" : "Добавить жанр"}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-4 p-8">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomInput
                    label="Название жанра"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="imageSrc"
                control={control}
                rules={{ required: "Выберите изображение" }}
                render={({ field }) => (
                  <ImageUploader
                    value={field.value}
                    onChange={(file) => {
                      field.onChange(file);
                    }}
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
                Добавить
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

export default GenresScreen;
