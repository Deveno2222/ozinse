import { Button } from "@/components/ui/button";
import Modal from "@/features/modals/components/Modal";
import { closeModal, openModal } from "@/features/modals/modalSlice";
import {
  useDeleteMovieMutation,
  useGetMovieByIdQuery,
} from "@/features/movies/api/movieApi";
import MovieAdditionalInfo from "@/features/movies/components/MovieAdditionalInfo";
import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieInfo from "@/features/movies/components/MovieInfo";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MovieScreen = () => {
  const { id } = useParams();
  const { data, isLoading, isError, refetch } = useGetMovieByIdQuery(
    Number(id)
  );
  const [deleteMovie] = useDeleteMovieMutation();

  console.log(data);

  const { modalType } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [window.location.search]);

  const handleOpenFormModal = () => {
    dispatch(openModal({ modalType: "form" }));
  };

  const handleOpenDeleteModal = () => {
    dispatch(openModal({ modalType: "delete" }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMovie(Number(id));
      dispatch(closeModal());
      navigate("/project");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading movie</div>;
  }

  return (
    <div className="min-h-screen flex gap-8">
      <div className="bg-[#8F92A10D] max-w-[872px] w-full rounded-t-3xl pb-6">
        {/* Breadcrumb */}
        <MovieBreadCrumb page={data?.title || "Нету произведения"} />

        {/* Movie Information */}
        {data && (
          <MovieInfo
            openModal={handleOpenFormModal}
            openDeleteModal={handleOpenDeleteModal}
            movieData={data}
          />
        )}
      </div>

      {/* Дополнительная информация */}
      {data && <MovieAdditionalInfo movieData={data} />}
      {modalType === "form" && (
        <Modal title="" onClose={handleCloseModal}>
          <div>
            <div className="flex flex-col justify-center items-center gap-4 py-8">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.25"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.73799 13.0837C5.31825 8.69009 8.69009 5.31825 13.0837 4.73799C16.1042 4.33907 19.8825 4 24 4C28.1175 4 31.8958 4.33907 34.9163 4.73799C39.3099 5.31825 42.6818 8.69009 43.262 13.0837C43.6609 16.1042 44 19.8825 44 24C44 28.1175 43.6609 31.8958 43.262 34.9163C42.6818 39.3099 39.3099 42.6818 34.9163 43.262C31.8958 43.6609 28.1175 44 24 44C19.8825 44 16.1042 43.6609 13.0837 43.262C8.69009 42.6818 5.31825 39.3099 4.73799 34.9163C4.33907 31.8958 4 28.1175 4 24C4 19.8825 4.33907 16.1042 4.73799 13.0837Z"
                  fill="#1FBF79"
                />
                <path
                  d="M33.1809 14.5873C33.7532 13.8859 34.7629 13.8007 35.4362 14.3968C36.1095 14.9929 36.1914 16.0448 35.6191 16.7461L22.0191 33.4127C21.4378 34.1251 20.4078 34.2001 19.737 33.579L12.537 26.9123C11.8766 26.3008 11.8171 25.2474 12.4042 24.5594C12.9912 23.8714 14.0025 23.8095 14.663 24.421L20.6403 29.9556L33.1809 14.5873Z"
                  fill="#1FBF79"
                />
              </svg>
              <p className="text-dark text-[22px] font-bold">
                Проект добавлен успешно
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button
                onClick={handleCloseModal}
                className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px] font-bold"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {modalType === "delete" && (
        <Modal title={"Удалить проект?"} onClose={handleCloseModal}>
          <div>
            <p className="text-[#8F92A1] text-base text-center py-8 tracking-[-0.4px]">
              Вы действительно хотите удалить проект?
            </p>
            <div className="flex justify-center gap-2">
              <Button
                onClick={handleDeleteConfirm}
                className="bg-purpleUsed hover:bg-purpleupdated shadow-none rounded-2xl w-[134px]"
              >
                Да, удалить
              </Button>
              <Button
                onClick={handleCloseModal}
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

export default MovieScreen;
