# Afrokan Labs Design System

Version 2.0 · 2026-10-02 · Corporate website (Next.js, static export) · Single dark look

**The approved design is `docs/design/handoff/reference.html`.** Open it in a browser. This file records its tokens and the rules for building from it. If a value isn't in either file, don't invent one. Add it here first, with a reason. Version 1.4 ("Working documents", light paper) is in git history; it was replaced by the handoff, approved in chat on 2026-10-02.

---

## 1. Concept

A dark page with one bright accent. A white hero card with a deep rounded bottom opens the page; dark rounded panels hold the sections; lime marks what to press and what matters. Black-and-white photography keeps lime the only colour.

Rules:

1. **Lime is a fill, never text on white.** Lime on the light hero card is 1.2:1. Dark text (`--ink`) goes on lime. Lime text appears only on dark surfaces.
2. **Never invent proof.** No made-up stats, ratings, client names, testimonials or team members. Empty slots never ship: the section hides, or the item is left out.
3. **Placeholders are obvious.** Stand-in photos are `PLACEHOLDER-*` files, and `launch:check` fails while any is in use.
4. **One highlight per heading.** The `Highlight` lime block sits behind one word or phrase.

### Banned patterns

| Pattern | Why |
|---|---|
| Stock photos presented as the team or clients | Undermines credibility |
| Invented stats, star ratings, logos of clients we don't have | Same |
| White text on lime | Fails contrast |
| Gradient blobs or glow beyond the reference's two soft lime glows | Reads as generic AI startup |
| Scroll-triggered fade-ins | Hide content when JS is slow |

---

## 2. Colour

| Token | Value | Use | Contrast |
|---|---|---|---|
| `--page` | `#121212` | Page background | White 18.7:1, mute 7.4:1, lime 13.1:1 |
| `--panel` | `#1C1C1C` | Services, case study and team panels; step cards; email box | White 17.0:1, mute 6.8:1, lime 11.9:1 |
| `--panel-border` | `#2A2A2A` | Panel and step-card borders | Decorative |
| `--card-dark` | `#262626` | Fact cards, testimonial cards, the dark mini card | Mute 6.0:1, lime 10.6:1 |
| `--card-dark-border` | `#303030` | Their borders | Decorative |
| `--line` | `#343434` | Stats strip border | Decorative |
| `--line-2` | `#4A4A4A` | Service-row borders, dividers, step connectors | Decorative |
| `--line-3` | `#5A5A5A` | Outline pill and carousel button borders | Decorative |
| `--white` | `#FFFFFF` | Hero card, team cards, ticker band, text on dark | |
| `--ink` | `#0D0D0D` | Text on white and lime, nav pill | On white 19.4:1, on lime 13.6:1 |
| `--ink-2` | `#555555` | Secondary text on white | 7.5:1 |
| `--ink-3` | `#6A6A6A` | Team card bio text | 5.4:1 on white |
| `--mute` | `#A3A3A3` | Secondary text on dark | See surfaces |
| `--quote` | `#D6D6D6` | Testimonial text | 10.4:1 on `--card-dark` |
| `--lime` | `#8CF04A` | Accent fill: buttons, highlights, tags, footer | |
| `--lime-hover` | `#79DE37` | Lime hover | Ink on it 11.4:1 |
| `--on-lime-2` | `#1D3A0C` | Secondary text on lime (footer) | 8.8:1 |
| `--grey-circle` | `#EDEDED` | Hero circle behind the portrait | Decorative |
| `--photo-bg` | `#2A2A2A` | Photo frame background while loading | Decorative |
| `--ring-blue` | `#4B5BFF` | Rotating text ring (decorative, `aria-hidden`) | Decorative |
| `--bulb-red` | `#E2453C` | Light-bulb doodle (decorative) | Decorative |

The WhatsApp CTAs are lime, not WhatsApp green (`#25D366`); the glyph carries the channel.

---

## 3. Typography

| Role | Family | Weights |
|---|---|---|
| All text | **Lexend** | 300, 400, 500, 600 |
| Display words and numerals | **Unbounded** | 700, 800 |

Both self-hosted through `next/font/google`, Latin subset, `adjustFontFallback`. Sizes are the reference's `clamp()` values, ported as written:

