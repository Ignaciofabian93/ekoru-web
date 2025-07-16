import useSearch from "@/app/(home)/search/_hooks/useSearch";
import SearchInput from "../textInput/search";

export default function SearchModule() {
  const { searchQuery, handleSearchChange, handleSearchSubmit, searchLoading } = useSearch();

  return (
    <SearchInput
      value={searchQuery}
      onChange={handleSearchChange}
      submit={handleSearchSubmit}
      loading={searchLoading}
    />
  );
}
