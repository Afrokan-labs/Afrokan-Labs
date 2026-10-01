# Build plan

Work top to bottom. Each task is sized for one Claude Code session. A task is done only when its acceptance criteria pass **and** `pnpm typecheck && pnpm lint && pnpm content:validate && pnpm build` succeed.

## Phase 0: Human tasks (Franklin — Claude Code cannot do these)

These don't block development; they block **launch**. Until they're done, the related fields stay `TODO_`.

- [ ] ESE written permission: name, screenshots, testimonial, one confirmed outcome
- [ ] Decision on the Deuel's Designs name
- [ ] Dedicated WhatsApp Business number
- [ ] Domain mailboxes `hello@` and `admin@afrokanlabs.com`
- [ ] Team photos (one session, same wall, window light, same crop)
- [ ] DNS on Cloudflare, registrar lock, 2FA everywhere, a second admin on every account
- [ ] Approved design and content docs copied into `docs/design-system.md` and `docs/content/`

## Phase 1: Foundation

- [x] **1.1 Audit the existing repo.** Read the codebase and report: Next/React versions, router type, existing pages and components, styling approach, and anything conflicting with CLAUDE.md. Propose what to keep, change and delete. **Change no code in this task.**
  - Accept: a written report, and Franklin approves the cleanup list.
- [x] **1.2 Tooling.** Apply the approved cleanup. Set `output: 'export'` and `images.unoptimized`, TS strict, ESLint, Stylelint (`color-no-hex`, `stylelint-declaration-strict-value`, and `media-feature-name-value-allowed-list` for 640/1024/1440px), Prettier, `.nvmrc`, and the pnpm scripts listed in CLAUDE.md (stub `images`, `lhci` and `launch:check` if needed).
  - Accept: `pnpm build` produces `out/`; a hex colour in a component's CSS fails lint; `@media (min-width: 700px)` fails lint.
- [x] **1.3 Design tokens and base styles.** Create `tokens.css`, `base.css` and `grid.css` **exactly** from `docs/design-system.md`. Set up the font with `next/font`, and `lang="en-GH"` in `layout.tsx`.
  - Accept: every token in the design doc exists, and no value was invented. If the design doc is missing, stop.
- [x] **1.4 Content layer.** Create `schema.ts` exactly as in architecture §4, and `lib/content.ts` (fs + gray-matter + Zod; build fails on invalid content; tier-derived proof line and caption; drafts only under `next dev`). Fill `site.ts`, `services.ts`, `process.ts`, `team.ts` from `docs/content/homepage-copy.md`, with `TODO_` for every bracket except those in WhatsApp prefills. Create `projects/ese-logistic.mdx` with `published: false`, `descriptionApproved: false`, `nameApproved: false`, no result, testimonial or conversation. Add a `content:validate` script.
  - Accept: each of these fails validation: `piiRedacted: false`; `writtenPermission: false`; a testimonial with `nameApproved: false`; an image with `showsClientBranding: true` and `nameApproved: false`; `published: true` with `descriptionApproved: false`; `status: "live"` with no `liveSince`.
- [x] **1.5 Env and launch guard.** Create `lib/env.ts` (public variables only), `.env.example`, and `scripts/launch-check.ts` (scans `src/content` for `TODO_` and exits 1 listing each one).
  - Accept: `pnpm launch:check` lists the current placeholders and exits non-zero.
- [x] **1.6 CI and deploy.** Add `.github/workflows/ci.yml` (typecheck, lint, content:validate, build, and Lighthouse CI against `out/` with `lighthouserc.json` budgets). Add a temporary "coming soon" page at `/`. Write a `docs/DEPLOY.md` with the Cloudflare Pages settings: build command `pnpm build`, output `out`, Node version, and public env vars per environment.
  - Accept: CI passes on a PR. Franklin connects Cloudflare and confirms the preview URL works.

## Phase 2: Homepage

- [x] **2.1 Primitives.** Button, TextLink, MetaLabel, StatusChip, Container, Grid, Rule, ResponsiveImage, plus `lib/whatsapp.ts` and `lib/analytics.ts` (`track()` no-ops without an ID; typed union of every event and location in architecture §7).
  - Accept: a temporary `/_primitives` page renders all of them (delete it before launch); keyboard focus is visible on every interactive element.