| Style | Value | Weight |
|---|---|---|
| H1 (hero) | `clamp(1.9rem, 1rem + 3.4vw, 3.6rem)` / 1.12, −0.02em | 500 |
| H2 | `clamp(1.6rem, 1.1rem + 1.6vw, 2.35rem)` / 1.15, −0.02em | 500 |
| Body on dark | `.76rem`–`.86rem` / 1.6–1.7 | 300 |
| Stat figure | `clamp(1.5rem, 1.1rem + 1.3vw, 2.2rem)` | 500 |
| Display words | SVG text, Unbounded 800, fitted with `textLength` | 800 |

The reference's small body sizes (`.72rem`–`.86rem`) are kept for fidelity. Nothing goes below 12px except the footer's 11px column headings and the 8px "WHAT WE DO" side tab, both uppercase labels the reference specifies.

---

## 4. Shape

| Element | Radius |
|---|---|
| Buttons, nav, inputs | `999px` (pills) |
| Hero card | `22px 22px clamp(44px, 7vw, 84px) clamp(44px, 7vw, 84px)` |
| Panels | 22–26px |
| Cards, photos | 14–18px |
| Highlight | 8px, rotated −2deg |

---

## 5. Layout and breakpoints

Content width `1180px`, gutter `clamp(16px, 3vw, 32px)`. The reference is desktop-first; its `max-width` queries are kept: **960, 900, 760, 560 and 520px**. No horizontal scroll from 360px to 1920px.

---

## 6. Motion

CSS only. Every loop stops under `prefers-reduced-motion: reduce`.

| Element | Behaviour |
|---|---|
| Hero burst | Rotates once per 24s |
| Services ring | Rotates once per 30s |
| Ticker | Scrolls one loop per 32s, pauses on hover; static under reduced motion |
| Testimonial carousel | Slides 0.45s on prev/next only; never auto-advances |
| Buttons, rows, cards | Colour, border and small translate/rotate transitions (0.2s) |

Hover styles sit inside `@media (hover: hover)`.

---

## 7. Components

Shared: the brief's `Pill` is `Button` (`src/components/primitives`, variants lime, line, ghost, white). In `src/components/ui`: `Highlight`, `SectionPanel` (dark panel with optional lime side tab), `Logo` (the mark, `currentColor`) and the decorative SVGs in `icons.tsx` (`Star4`, `Spark`, `Burst` and the rest).

| Section | Notes |
|---|---|
| Hero | White card. The black pill nav sits inside it (Work · Services, logo, Process · About; a lime "Menu" pill at ≤900px). Centred H1 with the lime squiggle. Stage: lede and ghost pill; portrait in an arch over the grey circle with the CTA pill group; the "Ghana-first" badge |
| Stats strip | Four items from `content/home.ts`; 2×2 at ≤560px |
| Ideas | Split header; wide photo with lime banner and star; tall portrait with bulb doodle |
| Services | Panel with "WHAT WE DO" tab; accordion rows (one open, the first by default, `aria-expanded`); photo with ring; two mini link cards |
| Featured work | Panel with "CASE STUDY" tab; story, buttons, fact cards. The status dot is lime only when `status === "live"` |
| Words line | SVG, `aria-label`; divider with star |
| How we work | Split header, four step cards, outline WhatsApp pill |
| Team | Panel, "Join our team" pill, white cards from `content/team.ts`. Only confirmed members render; fewer than three are centred |
| Testimonials | Carousel from `content/testimonials.ts`; the section is hidden while the list is empty |
| Ticker | Tilted white band, keywords from `content/site.ts` |
| Contact | H2, the email box (submits to `/contact`, prefilling the form), WhatsApp link, cut-out image |
| Footer | Lime card, columns, newsletter behind `site.newsletter.enabled` (off), social icons only for confirmed URLs |

Every WhatsApp CTA comes from `whatsappLink()`; every button keeps a 44px tap target where the reference allows (the hero CTA group is 38px tall inside a 48px pill).

---

## 8. Accessibility

- Focus: `2px solid var(--lime)` outline, 3px offset, on every interactive element.
- Decorative SVGs are `aria-hidden`; photos have real alt text.
- Accordion: `button` + `aria-expanded` + `aria-controls`. Carousel: labelled prev/next buttons and `aria-live="polite"`.
- Lighthouse accessibility stays at 100 (CLAUDE.md budget).

---

## 9. Changelog

- **2.0 (2026-10-02):** replaced by the design handoff: dark page, lime accent, Lexend and Unbounded, pills and rounded panels, decorative CSS loops, a testimonials carousel.
- **1.0–1.4:** "Working documents" light design (git history).
