import DropDown from "@/components/DropDown/DropDown";
import DropDownWithIcon from "@/components/DropDown/DropDownWithIcon";

const items = ["Option 1", "Option 2", "Option 3sdad"];

const FilterBar = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-4">
        <DropDown label="Сортировать" buttonText="Click" content={items} />
        <DropDown label="Сортировать" buttonText="Click" content={items} />
        <DropDown label="Сортировать" buttonText="Click" content={items} />
      </div>

      <DropDownWithIcon buttonText="Выберите год" content={["2021", "2022", "2023"]}/>
    </div>

    // <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0 mb-10">
    //   <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-4">
    //     {/* Сортировка */}
    //     <DropDownItem
    //       triggerLabel="Сортировать"
    //       items={[
    //         { label: "Популярные", value: "popular" },
    //         { label: "По рейтингу", value: "rating" },
    //         { label: "Новинки", value: "new" },
    //       ]}
    //     />

    //     {/* Категории */}
    //     <DropDownItem
    //       triggerLabel="Категория"
    //       items={[
    //         { label: "Все категории", value: "all" },
    //         { label: "Боевики", value: "action" },
    //         { label: "Комедии", value: "comedy" },
    //       ]}
    //     />

    //     {/* Тип */}
    //     <DropDownItem
    //       triggerLabel="Тип"
    //       items={[
    //         { label: "Фильмы и сериалы", value: "all" },
    //         { label: "Сериалы", value: "series" },
    //       ]}
    //     />
    //   </div>

    //   {/* Правый блок (Кнопка выбора года) */}
    //   <DropdownMenu>
    //     <DropdownMenuTrigger asChild>
    //       <Button
    //         variant="default"
    //         className="flex items-center gap-2 bg-[#8F92A10D] shadow-none text-[#B1B1B8] px-3 py-2 h-10 w-[146px] rounded-2xl hover:bg-[#EDEDEF] transition"
    //       >
    //         <img className="w-6 h-6" src={clock} alt="Выберите год" />
    //         <span className="text-dark font-bold">Выберите год</span>
    //       </Button>
    //     </DropdownMenuTrigger>
    //     <DropdownMenuContent className="w-40">
    //       <DropdownMenuItem>2024</DropdownMenuItem>
    //       <DropdownMenuItem>2023</DropdownMenuItem>
    //       <DropdownMenuItem>2022</DropdownMenuItem>
    //     </DropdownMenuContent>
    //   </DropdownMenu>
    // </div>
  );
};

export default FilterBar;
