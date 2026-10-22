import Link from "next/link";
import { nav, site } from "@/content/site";
import { MobileMenu } from "./mobile-menu";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/60 bg-bg/85 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {site.name}
        </Link>
        <ul className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-fg">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
          >
            Start a Project
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
}
