// Contact-form rules, shared by the browser (instant feedback) and the
// server (the check that actually counts).

export const fieldNames = [
  "name",
  "email",
  "brand",
  "service",
  "budget",
  "durationPlatform",
  "deadline",
  "description",
  "reference",
] as const;

export type FieldName = (typeof fieldNames)[number];
export type EnquiryFields = Partial<Record<FieldName, string>>;
export type EnquiryErrors = Partial<Record<FieldName, string>>;

export const limits = {
  short: 120,
  description: 3000,
  descriptionMin: 20,
  link: 2000,
  /** Up to $999,999,999,999. */
  budgetDigits: 12,
};

export function readFields(formData: FormData): EnquiryFields {
  const fields: EnquiryFields = {};
  for (const name of fieldNames) {
    const value = formData.get(name);
    if (typeof value === "string" && value.trim()) fields[name] = value.trim();
  }
  if (fields.reference) fields.reference = withProtocol(fields.reference);
  return fields;
}

/** "6000000" or "6,000,000" -> "6,000,000". Anything that isn't a digit is dropped. */
export function formatBudget(value: string) {
  const digits = value
    .replace(/\D/g, "")
    .replace(/^0+(?=\d)/, "")
    .slice(0, limits.budgetDigits);
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Lets people type "yourbrand.com/product" without the https:// part. */
function withProtocol(value: string) {
  return /^[a-z][a-z\d+.-]*:\/\//i.test(value) ? value : `https://${value}`;
}

export function validateField(name: FieldName, value = ""): string | undefined {
  const v = value.trim();
  switch (name) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Please enter your full name.";
      break;
    case "email":
      if (!v) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Please enter a valid email address, e.g. name@example.com.";
      break;
    case "description":
      if (!v) return "Please tell me a little about the project.";
      if (v.length < limits.descriptionMin)
        return `Please add a bit more detail (at least ${limits.descriptionMin} characters).`;
      if (v.length > limits.description) return `Please keep this under ${limits.description} characters.`;
      return;
    case "reference":
      // Optional: only checked when something's been entered.
      if (v && !isWebLink(withProtocol(v))) return "That doesn't look like a web link, e.g. yourbrand.com/product.";
      if (v.length > limits.link) return `Please keep this under ${limits.link} characters.`;
      return;
    case "budget":
      // Optional; whole US dollars, with or without commas.
      if (v && !/^\d{1,3}(,\d{3})*$|^\d+$/.test(v)) return "Please enter an amount in US dollars, e.g. 5,000.";
      break;
  }
  if (v.length > limits.short) return `Please keep this under ${limits.short} characters.`;
}

export function validateFields(fields: EnquiryFields): EnquiryErrors {
  const errors: EnquiryErrors = {};
  for (const name of fieldNames) {
    const error = validateField(name, fields[name]);
    if (error) errors[name] = error;
  }
  return errors;
}

function isWebLink(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
  } catch {
    return false;
  }
}
