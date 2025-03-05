import LoginForm from "../features/auth/ui/LoginForm";
import logo from "../assets/logo.svg"

const LoginScreen = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-blue-50">
      <div className="m-16">
        <img src={logo} alt="Логотип" />
      </div>
      <div className="bg-white w-[360px] min-h-[387px] py-10 px-8 rounded-[32px] text-center shadow-[80px_120px_504px_0px_rgba(0,0,0,0.16)]">
        <h2 className="text-[22px] font-bold mb-3">Добро пожаловать</h2>
        <p className="text-[#8F92A1] font-normal">
          Войдите в систему, чтобы продолжить
        </p>
        <LoginForm />
        <p className="text-[13px] font-medium text-[#8F92A1] mt-6">
          Забыли пароль?{" "}
          <a className="font-bold text-blue-700 hover:underline cursor-pointer">
            Восстановить
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
