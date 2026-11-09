import Link from "next/link";
import { getPublishedAdverts } from "@/content/get-adverts";
import type { Orientation } from "@/content/types";
import { SectionHeading } from "./section-heading";
import { WorkGrid } from "./work-grid";

const copy: Record<Orientation, { title: string; intro: string }> = {
  landscape: {
    title: "Landscape Work",
    intro: "Every 16:9 advert, made for websites, YouTube and widescreen placements.",
  },
  portrait: {
    title: "Portrait Work",
    intro: "Every 9:16 advert, made for TikTok, Reels, Shorts and other vertical feeds.",
  },
};

/** The full list of one shape of advert (/work/landscape, /work/portrait). */
export async function OrientationPage({ orientation }: { orientation: Orientation }) {
  const adverts = (await getPublishedAdverts()).filter((a) => a.orientation === orientation);
  const { title, intro } = copy[orientation];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10 pb-20 sm:px-6">
      <Link
        href="/#work"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
      >
        <span aria-hidden>←</span> Back to home
      </Link>
      <SectionHeading eyebrow="Portfolio" title={title} intro={intro} />
      {adverts.length > 0 ? (
        <WorkGrid adverts={adverts} />
      ) : (
        <p className="text-muted">No {orientation} videos yet.</p>
      )}
      <p className="mt-12 max-w-3xl border-l-2 border-accent/60 pl-4 text-sm text-muted">
        Projects labelled <strong className="text-fg">Concept Advertisement</strong> are independent spec work made to
        demonstrate different approaches to AI-powered product advertising. They were not commissioned or endorsed by
        the brands shown.
      </p>
    </section>
  );
}
