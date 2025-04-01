import mainLogo from "../../../assets/mainLogo.svg";
import bell from "../../../assets/Bell.svg";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/model/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
    console.log("Выход из системы");
  };
  
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
        <div onClick={onLogout} className="flex items-center gap-2">
          <span className="text-[#8F92A1] font-medium hover:underline cursor-pointer">
            Выйти
          </span>
          <img
            className="p-1 bg-[#DE350B0D] rounded-[8px] cursor-pointer"
            src={bell}
            alt="Выйти"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
