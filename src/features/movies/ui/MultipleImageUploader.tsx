import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useLazyGetImageQuery } from "@/features/genre/api/genreApi";

interface Props {
  values?: (File | string)[];
  onChange: (files: (File | string)[]) => void;
  maxFiles?: number;
}

const MultipleImageUploader = ({
  values = [],
  onChange,
  maxFiles = 10,
}: Props) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [fetchImage] = useLazyGetImageQuery();

  // Загрузка и обновление превью
  useEffect(() => {
    const loadPreviews = async () => {
      const newPreviews = await Promise.all(
        values.map(async (item) => {
          if (typeof item === "string") {
            try {
              const blob = await fetchImage(item).unwrap();
              return URL.createObjectURL(blob);
            } catch {
              return "/default-image.jpg";
            }
          }
          return URL.createObjectURL(item);
        })
      );
      setPreviews(newPreviews);
    };

    loadPreviews();

    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [values]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files).slice(0, maxFiles - values.length);
    onChange([...values, ...newFiles]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFileChange(files);
  };

  const handleRemove = (index: number) => {
    if (typeof values[index] === "string") return;

    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
        className="flex flex-col gap-4 justify-center items-center py-10 bg-[#8F92A10D] border-2 border-dashed border-gray-300 rounded-2xl hover:border-blueUsed transition-colors cursor-pointer"
      >
        {values.length < maxFiles && (
          <div className="flex flex-col gap-2 items-center justify-center text-center p-2">
            <div className="flex items-center justify-center rounded-2xl w-12 h-12 bg-[#8F92A1]/10 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 15.9861C11.4477 15.9861 11 15.5384 11 14.9861V7.82854L7.75748 11.0711L6.34326 9.65685L12.0001 4L17.657 9.65685L16.2428 11.0711L13 7.82831V14.9861C13 15.5384 12.5523 15.9861 12 15.9861ZM6 14H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14H18V18H6V14Z"
                  fill="#8F92A1"
                />
              </svg>
            </div>
            <span className="font-medium text-[#8F92A1]">
              Перетащите картинку или{" "}
              <span className="text-blueUsed">загрузите</span>
            </span>
          </div>
        )}

        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={values.length >= maxFiles}
        />
      </div>
      <div className="flex gap-2">
        {previews.map((preview, index) => (
          <div key={index} className="relative group w-[140px] h-[79px]">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover rounded-lg"
            />
            {typeof values[index] !== "string" && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
                className="p-2 bg-[#FFFFFF66] rounded-2xl absolute top-2 right-2 hover:bg-white transition-colors backdrop-blur-md"
              >
                <Trash2 size={20} className="text-[#171717CC]" />
              </button>
            )}
          </div>
        ))}
      </div>

      {values.length >= maxFiles && (
        <div className="text-sm text-gray-500">
          Максимальное количество файлов: {maxFiles}
        </div>
      )}
    </div>
  );
};

export default MultipleImageUploader;
