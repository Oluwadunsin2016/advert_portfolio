"use client";

import { useState } from "react";
import { statusLabel } from "@/content/adverts";
import { categories, type Advert, type Category } from "@/content/types";
import { orientationLabel } from "@/lib/aspect";
import { VideoPlayer } from "./video-player";

const filterLabels: Record<Category, string> = {
  "Product Commercial": "Product Commercials",
  "UGC-Style Ad": "UGC-Style Ads",
  "Product Explainer": "Product Explainers",
  "Review-Style Video": "Review-Style Videos",
};

export function WorkGrid({ adverts }: { adverts: Advert[] }) {
  const [filter, setFilter] = useState<Category | "All">("All");
  const used = categories.filter((c) => adverts.some((a) => a.category === c));
  const shown = filter === "All" ? adverts : adverts.filter((a) => a.category === filter);

  return (
    <div>
      {used.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
          {(["All", ...used] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
            >
              {c === "All" ? "All Work" : filterLabels[c]}
            </button>
          ))}
        </div>
      )}

      {/* Landscape videos two per row (so they're not too small), portrait
          three per row. Each keeps its real shape and the order from adverts.ts. */}
      <div className="space-y-14">
        <CardGroup
          label="Landscape · 16:9"
          adverts={shown.filter((a) => a.orientation === "landscape")}
          columns="md:grid-cols-2"
        />
        <CardGroup
          label="Portrait · 9:16"
          adverts={shown.filter((a) => a.orientation === "portrait")}
          columns="sm:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}

function CardGroup({ label, adverts, columns }: { label: string; adverts: Advert[]; columns: string }) {
  if (adverts.length === 0) return null;
  return (
    <section aria-label={label}>
      <h3 className="mb-5 text-xs tracking-widest text-muted uppercase">{label}</h3>
      <ul className={`grid gap-x-6 gap-y-12 ${columns}`}>
        {adverts.map((advert) => (
          <li key={advert.slug}>
            <ProjectCard advert={advert} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProjectCard({ advert }: { advert: Advert }) {
  if (!advert.video) return null;
  return (
    <article>
      {/* Plays right here, in the card. */}
      <VideoPlayer
        video={advert.video}
        poster={advert.poster}
        title={advert.title}
        orientation={advert.orientation}
        accent={advert.accent}
      />
      <div className="mt-4 flex flex-wrap gap-2 text-xs">
        <span className="rounded-full border border-accent/50 px-2.5 py-1 font-medium text-accent">
          {statusLabel(advert)}
        </span>
        <span className="rounded-full border border-line px-2.5 py-1 text-muted">
          {orientationLabel(advert.orientation)}
        </span>
      </div>
      <p className="mt-3 text-xs tracking-wider text-muted uppercase">
        {[advert.category, advert.duration].filter(Boolean).join(" · ")}
      </p>
      <h4 className="mt-1.5 font-display text-xl font-semibold">{advert.title}</h4>
      <p className="mt-2 text-sm text-muted">{advert.summary}</p>
    </article>
  );
}
