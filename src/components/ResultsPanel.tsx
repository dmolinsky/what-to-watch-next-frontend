import "../styles/components/results-panel.css";
import { RecommendationCard } from "./RecommendationCard";
import { TitleDetails } from "./TitleDetails";
import { useEffect, useRef } from "react";

export type RecommendationItem = {
  id: number;
  title: string;
  year: number | null;
  type: "movie" | "series";
  genres: string[] | null;

  plot: string | null;

  directors: string | null;
  actors: string[] | null;

  imdbRating: number | null;

  posterUrl: string | null;

  distance: number;
  similarity: number;
};

export type ResultsState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "error"; query: string; message: string }
  | { status: "no_match"; query: string }
  | { status: "has_results"; query: string; items: RecommendationItem[] };

type ResultsPanelProps = {
  state: ResultsState;
  selectedTitle: RecommendationItem | null;
  onSelectTitle: (title: RecommendationItem | null) => void;
};

export function ResultsPanel({
  state,
  selectedTitle,
  onSelectTitle,
}: ResultsPanelProps) {
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!selectedTitle) return;

    detailsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [selectedTitle?.id]);

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
      <div className="results-grid">
        {state.items.map((item, index) => (
          <RecommendationCard
            key={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            index={index}
            onSelect={() => onSelectTitle(item)}
          />
        ))}
      </div>

      {selectedTitle && (
        <div ref={detailsRef}>
          <TitleDetails
            title={{
              title: selectedTitle.title,
              type: selectedTitle.type,
              genres: selectedTitle.genres,
              year: selectedTitle.year,
              plot: selectedTitle.plot,
              director: selectedTitle.directors,
              actors: selectedTitle.actors,
              imdb_rating: selectedTitle.imdbRating,
            }}
          />
        </div>
      )}
    </section>
  );
}
