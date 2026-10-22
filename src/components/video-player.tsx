"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Orientation, VideoSource } from "@/content/types";
import { aspectClass } from "@/lib/aspect";
import { Poster } from "./poster";

type Props = {
  video: VideoSource;
  title: string;
  orientation: Orientation;
  poster?: string;
  accent: string;
  priority?: boolean;
  /** Fill the parent box (e.g. a device mockup's screen) instead of sizing
   *  itself from `orientation`. */
  fill?: boolean;
};

export function VideoPlayer({ video, title, orientation, poster, accent, priority, fill }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);
  const [missing, setMissing] = useState(false);
  const embedFrameRef = useRef<HTMLDivElement>(null);
  // null until measured: Drive lays itself out once, at load, so it mustn't
  // load until its final size is known.
  const [driveBox, setDriveBox] = useState<{ width: number; height: number } | null>(null);
  const driveScale = driveBox ? Math.min(1, driveBox.width / DRIVE_MIN_WIDTH) : null;
  const iframeKey = video.type !== "drive" ? "embed" : driveScale === null ? null : Math.round(driveScale * 20);

  const embedSrc = video.type === "file" ? null : embedUrl(video);

  // Next.js keeps visited pages mounted but hidden, and hidden media keeps
  // playing. Pause on hide; playback resumes from the same spot on return.
  useLayoutEffect(() => {
    const videoEl = videoRef.current;
    const iframe = iframeRef.current;
    // Drive's player can't be paused from outside, so it's unloaded on hide
    // and reloaded here when the page is shown again.
    if (iframe && embedSrc && iframe.src === "about:blank") iframe.src = embedSrc;
    return () => {
      videoEl?.pause();
      if (iframe && video.type === "drive") {
        iframe.src = "about:blank";
      } else if (iframe?.contentWindow) {
        const message =
          video.type === "youtube"
            ? JSON.stringify({ event: "command", func: "pauseVideo", args: "" })
            : JSON.stringify({ method: "pause" });
        iframe.contentWindow.postMessage(message, "*");
      }
    };
  }, [started, video.type, embedSrc, iframeKey]);

  // Drive's player crops and shifts the video in frames narrower than
  // DRIVE_MIN_WIDTH, so in small spaces (like the hero laptop) it's laid out
  // at that width and scaled down to fit. It doesn't re-lay itself out on
  // resize, so a noticeably different size reloads it (via the iframe key).
  useEffect(() => {
    const el = embedFrameRef.current;
    if (video.type !== "drive" || !el) return;
    const observer = new ResizeObserver(([entry]) =>
      setDriveBox({ width: entry.contentRect.width, height: entry.contentRect.height }),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [video.type]);

  // A missing file can fail before hydration, when onError isn't listening yet.
  useEffect(() => {
    const el = videoRef.current;
    if (el && (el.error || el.networkState === el.NETWORK_NO_SOURCE)) {
      setMissing(true);
    }
  }, []);

  const frame = fill
    ? "relative h-full w-full overflow-hidden bg-black"
    : `relative w-full overflow-hidden rounded-xl bg-black ${aspectClass(orientation)}`;

  if (video.type === "file") {
    if (missing) {
      return (
        <div className={frame}>
          <Poster poster={poster} accent={accent} title={title} />
          <div className="absolute inset-0 grid place-items-center bg-black/60 p-6 text-center text-sm text-white/80">
            <p>
              Video not found. Add it at <code className="rounded bg-white/10 px-1.5 py-0.5">public{video.src}</code>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className={frame}>
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full"
          src={video.src}
          poster={poster}
          controls
          playsInline
          preload={priority ? "auto" : "metadata"}
          onError={() => setMissing(true)}
        />
      </div>
    );
  }

  // Embeds load only after a click, which keeps third-party scripts off the
  // page until a client actually wants to watch.
  // Drive can't autoplay, so a click-to-load poster would cost an extra click.
  if (!started && video.type !== "drive") {
    return (
      <button
        type="button"
        onClick={() => setStarted(true)}
        className={`${frame} group block cursor-pointer`}
        aria-label={`Play ${title}`}
      >
        <Poster poster={poster} accent={accent} title={title} priority={priority} />
        <PlayBadge />
      </button>
    );
  }

  return (
    <div ref={embedFrameRef} className={frame}>
      {iframeKey !== null && (
        <iframe
          key={iframeKey}
          ref={iframeRef}
          className="absolute inset-0 h-full w-full"
          style={
            driveBox && driveScale !== null && driveScale < 1
              ? { width: DRIVE_MIN_WIDTH, height: driveBox.height / driveScale, zoom: driveScale }
              : undefined
          }
          src={embedSrc ?? undefined}
          // Players further down the page (e.g. in the work grid) load only
          // as they're scrolled near.
          loading={priority ? undefined : "lazy"}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
        />
      )}
    </div>
  );
}

const DRIVE_MIN_WIDTH = 360;

function embedUrl(video: Exclude<VideoSource, { type: "file" }>) {
  switch (video.type) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;
    case "vimeo":
      return `https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`;
    case "drive":
      return `https://drive.google.com/file/d/${driveFileId(video.id)}/preview`;
  }
}

/** Accepts a bare file ID or a full Drive share link. */
function driveFileId(idOrLink: string) {
  return idOrLink.match(/\/d\/([\w-]+)/)?.[1] ?? idOrLink.match(/[?&]id=([\w-]+)/)?.[1] ?? idOrLink;
}

export function PlayBadge() {
  return (
    <span className="absolute inset-0 grid place-items-center">
      <span className="grid size-16 place-items-center rounded-full bg-white/90 text-black shadow-xl transition-transform duration-300 group-hover:scale-110 sm:size-20">
        <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-current" aria-hidden>
          <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14Z" />
        </svg>
      </span>
    </span>
  );
}
