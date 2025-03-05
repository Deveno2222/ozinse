interface FormHeaderProps {
  step: number;
  onBack?: () => void;
  isEdit: boolean;
}

export const MovieTitle = ({ step, onBack, isEdit }: FormHeaderProps) => {
  return (
    <div className="flex items-center mb-8 px-8 gap-4">
      <div
        className="p-[5px] bg-[#8F92A11A] rounded-[8px] cursor-pointer hover:bg-[#3636381a] transition-colors duration-200 ease-linear"
        onClick={onBack}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.9407 9.16692V10.8336H6.25051L8.95258 13.5357L7.7741 14.7142L3.06006 10.0002L7.7741 5.28613L8.95258 6.46464L6.25032 9.16692H16.9407Z"
            fill="#171717"
          />
        </svg>
      </div>
      <h2 className="text-[22px] font-bold ">
        {isEdit
          ? "Редактировать “Суперкөлік Самұрық”"
          : step === 1
          ? "Основная информация"
          : step === 2
          ? "Видео"
          : step === 3
          ? "Обложка и скриншоты"
          : ""}
      </h2>
    </div>
  );
};
