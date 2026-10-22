import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { ADVERTS_TAG } from "@/content/get-adverts";

/**
 * Called by the dashboard's API whenever adverts change, so the portfolio
 * shows the change on the next visit instead of waiting for its cache to expire.
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = request.headers.get("x-revalidate-secret") ?? "";
  if (!secret || !safeEqual(given, secret)) {
    return Response.json({ revalidated: false }, { status: 401 });
  }
  // expire: 0 = the next visitor gets fresh data, not the old list.
  revalidateTag(ADVERTS_TAG, { expire: 0 });
  return Response.json({ revalidated: true });
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}
