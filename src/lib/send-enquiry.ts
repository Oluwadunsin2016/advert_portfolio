import emailjs from "@emailjs/browser";
import { site } from "@/content/site";
import type { EnquiryFields } from "./enquiry";
import { getEnquiryClientEmail, getEnquiryCreatorEmail } from "./email-templates";

// EmailJS runs in the browser, so these values are public by design. Set them
// in .env.local (and in your host's environment variables).
//
// The EmailJS template must use these variables:
//   To Email:   {{recipient_email}}   (NOT a fixed address, or every email goes there)
//   Subject:    {{subject}}
//   From Name:  {{sender_name}}
//   Reply To:   {{sender_email}}
//   Content:    {{{body}}}            (three braces, so the HTML isn't escaped)
// and "Use Default Email Address" ticked for From Email.
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const emailConfigured = Boolean(serviceId && templateId && publicKey);

/**
 * Sends the enquiry to the creator, then a confirmation to the client.
 * Resolves once the creator's copy is sent; a failed confirmation is logged
 * but doesn't fail the enquiry, since the creator already has it.
 */
export async function sendEnquiryEmails(fields: EnquiryFields) {
  if (!serviceId || !templateId || !publicKey) throw new Error("EmailJS is not configured");

  const send = (params: Record<string, string>) => emailjs.send(serviceId, templateId, params, { publicKey });

  await send({
    subject: `New project enquiry from ${fields.name}${fields.brand ? ` (${fields.brand})` : ""}`,
    recipient_email: site.email,
    // Shown as the sender, and where your reply goes: the client.
    sender_name: fields.name ?? "",
    sender_email: fields.email ?? "",
    body: getEnquiryCreatorEmail(fields),
  });

  try {
    await send({
      subject: `We've received your enquiry - ${site.name}`,
      recipient_email: fields.email ?? "",
      // Shown as the sender, and where the client's reply goes: you.
      sender_name: site.name,
      sender_email: site.email,
      body: getEnquiryClientEmail(fields),
    });
  } catch (err) {
    console.error("Client confirmation email failed", err);
  }
}
