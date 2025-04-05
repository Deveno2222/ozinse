import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import {
  useCreateAgeMutation,
  useDeleteAgeMutation,
  useGetAgesQuery,
  useUpdateAgeMutation,
} from "@/features/age/api/ageApi";
import AgeCard from "@/features/age/components/AgeCard";
import { IAge } from "@/features/age/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import ImageUploader from "@/features/movies/ui/ImageUploader";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const AgeScreen = () => {
  const [selectedAge, setSelectedAge] = useState<IAge | null>(null);

  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useGetAgesQuery();
  const [deleteAge] = useDeleteAgeMutation();
  const [createAge] = useCreateAgeMutation();
  const [editAge] = useUpdateAgeMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IAge>({ mode: "onSubmit" });

  const handleOpen = (type: "delete" | "form" | null, age?: IAge) => {
    if (age) {
      setSelectedAge(age);
      reset(age);
    } else {
      setSelectedAge(null);
      reset({});
    }

    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedAge(null);
    reset({});
  };

  const handleDelete = async () => {
    if (!selectedAge) return;

    try {
      await deleteAge(selectedAge.ageCategoryId).unwrap();
      console.log("deleted age", selectedAge.ageCategoryId);
    } catch (error) {
      console.error("Failed to delete age:", error);
    }

    handleClose();
  };

  const submitForm = async (e: IAge) => {
    const formData = new FormData();

    formData.append("name", e.name);
    if (e.imageSrc instanceof File) {
      formData.append("image", e.imageSrc);
    }
    try {
      if (selectedAge) {
        await editAge({
          body: formData,
          id: selectedAge.ageCategoryId,
        }).unwrap();
      } else {
        await createAge(formData).unwrap();
      }

      handleClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Возрасты</h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {data?.length}
          </span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.map((age: IAge) => (
          <AgeCard
            key={age.ageCategoryId}
            data={age}
            openModal={() => handleOpen("delete", age)}
            onEdit={() => handleOpen("form", age)}
          />
        ))}
      </div>
      {modalType == "delete" && (
        <Modal onClose={handleClose} title={"Удалить жанр?"}>
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
          title={selectedAge ? "Редактировать возраст" : "Добавить возраст"}
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
                    onChange={field.onChange}
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

export default AgeScreen;
