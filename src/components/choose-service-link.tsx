"use client";

import { CHOOSE_SERVICE_EVENT } from "./contact-form";

/** Jumps to the contact form with this service already selected. */
export function ChooseServiceLink({ service, children }: { service: string; children: React.ReactNode }) {
  return (
    <a
      href="#contact"
      onClick={() => window.dispatchEvent(new CustomEvent(CHOOSE_SERVICE_EVENT, { detail: service }))}
      className="mt-auto block rounded-full border border-fg px-5 py-3 text-center font-medium transition-colors hover:bg-fg hover:text-bg"
    >
      {children}
    </a>
  );
}
