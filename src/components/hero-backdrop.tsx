"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { statusLabel } from "@/content/adverts";
import type { Advert } from "@/content/types";
import { Poster } from "./poster";

/**
 * The starred advert as the hero's background: a muted, looping video that
 * fades into the page through gradient overlays in the page colour. Embeds (Drive, YouTube,
 * Vimeo) can't play as a background, so those show their thumbnail instead.
 * Visitors who've asked their system to reduce motion also see the thumbnail.
 */
export function HeroBackdrop({ advert }: { advert: Advert }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const clip = advert.heroVideo;

  // A layout effect so its cleanup also runs when Next.js hides this page on
  // navigation (hidden videos otherwise keep playing). Plays only on screen.
  useLayoutEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  function toggleSound() {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted) video.play().catch(() => {});
  }

  const box = advert.orientation === "portrait" ? "lg:w-[min(44%,34rem)]" : "lg:w-[min(66%,72rem)]";

  return (
    <>
      <div className={`absolute inset-0 -z-10 lg:left-auto ${box}`}>
        {clip ? (
          <video
            ref={ref}
            className="absolute inset-0 h-full w-full object-cover"
            poster={advert.poster}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            disableRemotePlayback
            aria-label={`${advert.title} (preview)`}
          >
            {clip.small && <source src={clip.small} type="video/mp4" media="(max-width: 767px)" />}
            <source src={clip.src} type="video/mp4" />
          </video>
        ) : (
          <Poster poster={advert.poster} accent={advert.accent} title={advert.title} priority sizes="70vw" />
        )}
        {/* Fades the edges into the page: top and bottom everywhere, the left
            edge (behind the text) on desktop. Overlays rather than a CSS mask,
            so every browser shows the same fade. */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-1/4 bg-linear-to-b from-bg to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-bg via-bg/60 to-transparent" />
        <div aria-hidden className="absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-bg via-bg/80 to-transparent lg:block" />
        <div aria-hidden className="absolute inset-y-0 right-0 hidden w-1/6 bg-linear-to-l from-bg/70 to-transparent lg:block" />
      </div>

      {/* Darkens the video behind the text on small screens */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-bg via-bg/75 to-bg/20 lg:hidden"
      />

      <div className="absolute right-4 bottom-5 left-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm sm:right-6 sm:left-auto lg:right-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] lg:bottom-8">
        <span className="rounded-full border border-line bg-bg/70 px-2.5 py-0.5 text-xs text-muted backdrop-blur">
          {statusLabel(advert)}
        </span>
        <span className="max-w-[18rem] truncate text-fg/90 sm:max-w-sm">{advert.title}</span>
        {clip && (
          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? "Turn sound on" : "Turn sound off"}
            className="grid size-9 place-items-center rounded-full border border-line bg-bg/70 backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              {muted ? (
                <path d="m22 9-6 6M16 9l6 6" />
              ) : (
                <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
              )}
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
