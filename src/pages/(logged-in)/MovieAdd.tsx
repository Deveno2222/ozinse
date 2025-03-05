import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieForm from "@/features/movies/components/MovieForm";

const MovieAdd = () => {
  return (
    <div className="min-h-screen bg-[#8F92A10D] max-w-[872px] rounded-3xl">
      <MovieBreadCrumb page="Добавить проект" />
      <div className="px-6">
        <MovieForm />
      </div>
    </div>
  );
};

export default MovieAdd;
