import { Button } from "@/components/ui/button";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import FilterBar from "@/features/movies/components/FilterBar";
import MovieCard from "@/features/movies/components/MovieCard";
import AddButton from "@/features/movies/ui/AddButton";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const MainScreen = () => {
  const dispatch = useDispatch();

  const handleOpen = (type: "delete" | "form" | null) => {
    dispatch(openModal({ modalType: type }));
  };

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    console.log("Логика удаления");
    dispatch(closeModal());
  };

  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 px-12 overflow-hidden">
      <div className="flex justify-between mb-[30px]">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Проекты</h2>
          <span className="text-[#171717CC] text-sm font-bold">112</span>
        </div>
        <Link to={"/project/add"}>
          <AddButton>Добавить</AddButton>
        </Link>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[18px] justify-items-center">
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
        <MovieCard openModal={() => handleOpen("delete")} />
      </div>
      {/*  */}
      <Modal title={"Удалить проект из главной?"}>
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
