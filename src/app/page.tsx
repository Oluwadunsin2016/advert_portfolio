// import { ChooseServiceLink } from "@/components/choose-service-link"; // Pricing section (hidden)
import { ContactForm } from "@/components/contact-form";
import { HeroFeature } from "@/components/hero-feature";
import { Portrait } from "@/components/portrait";
import { SectionHeading } from "@/components/section-heading";
import { WorkGrid } from "@/components/work-grid";
import { getPublishedAdverts } from "@/content/adverts";
import { faq } from "@/content/faq";
// import { packages, pricingNotes, showPrices } from "@/content/pricing"; // Pricing section (hidden)
import { process, services } from "@/content/services";
import { site } from "@/content/site";

const container = "mx-auto max-w-6xl px-4 sm:px-6";

export default function Home() {
  const adverts = getPublishedAdverts();

  return (
    <>
      {/* Hero: stacked and centred on small screens, two columns on desktop */}
      <section
        className={`${container} grid items-center gap-14 pt-14 pb-20 sm:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12`}
      >
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <p className="mb-5 text-sm font-medium tracking-widest text-accent uppercase">
            AI-Powered Video Advertising
          </p>
          <h1 className="font-display text-4xl leading-[1.02] font-bold tracking-tight sm:text-5xl xl:text-6xl">
            Make Your Product Impossible to Ignore.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted lg:mx-0">
            I create AI-powered product commercials, UGC-style video ads and product explainers that turn ideas into
            polished visual stories, built around your brand, your audience and your goals.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a href="#work" className="rounded-full bg-accent px-6 py-3 font-semibold text-bg hover:opacity-90">
              Watch My Work
            </a>
            <a href="#contact" className="rounded-full border border-line px-6 py-3 font-medium hover:border-fg">
              Start a Project
            </a>
          </div>
          <p className="mt-8 text-sm text-muted">Creative concepts • AI video production • Editing &amp; sound</p>
        </div>
        {adverts[0] && (
          <div className="mx-auto w-full max-w-3xl">
            <HeroFeature advert={adverts[0]} />
          </div>
        )}
      </section>

      {/* Work */}
      <section id="work" className={`${container} py-20`}>
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          intro="A selection of AI-powered advertising concepts exploring product storytelling, cinematic visuals and creator-style formats."
        />
        <WorkGrid adverts={adverts} />
        <p className="mt-12 max-w-3xl border-l-2 border-accent/60 pl-4 text-sm text-muted">
          Projects labelled <strong className="text-fg">Concept Advertisement</strong> are independent spec work made to
          demonstrate different approaches to AI-powered product advertising. They were not commissioned or endorsed
          by the brands shown.
        </p>
      </section>

      {/* Services */}
      <section id="services" className="border-y border-line bg-surface">
        <div className={`${container} py-24`}>
          <SectionHeading
            eyebrow="Services"
            title="What I Create"
            intro="From creator-style product videos to cinematic commercials, choose the format that fits your product and campaign."
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <li key={s.id} className="flex flex-col rounded-xl border border-line bg-bg p-7">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                  {!s.available && (
                    <span className="shrink-0 rounded-full border border-line px-3 py-1 text-xs text-muted">
                      Coming soon
                    </span>
                  )}
                </div>
                <p className="mt-3 text-muted">{s.summary}</p>
                <dl className="mt-6 space-y-4 border-t border-line pt-5 text-sm">
                  <div>
                    <dt className="font-medium">May include</dt>
                    <dd className="mt-1 text-muted">{s.includes}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Best for</dt>
                    <dd className="mt-1 text-muted">{s.bestFor}</dd>
                  </div>
                </dl>
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

      {/* Pricing: hidden for now while payment is agreed per project. To bring it
          back, remove this comment wrapper, uncomment the two imports at the top,
          and re-add Pricing to `nav` in src/content/site.ts.
      <section id="pricing" className="border-y border-line bg-surface">
        <div className={`${container} py-24`}>
          <SectionHeading
            eyebrow="Pricing"
            title="Clear Starting Prices. Creative Built Around Your Product."
            intro="Choose a starting package below. Every project is scoped around your product, creative direction, duration and delivery needs. If your idea needs a more involved production, request a custom quote."
          />
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((p) => (
              <li key={p.name} className="flex flex-col rounded-xl border border-line bg-bg p-6">
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-3 font-display text-2xl font-bold text-accent">
                  {showPrices ? p.price : "Request a quote"}
                </p>
                <ul className="mt-5 mb-8 space-y-2 text-sm text-muted">
                  {p.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-accent">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <ChooseServiceLink service={p.enquiryService}>Request a Quote</ChooseServiceLink>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-2 text-sm text-muted md:grid-cols-2">
            {pricingNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span aria-hidden>•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>
      */}

      {/* About */}
      <section id="about" className={`${container} grid items-center gap-14 py-24 lg:grid-cols-[0.75fr_1.25fr]`}>
        <Portrait />
        <div className="max-w-3xl">
          <SectionHeading eyebrow="About" title="The Creator Behind the Concepts" />
          <div className="space-y-5 text-lg leading-relaxed text-fg/85">
            <p>
              I&apos;m an AI advertisement creator focused on turning product ideas into engaging video concepts. My
              work combines creative development, AI-generated visuals and video editing to explore different ways a
              product can be presented, from creator-style social ads to cinematic commercials.
            </p>
            <p>
              I care about clear storytelling, product-focused visuals, and a finished video that feels intentional from
              the opening shot to the final frame. If you have a product to introduce, explain or promote, I&apos;d be
              glad to discuss a creative direction that fits your goals.
            </p>
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
