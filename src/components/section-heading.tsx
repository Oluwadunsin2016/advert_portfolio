export function SectionHeading({
  eyebrow,
  title,
  intro,
  centered,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-sm font-medium tracking-widest text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
    </div>
  );
}
