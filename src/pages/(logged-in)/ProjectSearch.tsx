import FilterPagination from "@/features/search/components/FilterPagination";

const ProjectSearch = () => {
  return (
    <div className="min-h-screen bg-[#8F92A10D] rounded-tl-3xl py-10 overflow-hidden">
      <div className="flex justify-between mb-[30px] px-12">
        <div className="flex items-baseline gap-2">
          <h2 className="text-dark text-[22px] font-bold">Результат поиска</h2>
          <span className="text-[#171717CC] text-sm font-bold">3</span>
        </div>
      </div>
      <div className="bg-white pt-4">
        <FilterPagination />
      </div>

      {/* Контент в зависимости от фильтра */}
    </div>
  );
};

export default ProjectSearch;
