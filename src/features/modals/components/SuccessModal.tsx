import { ReactNode } from "react";
import { Button } from "../../../components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const SuccessModal = ({ isOpen, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        isOpen ? "visible bg-dark/50  " : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-2xl w-[574px] pt-[22px] pb-8 relative"
      >
        <div className="flex justify-end items-start px-6 border-b pb-[23px]">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClose}
            className="cursor-pointer transition duration-200 hover:fill-[#4e5053] hover:fill-opacity-100"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.22566 4.81096C5.83514 4.42044 5.20197 4.42044 4.81145 4.81096C4.42092 5.20148 4.42092 5.83465 4.81145 6.22517L10.5862 11.9999L4.81151 17.7746C4.42098 18.1651 4.42098 18.7983 4.81151 19.1888C5.20203 19.5793 5.8352 19.5793 6.22572 19.1888L12.0004 13.4141L17.7751 19.1888C18.1656 19.5793 18.7988 19.5793 19.1893 19.1888C19.5798 18.7983 19.5798 18.1651 19.1893 17.7746L13.4146 11.9999L19.1893 6.22517C19.5799 5.83465 19.5799 5.20148 19.1893 4.81096C18.7988 4.42044 18.1657 4.42044 17.7751 4.81096L12.0004 10.5857L6.22566 4.81096Z"
              fill="currentColor"
              fillOpacity="0.4"
            />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 py-8">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.25"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.73799 13.0837C5.31825 8.69009 8.69009 5.31825 13.0837 4.73799C16.1042 4.33907 19.8825 4 24 4C28.1175 4 31.8958 4.33907 34.9163 4.73799C39.3099 5.31825 42.6818 8.69009 43.262 13.0837C43.6609 16.1042 44 19.8825 44 24C44 28.1175 43.6609 31.8958 43.262 34.9163C42.6818 39.3099 39.3099 42.6818 34.9163 43.262C31.8958 43.6609 28.1175 44 24 44C19.8825 44 16.1042 43.6609 13.0837 43.262C8.69009 42.6818 5.31825 39.3099 4.73799 34.9163C4.33907 31.8958 4 28.1175 4 24C4 19.8825 4.33907 16.1042 4.73799 13.0837Z"
              fill="#1FBF79"
            />
            <path
              d="M33.1809 14.5873C33.7532 13.8859 34.7629 13.8007 35.4362 14.3968C36.1095 14.9929 36.1914 16.0448 35.6191 16.7461L22.0191 33.4127C21.4378 34.1251 20.4078 34.2001 19.737 33.579L12.537 26.9123C11.8766 26.3008 11.8171 25.2474 12.4042 24.5594C12.9912 23.8714 14.0025 23.8095 14.663 24.421L20.6403 29.9556L33.1809 14.5873Z"
              fill="#1FBF79"
            />
          </svg>

          <p className="text-dark text-[22px] font-bold">
            Проект добавлен успешно
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={onClose}
            className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px] font-bold"
          >
            Закрыть
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
