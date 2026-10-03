# afrokanlabs.com — Claude Code project guide

Company website for Afrokan Labs (Accra, Ghana). Goal: credibility. Primary conversion: a visitor starts a WhatsApp conversation.

## Source of truth (read before any task)

| File | What it decides |
|---|---|
| `CLAUDE.md` (this file) | Stack, rules, and **overrides** to the architecture doc |
| `docs/architecture.md` | Full architecture and reasoning |
| `docs/BUILD_PLAN.md` | Ordered tasks with acceptance criteria. Work top to bottom |
| `docs/design-system.md` | Tokens, type, shapes, motion and component rules (v2, the dark redesign) |
| `docs/design/handoff/reference.html` | **The approved visual design.** Layout, spacing, colours, type and homepage copy. Its review-only parts (`.x-review`, `.x-note`, `.x-stand`) are never built |
| `docs/design/handoff/BRIEF.md` | The designer's build brief for the reference. Where it conflicts with this file, this file wins (see "Redesign" below) |
| `docs/content/` | Approved copy and strategy documents |

If `CLAUDE.md` and `docs/architecture.md` disagree, **this file wins**.

**If a design or content doc you need is missing, STOP and ask.** Never invent colours, spacing, fonts, copy, client names, metrics, testimonials or claims. Use a `TODO_` placeholder (see Content rules) and say what's missing.

## Stack (decided — do not substitute)

- Next.js App Router, `output: 'export'`, TypeScript `strict`
- CSS Modules + global tokens in `src/styles/tokens.css`. No Tailwind, no component library, no animation library. One carousel is allowed: testimonials (it only renders once real quotes exist)
- Fonts: Lexend (300–600, all text) and Unbounded (700/800, the wide display words and step numerals) via `next/font` (Latin subset, `adjustFontFallback`)
- Content: typed TS files + MDX in `src/content/`, validated with Zod at build time
- MDX: read files with `fs`, parse frontmatter with `gray-matter`, compile the body at build time with `@mdx-js/mdx`. Before adding any MDX package, check that it's actively maintained and supports the installed Next/React versions
- Hosting: Cloudflare Pages (Git integration), build output `out/`
- Analytics: Umami Cloud behind a typed `track()` wrapper that no-ops when `NEXT_PUBLIC_ANALYTICS_ID` is unset
- Package manager: pnpm. Node: the LTS version pinned in `.nvmrc`

The repo already exists. Respect the installed major versions of Next and React. Don't upgrade majors unless asked.

## Commands

```bash
pnpm dev              # local dev
pnpm build            # static export to out/
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint + stylelint
pnpm content:validate # Zod-validate all content
pnpm images           # scripts/optimize-images.ts → AVIF/WebP + manifest
pnpm lhci             # Lighthouse CI against out/
pnpm launch:check     # fails if any TODO_ placeholder remains in src/content
```

Before saying a task is done, run `typecheck`, `lint`, `content:validate` and `build`, and make sure all four pass.

## Overrides and corrections to docs/architecture.md

