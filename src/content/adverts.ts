import type { Advert } from "./types";

// Your projects. A project shows on the site only when its status is
// "published" AND it has a video. The first published project plays in the
// hero; the rest appear in this order in the work section.
export const adverts: Advert[] = [
  {
    slug: "dark-secret",
    status: "published",
    kind: "concept",
    title: "Dark Secret",
    category: "Product Commercial",
    duration: "0:49",
    orientation: "landscape",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary:
      "A cinematic concept advert built around a confident character, moody low-key lighting and a polished look.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1llXtYGfa8b8IUrc1-h0qICrfUsvnzKLA/view?usp=sharing",
    },
    heroVideo: { src: "/videos/dark-secret-hero.mp4", small: "/videos/dark-secret-hero-sm.mp4" },
    poster: "/posters/dark-secret.jpg",
    accent: "#b45309",
  },
  {
    slug: "iphone-17-pro-max",
    status: "published",
    kind: "concept",
    title: "iPhone 17 Pro Max — Product Reveal Concept",
    category: "Product Commercial",
    duration: undefined, // [CONFIRM] Exact final length.
    orientation: "portrait",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary: "A dark, cinematic product reveal concept for the iPhone 17 Pro Max, made for vertical social placements.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1v6uVlQEZ_nrkVXBdWgaWhUHLrz2cWzzA/view?usp=sharing",
    },
    poster: "/posters/iphone-17-pro-max.jpg",
    accent: "#ea580c",
  },
  {
    slug: "nutri-milk-product-story",
    status: "published",
    kind: "concept",
    title: "Nutri-Milk — Product Story Concept",
    category: "Product Commercial",
    // [CONFIRM] Exact final length (the brief says approximately 20 seconds).
    duration: undefined,
    orientation: "portrait",
    summary:
      "A short product-focused concept presenting a dairy drink through polished visuals and a clear advertising message.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1nTYCw2zqk1YnxkkhAsNpX5Tm8wQ9VEZV/view?usp=sharing",
    },
    poster: "/posters/nutri-milk.jpg",
    accent: "#16a34a",
  },
  {
    slug: "premier-cool-ugc",
    status: "published",
    kind: "concept",
    title: "Premier Cool — UGC-Style Concept",
    category: "UGC-Style Ad",
    // [CONFIRM] Exact final length (the brief says approximately 66 seconds).
    duration: undefined,
    orientation: "landscape",
    summary: "A creator-style testimonial concept exploring a more conversational approach to product presentation.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1b1VpVXg9jf_0SiZP0N45BQhWiA3hoBQZ/view?usp=sharing",
    },
    poster: "/posters/premier-cool.jpg",
    accent: "#0ea5e9",
  },
  {
    slug: "nike-own-your-pace",
    status: "published",
    kind: "concept",
    title: "OWN YOUR PACE — Running Shoe Commercial",
    category: "Product Commercial",
    duration: "0:39",
    orientation: "portrait",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary: "A running-shoe concept advert built around close-up product detail in a modern urban setting.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1b3r5TCluatZF8zENIpkaiKS16GgU3Nnz/view?usp=sharing",
    },
    poster: "/posters/nike-own-your-pace.jpg",
    accent: "#f97316",
  },
  {
    slug: "pepsodent-advert",
    status: "published",
    kind: "concept",
    title: "Pepsodent — Product Advert Concept",
    category: "Product Commercial",
    duration: "0:58",
    orientation: "portrait",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary: "A clean, bright bathroom-set product advert concept for Pepsodent toothpaste.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1mHIisfiEu2L5sbQANXSTfxzDUOD4Tg0R/view?usp=sharing",
    },
    poster: "/posters/pepsodent-advert.jpg",
    accent: "#2563eb",
  },
  {
    slug: "pepsodent-review",
    status: "published",
    kind: "concept",
    title: "Pepsodent — Review-Style Concept",
    category: "Review-Style Video",
    duration: "0:40",
    orientation: "portrait",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary: "A selfie-style review concept in which an AI presenter introduces Pepsodent toothpaste and its features.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1bOlhoL2lnJwr2JeUZNfxwnDtp3fiKKp4/view?usp=sharing",
    },
    poster: "/posters/pepsodent-review.jpg",
    accent: "#0ea5e9",
  },
  {
    slug: "moisturizer",
    status: "published",
    kind: "concept",
    title: "Moisturizer — Product Ad Concept",
    category: "Product Commercial",
    duration: "0:32",
    orientation: "portrait",
    // [CONFIRM] Written from the thumbnail; replace with your own description.
    summary: "A presenter-led skincare ad concept introducing a face moisturizer in a bright, natural bathroom setting.",
    video: {
      type: "drive",
      id: "https://drive.google.com/file/d/1W7oA16IV7AyuxawmZuh7avH7Vb2EbyAI/view?usp=sharing",
    },
    poster: "/posters/moisturizer.jpg",
    accent: "#d6c7b4",
  },
];

export function getPublishedAdverts() {
  return adverts.filter((a) => a.status === "published" && a.video);
}

export function statusLabel(advert: Advert) {
  return advert.kind === "concept" ? "Concept Advertisement" : "Client Project";
}
