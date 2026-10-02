# Afrokan Labs website: build brief

This file tells Claude Code how to build the Afrokan Labs marketing site in this Next.js / React repo.
The approved design is `reference/afrokan-labs-redesign.html`. Open it in a browser before starting. It is the source of truth for layout, spacing, colors and copy.

## Ground rules

- **Match the repo.** Use whatever this repo already uses: App Router or Pages Router, TypeScript or JS, Tailwind / CSS Modules / plain CSS, ESLint and Prettier config, folder layout. Don't add a new styling system. If the repo is empty, use the App Router with TypeScript.
- **Match the reference visually.** Port the CSS values (sizes, radii, colors, clamp() type scale, breakpoints at 900px / 760px / 560px) rather than approximating them.
- **Ignore review-only parts of the reference.** Do not build:
  - the sticky black bar at the top (`.x-review`) with the "Show notes" button
  - every `.x-note` paragraph and every `.x-stand` "Stand-in photo" tag
  These are reviewer notes. Their content is collected in `NOTES-AND-ASSETS.md`.
- **Never invent proof.** Don't add made-up stats, star ratings, client names, testimonials or team members. Empty slots stay as clearly marked placeholders until real content arrives (see "Content rules").
- One page (`/`) with in-page anchors. Mobile-first and responsive from 360px up, with no horizontal scroll at any width.

## Design tokens

| Token | Value | Use |
|---|---|---|
| page | `#121212` | page background |
| panel | `#1C1C1C` (border `#2A2A2A`) | services, case study, team panels; step cards |
| card-dark | `#262626` (border `#303030`) | testimonial cards, fact cards, small dark card |
| line | `#343434` / `#4A4A4A` | stats border, service row border, dividers |
| white | `#FFFFFF` | hero card, team cards, ticker band |
| ink | `#0D0D0D` | text on white and lime, nav pill |
| ink-2 | `#555555` | secondary text on white |
| mute | `#A3A3A3` | secondary text on dark |
| lime | `#8CF04A` (hover `#79DE37`) | accent fills: buttons, highlights, stars, footer |
| grey circle | `#EDEDED` | hero circle behind the portrait |
| ring blue | `#4B5BFF` | rotating text ring on the services photo |
| bulb red | `#E2453C` | light-bulb doodle on the tall portrait |

The site is a deliberate single dark look. No light/dark theme switch.

**Fonts** (Google Fonts; use `next/font/google`):
- `Lexend` 300/400/500/600: all headings and body text.
- `Unbounded` 700/800: the extra-wide display words ("Innovate ✦ Inspire ✦ Create") and the `01`–`04` numerals.

**Shapes:**
- Pills (`border-radius: 999px`) for every button, nav and input.
- Panels use a 22–26px radius, cards 14–18px.
- The hero card is `22px 22px clamp(44px,7vw,84px) clamp(44px,7vw,84px)`, which gives the big rounded bottom.
- The "highlight word" (`.x-hl`) is a lime block behind one word, with a 8px radius and rotated -2deg. It's used in "Our **Services**", "Meet **the Team**", "Featured **Work**" and "How we **work**".

**Logo:** the Afrokan "A" mark is the inline SVG path in the reference: `viewBox="105 115 1100 990"`, path `M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922`, stroke width 165, round joins. Make it a `<Logo />` component that uses `currentColor`.

## Page structure (in order)

Build each section as its own component (`components/sections/*`). Keep shared bits in `components/ui/*`: `Pill` (lime / ghost / outline variants), `Highlight`, `SectionPanel` (dark panel with optional vertical lime side tab), `Spark` (4-point star), `Burst`.

