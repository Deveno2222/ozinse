import { ReactNode } from "react";
import plus from "../../../assets/plus.svg";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const AddButton = ({ children, onClick }: Props) => {
  return (
    <Button onClick={onClick} className="rounded-2xl bg-purpleUsed shadow-none hover:bg-[#612fb1] py-2 px-3 h-10">
      <img src={plus} alt="Добавить" />
      <span className="flex items-center font-bold h-6">{children}</span>
    </Button>
  );
};

export default AddButton;
