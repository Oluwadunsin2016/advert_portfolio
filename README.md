# AI Advertisement Portfolio

A one-page portfolio site: Hero → Work → Services → Process → Pricing → About → FAQ → Contact. Every video plays right on the page.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Editing content

Everything you'll edit is in `src/content/`. Search for `[CONFIRM]` and `[REPLACE]` to find what still needs checking.

| File | What's in it |
| --- | --- |
| `site.ts` | Your name, photo, email, phone, social links, copyright year |
| `adverts.ts` | Your projects |
| `services.ts` | Services, contact-form service options, process steps |
| `pricing.ts` | Packages, prices, pricing notes, and the `showPrices` switch |
| `faq.ts` | FAQ questions and answers |

### Adding a project

Copy an entry in `adverts.ts` and change it. A project appears on the site only when `status: "published"` **and** it has a `video`. Keep unfinished work as `status: "draft"`. The first published project plays in the hero.

- `kind: "concept"` labels it **Concept Advertisement**. Use `kind: "client"` only for genuinely commissioned work.
- `category`: `"Product Commercial"`, `"UGC-Style Ad"`, `"Product Explainer"` or `"Review-Style Video"`. Filters appear once you have more than one category.
- `orientation`: `"landscape"` (16:9, e.g. YouTube or TV) or `"portrait"` (9:16, e.g. Reels or TikTok). It sets the shape the video plays at and the label on its card.
- `duration`: the exact final length, e.g. `"0:20"`. Leave it out until confirmed.
- `poster`: a thumbnail in `public/posters/`.
- `heroVideo` (only for the project in the hero): muted MP4 copies in `public/videos/`, e.g. `{ src: "/videos/x.mp4", small: "/videos/x-sm.mp4" }`. The hero autoplays these while it's on screen, which Drive players can't do. Keep them small: around 960px wide for `src` and 640px for `small`.

Video sources:

```ts
video: { type: "drive", id: "https://drive.google.com/file/d/…/view?usp=sharing" }
video: { type: "youtube", id: "dQw4w9WgXcQ" }
video: { type: "vimeo", id: "76979871" }
video: { type: "file", src: "/videos/my-ad.mp4" }   // file in public/videos
```

For Google Drive, set the file's General access to **Anyone with the link**.

### Prices

Prices are hidden until you confirm them. Check your costs, edit `pricing.ts`, then set `showPrices = true`.

## Contact form

The form validates each enquiry, then sends two emails through [EmailJS](https://www.emailjs.com): a notification to you (the email in `site.ts`) and a confirmation to the client. The email designs are in `src/lib/email-templates.ts`.

Setup:

1. In `.env.local`, set `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` (EmailJS → Account → General). Restart `npm run dev` after changing it.
2. In the EmailJS template, set **To Email** to `{{recipient_email}}`, **Subject** to `{{subject}}`, **Reply To** to `{{reply_to}}`, and the content to `{{{body}}}`. Use three braces so the HTML isn't escaped.
3. When deploying, add the same three variables in your host's settings (on Vercel: Project → Settings → Environment Variables).
4. Recommended: in EmailJS → Account → Security, allow only your site's domain, to stop others using your keys.

Until EmailJS is set up, the form offers to open the visitor's email app with the message already written.

## Deploying

Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new). Once you have a custom domain, set `NEXT_PUBLIC_SITE_URL` (e.g. `https://yourname.com`) so social-media previews link correctly.
