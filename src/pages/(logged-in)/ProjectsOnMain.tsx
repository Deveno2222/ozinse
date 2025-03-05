import CustomButton from "@/components/CustomButton";
import { Button } from "@/components/ui/button";
import MainMoviePreview from "@/features/main/components/MainMoviePreview";
import { IMainMovie } from "@/features/main/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import ImageUpload from "@/features/movies/ui/ImageUpload";
import CustomSelect from "@/features/movies/ui/SelectInput";
import { RootState } from "@/store/store";
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

  // Модалка
  const dispatch = useDispatch();

  const { modalType } = useSelector((state: RootState) => state.modal);

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

  const submitForm = (e: IMainMovie) => {
    console.log(e);
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      {/*  */}
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">
            Проекты на главной
          </h2>
          <span className="text-[#171717CC] text-sm font-bold">2</span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>

      <div className="flex flex-col xl:flex-row gap-[18px]">
        <MainMoviePreview openModalDelete={() => handleOpen("delete")} />
        <MainMoviePreview openModalDelete={() => handleOpen("delete")} />
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
        <Modal title={"Добавить проект на главную"}>
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
              <CustomButton type="submit" disabled={!isValid} className="w-[134px]">Добавить</CustomButton>
              <CustomButton type="button" onClick={handleClose} className="w-[134px] bg-[#8F92A11A] text-dark">Отмена</CustomButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ProjectsOnMain;
