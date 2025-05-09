import { EyeIcon, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { IMovieInfo } from "../types";
import { useLazyGetImageQuery } from "@/features/genre/api/genreApi";
import imgPlaceholder from "../../../assets/ImagePlaceholder.png";
import { IMainMovie } from "@/features/search/api/searchApi";

interface Props {
  openModal: () => void;
  data: IMovieInfo | IMainMovie;
}

const MovieCard = ({ openModal, data }: Props) => {
  const [isActive, setActive] = useState(false);

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [fetchImage] = useLazyGetImageQuery();

  useEffect(() => {
    if (!data.imageSrc) return;

    const objectUrl =
      typeof data.imageSrc === "string"
        ? data.imageSrc
        : URL.createObjectURL(data.imageSrc);

    fetchImage(objectUrl)
      .unwrap()
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setImageUrl(blobUrl);
      })
      .catch(() => setImageUrl(imgPlaceholder));

    // Clean up
    return () => {
      if (objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [data.imageSrc]);

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      className={`flex bg-white ${
        isActive ? "shadow-[0px_0px_8px_0px_#0052CC14]" : ""
      } 
 flex-col rounded-2xl w-[260px] h-[460px] p-4`}
    >
      <div className="relative">
        <img
          src={imageUrl ?? imgPlaceholder}
          alt="Постер фильма"
          className="min-h-[334px] h-[334px] w-[228px] rounded-2xl"
        />
        {data.seriesCount > 0 && (
          <div className="absolute top-3 left-3 bg-[#171717CC] text-white font-medium py-[2px] px-2 rounded-[8px] h-[28px] flex items-center justify-center">
            {data.seriesCount} бөлім
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col gap-2">
          <Link to={`/project/movie/${data.movieId}`}>
            <h3
              className={`text-base ${
                isActive ? "text-blueUsed" : "text-dark"
              } font-bold`}
              title={data.title}
            >
              {data.title.length > 26 ? `${data.title.slice(0, 26)} ...` : data.title}
            </h3>
          </Link>
          <div className="flex items-center gap-1">
            {data.categories.length > 0 && (
              <p className="text-xs text-[#9CA3AF] hover:underline cursor-pointer">
                {data.categories.map((c) => c.name).join(" • ")}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-row gap-1 items-center">
            <EyeIcon color="#8F92A1" size={16} />
            <span className="font-normal text-xs text-[#8F92A1]">
              {data.views}
            </span>
          </div>
          <div className="flex gap-4">
            <Link to={`/project/movie/${data.movieId}/edit`}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:opacity-70"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14 8.00352C13.6318 8.00352 13.3333 8.302 13.3333 8.67019V12.6702C13.3333 13.0384 13.0349 13.3369 12.6667 13.3369H3.33333C2.96514 13.3369 2.66667 13.0384 2.66667 12.6702V3.33685C2.66667 2.96866 2.96514 2.67019 3.33333 2.67019H7.33333C7.70152 2.67019 8 2.37171 8 2.00352C8 1.63533 7.70152 1.33685 7.33333 1.33685H3.33333C2.22876 1.33685 1.33333 2.23228 1.33333 3.33685V12.6702C1.33333 13.7748 2.22876 14.6702 3.33333 14.6702H12.6667C13.7712 14.6702 14.6667 13.7748 14.6667 12.6702V8.67019C14.6667 8.302 14.3682 8.00352 14 8.00352ZM4 8.51021V11.3369C4 11.7051 4.29848 12.0035 4.66667 12.0035H7.49334C7.67054 12.0046 7.84086 11.935 7.96667 11.8102L12.58 7.19021L14.4733 5.33687C14.5995 5.2117 14.6705 5.0413 14.6705 4.86354C14.6705 4.68578 14.5995 4.51538 14.4733 4.39021L11.6467 1.53021C11.5215 1.404 11.3511 1.33301 11.1733 1.33301C10.9956 1.33301 10.8252 1.404 10.7 1.53021L8.82 3.41687L4.19334 8.03687C4.06855 8.16269 3.99898 8.333 4 8.51021ZM11.1733 2.94355L13.06 4.83022L12.1133 5.77688L10.2267 3.89022L11.1733 2.94355ZM5.33333 8.78352L9.28666 4.83019L11.1733 6.71686L7.22 10.6702H5.33333V8.78352Z"
                  fill="#171717"
                  fillOpacity="0.8"
                />
              </svg>
            </Link>
            <Trash2
              size={16}
              color="#171717CC"
              className="hover:opacity-70 transition-opacity cursor-pointer"
              onClick={openModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
