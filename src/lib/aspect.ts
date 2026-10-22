import type { Orientation } from "@/content/types";

// Full class names so Tailwind can find them when scanning the source.
const classes: Record<Orientation, string> = {
  landscape: "aspect-video",
  portrait: "aspect-9/16",
};

export function aspectClass(orientation: Orientation) {
  return classes[orientation];
}

export function orientationLabel(orientation: Orientation) {
  return orientation === "landscape" ? "Landscape · 16:9" : "Portrait · 9:16";
}
