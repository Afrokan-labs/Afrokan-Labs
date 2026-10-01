# Afrokan Labs Website: Technical Architecture

**Site:** afrokanlabs.com
**Status:** Approved for implementation (rev. 2: build corrections applied)
**Date:** October 2026
**Owner:** CTO, Afrokan Labs

> **Rev. 2 changes:** CSP adjusted for Next.js inline scripts (§13); environment validation split between build time and function runtime (§12); static-export config requirements added (§1, §8); the `/contact` link is added only when the form ships (§5); Stylelint enforcement rule corrected (§16); hosting specified as Cloudflare Pages with Pages Functions (§10).

---

## Inputs and assumptions

This architecture is built from the approved strategy, homepage structure, copy and design documents. Those documents establish the following:

- One verified project: the ESE Logistic Solution Limited platform (website, document checklist generator, WhatsApp AI assistant).
- Three services: WhatsApp AI assistants, workflow tools, websites.
- WhatsApp is the primary call to action. Email is the fallback.
- The visual design is the "Working documents" direction, with the token system defined in the design document.
- The primary audience is owners and operations managers of operations-heavy Ghanaian SMEs, mostly on mid-range Android phones on mobile data.

The project, service and contact slots in the brief are still placeholders. Anything that depends on unconfirmed information is enforced by the content rules in section 4, not assumed. Unconfirmed business facts use a `TODO_` placeholder that blocks launch (§11).

---

## The core decision: this is a static website

Everything on this site changes when the company decides to change it: a new case study, a service rewrite, a team photo. Nothing changes because of a visitor. There are no accounts, no dashboards, no personalised content and no data to store. That makes it a static site: HTML generated at build time and served from a CDN.

That choice delivers most of the requirements for free:

- **Performance.** Pre-built HTML on a CDN is the fastest thing that can be served to a phone on 3G.
- **SEO.** Crawlers get complete HTML with no rendering step.
- **Security.** A site with no server, no database and no login has almost nothing to attack.
- **Reliability and cost.** Nothing is running that can go down at 2am or bill by the hour.

There is exactly one dynamic piece: the contact form. It gets one small serverless function, not a backend.

---

## 1. Frontend stack

**Next.js (App Router) with static export, TypeScript, and CSS Modules over global design tokens.**

Next.js with `output: 'export'` renders every page to HTML at build time. The team keeps the React component model it already uses on client work, without paying for a server it doesn't need.

**Required static-export configuration** in `next.config.ts`:

- `output: 'export'`
- `images: { unoptimized: true }`. Without it, the build fails the first time anyone uses `next/image`. Images go through the build-time pipeline in §9 instead.

**Styling: CSS Modules plus the design-system token file.** The design is hairlines, a strict grid and very few components. Plain CSS with custom properties maps onto it directly, ships zero runtime, and doesn't force a utility-class vocabulary onto a design specified in tokens. Tailwind would also work; it just isn't buying anything here.

**No component library** (shadcn, MUI, etc.). There are about 12 primitives. A library would fight the design's minimalism and add weight.

**Supporting choices:**

- Schibsted Grotesk, self-hosted through `next/font`
- MDX for case-study bodies: files read with `fs`, frontmatter parsed with `gray-matter`, the body compiled at build time with `@mdx-js/mdx`
- Zod for content and environment validation

**Alternative considered: Astro.** For a content site, Astro ships less JavaScript by default. A bare Next.js App Router page carries roughly 80–90 KB of gzipped framework JS even when everything is a Server Component. Next.js is still the recommendation because the team already builds in it, the afrokanlabs.com project is already started in it, and one stack across client and internal work is worth more than about 80 KB. Reverse this decision only if the performance budget in section 14 cannot be met.

---

## 2. Backend requirements

**No backend.** No server, no database, no admin panel, no API, no user accounts.

The single exception is `POST /api/contact`: one Cloudflare Pages Function that validates a form submission, checks bot protection, and sends an email. It stores nothing. It is roughly 80 lines.

