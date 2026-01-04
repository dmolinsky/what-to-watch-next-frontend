import { useRef, useState } from "react";
import "../styles/pages/start-page.css";
import { SearchBar } from "../components/SearchBar";
import { ResultsPanel } from "../components/ResultsPanel";
import type { ResultsState } from "../components/ResultsPanel";
import { fetchRecommendationsByTitleId } from "../api/recommendations";

/**
 * Temporary MVP mapping until you have a real search endpoint.
 * Replace these IDs with real IDs from your database.
 */
const TITLE_ID_BY_QUERY: Record<string, string> = {
  "inception": "2010",
};

function resolveTitleId(query: string): string | null {
  const key = query.trim().toLowerCase();
  return TITLE_ID_BY_QUERY[key] ?? null;
}

export function StartPage() {
  const [results, setResults] = useState<ResultsState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  async function handleSearch(query: string) {
    // Cancel any in-flight request if user searches again quickly
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setResults({ status: "loading", query });

    const titleId = resolveTitleId(query);
    if (!titleId) {
      setResults({ status: "no_match", query });
      return;
    }

    try {
      const items = await fetchRecommendationsByTitleId(titleId, 5, controller.signal);

      if (items.length === 0) {
        setResults({ status: "no_match", query });
        return;
      }

      setResults({ status: "has_results", query, items });
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const message = err instanceof Error ? err.message : "Unknown error";
      setResults({ status: "error", query, message });
    }
  }

  return (
    <main className="start-page">
      <div className="container start-page-content">
        <header className="start-header">
          <h1 className="start-title">What to watch next?</h1>

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