1. **CSP.** Next.js static export emits inline scripts (the RSC payload), and there's no server to issue nonces. `script-src` must be `'self' 'unsafe-inline'` plus the analytics origin. Keep all other directives strict: `default-src 'self'`, `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'`, `form-action 'self'`. Before writing `_headers`, verify in a built page that the site works with the CSP applied.
2. **Static export config.** In `next.config.ts`: `output: 'export'` and `images: { unoptimized: true }`. `src/app/sitemap.ts` and `src/app/robots.ts` must `export const dynamic = 'force-static'`.
3. **Env validation is split.**
   - `src/lib/env.ts` validates only `NEXT_PUBLIC_*` variables, at build time.
   - Function secrets (`TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`) are read from `context.env` inside the Pages Function and validated there at runtime. They are never required by the Next build.
4. **No contact form at launch.** Don't create `/contact`, `functions/` or Turnstile/Resend code until BUILD_PLAN Phase 6. The homepage contact band shows WhatsApp and email only, with no link to `/contact`.
5. **Token enforcement.** Use Stylelint `color-no-hex` plus `stylelint-declaration-strict-value` for colour and font-family properties in `src/components/**`. Raw colours and font stacks are allowed only in `src/styles/tokens.css`. Sizes, spacing and radii are ported value for value from the reference, so they may be raw in component CSS.
6. **Redesign (2026-10-02).** The design handoff in `docs/design/handoff/` replaced the "Working documents" design. Approved in chat as written, copy and claims included. Where its brief conflicts with this repo, the repo wins:
   - Static export stays. `/api/contact` is the Pages Function in `functions/`, not a Next route handler, and images go through `ResponsiveImage`, not `next/image`.
   - The existing pages (`/work`, case studies, `/privacy`, `/contact`, 404) stay and are restyled, so it isn't a one-page site.
   - The homepage email box sends visitors to the `/contact` form (Turnstile stays off the homepage).
   - Breakpoints are the reference's `max-width` queries: 520, 560, 760, 900 and 960px.
   - Placeholder images are named `PLACEHOLDER-*`, and `launch:check` fails while any is used.

## Content rules (enforced by schema, not by memory)

- All content comes from `src/content/`. Components never hard-code copy, numbers, URLs or the phone number.
- `src/content/schema.ts` uses `z.literal(true)` for `testimonial.writtenPermission`, `result.confirmed` and `images[].piiRedacted`. Alt text has a minimum of 10 characters.
- The client's real name renders only if `client.nameApproved === true`. Otherwise render `client.anonymisedLabel`.
- Optional blocks (result, testimonial) are **omitted** when absent. Never render empty states, "coming soon" or filler.
- A `StatusChip` shows "Live" only when `status === 'live'`.
- Unknown business facts (WhatsApp number, reply time, team names) use a string starting with `TODO_`, e.g. `whatsappNumber: "TODO_WHATSAPP_E164"`. Dev builds tolerate these. `launch:check` does not.
- No real customer names, phone numbers or shipment details anywhere: code, fixtures, screenshots or commit history.

## Component rules

1. Server Components by default. `"use client"` is allowed only on: `MenuSheet`, `StickyActionBar`, `ChatThread`, `ContactForm`, `ContactTeaser`, `ServiceAccordion` and `TestimonialCarousel`. Client components sit at the leaves.
2. Sections receive validated data as props. They never read files or import content directly. Only `page.tsx` calls `src/lib/content.ts`.
3. Every WhatsApp CTA uses `whatsappLink({ location })` from `src/lib/whatsapp.ts`, which builds `https://wa.me/<digits>?text=<encoded prefilled message>` and fires `whatsapp_click`. The number exists in exactly one place, `src/content/site.ts`.
4. Primitives own accessibility. `Button` handles focus-visible, a 44px minimum target and "(opens WhatsApp)" screen-reader text. `ResponsiveImage` requires `alt` and explicit `width`/`height`.
5. The LCP element (in the redesign, the hero portrait or headline) is server-rendered HTML, loads eagerly with high priority, and must never depend on JS. A product conversation, when approved, is HTML/CSS, never an image.
6. Motion is CSS only: transitions, plus the reference's slow decorative loops (hero burst, services ring, ticker). Every loop stops under `prefers-reduced-motion`.

## Performance budget (CI-enforced)

Total transfer under 1 MB per page, compressed JS under ~120 KB, Lighthouse mobile performance ≥ 90, accessibility = 100, CLS = 0, no single image over ~120 KB. If a change breaks the budget, fix it. Don't raise the budget.

## Working style

- One BUILD_PLAN task per session unless told otherwise. Tick its checkbox when its acceptance criteria pass.
- Small, reviewable commits with conventional messages (`feat:`, `fix:`, `chore:`).
- Ask before adding any dependency not named in this file.
- Never commit `.env*` files other than `.env.example`.
