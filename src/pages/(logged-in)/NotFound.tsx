import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen bg-blue-50">
      <h2 className="text-6xl font-bold text-dark">Страница не найдена</h2>
      <Link to={"/project"} className="bg-blueUsed hover:bg-blue-600 transition-colors duration-150 ease-linear py-2 px-6 text-white rounded-lg">Вернуться на главную</Link>
    </div>
  );
};

export default NotFound;
