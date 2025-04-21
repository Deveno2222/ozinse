import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import AddButton from "@/features/movies/ui/AddButton";
import CustomSelect from "@/features/movies/ui/SelectInput";
import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "@/features/roles/api/rolesApi";
import RoleCard from "@/features/roles/components/RoleCard";
import { IRole } from "@/features/roles/types";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const RolesScreen = () => {
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);

  const dispatch = useDispatch();
  const { modalType } = useSelector((state: RootState) => state.modal);

  const { data: roles, isError, isLoading } = useGetRolesQuery();
  const [deleteRole] = useDeleteRoleMutation();
  const [createRole] = useAddRoleMutation();
  const [updateRole] = useUpdateRoleMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRole>({
    mode: "onSubmit",
  });

  const handleOpen = (type: "delete" | "form" | null, role?: IRole) => {
    if (role) {
      setSelectedRole(role);
      reset({
        ...role,
        isAbleToManageCategory: role.isAbleToManageCategory.toString(),
        isAbleToManageMovies: role.isAbleToManageMovies.toString(),
        isAbleToManageRole: role.isAbleToManageRole.toString(),
        isAbleToManageUser: role.isAbleToManageUser.toString(),
      });
    } else {
      setSelectedRole(null);
      reset({});
    }

    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedRole(null);
    reset({});
  };

  const handleDelete = async () => {
    if (!selectedRole) return;

    try {
      if (selectedRole.roleId) {
        await deleteRole({ roleId: selectedRole.roleId }).unwrap();
        console.log("Роль удалена: ", selectedRole.roleId);
      }
    } catch (error) {
      console.error(error);
    }

    handleClose();
  };

  const submitForm = async (data: IRole) => {
    const requestData = {
      name: data.name,
      isAbleToManageCategory: data.isAbleToManageCategory === "true",
      isAbleToManageMovies: data.isAbleToManageMovies === "true",
      isAbleToManageRole: data.isAbleToManageRole === "true",
      isAbleToManageUser: data.isAbleToManageUser === "true",
    };

    try {
      if (selectedRole?.roleId) {
        await updateRole({
          roleId: selectedRole.roleId,
          form: requestData,
        }).unwrap();
        console.log("Роль обновлена");
      } else {
        await createRole({ form: requestData }).unwrap();
        console.log("Роль создана");
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }

    handleClose();
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Роли</h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {(roles ?? []).length}
          </span>
        </div>
        <AddButton onClick={() => handleOpen("form")}>Добавить</AddButton>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
        {isError && <p className="text-xl text-red-600">Ошибка при получении данных</p>}
        {roles?.map((item) => (
          <RoleCard
            key={item.roleId}
            data={item}
            onEdit={() => handleOpen("form", item)}
            onDelete={() => handleOpen("delete", item)}
          />
        ))}
      </div>

      {/* Модалки */}
      {modalType == "delete" && (
        <Modal title={"Удалить проект из главной?"} onClose={handleClose}>
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
          title={selectedRole ? "Редактировать роль" : "Добавить роль"}
          onClose={handleClose}
        >
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
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    {...field}
                  />
                )}
              />
              {/* Проекты */}
              <Controller
                name="isAbleToManageMovies"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Проекты"
                    options={[
                      { value: "true", label: "Редактирование" },
                      { value: "false", label: "Только чтение" },
                    ]}
                    error={!!errors.isAbleToManageMovies}
                    helperText={errors.isAbleToManageMovies?.message}
                    {...field}
                    value={field.value?.toString()}
                  />
                )}
              />
              {/* Категории */}
              <Controller
                name="isAbleToManageCategory"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Категории"
                    options={[
                      { value: "true", label: "Редактирование" },
                      { value: "false", label: "Только чтение" },
                    ]}
                    error={!!errors.isAbleToManageCategory}
                    helperText={errors.isAbleToManageCategory?.message}
                    {...field}
                    value={field.value?.toString()}
                  />
                )}
              />
              {/* Пользователи */}
              <Controller
                name="isAbleToManageUser"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Пользователи"
                    options={[
                      { value: "true", label: "Редактирование" },
                      { value: "false", label: "Только чтение" },
                    ]}
                    error={!!errors.isAbleToManageUser}
                    helperText={errors.isAbleToManageUser?.message}
                    {...field}
                    value={field.value?.toString()}
                  />
                )}
              />
              {/* Роли */}
              <Controller
                name="isAbleToManageRole"
                control={control}
                rules={{ required: "Заполните поле" }}
                render={({ field }) => (
                  <CustomSelect
                    label="Роли"
                    options={[
                      { value: "true", label: "Редактирование" },
                      { value: "false", label: "Только чтение" },
                    ]}
                    error={!!errors.isAbleToManageRole}
                    helperText={errors.isAbleToManageRole?.message}
                    {...field}
                    value={field.value?.toString()}
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
                {selectedRole ? "Сохранить" : "Добавить"}
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
