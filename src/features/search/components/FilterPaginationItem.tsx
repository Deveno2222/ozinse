interface Props {
  title: string;
  isActive: boolean;
  handleClick: () => void;
}

const FilterPaginationItem = ({ title, isActive, handleClick }: Props) => {
  return (
    <div onClick={handleClick} className="flex items-center relative pb-4 cursor-pointer">
      <span className={isActive ? "text-blueUsed" : "text-[#17171799] "}>
        {title}
      </span>

      {isActive && (
        <div className="absolute bottom-0 h-[3px] w-full bg-blueUsed rounded-t-2xl"></div>
      )}
    </div>
  );
};

export default FilterPaginationItem;
