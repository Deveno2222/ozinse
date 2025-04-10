import DropDown from "@/components/DropDown/DropDown";
import DropDownWithIcon from "@/components/DropDown/DropDownWithIcon";
import { Button } from "@/components/ui/button";
import { useGetCategoriesQuery } from "@/features/categories/api/categoryApi";
import { useGetGenresQuery } from "@/features/genre/api/genreApi";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import {
  useDeleteMovieMutation,
  useGetMoviesQuery,
} from "@/features/movies/api/movieApi";
import MovieCard from "@/features/movies/components/MovieCard";
import { IMovie, IMovieInfo } from "@/features/movies/types";
import AddButton from "@/features/movies/ui/AddButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MainScreen = () => {
  const dispatch = useDispatch();

  const [selectedMovie, setSelectedMovie] = useState<IMovie | null>(null);
  const [deleteMovie] = useDeleteMovieMutation();

  const mockSortFilter = ["Популярные", "Новинки", "Все"];
  const { data: genresData } = useGetGenresQuery();
  const { data: categoriesData } = useGetCategoriesQuery();
  const years = [
    "Выберите год",
    ...Array.from(
      { length: new Date().getFullYear() - 1970 + 1 },
      (_, i) => 1970 + i
    )
      .sort((a, b) => b - a)
      .map(String),
  ];

  const genres = [
    "Фильмы и сериалы",
    ...(genresData ? genresData.map((item) => item.name) : []),
  ];
  const categories = [
    "Все категории",
    ...(categoriesData ? categoriesData.map((item) => item.name) : []),
  ];

  const [selectedSort, setSelectedSort] = useState(mockSortFilter[0]);
  const [selectedType, setSelectedType] = useState(genres[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedYear, setSelectedYear] = useState(years[0].toString());

  const {
    data: movies,
    isLoading,
    isError,
  } = useGetMoviesQuery({
    genre:
      selectedType !== "Фильмы и сериалы"
        ? genresData?.find((i) => i.name === selectedType)?.genreId
        : undefined,
    category:
      selectedCategory !== "Все категории"
        ? categoriesData
            ?.find((i) => i.name === selectedCategory)
            ?.categoryId?.toString()
        : undefined,
    sortBy:
      selectedSort === "Популярные"
        ? "1"
        : selectedSort === "Новинки"
        ? "2"
        : undefined,
    year: selectedYear === "Выберите год" ? undefined : selectedYear,
  });

  const handleFilter = (filterName: string, value: string) => {
    switch (filterName) {
      case "sortBy":
        setSelectedSort(value);
        break;
      case "category":
        setSelectedCategory(value);
        break;
      case "type":
        setSelectedType(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      default:
        break;
    }
  };

  const handleOpen = (type: "delete" | "form" | null, movie?: IMovie) => {
    if (movie) {
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedMovie(null);
  };

  const handleDelete = async () => {
    try {
      if (!selectedMovie) return;

      await deleteMovie(selectedMovie.movieId);
      console.log("Фильм удален");
    } catch (error) {
      console.error(error);
    }
    handleClose();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading movies</div>;
  }

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Проекты</h2>
          <span className="text-[#171717CC] text-sm font-bold">
            {movies?.length}
          </span>
        </div>
        <Link to={"/project/add"}>
          <AddButton>Добавить</AddButton>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between w-full gap-4 lg:gap-0 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center gap-4">
          <DropDown
            label="Сортировать"
            buttonText={selectedSort}
            content={mockSortFilter}
            onChange={(val) => handleFilter("sortBy", val)}
          />
          <DropDown
            label="Категория"
            buttonText={selectedCategory}
            content={categories}
            onChange={(val) => handleFilter("category", val)}
          />
          <DropDown
            label="Тип"
            buttonText={selectedType}
            content={genres}
            onChange={(val) => handleFilter("type", val)}
          />
        </div>
        <DropDownWithIcon
          buttonText={selectedYear}
          content={years.map(String)}
          onChange={(val) => handleFilter("year", val)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[18px] justify-items-center">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.movieId}
            data={movie}
            openModal={() => handleOpen("delete", movie)}
          />
        ))}
      </div>

      <Modal title={"Удалить проект из главной?"} onClose={handleClose}>
        <div>
          <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
            Вы действительно хотите удалить проект из главной?
          </p>
          <div className="flex justify-center gap-2">
            <Button
              onClick={handleDelete}
              className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px]"
            >
              Да, удалить
            </Button>
            <Button
              onClick={handleClose}
              className="bg-[#8F92A11A] hover:bg-[#38383a1a] shadow-none text-dark rounded-2xl w-[134px]"
            >
              Отмена
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainScreen;
