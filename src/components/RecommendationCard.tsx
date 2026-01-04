import "../styles/components/recommendation-card.css";

type RecommendationCardProps = {
  title: string;
  index: number;
};

export function RecommendationCard({ title, index }: RecommendationCardProps) {
  return (
    <article
      className="rec-card rec-card--enter"
      style={{ animationDelay: `${index * 90}ms` }}
      aria-label={`Recommendation: ${title}`}
    >
      <h3 className="rec-title">{title}</h3>
    </article>
  );
}