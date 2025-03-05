import { Trash2 } from "lucide-react";
import { useState } from "react";

interface ImageUploadProps {
  value?: File | File[] | null;
  onChange: (file: File | File[] | null) => void;
  isMultiple?: boolean;
}

const ImageUpload = ({
  value,
  onChange,
  isMultiple = false,
}: ImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>(() =>
    Array.isArray(value)
      ? value.map((file) => URL.createObjectURL(file))
      : value
      ? [URL.createObjectURL(value)]
      : []
  );

  const handleUploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      if (isMultiple) {
        setPreviews((prev) => [...prev, ...newPreviews]);
        onChange([...(Array.isArray(value) ? value : []), ...files]);
      } else {
        setPreviews(newPreviews);
        onChange(files[0]);
      }
    }
  };

  const removePicture = (index: number) => {
    if (isMultiple && Array.isArray(value)) {
      const updatedFiles = value.filter((_, i) => i !== index);
      setPreviews(previews.filter((_, i) => i !== index));
      onChange(updatedFiles.length > 0 ? updatedFiles : null);
    } else {
      setPreviews([]);
      onChange(null);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {previews.length > 0 && !isMultiple ? (
        <div className="relative w-full max-w-md">
          <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
            <img
              src={previews[0]}
              className="w-full h-full object-cover"
              alt="Preview"
            />
            <button
              type="button"
              onClick={() => removePicture(0)}
              className="p-2 bg-[#FFFFFF66] rounded-2xl absolute top-2 right-2 hover:bg-white transition-colors"
            >
              <Trash2 size={20} className="text-[#171717CC]" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col gap-3 justify-center items-center h-48 w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-blue-500 transition-colors">
          <div className="bg-grayLine p-3 rounded-2xl">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 15.9861C11.4477 15.9861 11 15.5384 11 14.9861V7.82854L7.75748 11.0711L6.34326 9.65685L12.0001 4L17.657 9.65685L16.2428 11.0711L13 7.82831V14.9861C13 15.5384 12.5523 15.9861 12 15.9861ZM6 14H4V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14H18V18H6V14Z"
                fill="#8F92A1"
              />
            </svg>
          </div>
          <p className="text-gray-600 text-sm font-medium">
            Перетащите картинку или{" "}
            <span className="text-blue-600">загрузите</span>
          </p>
          <input
            onChange={handleUploadPicture}
            type="file"
            className="hidden"
            accept="image/*"
            multiple={isMultiple}
          />
        </label>
      )}

      {isMultiple && previews.length > 0 && (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={preview}
                className="w-full h-full object-cover"
                alt={`Preview ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removePicture(index)}
                className="p-2 bg-[#FFFFFF66] rounded-2xl absolute top-1 right-1 hover:bg-white transition-colors"
              >
                <Trash2 size={16} className="text-[#171717CC]" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
