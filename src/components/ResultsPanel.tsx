import "../styles/components/results-panel.css";
import { RecommendationCard } from "./RecommendationCard";

export type RecommendationItem = {
  id: number;
  title: string;
  year: number;
  type: "movie" | "series";
  plot: string;
  posterUrl: string | null;
  distance: number;
  similarity: number;
  genres: string[] | null;
};

export type ResultsState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "error"; query: string; message: string }
  | { status: "no_match"; query: string }
  |{ status: "has_results"; query: string; items: RecommendationItem[] };

type ResultsPanelProps = {
  state: ResultsState;
};

export function ResultsPanel({ state }: ResultsPanelProps) {
    if (state.status === "idle") return null;

    if (state.status === "loading") {
    return (
        <section className="results-panel" aria-live="polite">
        <p className="results-empty">Searching for “{state.query}”…</p>
        </section>
    );
    }

    if (state.status === "error") {
    return (
        <section className="results-panel" aria-live="polite">
        <p className="results-empty">
            Something went wrong for “{state.query}”. {state.message}
        </p>
        </section>
    );
    }

  if (state.status === "no_match") {
    return (
      <section className="results-panel" aria-live="polite">
        <p className="results-empty">
          No matches for <span className="results-query">“{state.query}”</span>.
          Try another title.
        </p>
      </section>
    );
  }

  return (
    <section className="results-panel" aria-live="polite">
      <header className="results-header">
        <div>
          <h2 className="results-title">
            If you enjoyed “{state.query}” you will love:
          </h2>
        </div>
      </header>
 
      <div className="results-grid">
        {state.items.map((item, index) => (
          <RecommendationCard
            key={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}