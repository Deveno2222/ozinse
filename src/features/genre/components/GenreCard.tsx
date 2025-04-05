import { useEffect, useState } from "react";
import { IGenre } from "../types";
import { useLazyGetImageQuery } from "../api/genreApi";

interface Props {
  openModal: () => void;
  onEdit: () => void;
  data: IGenre;
}

const GenreCard = ({ openModal, data, onEdit }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [fetchImage] = useLazyGetImageQuery();

  useEffect(() => {
    if (!data.imageSrc) return;
  
    fetchImage(typeof data.imageSrc === "string" ? data.imageSrc : URL.createObjectURL(data.imageSrc))
      .unwrap()
      .then(blob => setImageUrl(URL.createObjectURL(blob)))
      .catch(() => setImageUrl("/default-image.jpg"));
  
    return () => {
      if (imageUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [data.imageSrc]);

  return (
    <div className="flex flex-col gap-4 bg-white rounded-2xl p-4 max-w-[260px]">
      {data.imageSrc && (
        <img src={imageUrl} alt="Аватар" width={228} height={140} />
      )}

      <h3 className="text-base font-bold">{data.name}</h3>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-1">
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
              d="M14.3533 4.76667C14.1471 4.64758 13.8929 4.64758 13.6867 4.76667L11.3333 5.92667C11.2939 4.85084 10.4099 3.99928 9.33333 4H3.33333C2.22876 4 1.33333 4.89543 1.33333 6V10C1.33333 11.1046 2.22876 12 3.33333 12H9.33333C10.4099 12.0007 11.2939 11.1492 11.3333 10.0733L13.7067 11.26C13.7975 11.3066 13.8979 11.3317 14 11.3333C14.1248 11.3337 14.2472 11.2991 14.3533 11.2333C14.5487 11.1113 14.6671 10.897 14.6667 10.6667V5.33333C14.6671 5.103 14.5487 4.88874 14.3533 4.76667ZM9.99999 10C9.99999 10.3682 9.70152 10.6667 9.33333 10.6667H3.33333C2.96514 10.6667 2.66666 10.3682 2.66666 10V6C2.66666 5.63181 2.96514 5.33333 3.33333 5.33333H9.33333C9.70152 5.33333 9.99999 5.63181 9.99999 6V10ZM13.3333 9.58667L11.3333 8.58667V7.41333L13.3333 6.41333V9.58667Z"
              fill="#8F92A1"
            />
          </svg>
          <p className="text-xs text-[#9CA3AF]">{data.countOfMovies}</p>
        </div>

        <div className="flex flex-row gap-4">
          {/* edit */}
          <svg
            className="hover:opacity-80 cursor-pointer transition-opacity"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onEdit}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14 8.00352C13.6318 8.00352 13.3333 8.302 13.3333 8.67019V12.6702C13.3333 13.0384 13.0349 13.3369 12.6667 13.3369H3.33333C2.96514 13.3369 2.66667 13.0384 2.66667 12.6702V3.33685C2.66667 2.96866 2.96514 2.67019 3.33333 2.67019H7.33333C7.70152 2.67019 8 2.37171 8 2.00352C8 1.63533 7.70152 1.33685 7.33333 1.33685H3.33333C2.22876 1.33685 1.33333 2.23228 1.33333 3.33685V12.6702C1.33333 13.7748 2.22876 14.6702 3.33333 14.6702H12.6667C13.7712 14.6702 14.6667 13.7748 14.6667 12.6702V8.67019C14.6667 8.302 14.3682 8.00352 14 8.00352ZM4 8.51021V11.3369C4 11.7051 4.29848 12.0035 4.66667 12.0035H7.49334C7.67054 12.0046 7.84086 11.935 7.96667 11.8102L12.58 7.19021L14.4733 5.33687C14.5995 5.2117 14.6705 5.0413 14.6705 4.86354C14.6705 4.68578 14.5995 4.51538 14.4733 4.39021L11.6467 1.53021C11.5215 1.404 11.3511 1.33301 11.1733 1.33301C10.9956 1.33301 10.8252 1.404 10.7 1.53021L8.82 3.41687L4.19334 8.03687C4.06855 8.16269 3.99898 8.333 4 8.51021ZM11.1733 2.94355L13.06 4.83022L12.1133 5.77688L10.2267 3.89022L11.1733 2.94355ZM5.33333 8.78352L9.28666 4.83019L11.1733 6.71686L7.22 10.6702H5.33333V8.78352Z"
              fill="#171717"
              fillOpacity="0.8"
            />
          </svg>
          {/* delete */}
          <div onClick={openModal}>
            <svg
              className="hover:opacity-80 cursor-pointer transition-opacity"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.3333 3.33301V2.66634C11.3333 1.92996 10.7364 1.33301 10 1.33301H6C5.26362 1.33301 4.66667 1.92996 4.66667 2.66634V3.33301H2.66667C2.29848 3.33301 2 3.63149 2 3.99967C2 4.36786 2.29848 4.66634 2.66667 4.66634H3.33333V11.9997C3.33333 13.1043 4.22877 13.9997 5.33333 13.9997H10.6667C11.7713 13.9997 12.6667 13.1043 12.6667 11.9997V4.66634H13.3333C13.7015 4.66634 14 4.36786 14 3.99967C14 3.63149 13.7015 3.33301 13.3333 3.33301H11.3333ZM10 2.66634H6V3.33301H10V2.66634ZM11.3333 4.66634H4.66667V11.9997C4.66667 12.3679 4.96515 12.6663 5.33333 12.6663H10.6667C11.0349 12.6663 11.3333 12.3679 11.3333 11.9997V4.66634ZM6 5.99967H7.33333V11.333H6V5.99967ZM10 5.99967H8.66667V11.333H10V5.99967Z"
                fill="#171717"
                fillOpacity="0.8"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
