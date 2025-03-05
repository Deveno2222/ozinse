import { useState, useRef, useEffect } from "react";
import DropDownButton from "./DropDownButton";
import DropDownContent from "./DropDownContent";
import DropDownItem from "./DropDownItem";

interface Props {
  buttonText: string;
  content: string[];
  label: string;
}

const DropDown = ({ buttonText, content, label }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleBtn = () => {
    setOpen((prev) => !prev);
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setOpen(false); // Закрываем выпадающий список после выбора
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
    <div className="relative w-full" ref={dropdownRef}>
      <DropDownButton isOpen={isOpen} toggle={toggleBtn}>
        <span className="text-[#8F92A1] font-medium">{label}:</span>
        <span className="text-dark font-bold">
          {selectedItem || content[0]}
        </span>
      </DropDownButton>
      <DropDownContent isOpen={isOpen}>
        {content.map((item, index) => (
          <DropDownItem key={index} onClick={() => handleItemClick(item)}>
            {item}
          </DropDownItem>
        ))}
      </DropDownContent>
    </div>
  );
};

export default DropDown;