- [x] **2.2 Layout.** SiteHeader, SiteFooter, MenuSheet (client component on native `<dialog>` with `showModal()`, per design-system §8).
  - Accept: the menu is fully keyboard-operable, focus returns to the toggle on close, and it works at 320px width.
- [ ] **2.3 Hero.** A server-rendered headline, subhead, tier-derived proof line and CTA, with the animated `ChatThread` (≥1024px only) as a client island implementing design-system §8 exactly: CSS pre-paint hiding, the 4s failsafe, the three JS checks, and the displayed-instance check.
  - Accept: every row of the ChatThread visitor table behaves as specified. Test JS disabled, reduced motion, and late hydration (throttle so JS arrives after 4s; the thread must not hide and replay).
- [ ] **2.4 Sections.** FeaturedWork (with the static `ChatThread` below 1024px), OfferBand (rendered only if `site.demoOffer.enabled`), Services (`id="services"`), Process (`id="process"`), About (`id="about"`), Contact (WhatsApp and email only), in page order, with data passed through props.
  - Accept: no hard-coded copy in components (grep for string literals in JSX inside `sections/`). Exactly one chat thread is displayed at 360px and at 1280px. Rendering correct for three fixtures: no published project (no Featured work, proof line or case-study link), anonymised tier, and named tier.
- [ ] **2.5 StickyActionBar.** Mobile only. It must not cover content or the footer.
  - Accept: CLS ≤ 0.05 in Lighthouse, and the bar never covers footer content.
- [ ] **2.6 Image pipeline.** `scripts/optimize-images.ts` (sharp → AVIF and WebP at 2–3 widths, plus a manifest JSON), wired into `ResponsiveImage`.
  - Accept: no output image is over 120 KB, and the build fails clearly if a referenced image is missing from the manifest.

## Phase 3: Remaining pages

- [ ] **3.1 Case study.** `/work/[slug]` with `generateStaticParams`, Dossier, FieldList, PullQuote, VisualStrip; optional blocks omitted when absent.
  - Accept: at the anonymised tier, the page shows the anonymised label, no `formerBrand`, no branded images, and no result or testimonial blocks. With no published project, `/work` and `/work/*` are not generated.
- [ ] **3.2 Work index, Privacy, 404.** No `/about` page. The privacy page states what analytics collects (cookieless, no personal data).
  - Accept: the work index looks complete with a single project.
- [ ] **3.3 SEO.** Metadata API per page, `sitemap.ts` and `robots.ts` (`force-static`), JSON-LD (Organization + ProfessionalService on home, Article on case studies), and static OG image paths under `public/og/`.
  - Accept: built HTML contains the correct canonical URL, OG tags and valid JSON-LD on every page.

## Phase 4: Hardening

- [ ] **4.1 Analytics.** Wire every event and location in architecture §7 as a typed union, and use the prefilled messages from the copy doc (both begin "Hi Afrokan Labs," so site-origin chats can be counted).
  - Accept: events fire in preview with a test ID, and nothing loads when the ID is unset.
- [ ] **4.2 Security headers.** Write `public/_headers` per the CLAUDE.md override #1: HSTS, nosniff, Referrer-Policy, Permissions-Policy, and long cache for hashed assets with short cache for HTML.
  - Accept: the built site runs under the CSP with a clean console (test with `npx wrangler pages dev out`).
- [ ] **4.3 Budgets and accessibility.** Lighthouse CI is green; axe has no violations; do a keyboard-only pass.
  - Accept: CI is green. Franklin does the real-device test (budget Android on mobile data, TalkBack).

## Phase 5: Launch

- [ ] **5.1 Launch PR.** Replace the coming-soon page, delete `/_primitives`, run `pnpm launch:check` (must pass, so Phase 0 must be done), and run a final content audit against `docs/content/`.
  - Accept: `launch:check` exits 0, and every claim on the site traces to an approved doc.

## Phase 6: Contact form (only if needed after launch)

- [ ] **6.1** `/contact` page, `ContactForm` (works without JS), `functions/api/contact.ts` (honeypot → Turnstile verify → Zod → Resend; secrets from `context.env`, validated at runtime), Turnstile only on `/contact`, CSP updated for `challenges.cloudflare.com`, the privacy page updated, and a contact-band link added.
  - Accept: tested locally with `wrangler pages dev`; header-injection attempts in name or email are rejected; nothing is stored; no auto-reply. Franklin sets up the rate-limit rule and the SPF/DKIM/DMARC DNS records.
