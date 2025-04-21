import { Input } from "./ui/input";
import searchIcon from "../assets/searchIcon.svg";
import { ChangeEvent, useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";

const SearchInput = () => {
  const [text, setText] = useState("");
  const { setSearchName } = useSearch();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      performSearch();
    }
  };

  const handleSearchClick = () => {
    performSearch();
  };

  const performSearch = () => {
    if (text.trim()) {
      setSearchName(text);
      navigate("/project/search");
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Поиск"
        className="shadow-none h-[56px] p-4 rounded-xl border-none bg-[#8F92A10D] 
                   outline-none focus:ring-0 focus:outline-none 
                   placeholder-[#8F92A1] font-medium"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <img
        src={searchIcon}
        alt="Поиск"
        className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground cursor-pointer"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchInput;
