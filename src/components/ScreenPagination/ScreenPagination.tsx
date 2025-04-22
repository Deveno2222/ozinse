import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;
  setPage: (p: number) => void;
  totalCount: number;
  size: number;
}

const ScreenPagination = ({ page, setPage, totalCount, size }: Props) => {
  const totalPages = Math.ceil(totalCount / size);
  console.log(totalPages);

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={`p-2 rounded-lg transition-colors ${
          page === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ChevronLeft size={20} />
      </button>

      {getPages().map((p) => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`px-4 py-2 rounded-xl font-semibold transition-colors ${
            page === p
              ? "bg-purpleUsed text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        className={`p-2 rounded-lg transition-colors ${
          page === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100 text-gray-700"
        }`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ScreenPagination;
