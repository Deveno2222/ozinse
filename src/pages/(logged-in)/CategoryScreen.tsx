import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "@/features/categories/api/categoryApi";
import CategoryItem from "@/features/categories/components/CategoryItem";
import { ICategory } from "@/features/categories/types";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import { RootState } from "@/store/store";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const CategoryScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<Partial<ICategory>>({ defaultValues: {}, mode: "onSubmit" });

  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [editCategory] = useEditCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const dispatch = useDispatch();

  const { modalType } = useSelector((state: RootState) => state.modal);

  const handleOpen = (type: "delete" | "form" | null, category?: ICategory) => {
    if (category) {
      setSelectedCategory(category);
      reset(category);
    } else {
      setSelectedCategory(null);
      reset({});
    }
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    setSelectedCategory(null);
    dispatch(closeModal());
    reset({});
  };

  const handleDelete = async () => {
    if (!selectedCategory) return;
    try {
      await deleteCategory(selectedCategory.categoryId).unwrap();
      handleClose();
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const submitForm = async (e: Partial<ICategory>) => {
    try {
      if (selectedCategory) {
        await editCategory({
          body: e,
          id: selectedCategory.categoryId,
        }).unwrap();
        console.log("Категория успешно изменена");
      } else {
        await createCategory(e).unwrap();
        console.log("Категория успешно добавлена");
      }
      handleClose();
    } catch (error) {
      console.log(error);
    }

    // try {
    //   console.log(e);
    //   await createCategory(e).unwrap();
    //   console.log("Категория успешно добавлена");
    //   reset();
    //   dispatch(closeModal());
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      {/*  */}
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Категории</h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {categories?.length}
          </span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>

      {/* Список категорий */}
      <div className="flex flex-wrap gap-[18px]">
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryItem
              key={category.categoryId}
              deleteModal={() => handleOpen("delete", category)}
              onEdit={() => handleOpen("form", category)}
              data={category}
            />
          ))
        ) : (
          <div className="flex items-center justify-center w-full h-full text-[#8F92A1] text-base font-bold tracking-[-0.4px]">
            Нет категорий
          </div>
        )}
      </div>

      {modalType == "delete" && (
        <Modal title={"Удалить категорию?"}>
          <div>
            <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
              Вы действительно хотите удалить категорию?
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
          title={
            selectedCategory ? "Редактировать категорию" : "Добавить категорию"
          }
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
                    label="Название категории"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
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

export default CategoryScreen;