**Do not add a database for form submissions.** Storing them creates obligations under Ghana's Data Protection Act, 2012 (secure storage, retention, access requests) for no benefit. The inbox is already the record.

---

## 3. CMS and content strategy

**No CMS.** Content lives in the repository as typed TypeScript files and MDX.

A CMS solves the problem of non-developers editing content frequently. This site has one case study, three services, a process and a team section, and the people editing it are developers. A headless CMS (Sanity, Contentful, Strapi) would add a third-party account, an API dependency at build time, a schema maintained in two places, and a login to secure, all to edit about 15 text blocks a few times a year.

Git-based content also provides what a CMS wouldn't:

- Review through pull requests
- Full history
- A preview deployment for every change
- Build-time validation (section 4)

**Revisit when:** someone who doesn't use Git needs to publish weekly, or the site passes roughly 10–15 case studies. Even then, the next step is a Git-backed editor such as Keystatic or Decap that writes to the same files, not a hosted CMS.

---

## 4. Project data structure

Each project is one MDX file. Frontmatter holds structured fields; the body holds the long-form story for the case-study page. One file per project scales cleanly to dozens of entries.

```ts
// src/content/schema.ts
import { z } from "zod";

const Image = z.object({
  src: z.string(),
  alt: z.string().min(10),
  piiRedacted: z.literal(true),         // customer details blurred
  clientApproved: z.literal(true),      // client OK'd showing this screenshot
  showsClientBranding: z.boolean(),     // client name/logo visible in the image?
});

const Conversation = z.object({
  fromStaffTestNumber: z.literal(true), // never real customer messages
  clientApproved: z.literal(true),
  messages: z.array(z.object({
    speaker: z.enum(["customer", "assistant"]),
    text: z.string().min(1).max(500),
  })).min(2),
});

export const Project = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  featured: z.boolean().default(false),
  order: z.number(),

  client: z.object({
    name: z.string(),
    descriptionApproved: z.boolean(),   // tier: anonymised (OK to describe at all)
    nameApproved: z.boolean(),          // tier: named
    anonymisedLabel: z.string(),        // "A Ghanaian clearing and forwarding firm"
  }),
  industry: z.string(),
  status: z.enum(["live", "delivered"]),
  liveSince: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/).optional(), // "2026-05"
  formerBrand: z.string().optional(),   // "Deuel's Designs"; rendered at named tier only

  built: z.array(z.enum(["whatsapp-assistant", "workflow-tool", "website"])),
  summary: z.object({
    problem: z.string().max(280),
    solution: z.string().max(280),
  }),

  // Optional on purpose: if unconfirmed, the block is omitted, never filled
  result: z.object({ text: z.string(), confirmed: z.literal(true) }).optional(),
  testimonial: z.object({
    quote: z.string(), name: z.string(), role: z.string(),
    writtenPermission: z.literal(true),
  }).optional(),
  conversation: Conversation.optional(),

  images: z.array(Image),
  seo: z.object({ title: z.string().max(60), description: z.string().max(155) }),
}).superRefine((p, ctx) => {
  const fail = (message: string) => ctx.addIssue({ code: z.ZodIssueCode.custom, message });

  if (p.published && !p.client.descriptionApproved)
    fail("Cannot publish without the client's OK to describe the work (anonymised tier).");
  if (p.status === "live" && !p.liveSince)
    fail('status "live" requires liveSince.');
  if (!p.client.nameApproved) {
    if (p.result || p.testimonial)
      fail("Result and testimonial require the named tier (nameApproved).");
    if (p.images.some((i) => i.showsClientBranding))
      fail("An image shows client branding but the client name is not approved.");
  }
});
```

**This is the most important decision in the architecture.** The content rules from the strategy documents are enforced by the build, not by memory:

