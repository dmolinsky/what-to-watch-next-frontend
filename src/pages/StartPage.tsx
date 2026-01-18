import { useRef, useState } from "react";
import "../styles/pages/start-page.css";
import { SearchBar } from "../components/SearchBar";
import { ResultsPanel } from "../components/ResultsPanel";
import type { ResultsState, RecommendationItem } from "../components/ResultsPanel";
import { fetchRecommendationsByTitleId } from "../api/recommendations";
import { lookupTitleId } from "../api/titles";

export function StartPage() {

  const [selectedTitle, setSelectedTitle] = useState<RecommendationItem | null>(null);
  const [results, setResults] = useState<ResultsState>({ status: "idle" });
  const abortRef = useRef<AbortController | null>(null);

  async function loadRecommendationsForTitleId(
    titleId: string,
    queryLabel: string,
    controller: AbortSignal
  ) {
    const items = await fetchRecommendationsByTitleId(titleId, 8, controller);

    if (items.length === 0) {
      setResults({ status: "no_match", query: queryLabel });
      setSelectedTitle(null);
      return;
    }

    setResults({ status: "has_results", query: queryLabel, items });
    setSelectedTitle(items[0]); 
  }

  async function handleSearch(query: string) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const q = query.trim();
    if (!q) return;

    setSelectedTitle(null);
    setResults({ status: "loading", query: q });

    try {
      const titleId = await lookupTitleId(q, controller.signal);

      if (!titleId) {
        setResults({ status: "no_match", query: q });
        return;
      }

      await loadRecommendationsForTitleId(titleId, q, controller.signal);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const message = err instanceof Error ? err.message : "Unknown error";
      setResults({ status: "error", query: q, message });
    }
  }

  async function handleFindMoreLike(id: number) {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const label =
      selectedTitle && selectedTitle.id === id
        ? `Similar to ${selectedTitle.title}`
        : `Similar to #${id}`;

    setResults({ status: "loading", query: label });

    try {
      await loadRecommendationsForTitleId(String(id), label, controller.signal);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;

      const message = err instanceof Error ? err.message : "Unknown error";
      setResults({ status: "error", query: label, message });
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

        <ResultsPanel
          state={results}
          selectedTitle={selectedTitle}
          onSelectTitle={setSelectedTitle}
          onFindMoreLike={handleFindMoreLike}
        />
      </div>
    </main>
  );
}
