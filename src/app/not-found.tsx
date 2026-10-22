import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-32 text-center sm:px-6">
      <p className="text-sm tracking-widest text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl">That one ended up on the cutting room floor.</h1>
      <Link
        href="/#work"
        className="mt-10 inline-block rounded-full bg-fg px-6 py-3 font-medium text-bg hover:opacity-85"
      >
        See the work
      </Link>
    </section>
  );
}
