import MovieCard from "@/features/movies/components/MovieCard";
import { IMainMovie } from "../api/searchApi";
import Modal from "@/features/modals/components/Modal";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useState } from "react";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import { useDeleteMovieMutation } from "@/features/movies/api/movieApi";

interface Props {
  data: IMainMovie[] | null;
}

const ProjectResults = ({ data }: Props) => {
  const [selectedMovie, setSelectedMovie] = useState<IMainMovie | null>(null);

  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const [deleteMovie] = useDeleteMovieMutation();

  const handleOpen = (
    modalType: "delete" | "form" | "success" | null,
    movie?: IMainMovie
  ) => {
    if (movie) {
      setSelectedMovie(movie);
    } else {
      setSelectedMovie(null);
    }
    dispatch(openModal({ modalType: modalType }));
  };

  const handleClose = () => {
    setSelectedMovie(null);
    dispatch(closeModal());
  };

  const handleDelete = async () => {
    try {
      if (!selectedMovie) return;

      await deleteMovie(Number(selectedMovie));
      handleClose();
      console.log("Проект успешно удален");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {(data ?? []).length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-[18px] justify-items-center m-8">
          {data?.map((movie) => (
            <MovieCard
              key={movie.movieId}
              data={movie}
              openModal={() => handleOpen("delete", movie)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-6 ml-12 text-[#888] text-lg">
          По вашему запросу ничего не найдено
        </p>
      )}

      {modalType === "delete" && (
        <Modal title={"Удалить проект?"} onClose={handleClose}>
          <div>
            <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
              Вы действительно хотите удалить проект?
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
      )}
    </div>
  );
};

export default ProjectResults;