1. **Hero** (`#top`). White rounded card inside the page gutter.
   - **Nav:** a black pill nav inside the card: Work · Services | logo | Process · About. At 900px and below, the nav shows only the logo plus a lime "Menu" pill. Build a working mobile menu: a full-width dropdown or sheet with the four links and a WhatsApp CTA.
   - **Headline:** centered H1 "Software built for how Ghanaian businesses actually work", with the lime three-line squiggle after the last word. The spinning lime burst sits top-left (24s rotation; disable it under `prefers-reduced-motion`).
   - **Three-column stage:**
     - Left: green tick marks, the lede, and a ghost pill "See our work".
     - Centre: the grey circle with the portrait, the curly arrow to its left, and a frosted pill group overlapping the bottom: lime "Start your project" plus "Chat on WhatsApp".
     - Right: five lime sparks, "Ghana-first", "AI & software studio, Accra".
   - **Phone layout:** headline, left copy, right badge, then the portrait.
2. **Stats strip.** A dark rounded bar with 4 items: `3+` Systems delivered · `24/7` WhatsApp replies · `100%` Mobile-first builds · `4-step` Clear delivery process. The suffix is lime. It becomes a 2×2 grid under 560px.
3. **Ideas row** (`#ideas`).
   - **Header:** a split header: H2 "Turning ideas into working software" on the left, paragraph on the right.
   - **Grid:** 1.68fr / 1fr.
   - **Wide team photo:** a lime 4-point star overlaps its top-left corner. A lime banner sits bottom-left reading "AN AI & SOFTWARE STUDIO IN ACCRA", followed by 4 thinning vertical lime stripes.
   - **Tall portrait:** a red light-bulb doodle sits on top of it.
4. **Our Services** (`#services`; the reference uses `#services-new`, rename it).
   - **Panel:** a dark panel with a vertical lime "WHAT WE DO" tab on the left edge. Three columns.
   - **Left column:** the heading, a short paragraph, and 4 outlined pill rows (`01 WhatsApp AI Assistants`, `02 Web Platforms`, `03 Workflow Tools`, `04 Backend Systems`).
     - Rows are an accordion: one open at a time, the first open by default. The arrow rotates when a row opens, and the open row gets a lime border.
     - Use `button` + `aria-expanded` + `aria-controls`.
   - **Middle column:** a B&W photo with a slowly rotating blue SVG `textPath` ring reading "Afrokan Labs ·" around the head (30s).
   - **Right column:** two stacked cards. A dark card ("See how we work" → `#process`) and a lime card ("Talk to our team" → `#contact`), each with a ↗ circle that rotates 45° on hover.
5. **Featured Work** (`#work`).
   - **Panel:** the same panel style, with a "CASE STUDY" side tab.
   - **Left:** "Featured Work", the H3 title, the ESE story, and two buttons: "Read the full case study" (lime) and "Chat with us on WhatsApp" (outline).
   - **Right:** fact cards. Client (full width), Industry, Status (with a lime live dot), and Built (lime tag chips).
6. **Innovate ✦ Inspire ✦ Create.**
   - **Words:** built as an SVG with `textLength` + `lengthAdjust="spacingAndGlyphs"` so the three Unbounded 800 words always fill the width on one line, with lime 4-point stars between them.
   - **Divider:** a thin line with a small star in the middle underneath.
   - Give it an `aria-label`.
7. **How we work** (`#process`).
   - **Header:** a split header like the Ideas row.
   - **Cards:** 4 dark step cards with lime numbered circles (`01`–`04`, Unbounded): Understand / Scope and quote / Build / Hand over and support. Short connector lines run between the cards on desktop.
   - **Button:** an outline WhatsApp pill underneath.
8. **Meet the Team** (`#about`).
   - **Panel:** a dark panel with the H2 and a white "Join our team" pill with a lime toggle → `#contact`.
   - **Grid:** a 3-column grid of white cards (2 columns at 900px and below, 1 column at 560px and below).
   - **Each card:** an avatar inside a lime blob shape, B&W photo, name, role, LinkedIn dot top-right, and a 1–2 line bio.
   - **Data:** drive the cards from `content/team.ts`. Card 1 is Franklin Wiafe (Founder) with `assets/founder-headshot.webp`. The other slots render as placeholders only until real data exists (see "Content rules").
