// HTML bodies for the enquiry emails. They're sent through one EmailJS
// template whose content is {{{body}}} (see src/lib/send-enquiry.ts).

import { site } from "@/content/site";
import type { EnquiryFields } from "./enquiry";

/** Visitors' text goes into HTML, so it must not be able to add markup. */
function escape(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const shell = (content: string) => `
<div style="font-family: system-ui, -apple-system, Segoe UI, Arial, sans-serif; font-size: 15px; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td style="vertical-align: top; padding: 20px;">${content}</td>
    </tr>
  </table>
</div>`;

const row = (label: string, value?: string) =>
  `<strong>${label}:</strong> ${value ? escape(value) : "Not provided"}<br/>`;

/** To the creator: every detail the client entered, ready to reply to. */
export function getEnquiryCreatorEmail(f: EnquiryFields) {
  return shell(`
        <h2 style="margin: 0 0 20px 0; color: #0b0b0c; font-size: 20px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">New Project Enquiry</h2>
        <p style="margin: 0 0 20px 0; padding-left: 10px; border-left: 3px solid #a3c22f;">
          ${row("Name", f.name)}
          ${row("Email", f.email)}
          ${row("Business or brand", f.brand)}
          ${row("Service needed", f.service)}
          ${row("Approximate budget", f.budget && `$${f.budget} USD`)}
          ${row("Duration / platform", f.durationPlatform)}
          ${row("Deadline", f.deadline)}
          ${row("Product or reference link", f.reference)}
          <strong>Project description:</strong><br/>
          <span style="display: block; margin-top: 4px; white-space: pre-wrap;">${escape(f.description)}</span>
        </p>
        <p style="font-size: 13px; color: #64748b; margin: 0;">Reply directly to ${escape(f.email)} to respond.</p>`);
}

/** To the client: confirmation that the enquiry arrived. */
export function getEnquiryClientEmail(f: EnquiryFields) {
  const firstName = f.name?.split(/\s+/)[0];
  return shell(`
        <p style="margin: 0 0 16px 0;">Hi ${escape(firstName) || "there"},</p>
        <p style="margin: 0 0 16px 0;">Thank you for getting in touch about your video project${f.brand ? ` for <strong>${escape(f.brand)}</strong>` : ""}.</p>
        <p style="margin: 0 0 16px 0;">I've received your enquiry and will review the details, then reply by email about the next steps.</p>
        <p style="margin: 0 0 8px 0; color: #64748b; font-size: 14px;">Here's a copy of what you sent:</p>
        <p style="margin: 0 0 24px 0; padding-left: 10px; border-left: 3px solid #a3c22f; font-size: 14px;">
          ${row("Service needed", f.service)}
          ${f.durationPlatform ? row("Duration / platform", f.durationPlatform) : ""}
          ${f.deadline ? row("Deadline", f.deadline) : ""}
          <strong>Project description:</strong><br/>
          <span style="display: block; margin-top: 4px; white-space: pre-wrap;">${escape(f.description)}</span>
        </p>
        <p style="margin: 0;">
          Kind regards,<br/>
          <strong>${escape(site.name)}</strong><br/>
          <span style="color: #64748b; font-size: 14px;">${escape(site.title)}</span>
        </p>`);
}