- Unverified claims are proven or cut. An empty results line beats an invented one.
- A testimonial without `writtenPermission: true` fails the build.
- An image without `piiRedacted: true`, or with missing alt text, fails the build.
- The client's real name renders only when `nameApproved` is true; otherwise the template uses `anonymisedLabel`.
- "Live" status is never shown unless the system genuinely is live, and requires a `liveSince` date.
- Results and testimonials require the named tier. An image showing client branding requires the named tier too: at the anonymised tier, a logo in a screenshot names the client.
- The demo conversation must come from a staff test number. Real customer messages are never published.

**Tier-dependent copy is derived, never hand-picked.** The hero proof line, conversation caption and `formerBrand` attribution are chosen in one place (`lib/content.ts`) from `nameApproved` and `status`, using the variants in `docs/content/homepage-copy.md`.

**Drafts.** Projects with `published: false` render only under `next dev`. They never appear in any deployed build, previews included, because preview URLs are public. If no project is published, the homepage omits Featured work, the hero proof line and the case-study link, and `/work` is not generated.

This protects the company from publishing something it has no right to publish, which is a far more likely failure than anything technical.

**Other content files** (`services.ts`, `process.ts`, `team.ts`, `site.ts`) live in `src/content/`. Contact details (WhatsApp number, email, reply-time promise, socials) go in `site.ts`, not in environment variables, because they are business content that doesn't change between environments.

**Placeholders.** Any business fact not yet confirmed is written as a string beginning `TODO_` (e.g. `whatsappNumber: "TODO_WHATSAPP_E164"`). Development builds accept these; `pnpm launch:check` fails while any remain (§11).

---

## 5. Contact form architecture

**The form is not the primary conversion path; WhatsApp is.** The form exists for one real case: desktop visitors who aren't signed into WhatsApp Web and won't open an email client. Keep it small and off the homepage.

**Placement.** The form lives on `/contact` only, never on the homepage. Until the form ships (Phase 6), `/contact` does not exist and the homepage contact band shows WhatsApp and email only. When the form ships, a "Send us a message" link to `/contact` is added to the band. This keeps the bot-protection script off the homepage, and the site never links to a page that doesn't exist.

**Fields** (from the approved copy):

- Name
- WhatsApp number or email (required; validated as one or the other)
- "What does your business do, and what do you need help with?" (max 2,000 characters)
- Hidden honeypot field

**Flow.**

```
Browser form (progressively enhanced; works without JS)
  → POST /api/contact   (functions/api/contact.ts, Cloudflare Pages Function)
     1. Reject if honeypot filled (return fake success)
     2. Verify Cloudflare Turnstile token server-side
     3. Validate + length-limit with the same Zod schema the client uses
     4. Send notification email via Resend
     5. Return success / field-level errors
  → Inline success state: "Thanks — we'll reply within [X hours]."
```

**Bot protection: Cloudflare Turnstile**, not reCAPTCHA. It is free, usually invisible, and doesn't make visitors solve image puzzles on a slow phone.

**Rate limiting:** a Cloudflare rate-limiting rule on `/api/contact` (for example, 5 requests per 10 minutes per IP). This is a dashboard setting, not code.

**No auto-reply to the submitter.** An endpoint that emails any address someone types in can be abused to send spam from the company domain, damaging its email reputation. The on-screen success message is enough.

**Error handling.** Inline messages under each field, linked to the field for screen readers, saying what to fix ("Add your business name"). Never "Invalid". Never clear the user's text on error.

**Local development.** `next dev` does not run Pages Functions. Test the function against the built site with `npx wrangler pages dev out`.

---

## 6. Email handling

Two separate problems.

### Receiving: a real mailbox at `hello@afrokanlabs.com`

Google Workspace is the most reliable choice, at a per-user monthly fee. Zoho Mail is cheaper and has historically offered a free tier. Check current pricing for both. Either way, a domain address replaces any Gmail address before launch. This is a credibility requirement from the strategy, not a nice-to-have.

### Sending: Resend for form notifications

Simple API, and a free tier that comfortably covers contact-form volume.

