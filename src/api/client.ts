const BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

export function getBaseUrl(): string {
  if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not set. Add it to .env.local.");
  }
  return BASE_URL.replace(/\/+$/, "");
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const url = getBaseUrl() + path;

  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}
