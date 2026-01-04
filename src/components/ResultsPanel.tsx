import "../styles/components/results-panel.css";
import { RecommendationCard } from "./RecommendationCard";

export type RecommendationItem = {
  title: string;
};

export type ResultsState =
  | { status: "idle" }
  | { status: "no_match"; query: string }
  | { status: "has_results"; query: string; items: RecommendationItem[] };

type ResultsPanelProps = {
  state: ResultsState;
};

export function ResultsPanel({ state }: ResultsPanelProps) {
  if (state.status === "idle") return null;

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
          <h2 className="results-title">Recommendations based on “{state.query}”</h2>
        </div>
      </header>
 
      <div className="results-grid">
        {state.items.map((item, index) => (
        <RecommendationCard
            key={item.title}
            title={item.title}
            index={index}
        />
        ))}
      </div>
    </section>
  );
}