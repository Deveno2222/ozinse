import React from 'react';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

const DropDownItem = ({ children, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
};

export default DropDownItem;