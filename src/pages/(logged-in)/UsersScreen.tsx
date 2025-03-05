import DropDown from "@/components/DropDown/DropDown";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import UserCard from "@/features/users/components/UserCard";
import { useDispatch } from "react-redux";
import SmileFace from "./../../assets/SmileFace.png";
import CustomButton from "@/components/CustomButton";

const UsersScreen = () => {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex items-baseline gap-2">
        <h2 className="text-dark text-[22px] font-bold">Пользователи</h2>
        <span className="text-[#171717CC] text-sm font-bold">142</span>
      </div>
      <div className="max-w-[293px] my-10">
        <DropDown
          label={"Сортировать"}
          buttonText="Click"
          content={["По дате регистрации", "По имени"]}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[18px]">
        <UserCard onClick={() => dispatch(openModal({ modalType: "form" }))} />
      </div>
      <Modal title="Данные пользователя">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center gap-2 py-8 text-backgroundgray">
            <div className="flex justify-center">
              <img src={SmileFace} alt="Аватарка" />
            </div>
            <h3 className="font-bold text-[22px] text-dark">
              Cameron Williamson
            </h3>
            <p>+7 (702) 213-12-31</p>
            <p>mail@gmail.com</p>
            <p>Дата рождения: 31.10.2001</p>
          </div>
          <CustomButton
            onClick={() => dispatch(closeModal())}
            className="w-[134px]"
          >
            Закрыть
          </CustomButton>
        </div>
      </Modal>
    </div>
  );
};

export default UsersScreen;
