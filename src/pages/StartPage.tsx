import { useState } from "react";
import "../styles/pages/start-page.css";
import { SearchBar } from "../components/SearchBar";
import { ResultsPanel, type ResultsState, type RecommendationItem } from "../components/ResultsPanel";

function getMockRecommendations(query: string): RecommendationItem[] | null {
  const q = query.toLowerCase();

  const presets: Record<string, string[]> = {
    gilmore: [
      "Sweet Magnolias",
      "Hart of Dixie",
      "Virgin River",
      "The Marvelous Mrs. Maisel",
      "Anne with an E",
    ],
    inception: [
      "Interstellar",
      "Shutter Island",
      "Memento",
      "Arrival",
      "Blade Runner 2049",
    ],
    office: [
      "Parks and Recreation",
      "Brooklyn Nine-Nine",
      "Superstore",
      "Silicon Valley",
      "Community",
    ],
  };

  const matchKey = Object.keys(presets).find((key) => q.includes(key));
  if (!matchKey) return null;

  return presets[matchKey].map((title) => ({ title }));
}

export function StartPage() {
  const [results, setResults] = useState<ResultsState>({ status: "idle" });

  function handleSearch(query: string) {
    const items = getMockRecommendations(query);

    if (!items) {
      setResults({ status: "no_match", query });
      return;
    }

    setResults({ status: "has_results", query, items });
  }

  return (
    <main className="start-page">
      <div className="container start-page-content">
        <header className="start-header">
          <h1 className="start-title">What to watch next?</h1>
          <p className="start-lead">
            Discover your next favorite movie or series based on what you've enjoyed
            before.
          </p>

          <SearchBar onSearch={handleSearch} />
        </header>

        <ResultsPanel state={results} />
      </div>
    </main>
  );
}
