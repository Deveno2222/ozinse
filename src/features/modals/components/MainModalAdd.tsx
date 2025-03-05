import { Button } from "../../../components/ui/button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MainModalAdd = ({isOpen, onClose}: Props) => {

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        isOpen ? "visible bg-dark/50  " : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background rounded-2xl w-[480px] pt-[22px] pb-8 relative"
      >
        <div className="flex justify-between items-start px-6 border-b pb-[23px]">
          <h3 className="text-base font-bold text-dark">
            Добавить проект на главную
          </h3>
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
        <p className="text-[#8F92A1] text-base text-center py-8">
          Вы действительно хотите удалить проект?
        </p>
        <div className="flex justify-center gap-2">
          <Button
            onClick={onClose}
            className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px]"
          >
            Да, удалить
          </Button>
          <Button
            onClick={onClose}
            className="bg-[#8F92A11A] hover:bg-[#38383a1a] shadow-none text-dark rounded-2xl w-[134px]"
          >
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainModalAdd;
