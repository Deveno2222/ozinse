import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import GenreCard from "@/features/genre/components/GenreCard";
import { IGenre } from "@/features/genre/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import ImageUpload from "@/features/movies/ui/ImageUpload";
import { RootState } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const GenresScreen = () => {
  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IGenre>({ mode: "onSubmit" });

  const handleOpen = (type: "delete" | "form" | null) => {
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    reset();
  };

  const handleDelete = () => {
    console.log("Логика удаления");
    reset();
    dispatch(closeModal());
  };

  const submitForm = (e: IGenre) => {
    console.log(e);
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Жанры</h2>
          <span className="text-[#171717CC] text-sm font-bold">9</span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
        <GenreCard openModal={() => handleOpen("delete")} />
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
        <Modal title={"Добавить жанр"}>
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
                name="image"
                control={control}
                rules={{ required: "Выберите изображение" }}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value ? field.value : null}
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
