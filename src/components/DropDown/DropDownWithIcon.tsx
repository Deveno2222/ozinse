import { useState, useRef, useEffect } from "react";
import DropDownButton from "./DropDownButton";
import DropDownContent from "./DropDownContent";
import DropDownItem from "./DropDownItem";

interface Props {
  buttonText: string;
  content: string[] | number[];
  onChange: (val: string) => void;
}

const DropDownWithIcon = ({ buttonText, content, onChange }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleBtn = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (item: string | number) => {
    setSelectedItem(item.toString());
    onChange(item.toString());
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[154px]" ref={dropdownRef}>
      <DropDownButton isOpen={isOpen} toggle={toggleBtn} type="year">
        <div className="flex items-center gap-2">
          {/* Иконка часов */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 11V7H11V13H16V11H13Z"
              fill="#8F92A1"
            />
          </svg>

          <span className="text-dark font-bold text-[14px]">
            {selectedItem || buttonText}
          </span>
        </div>
      </DropDownButton>
      <DropDownContent isOpen={isOpen}>
        <div className="overflow-y-auto max-h-44">
          {content.map((item, index) => (
            <DropDownItem key={index} onClick={() => handleItemClick(item)}>
              {item}
            </DropDownItem>
          ))}
        </div>
      </DropDownContent>
    </div>
  );
};

export default DropDownWithIcon;
