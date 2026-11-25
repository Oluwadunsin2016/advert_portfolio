import { cacheLife, cacheTag } from "next/cache";

// Hero, Services, About and Pricing text, edited from the dashboard. The defaults below
// are shown when the dashboard's API isn't configured or can't be reached;
// keep them in step with the backend's (server/app/models/siteContent.js).

export type HeroContent = {
  eyebrow: string;
  headline: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  tagline: string;
};

export type ServiceItem = {
  title: string;
  summary: string;
  includes: string;
  bestFor: string;
  /** Small print under the card. Empty = none. */
  note: string;
  /** false shows the card as "Coming soon". */
  available: boolean;
};

export type ServicesContent = { eyebrow: string; title: string; intro: string; items: ServiceItem[] };

export type AboutContent = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  /** null = the bundled photo in /public. */
  photo: { url: string } | null;
  badge: string;
  showBadge: boolean;
};

export type PricingPlan = { name: string; price: string; service: string; features: string[] };

export type PricingContent = {
  visible: boolean;
  eyebrow: string;
  title: string;
  intro: string;
  showPrices: boolean;
  plans: PricingPlan[];
  notes: string[];
};

export type SiteContent = { hero: HeroContent; services: ServicesContent; about: AboutContent; pricing: PricingContent };

/** Cache tag the dashboard's API clears (via /api/revalidate) when content changes. */
export const CONTENT_TAG = "site-content";

