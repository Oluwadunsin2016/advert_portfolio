import Link from "next/link";
import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold">{site.name}</p>
          <p className="mt-2 text-muted">AI-powered advertising concepts and video production.</p>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block underline-offset-4 hover:underline">
            {site.email}
          </a>
          {site.socials.length > 0 && (
            <ul className="mt-4 flex gap-5 text-sm text-muted">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-fg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl space-y-2 border-t border-line/60 px-4 py-6 text-xs text-muted sm:px-6">
        <p>
          Brand names and products shown in independent concept advertisements belong to their respective owners.
          Concept work is not affiliated with or endorsed by those brands unless expressly stated.
        </p>
        <p>
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
