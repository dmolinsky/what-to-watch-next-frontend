import { apiGet } from "./client";

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

type RecommendationsResponse = RecommendationItem[];

export async function fetchRecommendationsByTitleId(
  titleId: string,
  limit = 6,
  signal?: AbortSignal
): Promise<RecommendationItem[]> {
  return apiGet<RecommendationsResponse>(
    `/api/titles/${encodeURIComponent(titleId)}/recommendations?limit=${limit}`,
    signal
  );
}
