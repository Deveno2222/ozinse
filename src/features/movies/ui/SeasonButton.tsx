// SeasonButton.tsx
import React from "react";

interface SeasonButtonProps {
  isActive?: boolean;
  season: number;
  onClick?: () => void;
}

const SeasonButton: React.FC<SeasonButtonProps> = ({
  isActive = false,
  season,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      role="tab"
      aria-selected={isActive}
      className={`flex font-bold items-center justify-center py-1 px-6 rounded h-8 cursor-pointer transition-colors ${
        isActive
          ? "bg-[#0052CC1A] text-[#0052CC] hover:bg-[#0052CC33]"
          : "bg-[#8F92A11A] text-dark hover:bg-gray-100"
      }`}
    >
      {season} сезон
    </button>
  );
};

export default SeasonButton;