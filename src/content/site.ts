// Who you are and how clients reach you. Items marked [CONFIRM] or [REPLACE]
// need checking before the site goes public.
export const site = {
  // [REPLACE] Your name or portfolio brand.
  name: "Stephen Oluwagbemiga",
  title: "AI Advertisement Creator",
  description:
    "AI Advertisement Creator | AI Product Commercials & UGC-Style Video Ads",
  /** Your photo in /public. Set to undefined to show a placeholder. */
  photo: "/portrait.jpg" as string | undefined,
  email: "Oluwadunsin2016@gmail.com",
  // [CONFIRM] Is this the number clients should use, and is it on WhatsApp?
  phone: "08168225901" as string | undefined,
  /** Social profile links, e.g. { label: "Instagram", href: "https://..." }. */
  socials: [] as { label: string; href: string }[],
  copyrightYear: 2026,
};

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  // { label: "Pricing", href: "/#pricing" }, // Pricing section is hidden for now
  { label: "About", href: "/#about" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];
