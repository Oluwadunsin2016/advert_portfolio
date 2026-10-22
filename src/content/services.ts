// Only list services you can deliver consistently. Set `available: false`
// to show a service as "Coming soon", or delete it to hide it.
export const services = [
  {
    id: "ugc",
    title: "AI UGC-Style Video Ads",
    summary:
      "Creator-style videos designed to feel conversational, relatable and native to social platforms.",
    includes:
      "AI-generated presenter or character, hook, scripted product introduction, product-use or demonstration scenes, captions, music and editing.",
    bestFor:
      "Social-first campaigns, product introductions, simple demonstrations and creator-style creative testing.",
    note: "These are UGC-style productions, not genuine customer-generated content.",
    available: true,
  },
  {
    id: "commercial",
    title: "AI Product Commercials",
    summary:
      "Product-focused ads built around visual storytelling, cinematic scenes and a polished final reveal.",
    includes:
      "Concept development, scene planning, AI-generated visuals, product-reference matching, editing, sound design, music and end-card typography.",
    bestFor:
      "Product launches, brand campaigns, social media promotions and premium product presentation.",
    note: undefined,
    available: true,
  },
  {
    id: "explainer",
    title: "Product Explainer Videos",
    summary:
      "Clear, structured videos that explain what a product is, how it works, or which features matter.",
    includes:
      "Script, feature-led scenes, AI presenter or voice-over if agreed, on-screen labels, captions and editing.",
    bestFor: "Products that need a little explanation before a buyer understands their value.",
    note: undefined,
    available: true,
  },
  {
    id: "review",
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
    id: "cutdowns",
    title: "Short-Form Cutdowns",
    summary: "Shorter edits made from an approved main advert for different social placements.",
    includes: "Alternate duration, opening hook, text layout or aspect ratio, within the agreed scope.",
    bestFor: "Running one campaign across several platforms and placements.",
    note: undefined,
    available: true,
  },
];

/** Options for the "Service needed" field on the contact form. */
export const enquiryServices = [
  "UGC-style ad",
  "Product commercial",
  "Product explainer",
  "Review-style video",
  "Multi-scene campaign",
  "Not sure yet",
];

export const process = [
  {
    title: "Discover",
    body: "We discuss your product, audience, campaign goal, platform, references and deliverables.",
  },
  {
    title: "Develop",
    body: "I shape the concept and agree on the message, script or scene plan, and visual direction before production.",
  },
  {
    title: "Produce",
    body: "I generate the agreed AI visuals and scenes, using supplied product references and approved creative direction.",
  },
  {
    title: "Refine",
    body: "I assemble the edit, refine pacing and transitions, add agreed sound and text, and check continuity and product details.",
  },
  {
    title: "Deliver",
    body: "You receive the agreed final files in the specified format, with the included revision round(s) handled according to the project scope.",
  },
];
