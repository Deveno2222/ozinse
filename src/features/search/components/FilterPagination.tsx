import FilterPaginationItem from "./FilterPaginationItem";

type TPagination = "projects" | "categories" | "users";

interface Props {
  selType: "projects" | "categories" | "users";
  onChangeType: (type: TPagination) => void;
}

const FilterPagination = ({ selType, onChangeType }: Props) => {
  const handleActive = (val: TPagination) => {
    onChangeType(val);
  };

  return (
    <div className="flex gap-8 bg-white font-bold px-12 items-center">
      <FilterPaginationItem
        title="Проекты"
        isActive={selType === "projects"}
        handleClick={() => {
          handleActive("projects");
        }}
      />
      <FilterPaginationItem
        title="Категории"
        isActive={selType === "categories"}
        handleClick={() => {
          handleActive("categories");
        }}
      />
      <FilterPaginationItem
        title="Пользователи"
        isActive={selType === "users"}
        handleClick={() => {
          handleActive("users");
        }}
      />
    </div>
  );
};

export default FilterPagination;
