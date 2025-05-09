import { formatDate } from "@/utils/formatDate";
import imgInfo from "../../../assets/AdditionalImage.png";
import { IMovieInfo } from "../types";
import { useEffect, useState } from "react";
import { useLazyGetImageQuery } from "@/features/genre/api/genreApi";

interface Props {
  movieData: IMovieInfo;
}

const MovieAdditionalInfo = ({ movieData }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [fetchImage] = useLazyGetImageQuery();

  useEffect(() => {
    if (!movieData.imageSrc) return;

    const objectUrl =
      typeof movieData.imageSrc === "string"
        ? movieData.imageSrc
        : URL.createObjectURL(movieData.imageSrc);

    fetchImage(objectUrl)
      .unwrap()
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setImageUrl(blobUrl);
      })
      .catch(() => setImageUrl(imgInfo));

    return () => {
      if (objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [movieData.imageSrc]);

  return (
    <div className="w-[254px] hidden lg:block">
      <div className="pb-[33px] border-b border-b-slayer">
        <div className="flex flex-col gap-4">
          {/* Год */}
          <div className="flex items-center gap-3 tracking-[-0.4px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99992 14.6666C11.6818 14.6666 14.6666 11.6818 14.6666 7.99992C14.6666 4.31802 11.6818 1.33325 7.99992 1.33325C4.31802 1.33325 1.33325 4.31802 1.33325 7.99992C1.33325 11.6818 4.31802 14.6666 7.99992 14.6666ZM7.99992 13.3333C10.9455 13.3333 13.3333 10.9455 13.3333 7.99992C13.3333 5.0544 10.9455 2.66659 7.99992 2.66659C5.0544 2.66659 2.66659 5.0544 2.66659 7.99992C2.66659 10.9455 5.0544 13.3333 7.99992 13.3333ZM8.66659 7.33325V4.66658H7.33325V8.66659H10.6666V7.33325H8.66659Z"
                fill="#171717"
              />
            </svg>
            <span>{movieData.releaseYear} год</span>
          </div>
          {/* Жанр */}
          <div className="flex items-center gap-3 tracking-[-0.4px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.666748 4C0.666748 2.89543 1.56218 2 2.66675 2H13.3334C14.438 2 15.3334 2.89543 15.3334 4V12C15.3334 13.1046 14.438 14 13.3334 14H2.66675C1.56218 14 0.666748 13.1046 0.666748 12V4ZM2.66675 3.33333H13.3334C13.7016 3.33333 14.0001 3.63181 14.0001 4V12C14.0001 12.3682 13.7016 12.6667 13.3334 12.6667H2.66675C2.29856 12.6667 2.00008 12.3682 2.00008 12V4C2.00008 3.63181 2.29856 3.33333 2.66675 3.33333ZM12.0001 7.33333C12.3683 7.33333 12.6667 7.6318 12.6667 8C12.6667 8.3682 12.3683 8.66667 12.0001 8.66667H6.66675C6.29856 8.66667 6.00008 8.3682 6.00008 8C6.00008 7.6318 6.29856 7.33333 6.66675 7.33333H12.0001ZM3.33341 10.6667C3.33341 10.2985 3.63189 10 4.00008 10H9.33342C9.70161 10 10.0001 10.2985 10.0001 10.6667C10.0001 11.0349 9.70161 11.3333 9.33342 11.3333H4.00008C3.63189 11.3333 3.33341 11.0349 3.33341 10.6667ZM11.3334 10C10.9652 10 10.6667 10.2985 10.6667 10.6667C10.6667 11.0349 10.9652 11.3333 11.3334 11.3333H12.0001C12.3683 11.3333 12.6667 11.0349 12.6667 10.6667C12.6667 10.2985 12.3683 10 12.0001 10H11.3334ZM4.66675 7.33333C5.03493 7.33333 5.33342 7.6318 5.33342 8C5.33342 8.3682 5.03493 8.66667 4.66675 8.66667H4.00008C3.63189 8.66667 3.33341 8.3682 3.33341 8C3.33341 7.6318 3.63189 7.33333 4.00008 7.33333H4.66675Z"
                fill="#171717"
              />
            </svg>
            <p>{movieData.categories.map((c) => c.name).join(", ")}</p>
          </div>
          {/* Количество серий сезонов */}
          <div className="flex items-center gap-3 tracking-[-0.4px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.4469 2L13.4443 2.00302C14.4973 2.06056 15.3334 2.93264 15.3334 4V12C15.3334 13.1046 14.438 14 13.3334 14H2.66675C1.56218 14 0.666748 13.1046 0.666748 12V4C0.666748 2.89543 1.56218 2 2.66675 2H13.4469ZM6.98435 3.33333H10.9843L8.72608 6H4.72608L6.98435 3.33333ZM3.39274 6L5.65104 3.33333H2.66675C2.29856 3.33333 2.00008 3.63181 2.00008 4V6H3.39274ZM2.00008 7.33333V12C2.00008 12.3682 2.29856 12.6667 2.66675 12.6667H13.3334C13.7016 12.6667 14.0001 12.3682 14.0001 12V7.33333H2.00008ZM14.0001 6V4C14.0001 3.63181 13.7016 3.33333 13.3334 3.33333H12.3177L10.0594 6H14.0001Z"
                fill="#171717"
              />
            </svg>
            <span>
              {movieData.series.seasonCount} сезон,{" "}
              {movieData.series.series.length} серия, {movieData.duration} мин
            </span>
          </div>
        </div>
        <div className="mt-6">
          <img src={imageUrl} className="max-h-[220px] max-w-[150px] rounded-2xl" alt="Фильм" />
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8 tracking-[-0.4px]">
        <p className="text-[#9CA3AF]">
          Добавил: <span className="text-dark">{movieData.createdBy}</span>
        </p>
        <p className="text-[#9CA3AF]">
          Дата добавления:{" "}
          <span className="text-dark">{formatDate(movieData.createdAt)}</span>
        </p>
        <p className="text-[#9CA3AF]">
          Дата обновления:{" "}
          <span className="text-dark">{formatDate(movieData.updatedAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default MovieAdditionalInfo;