- Send from a subdomain (e.g. `notify.afrokanlabs.com`) so a deliverability problem with notifications can't affect the main mailbox.
- **To:** `hello@afrokanlabs.com`. **From:** `notify@notify.afrokanlabs.com`. **Reply-To:** the submitter's validated email address, so replying goes straight to the lead.
- User input never goes into the From or Subject headers. The body is plain text or HTML-escaped.

### DNS

Configure **SPF, DKIM and DMARC**. Start DMARC at `p=none` with reporting, then tighten to `quarantine` once reports are clean. Without these, notifications land in spam, and replies to clients might too.

---

## 7. Analytics

**Use Umami Cloud** (default) **or Plausible:** cookieless, privacy-friendly, a ~2 KB script, no cookie banner needed. Umami has a free hobby tier; Plausible is paid. Check current limits and pricing. Analytics sits behind a typed `track()` wrapper in `src/lib/analytics.ts`, which no-ops when `NEXT_PUBLIC_ANALYTICS_ID` is unset, so switching providers touches one file.

**Not Google Analytics 4.** It is about 50 KB of script, needs a consent banner to be handled properly, and provides far more than will ever be looked at. Cloudflare Web Analytics is free but cannot track custom events, and events are the point here.

### Events

This is the canonical list. `src/lib/analytics.ts` types it as a union, so an event or location not listed here fails type-checking.

| Event | Properties |
|---|---|
| `whatsapp_click` | `location`: `header` / `menu` / `hero` / `featured-work` / `services` / `process` / `contact` / `sticky` / `case-study` |
| `case_study_click` | `location`: `hero` / `featured-work` |
| `demo_offer_click` | — |
| `email_click` | `location`: `contact` / `footer` |
| `contact_form_submit` | `result`: `success` / `error` (Phase 6) |

Case-study views are counted by normal page-view tracking; no custom event is needed.

### The metric analytics cannot see

The real metric is **qualified business conversations started from the site per month.** Analytics loses visitors the moment they tap through to WhatsApp. Track this the way the strategy set up: the prefilled WhatsApp message identifies site-origin chats, and each one is logged in a simple sheet with these columns:

| Date | Business type | Qualified (Y/N) | Became a quote (Y/N) |
|---|---|---|---|

This sheet is part of the architecture. It is where the business result is recorded.

---

## 8. SEO architecture

### Technical

- Per-page `title`, `description` and canonical URL via the Next.js Metadata API, sourced from content files.
- `sitemap.ts` and `robots.ts` generated at build time from the project list. Under static export, both must declare `export const dynamic = 'force-static'`.
- JSON-LD: `Organization` + `ProfessionalService` on the homepage (name, Accra at city level, contact, `sameAs` socials); `Article` on each case study.
- Open Graph and Twitter images: one static, designed 1200×630 PNG per page. Dynamic OG generation is overengineering with one case study.
- Semantic HTML, correct heading order, `lang="en-GH"`.
- Google Search Console verified at launch, with the sitemap submitted.

### Content

- Each case study gets its own URL (e.g. `/work/ese-logistic`) so it can rank for phrases like "WhatsApp assistant logistics Ghana".
- **No standalone service pages yet.** Thin pages hurt more than they help. Add a service page when there is a second case study for that service.

### Highest-leverage SEO action (not code)

A **Google Business Profile** for Afrokan Labs in Accra. For local searches like "software company Accra", the map listing outranks the website. It takes an hour and costs nothing.

---

## 9. Image optimization

Static export disables Next.js on-demand image optimization, which needs a server. With a handful of images, this is not a loss.

- **Build-time pipeline:** `scripts/optimize-images.ts` uses `sharp` to convert each source image in `assets/` into AVIF and WebP at 2–3 widths, and writes a manifest with dimensions. The build fails if a referenced image is missing from the manifest.
- **Rendering:** a `<ResponsiveImage>` component outputs `<picture>` with `srcset`, explicit `width`/`height` (no layout shift), `loading="lazy"` below the fold, and required `alt`.
- **The hero conversation is HTML/CSS, not an image,** as the design specifies. The page's LCP element is text.
- **Budget:** no single image over ~120 KB; total under ~1 MB per page.
- **Redact customer details before images enter the repo.** A blurred file in Git history isn't redacted if the original was committed first.

