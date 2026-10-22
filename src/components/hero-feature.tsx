import { statusLabel } from "@/content/adverts";
import type { Advert } from "@/content/types";
import { HeroClip } from "./hero-clip";
import { MacbookMockup } from "./macbook-mockup";
import { Poster } from "./poster";
import { VideoPlayer } from "./video-player";

// How the video sits on the 16:10 screen: landscape fills the width,
// portrait fills the height.
const screenFit = {
  landscape: "w-full aspect-video",
  portrait: "h-full aspect-9/16",
} as const;

/** The hero's one visual: the strongest advert (the first published one in
 *  adverts.ts), playable on a MacBook screen. */
export function HeroFeature({ advert }: { advert: Advert }) {
  if (!advert.video) return null;
  return (
    <figure>
      <MacbookMockup>
        {/* Blurred thumbnail fills the screen around portrait videos. */}
        <div aria-hidden className="absolute inset-0 scale-125 opacity-50 blur-2xl">
          <Poster poster={advert.poster} accent={advert.accent} title="" sizes="200px" />
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className={`relative max-h-full max-w-full ${screenFit[advert.orientation]}`}>
            {advert.heroVideo ? (
              <HeroClip
                src={advert.heroVideo.src}
                small={advert.heroVideo.small}
                poster={advert.poster}
                label={`${advert.title} (preview)`}
              />
            ) : (
              <VideoPlayer
                fill
                video={advert.video}
                poster={advert.poster}
                title={advert.title}
                orientation={advert.orientation}
                accent={advert.accent}
                priority
              />
            )}
          </div>
        </div>
      </MacbookMockup>
      <figcaption className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted">
        <span className="rounded-full border border-line px-2.5 py-0.5 text-xs">{statusLabel(advert)}</span>
        <span className="text-fg">{advert.title}</span>
      </figcaption>
    </figure>
  );
}
