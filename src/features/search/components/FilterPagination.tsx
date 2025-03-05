import { useState } from "react";
import FilterPaginationItem from "./FilterPaginationItem";

type TPagination = {
  type: "projects" | "categories" | "users";
};

const FilterPagination = () => {
  const [isActiveItem, setActiveItem] = useState<TPagination>({
    type: "projects",
  });

  const handleActive = (val: TPagination) => {
    setActiveItem(val);
  };

  return (
    <div className="flex gap-8 bg-white font-bold px-12 items-center">
      <FilterPaginationItem
        title="Проекты"
        isActive={isActiveItem.type === "projects"}
        handleClick={() => {
          handleActive({ type: "projects" });
        }}
      />
      <FilterPaginationItem
        title="Категории"
        isActive={isActiveItem.type === "categories"}
        handleClick={() => {
          handleActive({ type: "categories" });
        }}
      />
      <FilterPaginationItem
        title="Пользователи"
        isActive={isActiveItem.type === "users"}
        handleClick={() => {
          handleActive({ type: "users" });
        }}
      />
    </div>
  );
};

export default FilterPagination;