export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "AI-Powered Video Advertising",
    headline: "Make Your Product Impossible to Ignore.",
    intro:
      "I create AI-powered product commercials, UGC-style video ads and product explainers that turn ideas into polished visual stories, built around your brand, your audience and your goals.",
    primaryCta: "Watch My Work",
    secondaryCta: "Start a Project",
    tagline: "Creative concepts • AI video production • Editing & sound",
  },
  services: {
    eyebrow: "Services",
    title: "What I Create",
    intro:
      "From creator-style product videos to cinematic commercials, choose the format that fits your product and campaign.",
    items: [
      {
        title: "AI UGC-Style Video Ads",
        summary: "Creator-style videos designed to feel conversational, relatable and native to social platforms.",
        includes:
          "AI-generated presenter or character, hook, scripted product introduction, product-use or demonstration scenes, captions, music and editing.",
        bestFor: "Social-first campaigns, product introductions, simple demonstrations and creator-style creative testing.",
        note: "These are UGC-style productions, not genuine customer-generated content.",
        available: true,
      },
      {
        title: "AI Product Commercials",
        summary: "Product-focused ads built around visual storytelling, cinematic scenes and a polished final reveal.",
        includes:
          "Concept development, scene planning, AI-generated visuals, product-reference matching, editing, sound design, music and end-card typography.",
        bestFor: "Product launches, brand campaigns, social media promotions and premium product presentation.",
        note: "",
        available: true,
      },
      {
        title: "Product Explainer Videos",
        summary: "Clear, structured videos that explain what a product is, how it works, or which features matter.",
        includes: "Script, feature-led scenes, AI presenter or voice-over if agreed, on-screen labels, captions and editing.",
        bestFor: "Products that need a little explanation before a buyer understands their value.",
        note: "",
        available: true,
      },
      {
        title: "Product Review-Style Videos",
        summary:
          "Informational, review-format videos that discuss supplied product details, features, and relevant pros or limitations.",
        includes:
          "A structured script, product close-ups, feature demonstrations, comparison points when evidence is supplied, and captions.",
        bestFor: "Products whose features and trade-offs are worth walking through.",
        note: "An AI presenter can't claim personal use or first-hand experience. Product claims must be supplied and supportable, and promotional content is disclosed where required.",
        available: true,
      },
      {
        title: "Short-Form Cutdowns",
        summary: "Shorter edits made from an approved main advert for different social placements.",
        includes: "Alternate duration, opening hook, text layout or aspect ratio, within the agreed scope.",
        bestFor: "Running one campaign across several platforms and placements.",
        note: "",
        available: true,
      },
    ],
  },
  about: {
    eyebrow: "About",
    title: "The Creator Behind the Concepts",
    paragraphs: [
      "I'm an AI advertisement creator focused on turning product ideas into engaging video concepts. My work combines creative development, AI-generated visuals and video editing to explore different ways a product can be presented, from creator-style social ads to cinematic commercials.",
      "I care about clear storytelling, product-focused visuals, and a finished video that feels intentional from the opening shot to the final frame. If you have a product to introduce, explain or promote, I'd be glad to discuss a creative direction that fits your goals.",
    ],
    photo: null,
    badge: "Taking new projects",
    showBadge: true,
  },
  pricing: {
    visible: false,
    eyebrow: "Pricing",
    title: "Clear Starting Prices. Creative Built Around Your Product.",
    intro:
      "Choose a starting package below. Every project is scoped around your product, creative direction, duration and delivery needs. If your idea needs a more involved production, request a custom quote.",
    showPrices: true,
    plans: [
      {
        name: "AI UGC-Style Video Ads",
        price: "From $50",
        service: "UGC-style ad",
        features: [
          "15–30 seconds",
          "One short scripted concept",
          "AI-generated presenter or character",
          "Basic editing and captions",
          "One revision round",
        ],
      },
      {
        name: "AI Product Showcase Ads",
        price: "From $75",
        service: "Product commercial",
        features: [
          "10–20 seconds",
          "Product-focused visuals",
          "Basic transitions and music",
          "Simple end text",
          "One revision round",
        ],
      },
      {
        name: "AI Product Explainer / Review-Style Videos",
        price: "From $100",
        service: "Product explainer",
        features: [
          "30–60 seconds",
          "Feature-led script based on supplied information",
          "AI presenter or visual demonstration if agreed",
          "Captions and basic editing",
          "One revision round",
        ],
      },
      {
        name: "Cinematic AI Product Commercials",
        price: "From $150",
        service: "Product commercial",
        features: [
          "20–30 seconds",
          "Original concept and scene planning",
          "Multiple connected AI scenes",
          "Editing and sound design",
          "Two revision rounds",
        ],
      },
      {
        name: "Multi-Scene Campaigns",
        price: "From $250",
        service: "Multi-scene campaign",
        features: [
          "Multiple connected scenes or video segments",
          "Scope, deliverables and revision rounds agreed in your quote",
        ],
      },
    ],
    notes: [
      "Prices are starting points. Final quotes depend on duration, complexity, number of scenes, versions and turnaround time.",
      "Product samples, accurate reference images, product claims, brand guidelines and required copy should be supplied or approved by you.",
      "Additional revisions, rush delivery, multiple aspect ratios, raw project files, extra versions or extended usage rights may cost extra.",
      "Each quote states whether voice-over, music licensing, captions and paid-ad usage are included.",
      "A revision is a reasonable adjustment to the approved direction. A new concept or substantial script change may need a new quote.",
    ],
  },
};

/**
 * The site's editable content. With PORTFOLIO_API_URL set it comes from the
 * dashboard's API; otherwise (or if the API is down) the defaults above.
 */
export async function getSiteContent(): Promise<SiteContent> {
  "use cache";
  cacheTag(CONTENT_TAG);

  const apiUrl = process.env.PORTFOLIO_API_URL?.replace(/\/$/, "");
  if (!apiUrl) {
    cacheLife("hours");
    return defaultContent;
  }

  try {
    const res = await fetch(`${apiUrl}/api/content`, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    const data = (await res.json()) as Partial<SiteContent>;
    cacheLife("hours");
    // Missing sections or fields fall back to the defaults.
    return {
      hero: { ...defaultContent.hero, ...data.hero },
      services: { ...defaultContent.services, ...data.services },
      about: { ...defaultContent.about, ...data.about },
      pricing: { ...defaultContent.pricing, ...data.pricing },
    };
  } catch (err) {
    console.error("Couldn't load site content from the API; showing the defaults.", err);
    cacheLife("minutes");
    return defaultContent;
  }
}
