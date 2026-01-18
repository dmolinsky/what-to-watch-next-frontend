import { apiGet } from "./client";

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
  imdbId: string | null;

  posterUrl: string | null;

  distance: number;
  similarity: number;
};

type RecommendationsResponse = RecommendationItem[];

export async function fetchRecommendationsByTitleId(
  titleId: string,
  limit = 8,
  signal?: AbortSignal
): Promise<RecommendationItem[]> {
  return apiGet<RecommendationsResponse>(
    `/api/titles/${encodeURIComponent(titleId)}/recommendations?limit=${limit}`,
    signal
  );
}