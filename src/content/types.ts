export type VideoSource =
  /** A file in /public (e.g. "/videos/spot.mp4") or any direct MP4 URL. */
  | { type: "file"; src: string }
  /** The ID from a YouTube URL, e.g. "dQw4w9WgXcQ". */
  | { type: "youtube"; id: string }
  /** The numeric ID from a Vimeo URL, e.g. "76979871". */
  | { type: "vimeo"; id: string }
  /** A Google Drive share link, or just the file ID from it. The file must be
   *  shared as "Anyone with the link". */
  | { type: "drive"; id: string };

/** "landscape" is 16:9 (e.g. YouTube, TV); "portrait" is 9:16 (Reels, TikTok, Shorts). */
export type Orientation = "landscape" | "portrait";

/** Used for the portfolio filters. Filters only appear for categories in use. */
export const categories = [
  "Product Commercial",
  "UGC-Style Ad",
  "Product Explainer",
  "Review-Style Video",
] as const;

export type Category = (typeof categories)[number];

export type Advert = {
  /** A unique ID: lowercase and hyphenated, e.g. "dark-secret". */
  slug: string;
  /** "draft" keeps a project off the site until its final video is ready. */
  status: "published" | "draft";
  /**
   * "concept": independent spec work, labelled "Concept Advertisement" with a
   * note that the brand did not commission or endorse it.
   * "client": only for work a client actually commissioned.
   */
  kind: "concept" | "client";
  title: string;
  category: Category;
  year?: number;
  /** Exact final length, e.g. "0:20". Leave out until confirmed. */
  duration?: string;
  orientation: Orientation;
  /** One sentence shown on the card. */
  summary: string;
  video?: VideoSource;
  /**
   * Muted MP4 copies in /public for the hero, which autoplays while in view.
   * (Drive players can't autoplay or hide their controls.) `small` is used on
   * phones. Only needed for the project shown in the hero.
   */
  heroVideo?: { src: string; small?: string };
  /** Plays in the hero. Set from the dashboard; otherwise the first advert is used. */
  featured?: boolean;
  /** Thumbnail image (path in /public or a full URL). Falls back to a gradient in `accent`. */
  poster?: string;
  /** Colour used for the fallback poster. */
  accent: string;
};