---

## 10. Hosting

**Cloudflare Pages (Git integration) with Pages Functions for `/api/contact`, and DNS on Cloudflare.** Build command `pnpm build`, output directory `out`. Functions live in `functions/` at the repository root, which is Pages' convention.

| | Cloudflare | Vercel Hobby | Vercel Pro |
|---|---|---|---|
| Cost | Free tier covers this site | Free | ~$20/member/month |
| Commercial use | Allowed | **Not allowed** (personal/non-commercial only) | Allowed |
| Static + one function | Yes | Yes | Yes |
| Bot protection & rate limiting | Turnstile + WAF built in | Add yourself | Add yourself |

**The deciding fact:** Vercel's free tier forbids commercial use, and a company website is commercial. The real choice is free Cloudflare or about $240+/year for Vercel Pro. For a static site, Vercel's advantages (server rendering, image optimization, ISR) are unused features. Cloudflare also puts Turnstile, rate limiting and DNS under one account, and has a strong network across Africa.

Confirm current pricing and terms on both before committing.

**When to choose Vercel Pro instead:** if Afrokan Labs later builds a product that needs server rendering and prefers to pay rather than do adapter work. Not for this site.

---

## 11. CI/CD

One repository on GitHub, under an **Afrokan Labs organisation account**, not a personal account.

- **Branching:** `main` is production and is protected. Every change goes through a pull request.
- **Previews:** Cloudflare's Git integration builds every PR into a preview URL. This replaces a CMS preview: share the link, check on a phone, merge.
- **Checks** (one GitHub Actions workflow on PRs):
  - Type-check
  - Lint (ESLint + Stylelint)
  - Content validation (Zod schemas)
  - Build
  - Lighthouse CI against `out/` with budgets: performance ≥ 90 on mobile, accessibility = 100, total JS and page-weight limits. A PR that exceeds the budget cannot merge.
- **Launch gate:** `pnpm launch:check` scans `src/content` and fails while any `TODO_` placeholder remains. It must pass on the launch PR; after launch it runs in CI on every PR.
- **Deploy:** merge to `main` → Cloudflare builds and deploys.
- **Rollback:** redeploy the previous build from the Cloudflare dashboard.
- **Maintenance:** Dependabot opens a weekly dependency-update PR.

**Not needed:** staging environments, Docker, Terraform. Preview deployments are the staging environment.

---

## 12. Environment configuration

**Rule:** environment variables are for things that differ between environments or are secret. Business content (phone number, email, address) is not config; it lives in `src/content/site.ts`.

| Variable | Read by | Validated | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Next build | Build time | Canonicals, sitemap, OG URLs (differs for previews) |
| `NEXT_PUBLIC_ANALYTICS_ID` | Next build | Build time (optional) | Unset in previews so test clicks don't pollute data |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Next build | Build time (Phase 6) | Turnstile's test key in previews |
| `TURNSTILE_SECRET_KEY` | Pages Function | Runtime | Server-side verification. **Secret** |
| `RESEND_API_KEY` | Pages Function | Runtime | Sending notifications. **Secret** |
| `CONTACT_TO_EMAIL` | Pages Function | Runtime | Inbox for notifications |

**Validation is split by who reads the variable.**

- `src/lib/env.ts` validates only `NEXT_PUBLIC_*` variables, with Zod, at build time. A missing public variable fails the build.
- The function's secrets are not available to, or required by, the Next build. The function reads them from `context.env` and validates them with Zod at the start of each request, returning a generic 500 (and logging the real cause) if any are missing. Requiring secrets at build time would either fail every build or force secrets into the build environment.

Other rules:

- Commit `.env.example`. Never commit `.env.local`.
- Secrets live only in the Cloudflare dashboard, scoped to production. Previews use Turnstile's test keys.
- Anything prefixed `NEXT_PUBLIC_` ships to the browser. A secret must never carry that prefix.

