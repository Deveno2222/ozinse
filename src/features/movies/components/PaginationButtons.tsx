import CustomButton from "@/components/CustomButton";

interface Props {
  step: number;
  handleBack: () => void;
  handleForward: () => void;
  isValid: boolean;
  onSubmit: () => void;
  cancel: () => void;
  isEdit: boolean;
}

const PaginationButtons = ({
  step,
  handleBack,
  handleForward,
  onSubmit,
  isValid,
  cancel,
  isEdit,
}: Props) => {
  if (isEdit)
    return (
      <div className="flex justify-end gap-2 mt-8">
        <CustomButton
          disabled={!isValid}
          className="w-[134px]"
          onClick={onSubmit}
        >
          Сохранить
        </CustomButton>
        <CustomButton
          onClick={cancel}
          className="w-[134px] bg-[#8F92A11A] text-dark hover:bg-[#3535361a]"
        >
          Отмена
        </CustomButton>
      </div>
    );

  return (
    <div className="flex justify-between mt-8">
      <div>
        {step > 1 && (
          <CustomButton
            onClick={handleBack}
            className="w-[134px] bg-[#8F92A11A] text-dark hover:bg-[#3535361a]"
          >
            Назад
          </CustomButton>
        )}
      </div>
      <div className="flex gap-2">
        {step === 3 && (
          <CustomButton
            disabled={!isValid}
            className="w-[134px]"
            onClick={onSubmit}
          >
            Добавить
          </CustomButton>
        )}
        {step !== 3 && (
          <CustomButton
            onClick={handleForward}
            disabled={!isValid}
            className="w-[134px]"
          >
            Далее
          </CustomButton>
        )}

        <CustomButton
          onClick={cancel}
          className="w-[134px] bg-[#8F92A11A] text-dark hover:bg-[#3535361a]"
        >
          Отмена
        </CustomButton>
      </div>
    </div>
  );
};

export default PaginationButtons;
