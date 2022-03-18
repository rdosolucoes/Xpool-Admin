import { useState } from "react";

export default function useSearchBar<T extends { [key: string]: any }>(
  searchParams: string[] = []
) {
  const [search, setSearch] = useState("");

  const buildValue = (value?: string) => {
    if (typeof value === "string" || typeof value === "number") {
      return value.toString().toLowerCase();
    }

    return "";
  };

  function filterParam(searchValue: string, item: T, param: string) {
    const newItem = buildValue(item[param]);

    return newItem.includes(searchValue.toLowerCase());
  }

  const checkParams = (item: T, params: string[]) => {
    if (params.length === 0) return false;

    return params.some((param) => filterParam(search, item, param));
  };

  const filterBySearchBar = (listItems: T[]) => {
    return listItems.filter((item) => checkParams(item, searchParams));
  };

  const handleSearch = (e?: string) => setSearch(e || "");

  const handleErase = () => setSearch("");

  const defaultSearchBarProps = {
    handleSearch,
    handleErase,
  };

  return { filterBySearchBar, search, defaultSearchBarProps };
}