---

## 13. Security requirements

The static architecture removes most risk. What remains is mostly **account security** and the form.

### Accounts (the real attack surface)

Whoever controls the registrar or Cloudflare account controls the company's web presence and email.

- 2FA via authenticator app (not SMS) on: registrar, Cloudflare, GitHub, Resend, email provider, analytics.
- **Registrar lock** on afrokanlabs.com. Auto-renew enabled with a card that won't expire unnoticed. Losing the domain is the worst realistic outcome for this site.
- Every account registered to a company address (`admin@afrokanlabs.com`), not a personal Gmail.
- **At least two admins on every account.** If one founder becomes unreachable, the company must not lose its domain.

### Security headers (Cloudflare `public/_headers` file)

**Content-Security-Policy.** Next.js App Router emits inline `<script>` tags carrying the RSC payload, even under static export. Nonce-based CSP needs a server to generate a nonce per response, which this site doesn't have. A `script-src 'self'` policy would therefore break the site the moment JavaScript runs. The policy is:

```
default-src 'self';
script-src 'self' 'unsafe-inline' <analytics origin>;
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
font-src 'self';
connect-src 'self' <analytics origin>;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none'
```

When the form ships, add `https://challenges.cloudflare.com` to `script-src` and `frame-src` on `/contact`.

`'unsafe-inline'` weakens XSS protection, but the realistic risk here is low: the site renders no user-supplied content, has no login, and holds no session to steal. If this needs tightening later, a postbuild script can hash each inline script and write per-route hash-based CSP into `_headers`.

**Other headers:**

- `Strict-Transport-Security` with a long max-age
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera, microphone and geolocation

Test against the built site with `npx wrangler pages dev out` until the browser console is clean.

### Form

Everything in section 5: server-side validation, length limits, Turnstile, honeypot, rate limiting, escaped output, no user input in email headers, no storage, no auto-reply.

### Privacy

A short privacy page ships at launch, stating that analytics is cookieless and collects no personal data. It is updated **before** the form goes live to cover what the form collects, why, and that it is not stored or shared. The Data Protection Act, 2012 applies the moment a name and email are collected.

### Client data

No real customer names, phone numbers or shipment details anywhere on the site, in screenshots, or in repository history.

---

## 14. Performance strategy

### Budget (enforced in CI)

| Metric | Target |
|---|---|
| Total transfer per page | < 1 MB |
| Compressed JavaScript | < ~120 KB |
| LCP on throttled 3G | < 2.5 s |
| CLS | ≤ 0.05 (CI assertion); zero shift from fonts and images as the design goal |

### How the budget is met

- **Server Components by default.** Only four components ship JavaScript, as small client-component islands: `MenuSheet`, `StickyActionBar`, `ChatThread` (hero animation), and `ContactForm` (Phase 6).
- **The LCP element is the headline text,** never an image, never JS-dependent.
- **One variable font,** Latin subset, preloaded via `next/font` with `adjustFontFallback` so text doesn't shift on load. Labels use the system monospace stack at zero cost.
- **Third-party scripts:** analytics only on content pages, loaded with `defer`. Turnstile loads only on `/contact`.
- **No** scroll-reveal animation, carousel library or animation library. CSS transitions cover everything in the design, and respect `prefers-reduced-motion`.
- **Caching:** hashed assets served with long cache lifetimes; HTML with short ones.

### Real-device testing

Before launch, load the site on an actual budget Android phone on mobile data. Chrome device emulation does not show how a slow CPU handles the JS.

---

## 15. Folder structure

