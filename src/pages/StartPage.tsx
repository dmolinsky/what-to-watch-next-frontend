import { useRef, useState } from "react";
import "../styles/pages/start-page.css";
import { SearchBar } from "../components/SearchBar";
import { ResultsPanel } from "../components/ResultsPanel";
import type { ResultsState } from "../components/ResultsPanel";
import { fetchRecommendationsByTitleId } from "../api/recommendations";
import { lookupTitleId } from "../api/titles";

export function StartPage() {
  const [results, setResults] = useState<ResultsState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  async function handleSearch(query: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const q = query.trim();
    if (!q) return;

    setResults({ status: "loading", query: q });

    try {
      const titleId = await lookupTitleId(q, controller.signal);

      if (!titleId) {
        setResults({ status: "no_match", query: q });
        return;
      }

      const items = await fetchRecommendationsByTitleId(titleId, 5, controller.signal);

      if (items.length === 0) {
        setResults({ status: "no_match", query: q });
        return;
      }

      setResults({ status: "has_results", query: q, items });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const message = err instanceof Error ? err.message : "Unknown error";
      setResults({ status: "error", query: q, message });
    }
  }

  return (
    <main className="start-page">
      <div className="container start-page-content">
        <header className="start-header">
          <div className="hero-title">
            <h1>What to watch next?</h1>
          </div>
          <p className="start-lead">
            Discover your next favorite movie or series based on what you've enjoyed before.
          </p>

          <SearchBar onSearch={handleSearch} />
        </header>

        <ResultsPanel state={results} />
      </div>
    </main>
  );
}
