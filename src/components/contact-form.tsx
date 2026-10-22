"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { enquiryServices } from "@/content/services";
import { site } from "@/content/site";
import {
  fieldNames,
  formatBudget,
  limits,
  readFields,
  validateField,
  validateFields,
  type EnquiryErrors,
  type EnquiryFields,
  type FieldName,
} from "@/lib/enquiry";
import { emailConfigured, sendEnquiryEmails } from "@/lib/send-enquiry";

export const CHOOSE_SERVICE_EVENT = "choose-service";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "not-configured">("idle");
  // Controlled so it can be preselected (by pricing cards, when shown).
  const [service, setService] = useState("Not sure yet");
  const [errors, setErrors] = useState<EnquiryErrors>({});
  // What was last submitted, for the email-app fallback.
  const [submitted, setSubmitted] = useState<EnquiryFields>({});
  const hasErrors = Object.values(errors).some(Boolean);
  const pending = status === "sending";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // Hidden field that people never fill in; bots usually do.
    if (data.get("company_website")) return setStatus("sent");

    const fields = readFields(data);
    const found = validateFields(fields);
    setErrors(found);
    const first = fieldNames.find((name) => found[name]);
    if (first) return form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();

    setSubmitted(fields);
    if (!emailConfigured) return setStatus("not-configured");
    setStatus("sending");
    try {
      await sendEnquiryEmails(fields);
      setStatus("sent");
    } catch (err) {
      console.error("Enquiry email failed", err);
      setStatus("error");
    }
  }

  // Check a field when the visitor leaves it (if they typed something), and
  // re-check as they type once it has an error, so the message clears.
  function recheck(e: React.SyntheticEvent<HTMLFormElement>, onlyIfErrored: boolean) {
    const target = e.target as HTMLInputElement;
    const name = target.name as FieldName;
    if (!fieldNames.includes(name)) return;
    if (onlyIfErrored ? !errors[name] : !target.value.trim()) return;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, target.value) }));
  }

  // Pricing cards (when that section is shown) preselect the service they were clicked from.
  useEffect(() => {
    function onChoose(e: Event) {
      const value = (e as CustomEvent<string>).detail;
      if (enquiryServices.includes(value)) setService(value);
    }
    window.addEventListener(CHOOSE_SERVICE_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_SERVICE_EVENT, onChoose);
  }, []);

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-accent/40 bg-surface p-8 text-center">
        <h3 className="font-display text-2xl font-semibold">Thanks, your enquiry has been sent.</h3>
        <p className="mt-3 text-muted">
          A confirmation is on its way to your inbox. I&apos;ll review the details and reply by email about the next
          steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={(e) => recheck(e, false)}
      onChange={(e) => recheck(e, true)}
      noValidate
      className="grid gap-5 sm:grid-cols-2"
    >
      <Field label="Name" name="name" required autoComplete="name" error={errors.name} />
      <Field label="Email address" name="email" type="email" required autoComplete="email" error={errors.email} />
      <Field label="Business or brand name" name="brand" error={errors.brand} autoComplete="organization" />

      <div className="flex flex-col gap-2">
        <Label htmlFor="service">Service needed</Label>
        <Select name="service" value={service} onValueChange={setService}>
          <SelectTrigger id="service" className={`${fieldClass} w-full data-[size=default]:h-12`}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper" className="border-line bg-surface">
            {enquiryServices.map((s) => (
              <SelectItem key={s} value={s} className="py-2.5 text-base">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <BudgetField error={errors.budget} />
      <Field
        label="Video duration / platform"
        name="durationPlatform"
        error={errors.durationPlatform}
        placeholder="e.g. 30 seconds for Instagram"
      />
      <Field label="Deadline" name="deadline" error={errors.deadline} placeholder="e.g. end of next month" />
      <Field
        label="Product or reference link"
        optional
        name="reference"
        inputMode="url"
        autoCapitalize="none"
        spellCheck={false}
        placeholder="e.g. yourbrand.com/product"
        maxLength={limits.link}
        error={errors.reference}
      />

      <div className="flex flex-col gap-2 sm:col-span-2">
        <Label htmlFor="description" className="gap-1">
          Project description <span className="text-accent">*</span>
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          required
          maxLength={limits.description}
          aria-invalid={!!errors.description}
          aria-describedby={errors.description ? "description-error" : undefined}
          placeholder="Your product, who it's for, and what you want the video to achieve."
          className={`${fieldClass} min-h-36`}
        />
        {errors.description && <ErrorText id="description-error" text={errors.description} />}
      </div>

      {/* Honeypot: hidden from people, often filled in by spam bots. */}
      <div aria-hidden className="hidden">
        <label>
          Leave this empty
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="max-w-sm text-sm text-muted">
            Your details are only used to reply to your enquiry and are never shared or added to a mailing list.
          </p>
          <button
            type="submit"
            disabled={pending}
            className="w-full shrink-0 rounded-full bg-accent px-4 py-2 cursor-pointer font-semibold text-bg transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-fit"
          >
            {pending ? "Submitting…" : "Submit enquiry"}
          </button>
        </div>

        <div aria-live="polite">
          {hasErrors && <p className="text-sm text-red-400">Please fix the highlighted fields and try again.</p>}
          {(status === "not-configured" || status === "error") && (
            <div className="rounded-xl border border-line bg-surface p-5 text-sm">
              <p>
                {status === "error"
                  ? "Sorry, your message couldn't be sent just now."
                  : "Online sending isn't set up yet."}{" "}
                You can send the same message from your email app instead. It&apos;s already written for you.
              </p>
              <a
                href={mailtoFor(submitted)}
                className="mt-4 inline-block rounded-full border border-fg px-5 py-2 font-medium hover:bg-fg hover:text-bg"
              >
                Open in my email app
              </a>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

// Sizes shadcn's fields to match the site. On focus only the border colour
// changes (to --ring, the lime accent); shadcn's thick glow ring is removed.
const fieldClass =
  "rounded-lg bg-surface px-4 text-base md:text-base dark:bg-surface focus-visible:ring-0 aria-invalid:ring-0 dark:aria-invalid:ring-0";

function Field({
  label,
  name,
  required,
  optional,
  error,
  ...props
}: { label: string; name: string; optional?: boolean; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="gap-1">
        {label} {required && <span className="text-accent">*</span>}
        {optional && <span className="font-normal text-muted">(optional)</span>}
      </Label>
      <Input
        id={name}
        name={name}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        maxLength={limits.short}
        className={`${fieldClass} h-12`}
        {...props}
      />
      {error && <ErrorText id={`${name}-error`} text={error} />}
    </div>
  );
}

/** US-dollar amount with thousands separators added as the visitor types. */
function BudgetField({ error }: { error?: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="budget" className="gap-1">
        Approximate budget <span className="font-normal text-muted">(USD, optional)</span>
      </Label>
      <div className="relative">
        <span aria-hidden className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted">
          $
        </span>
        <Input
          id="budget"
          name="budget"
          inputMode="numeric"
          autoComplete="off"
          placeholder="5,000"
          value={value}
          onChange={(e) => {
            // Keep the caret after the same digit once commas are added or removed.
            const input = e.currentTarget;
            const digitsBeforeCaret = input.value.slice(0, input.selectionStart ?? 0).replace(/\D/g, "").length;
            const formatted = formatBudget(input.value);
            setValue(formatted);
            requestAnimationFrame(() => {
              let pos = 0;
              for (let seen = 0; pos < formatted.length && seen < digitsBeforeCaret; pos++) {
                if (/\d/.test(formatted[pos])) seen++;
              }
              input.setSelectionRange(pos, pos);
            });
          }}
          aria-invalid={!!error}
          aria-describedby={error ? "budget-error" : undefined}
          className={`${fieldClass} h-12 pl-8 tabular-nums`}
        />
      </div>
      {error && <ErrorText id="budget-error" text={error} />}
    </div>
  );
}

function ErrorText({ id, text }: { id: string; text: string }) {
  return (
    <p id={id} className="text-sm text-red-400">
      {text}
    </p>
  );
}

function mailtoFor(f: EnquiryFields) {
  const lines = [
    f.name && `Name: ${f.name}`,
    f.brand && `Business or brand: ${f.brand}`,
    f.service && `Service needed: ${f.service}`,
    f.budget && `Approximate budget: $${f.budget}`,
    f.durationPlatform && `Duration / platform: ${f.durationPlatform}`,
    f.deadline && `Deadline: ${f.deadline}`,
    f.reference && `Reference: ${f.reference}`,
    f.description && `\n${f.description}`,
  ].filter(Boolean);
  const subject = `Project enquiry${f.brand ? ` from ${f.brand}` : ""}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