```
afrokanlabs.com/
├─ .github/workflows/ci.yml        # typecheck, lint, validate, build, Lighthouse
├─ public/
│  ├─ _headers                     # security + cache headers (Cloudflare)
│  ├─ og/                          # static OG images per page
│  └─ favicon.svg
├─ assets/images/                  # source images (already redacted)
├─ functions/api/contact.ts        # the only server code (Phase 6)
├─ scripts/
│  ├─ optimize-images.ts           # sharp → AVIF/WebP + manifest
│  └─ launch-check.ts              # fails while TODO_ placeholders remain
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx                # fonts, header, footer, analytics
│  │  ├─ page.tsx                  # homepage
│  │  ├─ work/page.tsx             # project index
│  │  ├─ work/[slug]/page.tsx      # case study (generateStaticParams)
│  │  ├─ contact/page.tsx          # form lives here only (Phase 6)
│  │  ├─ privacy/page.tsx
│  │  ├─ not-found.tsx
│  │  ├─ sitemap.ts                # force-static
│  │  └─ robots.ts                 # force-static
│  ├─ components/
│  │  ├─ primitives/               # Button, TextLink, MetaLabel, StatusChip, Container, Grid, Rule, ResponsiveImage
│  │  ├─ layout/                   # SiteHeader, MenuSheet*, SiteFooter, StickyActionBar*
│  │  ├─ sections/                 # Hero, FeaturedWork, OfferBand, Services, Process, About, Contact
│  │  ├─ work/                     # Dossier, FieldList, PullQuote, VisualStrip, ProjectCard
│  │  ├─ chat/                     # ChatThread*, ChatBubble, TypingIndicator
│  │  └─ forms/                    # ContactForm* (Phase 6)
│  ├─ content/
│  │  ├─ schema.ts                 # Zod schemas (the content rules)
│  │  ├─ site.ts                   # name, WhatsApp, email, reply-time, socials
│  │  ├─ services.ts
│  │  ├─ process.ts
│  │  ├─ team.ts
│  │  └─ projects/ese-logistic.mdx
│  ├─ lib/
│  │  ├─ content.ts                # load + validate content at build
│  │  ├─ env.ts                    # validated NEXT_PUBLIC_* env vars only
│  │  ├─ whatsapp.ts               # wa.me link builder with prefilled text
│  │  ├─ analytics.ts              # typed track() wrapper
│  │  └─ seo.ts                    # metadata + JSON-LD helpers
│  └─ styles/
│     ├─ tokens.css                # design system tokens
│     ├─ base.css                  # reset, typography, focus styles
│     └─ grid.css
├─ .env.example
├─ next.config.ts                  # output: 'export', images.unoptimized
└─ lighthouserc.json               # performance budgets
```

`*` = client component. Everything else renders to static HTML with zero JS.

---

## 16. Component architecture

The component tree follows the approved design document. These rules sit on top of it:

1. **Server by default, client by exception.** A component gets `"use client"` only if it needs state or browser events. Client components sit at the leaves: `Hero` is a Server Component that *contains* `ChatThread`, so the hero text never waits for JS.
2. **Sections receive data; they don't fetch it.** `page.tsx` loads validated content and passes it down. `FeaturedWork` takes a `Project`; it doesn't know files exist. Moving to a CMS later changes only `lib/content.ts`.
3. **Optional content means conditional rendering.** `Dossier` renders `result` and `testimonial` blocks only if present. No placeholder states anywhere in the UI. This implements the design rule that the layout must look complete with only the parts that are true.
4. **One WhatsApp link builder.** Every CTA calls `whatsappLink({ location })`, which builds the URL with the prefilled message and fires the analytics event. The number exists in exactly one place.
5. **Primitives own accessibility.** `Button` handles `:focus-visible`, minimum tap size, and "(opens WhatsApp)" screen-reader text. `ResponsiveImage` requires `alt` in its type signature. Accessibility must not depend on each section remembering it.
6. **Tokens only.** No hex values or raw pixel spacing in component CSS, only `var(--…)`. Enforced by Stylelint: `color-no-hex` plus the `stylelint-declaration-strict-value` plugin for colour, spacing and font properties in `src/components/**`. Raw values are allowed only in `src/styles/tokens.css`.

### Component tree

