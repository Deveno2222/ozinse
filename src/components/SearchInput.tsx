import { Input } from "./ui/input";
import searchIcon from "../assets/searchIcon.svg";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate()
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (query.trim() !== "") {
      navigate("project/search")
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Поиск"
        className="shadow-none h-[56px] p-4 rounded-xl border-none bg-[#8F92A10D] 
                   outline-none focus:ring-0 focus:outline-none 
                   placeholder-[# 8F92A1] font-medium"
        onChange={(e) => handleSearch(e)}
      />
      <img
        src={searchIcon}
        alt="Поиск"
        className="absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground"
      />
    </div>
  );
};

export default SearchInput;
