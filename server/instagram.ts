/**
 * Serviço para buscar posts do Instagram via Graph API.
 * Usa cache em memória (TTL configurável) para reduzir chamadas à API e custos.
 * Atualiza no mesmo dia - configurar CACHE_TTL_HOURS (ex: 6 ou 12) para balancear frescor vs custo.
 */

const INSTAGRAM_GRAPH_URL = "https://graph.facebook.com/v21.0";
const CACHE_TTL_MS = (parseInt(process.env.INSTAGRAM_CACHE_TTL_HOURS || "6", 10) || 6) * 60 * 60 * 1000;
const MEDIA_LIMIT = 9;

export interface InstagramPost {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

let cache: { posts: InstagramPost[]; expiresAt: number } | null = null;

async function fetchFromGraphApi<T>(path: string, params?: Record<string, string>): Promise<T> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    return { data: [] } as T;
  }

  const url = new URL(`${INSTAGRAM_GRAPH_URL}/${path}`);
  url.searchParams.set("access_token", token);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }

  const res = await fetch(url.toString());

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram API error: ${res.status} ${err}`);
  }

  return res.json() as Promise<T>;
}

/**
 * Busca os últimos posts do Instagram.
 * Usa cache em memória com TTL (padrão 6h) para evitar excesso de chamadas à API.
 */
export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) {
    return cache.posts;
  }

  const userId = process.env.INSTAGRAM_USER_ID;
  if (!userId || !process.env.INSTAGRAM_ACCESS_TOKEN) {
    return [];
  }

  const mediaResponse = await fetchFromGraphApi<{ data: Array<{ id: string }> }>(
    `${userId}/media`,
    {
      fields: "id,media_type,media_url,thumbnail_url,permalink",
      limit: String(MEDIA_LIMIT),
    }
  );

  const items = mediaResponse.data ?? [];
  const posts: InstagramPost[] = items
    .filter((item: any) => item.media_url || item.thumbnail_url)
    .map((item: any) => ({
      id: item.id,
      media_type: item.media_type || "IMAGE",
      media_url: item.media_url || item.thumbnail_url || "",
      thumbnail_url: item.thumbnail_url,
      permalink: item.permalink || `https://www.instagram.com/p/${item.id}/`,
    }));

  cache = {
    posts,
    expiresAt: now + CACHE_TTL_MS,
  };

  return posts;
}
