import { cacheLife, cacheTag } from "next/cache";
import { adverts as builtInAdverts } from "./adverts";
import type { Advert } from "./types";

/** Cache tag the dashboard's API clears (via /api/revalidate) when adverts change. */
export const ADVERTS_TAG = "adverts";

const publishedBuiltIn = () => builtInAdverts.filter((a) => a.status === "published" && a.video);

/**
 * Published adverts, in portfolio order. With PORTFOLIO_API_URL set they come
 * from the dashboard's API; without it (or if the API is down) the built-in
 * list in adverts.ts is used, so the site always has something to show.
 */
export async function getPublishedAdverts(): Promise<Advert[]> {
  "use cache";
  cacheTag(ADVERTS_TAG);

  const apiUrl = process.env.PORTFOLIO_API_URL?.replace(/\/$/, "");
  if (!apiUrl) {
    cacheLife("hours");
    return publishedBuiltIn();
  }

  try {
    const res = await fetch(`${apiUrl}/api/adverts`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const adverts = (await res.json()) as Advert[];
    // The dashboard refreshes this on every change; hourly is just a backstop.
    cacheLife("hours");
    return adverts;
  } catch (err) {
    console.error("Couldn't load adverts from the API; showing the built-in list.", err);
    // Try the API again soon rather than keeping the fallback for an hour.
    cacheLife("minutes");
    return publishedBuiltIn();
  }
}
