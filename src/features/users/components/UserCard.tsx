import CustomButton from "@/components/CustomButton";
import Modal from "@/features/modals/components/Modal";
import SmileFace from "./../../../assets/SmileFace.png";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@/features/modals/modalSlice";

interface IUser {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  phone: string;
}

interface Props {
  data: IUser;
}

const UserCard = ({ data }: Props) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setActive(true);
    dispatch(openModal({ modalType: "form" }));
  };

  const handleClose = () => {
    setActive(false);
    dispatch(closeModal());
  };

  return (
    <div
      onClick={() => setActive(!isActive)}
      className={`flex flex-col bg-white p-4 rounded-2xl max-w-[260px] w-full gap-4 ${
        isActive ? "shadow-[0px_0px_8px_0px_#0052CC14]" : ""
      } transition-shadow duration-150 ease-in-out`}
    >
      <div className="flex justify-center items-center bg-blueUsed w-10 h-10 border border-[#F3F6F8] rounded-[4px]">
        <span className="text-white font-bold">{data.name[0]}</span>
      </div>
      <div className="flex flex-col gap-2">
        <p
          onClick={handleClick}
          className={`${
            isActive ? "text-blueUsed" : "text-dark"
          } font-bold text-base transition-colors duration-150 ease-in-out hover:underline cursor-pointer`}
        >
          {data.name}
        </p>
        <p className="text-[#9CA3AF] text-xs">{data.email}</p>
      </div>
      {isActive && (
        <Modal onClose={handleClose} title="Данные пользователя">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center gap-2 py-8 text-backgroundgray">
              <div className="flex justify-center">
                <img src={SmileFace} alt="Аватарка" />
              </div>
              <h3 className="font-bold text-[22px] text-dark">{data.name}</h3>
              <p>{data.phone}</p>
              <p>{data.email}</p>
              <p>Дата рождения: {data.birthDate}</p>
            </div>
            <CustomButton onClick={handleClose} className="w-[134px]">
              Закрыть
            </CustomButton>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserCard;
