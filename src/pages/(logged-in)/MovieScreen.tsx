import MovieAdditionalInfo from "@/features/movies/components/MovieAdditionalInfo";
import MovieBreadCrumb from "@/features/movies/components/MovieBreadCrumb";
import MovieInfo from "@/features/movies/components/MovieInfo";

const MovieScreen = () => {
  return (
    <div className="min-h-screen flex gap-8">
      <div className="bg-[#8F92A10D] max-w-[872px] w-full rounded-t-3xl pb-6">
        {/* Breadcrumb */}
        <MovieBreadCrumb page="Суперкөлік Самұрық"/>

        {/* Movie Information */}
        <MovieInfo />
      </div>

      {/* Дополнительная информация */}
      <MovieAdditionalInfo />
    </div>
  );
};

export default MovieScreen;
