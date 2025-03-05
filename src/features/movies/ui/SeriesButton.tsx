// SeriesButton.tsx
import React from "react";

interface Props {
  isActive: boolean;
  number: number;
  onClick?: () => void;
}

const SeriesButton: React.FC<Props> = ({ isActive, number, onClick }) => {
  return (
    <button
      onClick={onClick}
      role="button"
      aria-pressed={isActive}
      className={`relative pb-[13px] text-sm font-bold transition-colors ${
        isActive
          ? "text-[#0052CC] hover:text-[#003d99]"
          : "text-[#8F92A1] hover:text-[#6b6d7a]"
      }`}
    >
      {number} серия
      {isActive && (
        <div
          className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#0052CC] rounded-t-2xl"
          aria-hidden="true"
        />
      )}
    </button>
  );
};

export default SeriesButton;