```
Layout
├─ SiteHeader (WordMark, NavLinks, Button/primary, MenuSheet*)
├─ main
│  ├─ Hero (MetaLabel, Display, Lede, CTAGroup, ProofLine[StatusChip], ChatThread*)
│  ├─ FeaturedWork (SectionHeader, Dossier[FieldList, Narrative, PullQuote], VisualStrip)
│  ├─ OfferBand (Text, Button/secondary)
│  ├─ Services (SectionHeader, ServiceRow ×3[Tag])
│  ├─ Process (SectionHeader, ProcessStep ×4, PaymentNote)
│  ├─ About (SectionHeader, Statement, TeamMember ×n)
│  └─ Contact (Display, Button/onDark, EmailLink, ResponseNote)
├─ StickyActionBar* (mobile only)
└─ SiteFooter
```

---

## Implementation plan

The task-level plan, with acceptance criteria, is `docs/BUILD_PLAN.md`. Summary:

### Phase 0: Unblock (before code; this is the critical path)

1. Get ESE's **written permission** for their name, screenshots and a testimonial, plus one real outcome if possible. Without it, the case study launches anonymised.
2. Make the Deuel's Designs naming decision (fold into Afrokan Labs, per the strategy).
3. Set up a dedicated **WhatsApp Business number**.
4. Set up the domain mailboxes (`hello@`, `admin@`).
5. Shoot team photos in one session: one wall, window light, the same crop.
6. Move DNS to Cloudflare. Turn on registrar lock and 2FA on every account. Add a second admin to each.

Development can proceed in parallel using `TODO_` placeholders; launch cannot.

### Phase 1: Foundation (days 1–2)

7. Audit the existing Next.js project, then configure: static export, `images.unoptimized`, TypeScript strict mode, ESLint, Stylelint, Prettier.
8. Add `tokens.css`, `base.css`, `grid.css` and the font setup from the design system.
9. Write the Zod content schemas and `lib/content.ts`. Add the ESE MDX file, `site.ts`, `env.ts` and `launch-check.ts`.
10. Connect the repo to Cloudflare Pages, confirm preview deployments work, add the CI workflow. Deploy a bare "coming soon" page to the real domain, so every later step is tested in production conditions.

### Phase 2: Homepage (days 3–6)

11. Build the primitives, header and footer.
12. Build the sections in page order: Hero (text first, `ChatThread` after), FeaturedWork, OfferBand, Services, Process, About, Contact (WhatsApp and email only).
13. Add `StickyActionBar` and `MenuSheet`.
14. Add the image pipeline and the redacted screenshots.

### Phase 3: Remaining pages (days 7–8)

15. Case study page (`/work/[slug]`), work index (single-project state), privacy, 404. No `/about` page until it has approved copy; "About" links to the homepage `#about` section.
16. Metadata, JSON-LD, sitemap, robots, OG images.

### Phase 4: Instrumentation and hardening (day 9)

17. Analytics with the events. Set up the conversations tracking sheet.
18. Security headers per §13, tested against the built site with `wrangler pages dev` and with securityheaders.com.
19. Lighthouse CI with budgets. Real budget Android phone on mobile data. Keyboard-only pass and screen-reader pass (TalkBack).

### Phase 5: Launch (day 10)

20. `pnpm launch:check` passes. Final content audit: every claim on the site is verified or removed.
21. Search Console with sitemap; Google Business Profile.
22. Launch, then share the link directly with existing contacts on WhatsApp. That is where the first visitors come from, not search.

### Phase 6: Contact form (after launch, only if needed)

23. Build `/contact`: form, Pages Function, Turnstile, Resend, DNS records, rate-limit rule, CSP update, privacy page update, and the "Send us a message" link on the homepage band.

Launch without the form. WhatsApp and email cover the conversion path, and the form carries the most security surface. Add it in week two once the site is stable, or skip it if the desktop email fallback proves sufficient.

### Timeline and risk

About **two weeks of focused work for one developer**, assuming Phase 0 is complete.

Phase 0 is where this project will actually slip. ESE's permission, the WhatsApp Business number and the domain mailbox are business tasks, not engineering ones, and no code fixes their absence.
