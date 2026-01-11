import "../styles/components/title-details.css";

type Props = {
  title: {
    title: string;
    type?: "movie" | "series";
    genres?: string[] | null;
    year?: number | null;
    plot?: string | null;
    director?: string | null;
    actors?: string[] | null;
    imdb_rating?: number | null;
    imdbUrl?: string | null;
  };
  onFindMore?: () => void;
};

function formatGenresYear(genres?: string[] | null, year?: number | null): string {
  const g = (genres ?? []).filter(Boolean);
  const y = year ?? null;

  if (g.length > 0 && y) return `${g.join(", ")} • ${y}`;
  if (g.length > 0) return g.join(", ");
  if (y) return String(y);
  return "—";
}

function formatPeople(label: string, value?: string | null): string {
  const v = (value ?? "").trim();
  return v ? `${label}: ${v}` : "";
}

function formatActors(actors?: string[] | null): string {
  const a = (actors ?? []).filter(Boolean);
  return a.length > 0 ? `Actors: ${a.join(", ")}` : "";
}

function formatRating(rating?: number | null): string {
  if (rating === null || rating === undefined) return "—";
  return rating.toFixed(1);
}

export function TitleDetails({ title, onFindMore }: Props) {
  const genresYear = formatGenresYear(title.genres, title.year);
  const directorLine = formatPeople("Director", title.director);
  const actorsLine = formatActors(title.actors);

  const imdbDisabled = !title.imdbUrl;

  return (
    <div className="title-details">
      {/* Header: centered title + type badge */}
      <div className="title-details__header">
        <h2 className="title-details__title">
          <span className="title-details__title-text">{title.title}</span>
          {title.type && <span className="title-details__type">{title.type}</span>}
        </h2>
      </div>

      {/* Content: 3 columns on desktop, stacked on mobile */}
      <div className="title-details__content">
        {/* LEFT: metadata */}
        <div className="title-details__aside">
          <p className="title-details__meta">{genresYear}</p>

          {directorLine ? (
            <p className="title-details__people">{directorLine}</p>
          ) : (
            <p className="title-details__people title-details__people--empty">—</p>
          )}

          {actorsLine ? (
            <p className="title-details__people">{actorsLine}</p>
          ) : (
            <p className="title-details__people title-details__people--empty">—</p>
          )}
        </div>

        {/* MIDDLE: plot */}
        <div className="title-details__plotWrap">
          {title.plot ? (
            <p className="title-details__plot">{title.plot}</p>
          ) : (
            <p className="title-details__plot title-details__plot--empty">
              No plot available.
            </p>
          )}

          <p className="title-details__rating title-details__rating--under-plot">
            <span className="title-details__rating-label">IMDb rating</span>
            <strong className="title-details__rating-value">
              {formatRating(title.imdb_rating)}
            </strong>
          </p>
        </div>

        {/* RIGHT: buttons */}
        <div className="title-details__actions">
          <button
            type="button"
            className="title-details__button title-details__button--primary"
            onClick={onFindMore}
          >
            Find more like this
          </button>

          <a
            className={`title-details__button title-details__button--secondary ${imdbDisabled ? "is-disabled" : ""}`}
            href={title.imdbUrl ?? undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={imdbDisabled}
            onClick={(e) => {
              if (imdbDisabled) e.preventDefault();
            }}
          >
            Go to IMDb page
          </a>
        </div>
      </div>
    </div>
  );
}
