import { useState } from "react";

interface Props {
  onClick: () => void;
}

const UserCard = ({ onClick }: Props) => {
  const [isActive, setActive] = useState(false);

  return (
    <div
      onClick={() => setActive(!isActive)}
      className={`flex flex-col bg-white p-4 rounded-2xl max-w-[260px] gap-4 ${
        isActive ? "shadow-[0px_0px_8px_0px_#0052CC14]" : ""
      } transition-shadow duration-150 ease-in-out`}
    >
      <div className="flex justify-center items-center bg-blueUsed w-10 h-10 border border-[#F3F6F8] rounded-[4px]">
        <span className="text-white font-bold">A</span>
      </div>
      <div className="flex flex-col gap-2">
        <p
          onClick={onClick}
          className={`${
            isActive ? "text-blueUsed" : "text-dark"
          } font-bold text-base transition-colors duration-150 ease-in-out hover:underline cursor-pointer`}
        >
          Guy Hawkins
        </p>
        <p className="text-[#9CA3AF] text-xs">mail@gmail.com</p>
      </div>
    </div>
  );
};

export default UserCard;
