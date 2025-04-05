import { useLazyGetImageQuery } from "@/features/genre/api/genreApi";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  value?: File | null;
  onChange: (file: File | null) => void;
}

const ImageUploader = ({ value, onChange }: Props) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fetchImage] = useLazyGetImageQuery();

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === "string") {
      fetchImage(value)
        .unwrap()
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          setPreview(url);
        })
        .catch(() => setPreview("/default-image.jpg"));
      return;
    }

    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [value, fetchImage]);

  const handleFileChange = (file: File | null) => {
    onChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  return (
    <div className="flex flex-col">
      {preview ? (
        <div className="relative flex items-center justify-center mx-auto max-w-[220px]">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-2xl"
          />
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="p-2 bg-[#FFFFFF66] rounded-full absolute top-2 right-2 hover:bg-white transition-colors backdrop-blur-md"
          >
            <Trash2 size={20} className="text-[#171717CC]" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput")?.click()}
          className="flex flex-col gap-4 justify-center items-center py-10 bg-[#8F92A10D] border-2 border-dashed border-gray-300 rounded-2xl hover:border-blueUsed transition-colors cursor-pointer"
        >
          <span
            className="flex items-center justify-center rounded-2xl w-12 h-12 bg-[#8F92A1]/10"
            role="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 15.9861C11.4477 15.9861 11 15.5384 11 14.9861V7.82854L7.75748 11.0711L6.34326 9.65685L12.0001 4L17.657 9.65685L16.2428 11.0711L13 7.82831V14.9861C13 15.5384 12.5523 15.9861 12 15.9861ZM6 14H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14H18V18H6V14Z"
                fill="#8F92A1"
              />
            </svg>
          </span>
          <span className="font-medium text-[#8F92A1]">
            Перетащите картинку или{" "}
            <span className="text-blueUsed">загрузите</span>
          </span>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
