import { createContext, ReactNode, useContext, useState } from "react";

interface ISearchContext {
  searchName: string;
  setSearchName: (value: string) => void;
}

const SearchContext = createContext<ISearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchName, setSearchName] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchName, setSearchName }}>
      {children}
    </SearchContext.Provider>
  );
};

// Кастомный хук
export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
