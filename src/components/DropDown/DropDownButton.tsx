import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  type?: string;
}

const DropDownButton = ({ children, isOpen, toggle, type }: Props) => {
  return (
    <div
      onClick={toggle}
      className="flex flex-row items-center justify-between bg-gray-100 py-2 px-4 rounded-2xl cursor-pointer transition-colors duration-200 hover:bg-gray-200"
    >
      <div className="flex gap-2">{children}</div>
      <span
        className={`transform transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        {type !== "year" && (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.291 10.7074C16.9214 10.0776 16.4754 9 15.5842 9H8.41268C7.52199 9 7.07572 10.0767 7.70525 10.7068L11.2878 14.2926C11.6782 14.6833 12.3113 14.6836 12.702 14.2932L16.291 10.7074Z"
              fill="#8F92A1"
              fillOpacity="0.4"
            />
          </svg>
        )}
      </span>
    </div>
  );
};

export default DropDownButton;
