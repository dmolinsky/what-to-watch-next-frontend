import { apiGet } from "./client";

export type RecommendationItem = { title: string };

type RecommendationsResponse = Array<{ title: string }>;

export async function fetchRecommendationsByTitleId(
  titleId: string,
  limit = 5,
  signal?: AbortSignal
): Promise<RecommendationItem[]> {
  const data = await apiGet<RecommendationsResponse>(
    `/api/titles/${encodeURIComponent(titleId)}/recommendations?limit=${limit}`,
    signal
  );

  return data.slice(0, limit).map((x) => ({ title: x.title }));
}
