import Image from "next/image";
import { site } from "@/content/site";

export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
      {/* Offset accent frame behind the photo */}
      <div
        aria-hidden
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-accent/60"
      />
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-surface">
        {site.photo ? (
          <Image
            src={site.photo}
            alt={`Portrait of ${site.name}`}
            fill
            sizes="(min-width: 1024px) 400px, 384px"
            className="object-cover object-[50%_20%]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(90%_70%_at_50%_20%,#e8ff5933,transparent_70%)] p-8 text-center text-sm text-muted">
            <p>
              Add your photo to <code className="text-fg">public/me.jpg</code>
              <br />
              and set <code className="text-fg">photo: &quot;/me.jpg&quot;</code> in site.ts
            </p>
          </div>
        )}
      </div>
      <div className="absolute -bottom-5 left-4 rounded-full border border-line bg-bg/90 px-4 py-2 text-sm shadow-xl backdrop-blur">
        <span className="mr-2 inline-block size-2 rounded-full bg-accent align-middle" />
        Taking new projects
      </div>
    </div>
  );
}
