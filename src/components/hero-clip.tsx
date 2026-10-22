"use client";

import { useLayoutEffect, useRef } from "react";

type Props = { src: string; small?: string; poster?: string; label: string };

/** Muted, looping, control-free video that plays only while it's on screen.
 *  Visitors who've asked their system to reduce motion just see the poster. */
export function HeroClip({ src, small, poster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  // A layout effect so its cleanup also runs when Next.js hides this page on
  // navigation (hidden videos otherwise keep playing).
  useLayoutEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
    >
      {small && <source src={small} type="video/mp4" media="(max-width: 767px)" />}
      <source src={src} type="video/mp4" />
    </video>
  );
}
