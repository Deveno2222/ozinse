import { useGetMovieByIdQuery } from "@/features/movies/api/movieApi";
import MovieAdditionalInfo from "@/features/movies/components/MovieAdditionalInfo";
import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieInfo from "@/features/movies/components/MovieInfo";
import { useParams } from "react-router-dom";

const MovieScreen = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetMovieByIdQuery(Number(id));

  console.log("data", data);

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
        {data && <MovieInfo movieData={data} />}
      </div>

      {/* Дополнительная информация */}
      {data && <MovieAdditionalInfo movieData={data} />}
    </div>
  );
};

export default MovieScreen;
