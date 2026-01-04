import { FormEvent, useId, useState } from "react";
import "../styles/components/search-bar.css";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const inputId = useId();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    onSearch(trimmed);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>

      <div className="search-row">
        <input
          id={inputId}
          className="search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Gilmore Girls, Inception..."
          autoComplete="off"
        />

        <button className="search-button" type="submit">
          Search
        </button>
      </div>
    </form>
  );
}