import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../modalSlice";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const Modal = ({ children, title }: Props) => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.paddingRight = "";
        document.body.style.overflow = "auto"; // Важно: явно указываем "auto"
      }, 200); // Если у модалки есть анимация, ждем её завершения
    }

    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "auto"; // Убедимся, что скролл возвращается
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => dispatch(closeModal())}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        isOpen ? "visible bg-dark/50  " : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-background rounded-2xl ${
          modalType === "delete" ? "w-[480px]" : "w-[574px]"
        } min-h-[225px] pt-[22px] pb-8 relative`}
      >
        <div className="flex justify-between items-start px-6 border-b pb-[23px]">
          <h3 className="text-base font-bold text-dark">{title}</h3>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => dispatch(closeModal())}
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
        {/* children */}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
