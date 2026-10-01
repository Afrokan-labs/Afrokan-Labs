# Afrokan Labs website

Next.js 15 (App Router) and TypeScript, with no CSS framework. Content, design tokens and section components are kept separate, so copy and the final visual design can change independently.

> **Status:** structural skeleton. Decorative effects are stripped out and visuals are labelled placeholders. Search the code for `DESIGN:` and `TODO:` to see what's still open.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Checks before pushing:

```bash
npx tsc --noEmit
npm run build
```

## Project structure

```
app/
  layout.tsx              Root layout: fonts, tokens, global metadata, WhatsApp button
  page.tsx                Home page; composes the sections in order
  work/[slug]/            Case study pages, generated from content/work.ts
  not-found.tsx           404 page
  api/contact/route.ts    Contact form endpoint (sends through Resend)
  sitemap.ts, robots.ts   SEO files
  opengraph-image.tsx     Placeholder social share image
  icon.svg                Favicon
  globals.css             Reset and base element styles only
components/
  sections/               One component and CSS Module per home page section
  Mark.tsx                Logo mark and wordmark (keep the path as is)
  Placeholder.tsx         Labelled placeholder box for images and visuals
  WhatsAppButton.tsx      Floating WhatsApp link
content/                  All copy and data, typed
styles/
  tokens.css              Every brand value: colours, type, spacing, radii, layout
  shared.module.css       Shared primitives: container, surfaces, headings, buttons, links
public/team/              Team photos
```

## Edit content

Everything visitors read is in `content/`:

| File | What's in it |
| --- | --- |
| `content/site.ts` | Name, domain, URL, tagline, email, WhatsApp, booking link, location, social links |
| `content/home.ts` | Nav links, hero, mission and contact copy, and shared copy for the case study and 404 pages |
| `content/services.ts` | The three services |
| `content/work.ts` | Case studies. Each entry becomes a page at `/work/<slug>` and is added to the sitemap |
| `content/process.ts` | The project steps |
| `content/products.ts` | Products. Add an entry to add a card |
| `content/team.ts` | Team members. Put photos in `public/team/` |

- **WhatsApp:** set `whatsapp` in `content/site.ts` (digits only, e.g. `233201234567`). The floating button and contact link then appear.
- **Booking link:** set `bookingUrl` (e.g. a Cal.com link) and a "Book a 20-minute call" link appears in the contact section.
- **Social links:** fill in any of `social.linkedin`, `social.x` or `social.instagram` and they appear in the footer.

## Apply the design

1. **Tokens:** edit `styles/tokens.css`. Colours, fonts, the spacing scale, radii, container width and section padding are all defined there, and nothing else hard-codes them.
2. **Sections:** each section's layout lives in `components/sections/<Section>.module.css`.
3. **Visuals:** swap each `<Placeholder>` for the real image or illustration.
4. **Effects:** `DESIGN:` comments mark where the original effects were (hero line drawing, gradient streaks, chat mock-up, nav scroll style). The chat transcript is kept in `content/work.ts` under `illustration`.

Breakpoints are 600px and 900px. They're listed at the top of `tokens.css`, because CSS custom properties can't be used inside media queries.

## Contact form

The form posts to `app/api/contact/route.ts`, which sends the message through [Resend](https://resend.com).

1. Create a free Resend account and verify `afrokanlabs.com` (add the DNS records it gives you).
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`.
3. On Vercel, add the same variables under Project → Settings → Environment Variables.

Until the key is set, the form shows a clear message pointing visitors to the email address instead.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new (it detects Next.js automatically).
3. Add the environment variables above.
4. In Project → Settings → Domains, add `afrokanlabs.com` and `www.afrokanlabs.com`, then set the DNS records Vercel shows you at your domain registrar.

## Email on the domain

`hello@afrokanlabs.com` needs a mailbox. Zoho Mail (free tier) or Google Workspace both work; add their MX records at your registrar. These sit alongside Vercel's and Resend's records without conflict.
