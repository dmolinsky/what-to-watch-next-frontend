import "../styles/components/recommendation-card.css";

type RecommendationCardProps = {
  title: string;
  posterUrl?: string | null;
  index: number;
};

export function RecommendationCard({ title, posterUrl, index }: RecommendationCardProps) {
  return (
    <article
      className="rec-card rec-card--enter"
      style={{ animationDelay: `${index * 90}ms` }}
      aria-label={`Recommendation: ${title}`}
    >
      <div className="rec-card-outer">
        <div className="rec-card-inner">
          <div className="rec-poster">
            {posterUrl ? (
              <img
                className="rec-img"
                src={posterUrl}
                alt={`Poster for ${title}`}
                loading="lazy"
              />
            ) : (
              <div className="rec-img rec-img--fallback" />
            )}

            <div className="rec-title-overlay">
              <h3 className="rec-title">{title}</h3>
            </div>
          </div>
        </div>

        <div className="rec-3d-right" aria-hidden="true" />
        <div className="rec-3d-bottom" aria-hidden="true" />
      </div>
    </article>
  );
}