9. **Testimonials carousel.**
   - **Cards:** dark cards in a horizontal track. The centred card is opaque, the others are at 35% opacity, and the edges fade with a mask gradient.
   - **Controls:** round prev/next buttons. Keyboard accessible; add `aria-live="polite"` on the track.
   - **Data:** drive it from `content/testimonials.ts`. **If the array is empty, hide the whole section.** Don't ship the placeholder cards.
10. **Tilted ticker.** A full-bleed white band rotated -2.6deg, scrolling keywords with lime stars between them (32s loop, pauses on hover, static under reduced motion). Keywords live in `content/site.ts`.
11. **Get in Touch Today!** (`#contact`).
    - **Left:** the H2, a paragraph, a pill email form with a lime "Contact Us" button inside it, a status line, and a "Prefer WhatsApp? Chat with us" link.
    - **Right:** a cut-out person image with a soft lime glow behind it.
12. **Lime footer.**
    - **Card:** a lime rounded card, with the logo and a blurb at the top.
    - **Columns:** Company / Services / Resources / Contact, plus a newsletter form (input + white "Subscribe" pill).
    - **Bottom row:** a rule, then the copyright and social icons (LinkedIn, X, Instagram, WhatsApp).

## Behaviour and wiring

- **Smooth scrolling.** Use `scroll-behavior: smooth`, respecting reduced motion. Anchor targets need a `scroll-margin-top`.
- **WhatsApp links.** Every WhatsApp CTA uses one `WHATSAPP_URL` constant in `content/site.ts`, built as `https://wa.me/<number>?text=<prefilled message>`. The number is a TODO.
- **Contact form.**
  - Make it a client component with email validation.
  - Submit to a Next.js Route Handler / API route (`/api/contact`) that sends the email with Resend or nodemailer, configured with env vars `CONTACT_TO_EMAIL` and `RESEND_API_KEY`.
  - Add a honeypot field.
  - Success message: "Thanks, we'll be in touch within one working day."
  - Error message: "Something went wrong. Email hello@afrokanlabs.com instead."
  - If no env vars are set, the route returns 501 and the UI shows the error message.
- **Newsletter.** Build it behind a `SHOW_NEWSLETTER` flag in `content/site.ts`, default `false` until a provider is chosen.
- **Images.** Use `next/image` with explicit sizes. B&W treatment via CSS `filter: grayscale(1)` so colour originals can be supplied. Keep the decorative SVGs (burst, sparks, squiggles, blob, bulb, ring) as inline React components.
- **Metadata.**
  - Title "Afrokan Labs | AI & software for Ghanaian businesses".
  - Description from the hero lede.
  - Open Graph image (TODO asset).
  - Favicon from the logo mark.
  - `lang="en"`.
- **Accessibility.**
  - Visible lime focus rings.
  - Decorative SVGs get `aria-hidden`.
  - Real `alt` text on photos.
  - Colour contrast: lime is a fill colour only. Never put white text on lime.

## Content rules

- **Copy.** All copy comes from the reference file. Put editable text in `content/*.ts` so it can be changed without touching components.
- **Stats.** The stats are the four honest ones above. Don't add client counts or revenue until Franklin supplies real numbers.
- **Team.** Only real people. Show only the members that exist in `content/team.ts`. If the count is not a multiple of 3, keep the grid tidy. With fewer than 3 people, centre the cards.
- **Testimonials.** Only real, approved quotes. An empty array hides the section.
- **Placeholder images.** Put temporary images in `public/images/placeholders/` with obvious names (e.g. `PLACEHOLDER-team-wide.jpg`), so they are easy to find and replace. A neutral grey block with a subtle silhouette is fine. Do not use stock photos of people presented as the team.

## Done when

- [ ] Side-by-side with `reference/afrokan-labs-redesign.html` at 1280px and 400px, each section matches in layout, spacing, colour and type.
- [ ] No horizontal scroll from 360px to 1920px.
- [ ] Lighthouse: Accessibility ≥ 95, Performance ≥ 90 on mobile.
- [ ] Accordion, carousel, mobile menu, ticker and both forms work by keyboard.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Every remaining TODO (WhatsApp number, social URLs, real images, form env vars) is listed in `TODO.md` at the repo root.
