import mainLogo from "../../../assets/mainLogo.svg";
import bell from "../../../assets/Bell.svg";
import { Link } from "react-router-dom";
import SearchInput from "@/components/SearchInput";

const Header = () => {
  return (
    <div className="flex items-center h-[100px] px-5 mb-8">
      {/* Логотип и поиск */}
      <div className="flex items-center mr-4 md:mr-10 lg:mr-24 xl:mr-[136px]">
        <Link to="/project">
          <img src={mainLogo} alt="Логотип" className="min-w-[50px]" />
        </Link>
      </div>

      {/* Кнопка выхода */}
      <div className="flex items-center justify-between flex-1 gap-8">
        <div className="flex-1 max-w-[449px]">
          <SearchInput />
        </div>
        <Link to="/login" className="flex items-center gap-2">
          <span className="text-[#8F92A1] font-medium hover:underline cursor-pointer">
            Выйти
          </span>
          <img
            className="p-1 bg-[#DE350B0D] rounded-[8px] cursor-pointer"
            src={bell}
            alt="Выйти"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
