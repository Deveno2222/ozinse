import { useEffect, useState } from "react";
import FilterPaginationItem from "./../../search/components/FilterPaginationItem";
import { cn } from "@/lib/utils";

type TPagination = "information" | "video" | "images";

interface Props {
  step: number;
  stepp: (step: number) => void;
  className?: string;
}

const FilterPagination = ({ step, stepp, className }: Props) => {
  const [activeType, setActiveType] = useState<TPagination>("information");

  // Синхронизация activeType с step
  useEffect(() => {
    switch (step) {
      case 1:
        setActiveType("information");
        break;
      case 2:
        setActiveType("video");
        break;
      case 3:
        setActiveType("images");
        break;
      default:
        setActiveType("information");
    }
  }, [step]);

  const handleActive = (type: TPagination) => {
    setActiveType(type);
    switch (type) {
      case "information":
        stepp(1);
        break;
      case "video":
        stepp(2);
        break;
      case "images":
        stepp(3);
        break;
      default:
        stepp(1);
    }
  };

  return (
    <div className={cn("flex gap-8 bg-white font-bold items-center", className)}>
      <FilterPaginationItem
        title="Основная информация"
        isActive={activeType === "information"}
        handleClick={() => handleActive("information")}
      />
      <FilterPaginationItem
        title="Видео"
        isActive={activeType === "video"}
        handleClick={() => handleActive("video")}
      />
      <FilterPaginationItem
        title="Обложка и скриншоты"
        isActive={activeType === "images"}
        handleClick={() => handleActive("images")}
      />
    </div>
  );
};

export default FilterPagination;
