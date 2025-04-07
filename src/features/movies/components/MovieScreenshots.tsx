import { useLazyGetImageQuery } from "@/features/genre/api/genreApi";
import { useEffect, useState } from "react";

interface Props {
  imgUrl: File | null;
}

const MovieScreenshots = ({ imgUrl }: Props) => {
  const [imageUrl, setImageUrl] = useState("");
  const [fetchImage] = useLazyGetImageQuery();

  useEffect(() => {
    if (!imgUrl) return;

    const objectUrl =
      typeof imgUrl === "string" ? imgUrl : URL.createObjectURL(imgUrl);

    fetchImage(objectUrl)
      .unwrap()
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        setImageUrl(blobUrl);
      })
      .catch(() => setImageUrl(""));

    return () => {
      if (objectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [imgUrl]);

  return (
    <img
      src={imageUrl}
      className="bg-[#8F92A133] rounded-lg w-full aspect-[16/9]"
    />
  );
};

export default MovieScreenshots;
