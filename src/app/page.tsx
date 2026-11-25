import { ChooseServiceLink } from "@/components/choose-service-link";
import { ContactForm } from "@/components/contact-form";
import { HeroBackdrop } from "@/components/hero-backdrop";
import { Portrait } from "@/components/portrait";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "@/components/work-grid";
import { getPublishedAdverts } from "@/content/get-adverts";
import { faq } from "@/content/faq";
import { process } from "@/content/services";
import { site } from "@/content/site";
import { getSiteContent } from "@/content/site-content";

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default async function Home() {
  const [adverts, { hero, services, about, pricing }] = await Promise.all([getPublishedAdverts(), getSiteContent()]);
  const heroAdvert = adverts.find((a) => a.featured) ?? adverts[0];

  return (
    <>
      {/* Hero: the starred advert plays as a faded background, with the text over it */}
      <section className="relative isolate overflow-hidden">
        {heroAdvert && <HeroBackdrop advert={heroAdvert} />}
        <div
          className={`${container} flex min-h-[calc(100svh-4rem)] items-end pt-40 pb-28 lg:min-h-[44rem] lg:items-center lg:pt-24 lg:pb-32`}
        >
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
            {hero.eyebrow && (
              <p className="mb-5 text-sm font-medium tracking-widest text-accent uppercase">{hero.eyebrow}</p>
            )}
            <h1 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl">
              {hero.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-fg/75 lg:mx-0">{hero.intro}</p>
            <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
              <a href="#work" className="rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90">
                {hero.primaryCta}
              </a>
              <a
                href="#contact"
                className="rounded-full border border-fg/25 bg-bg/40 px-6 py-3 font-medium backdrop-blur hover:border-fg"
              >
                {hero.secondaryCta}
              </a>
            </div>
            {hero.tagline && <p className="mt-8 text-sm text-fg/60">{hero.tagline}</p>}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className={`${container} py-20`}>
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          intro="A selection of AI-powered advertising concepts exploring product storytelling, cinematic visuals and creator-style formats."
        />
        <WorkGrid adverts={adverts} preview />
        <p className="mt-12 max-w-3xl border-l-2 border-accent/60 pl-4 text-sm text-muted">
          Projects labelled <strong className="text-fg">Concept Advertisement</strong> are independent spec work made to
          demonstrate different approaches to AI-powered product advertising. They were not commissioned or endorsed
          by the brands shown.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-line bg-surface">
        <div className={`${container} py-24`}>
          <SectionHeading eyebrow={services.eyebrow} title={services.title} intro={services.intro || undefined} />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.items.map((s, i) => (
              <li key={i} className="flex flex-col rounded-xl border border-line bg-bg p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  {!s.available && (
                    <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-3 text-muted">{s.summary}</p>
                {(s.includes || s.bestFor) && (
                  <dl className="mt-6 space-y-4 border-t border-line pt-5 text-sm">
                    {s.includes && (
                      <div>
                        <dt className="font-medium">May include</dt>
                        <dd className="mt-1 text-muted">{s.includes}</dd>
                      </div>
                    )}
                    {s.bestFor && (
                      <div>
                        <dt className="font-medium">Best for</dt>
                        <dd className="mt-1 text-muted">{s.bestFor}</dd>
                      </div>
                    )}
                  </dl>
                )}
                {s.note && <p className="mt-5 text-xs text-muted italic">{s.note}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section id="process" className={`${container} py-24`}>
        <SectionHeading
          eyebrow="Process"
          title="From First Idea to Final Cut"
          intro="A clear process keeps the creative focused, the production organised and expectations aligned."
        />
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-5">
          {process.map((step, i) => (
            <li key={step.title} className="bg-bg p-6">
              <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-lg">
          Have a project in mind?{" "}
          <a href="#contact" className="font-medium text-accent underline-offset-4 hover:underline">
            Start with a brief →
          </a>
        </p>
      </section>

      {/* Pricing: switched on and edited in the dashboard */}
      {pricing.visible && pricing.plans.length > 0 && (
        <section id="pricing" className="border-y border-line bg-surface">
          <div className={`${container} py-24`}>
            <SectionHeading eyebrow={pricing.eyebrow} title={pricing.title} intro={pricing.intro || undefined} />
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pricing.plans.map((p) => (
                <li key={p.name} className="flex flex-col rounded-xl border border-line bg-bg p-6">
                  <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                  <p className="mt-3 font-display text-2xl font-bold text-accent">
                    {pricing.showPrices && p.price ? p.price : "Request a quote"}
                  </p>
                  <ul className="mt-5 mb-8 space-y-2 text-sm text-muted">
                    {p.features.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden className="text-accent">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <ChooseServiceLink service={p.service}>Request a Quote</ChooseServiceLink>
                </li>
              ))}
            </ul>
            {pricing.notes.length > 0 && (
              <ul className="mt-10 grid gap-2 text-sm text-muted md:grid-cols-2">
                {pricing.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span aria-hidden>•</span>
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* About */}
      <section id="about" className={`${container} grid items-center gap-14 py-24 lg:grid-cols-[0.75fr_1.25fr]`}>
        <Portrait about={about} />
        <div className="max-w-3xl">
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="space-y-5 text-lg leading-relaxed text-fg/85">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-y border-line bg-surface">
        <div className={`${container} py-24`}>
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" centered />
          <div className="mx-auto max-w-3xl divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span aria-hidden className="text-2xl text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className={`${container} grid gap-12 py-24 lg:grid-cols-[0.8fr_1.2fr]`}>
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's Create Your Next Ad"
            intro="Tell me a little about your product and what you want the video to achieve. I'll review the details and respond about the next steps."
          />
          <dl className="space-y-4">
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="text-lg hover:text-accent">
                  {site.email}
                </a>
              </dd>
            </div>
            {site.phone && (
              <div>
                <dt className="text-sm text-muted">Phone</dt>
                <dd>
                  <a href={`tel:${site.phone}`} className="text-lg hover:text-accent">
                    {site.phone}
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
