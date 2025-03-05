import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
}

const DropDownContent = ({ children, isOpen }: Props) => {
  return (
    <div
      className={`absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
    >
      <div className="py-2">
        {children}
      </div>
    </div>
  );
};

export default DropDownContent;