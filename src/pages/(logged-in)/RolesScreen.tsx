import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import CustomSelect from "@/features/movies/ui/SelectInput";
import RoleCard from "@/features/roles/components/RoleCard";
import { IRole } from "@/features/roles/types";
import { RootState } from "@/store/store";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const RolesScreen = () => {
  const dispatch = useDispatch();
  const { modalType } = useSelector((state: RootState) => state.modal);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRole>({ mode: "onSubmit" });

  const handleOpen = (type: "delete" | "form" | null) => {
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    reset();
    dispatch(closeModal());
  };

  const handleDelete = () => {
    console.log("Логика удаления");
    reset();
    dispatch(closeModal());
  };

  const submitForm = (e: IRole) => {
    console.log(e);
    reset();
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Роли</h2>
          <span className="text-[#171717CC] text-sm font-bold">3</span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <RoleCard openModal={() => handleOpen("delete")} />
        <RoleCard openModal={() => handleOpen("delete")} />
      </div>


      {/* Модалки */}
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
            <div className="flex flex-col gap-5 p-8">
              {/* Наименование */}
              <Controller
                name="name"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomInput
                    label="Наименование"
                    error={!!errors.projects}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
              {/* Проекты */}
              <Controller
                name="projects"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Проекты"
                    options={[
                      { value: "editing", label: "Редактирование" },
                      { value: "readonly", label: "Только чтение" },
                    ]}
                    error={!!errors.projects}
                    helperText={errors.projects?.message}
                    {...field}
                  />
                )}
              />
              {/* Категории */}
              <Controller
                name="categorires"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Категории"
                    options={[
                      { value: "editing", label: "Редактирование" },
                      { value: "readonly", label: "Только чтение" },
                    ]}
                    error={!!errors.categorires}
                    helperText={errors.categorires?.message}
                    {...field}
                  />
                )}
              />
              {/* Пользователи */}
              <Controller
                name="users"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Пользователи"
                    options={[
                      { value: "editing", label: "Редактирование" },
                      { value: "readonly", label: "Только чтение" },
                    ]}
                    error={!!errors.users}
                    helperText={errors.users?.message}
                    {...field}
                  />
                )}
              />
              {/* Роли */}
              <Controller
                name="roles"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Роли"
                    options={[
                      { value: "editing", label: "Редактирование" },
                      { value: "readonly", label: "Только чтение" },
                    ]}
                    error={!!errors.roles}
                    helperText={errors.roles?.message}
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

export default RolesScreen;
