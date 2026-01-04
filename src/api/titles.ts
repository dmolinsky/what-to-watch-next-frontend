import { apiGet } from "./client";

export type TitleLookupResponse = {
  id: number | string;
  title?: string;
};

export async function lookupTitleId(
  title: string,
  signal?: AbortSignal
): Promise<string | null> {
  const encoded = encodeURIComponent(title.trim());
  try {
    const data = await apiGet<TitleLookupResponse>(`/api/titles/lookup?title=${encoded}`, signal);
    return data?.id != null ? String(data.id) : null;
  } catch (err) {
    // If backend returns 404 for not found, we treat it as "no match"
    if (err instanceof Error && err.message.startsWith("API error 404")) {
      return null;
    }
    throw err;
  }
}
