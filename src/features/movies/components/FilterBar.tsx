import DropDown from "@/components/DropDown/DropDown";
import DropDownWithIcon from "@/components/DropDown/DropDownWithIcon";
import { useGetAgesQuery } from "@/features/age/api/ageApi";
import { useGetCategoriesQuery } from "@/features/categories/api/categoryApi";
import { useGetGenresQuery } from "@/features/genre/api/genreApi";

interface Props {
  handleChanges: (filterName: string, value: string) => void;
}

const FilterBar = ({ handleChanges }: Props) => {
  // const {
  //   data: age,
  //   isLoading: isAgesLoading,
  //   isError: isAgesError
  // } = useGetAgesQuery();

  const {
    data: genre,
    isLoading: isGenresLoading,
    isError: isGenresError,
  } = useGetGenresQuery();

  const {
    data: category,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useGetCategoriesQuery();

  const mockSortFilter = [
    { "1": "Популярные" },
    { "2": "Новинки" },
    { "3": "Все" },
  ];
  const categories = [
    "Все категории",
    ...(category ? category.map((item) => item.name) : []),
  ];
  const types = [
    "Фильмы и сериалы",
    ...(genre ? genre.map((item) => item.name) : []),
  ];
  const years = [
    ...Array.from(
      { length: new Date().getFullYear() - 1970 + 1 },
      (_, i) => 1970 + i
    ).sort((a, b) => b - a),
  ];

  if (isGenresLoading || isCategoriesLoading) {
    return <div>Loading...</div>;
  }

  if (isGenresError || isCategoriesError) {
    return <div>Error loading filter options</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-4">
        <DropDown
          label="Сортировать"
          buttonText="Click"
          content={mockSortFilter}
          filterName="sortBy"
          onChange={handleChanges}
        />
        <DropDown
          label="Категория"
          buttonText="Click"
          content={categories}
          filterName="category"
          onChange={handleChanges}
        />
        <DropDown
          label="Тип"
          buttonText="Click"
          content={types}
          filterName="sort"
          onChange={handleChanges}
        />
      </div>

      <DropDownWithIcon buttonText="Выберите год" content={years} />
    </div>
  );
};

export default FilterBar;
