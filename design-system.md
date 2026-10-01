# Afrokan Labs Design System

Version 1.4 · Corporate website (Next.js, static export) · Light theme

This file is the single source of truth for building the Afrokan Labs website. If a value isn't defined here, don't invent one. Add it here first, with a reason.

---

## 1. Concept: "Working documents"

Afrokan Labs turns the paperwork that businesses run on (shipping documents, checklists, forms, WhatsApp threads) into software. The visual system borrows the logic of well-made operational documents. It uses a strict grid, fine ruled lines, numbered sections, and small monospace field labels such as `CLIENT`, `STATUS` and `BUILT`, with generous margins. The one living element is a real product conversation.

Four rules follow from this:

1. **Restraint carries the premium feel.** Typography, spacing and alignment do the work. Gradients, glow and decorative effects are not used.
2. **The accent colour means something.** Terracotta is reserved for links, labels, focus and key marks. If everything is accented, nothing is.
3. **Proof over decoration.** Imagery is real product UI, real conversations and real people. No stock photography, no abstract illustrations, no generic icons.
4. **African identity comes from context, not motifs.** Accra, cedis, mobile money, WhatsApp, logistics. No flag colours, tribal patterns or cultural symbols used as decoration.

### Banned patterns

These are the clearest "template" and "AI-generated" signals, so they are never used:

| Pattern | Why it's banned |
|---|---|
| Icon-in-a-card service grids | Make every service look interchangeable |
| Gradient blobs, glow, neon, 3D shapes | Read as crypto or generic AI startup |
| Frosted-glass / `backdrop-filter` headers | Scroll jank on mid-range Android phones; overused |
| Scroll-triggered fade-ins on content | Delay reading; hide content when JS is slow on 3G |
| Everything centred | Reads as template; left-aligned asymmetric layouts read as editorial |
| Pill-shaped buttons, 24px+ radii | Bubbly consumer-app feel; breaks the document concept |
| Red + gold + green together | Ghana flag palette; reads as cliché |
| Stock photos, tech-stack logo strips, invented stats | Undermine credibility |

---

## 2. Colour

Warm paper and ink, with one accent taken from laterite earth.

### Tokens

| Token | Value | Use | On `--paper` | On `--surface-2` |
|---|---|---|---|---|
| `--paper` | `#F6F3EE` | Page background | n/a | n/a |
| `--surface-2` | `#EEE9E1` | Case study dossier, raised surfaces | n/a | n/a |
| `--ink` | `#16130F` | Primary text, primary button background, contact band | 16.7:1 | 15.3:1 |
| `--ink-hover` | `#2B2620` | Primary button hover background | Paper text on it: 13.5:1 | n/a |
| `--ink-2` | `#5A534B` | Secondary text, captions, field labels | 6.8:1 | 6.3:1 |
| `--rule` | `#E2DCD3` | Hairlines, borders, dividers | Decorative only | Decorative only |
| `--accent` | `#A63F26` | Links, mono labels, focus rings, key marks | 5.7:1 | 5.2:1 |
| `--accent-hover` | `#963820` | Accent hover and pressed states | 6.6:1 | 6.0:1 |
| `--live` | `#2A7349` | "Live" status dot and label only | 5.2:1 | 4.8:1 |
| `--chat-assistant` | `#E7F0E9` | Assistant chat bubble background | Ink text on it: 15.9:1 | n/a |

Every text colour must pass AA (4.5:1) against **both** `--paper` and `--surface-2`. When a colour is added, fill in both columns before it's used.

### On the dark contact band

| Token | Value | Use | Contrast on `--ink` |
|---|---|---|---|
| `--on-dark` | `#F6F3EE` | Text | ~17:1 |
| `--on-dark-2` | `#B8AFA3` | Secondary text | ~8:1 |
| `--accent-on-dark` | `#E07A5A` | Links and labels | ~6:1 |
| `--rule-on-dark` | `#2E2924` | Hairlines | Decorative only |

### Rules

v1.0 used `#B5462B` for the accent and `#2E7D4F` for live. Both passed on paper but failed on `--surface-2` (4.48:1 and 4.17:1), which is where the dossier's link and LIVE chip sit. They were darkened once rather than given surface-specific variants.

The page uses `--paper` rather than pure white because it supports the paper concept and is softer on over-bright budget LCD screens.

There is exactly **one** dark band on the homepage: the Contact section. Don't alternate dark and light sections.

`--live` appears only on a `StatusChip` for a system that is genuinely live. It is never used decoratively.

The WhatsApp CTA is **not** WhatsApp green. White on `#25D366` is about 2:1 and fails contrast, and a green button makes the site look like a WhatsApp reseller. The WhatsApp glyph carries channel recognition.

Dark mode is out of scope for v1. All colours are tokens, so dark mode is a later token swap, not a rebuild.

---

## 3. Typography

### Families

| Role | Family | Loading |
|---|---|---|
| Sans (everything) | **Schibsted Grotesk**, variable | Self-hosted via `next/font/google`, `display: swap`, `adjustFontFallback: true` |
| Mono (labels, numbers, metadata) | System stack | No download |

```css
--font-sans: "Schibsted Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
--font-mono: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", monospace;
```

**Why Schibsted Grotesk:** it has editorial roots and is sturdy, slightly condensed, with character in its shapes without being quirky. It avoids the Inter/Geist look associated with AI-generated sites and Space Grotesk's crypto associations.

**Why one web font:** the page budget is about 1 MB on mobile data. The mono stack comes from the system, so it costs nothing.

### Scale

Sizes are fluid between 360px and 1440px using `clamp()`.

| Style | Token | Mobile → Desktop | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Display | `--text-display` | 36px → 72px | 600 | 1.05 | −0.02em |
| H2 | `--text-h2` | 28px → 44px | 600 | 1.1 | −0.015em |
| H3 | `--text-h3` | 20px → 28px | 600 | 1.2 | −0.01em |
| Statement | `--text-statement` | 24px → 36px | 500 | 1.25 | −0.01em |
| Body L | `--text-body-l` | 18px → 20px | 400 | 1.55 | 0 |
| Body | `--text-body` | 16px | 400 | 1.6 | 0 |
| Small | `--text-small` | 14px | 400 | 1.5 | 0 |
| Label (mono) | `--text-label` | 12px → 13px | 500 | 1.4 | +0.06em, uppercase |

```css
--text-display:   clamp(2.25rem, 1.5rem + 3.33vw, 4.5rem);
--text-h2:        clamp(1.75rem, 1.4rem + 1.48vw, 2.75rem);
--text-h3:        clamp(1.25rem, 1.08rem + 0.74vw, 1.75rem);
--text-statement: clamp(1.5rem, 1.25rem + 1.11vw, 2.25rem);
--text-body-l:    clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem);
--text-body:      1rem;
--text-small:     0.875rem;
--text-label:     clamp(0.75rem, 0.73rem + 0.09vw, 0.8125rem);
```

### Rules

Body text never goes below 16px. Nothing on the site goes below 12px, and mono labels are that floor.

Line length is capped at about 70 characters (`max-width: 68ch` on body text), including on large screens.

If the hero headline wraps past five lines at 360px, step it down one size. Never shrink the CTA button to make room.

Mono section numbers (`01`, `02`) are decorative and hidden from screen readers with `aria-hidden="true"`.

---

## 4. Spacing

All spacing comes from a 4px base scale.

| Token | Value | Typical use |
|---|---|---|
| `--space-1` | 4px | Icon-to-text gap |
| `--space-2` | 8px | Tight inline gaps |
| `--space-3` | 12px | Label to value |
| `--space-4` | 16px | Mobile page margin, paragraph spacing |
| `--space-5` | 24px | Grid gutter, component padding |
| `--space-6` | 32px | Tablet and desktop page margin, block spacing |
| `--space-7` | 48px | Between groups within a section |
| `--space-8` | 64px | Section header to content |
| `--space-9` | 96px | Large block separation |
| `--space-10` | 128px | Desktop section padding |
| `--space-11` | 160px | Large-screen section padding |

```css
--section-y: clamp(64px, 10vw, 160px);
```

Generous vertical space is the cheapest form of "premium" and the first thing student sites skimp on. When in doubt, add space rather than a divider.

---

## 5. Grid and breakpoints

| Name | Range | Columns | Page margin | Gutter | Container |
|---|---|---|---|---|---|
| `base` | 0–639px | 4 | 16px | 16px | `100% − 32px` |
| `md` | 640–1023px | 8 | 32px | 20px | `100% − 64px` |
| `lg` | 1024–1439px | 12 | min. 32px | 24px | `min(1200px, 100% − 64px)` |
| `xl` | ≥1440px | 12 | auto | 24px | 1280px |

The page margin is a single variable, `--page-margin`, that changes at 640px. The container is calculated from it, so every breakpoint gets the margin in the table above and the container never exceeds the viewport. Between 1024px and about 1264px the container keeps a 32px margin on each side; above that it centres at 1200px.

```css
:root { --page-margin: var(--space-4); }                 /* 16px */

@media (min-width: 640px) {
  :root { --page-margin: var(--space-6); }               /* 32px */
}

.container {
  width: min(var(--container), 100% - 2 * var(--page-margin));
  margin-inline: auto;
}

@media (min-width: 1440px) {
  .container { width: min(var(--container-xl), 100% - 2 * var(--page-margin)); }
}
```

v1.1 calculated the container from `--space-6` at every width, which gave phones 32px side margins instead of 16px and wasted 32px of a 360px screen. Never hard-code a margin in the container rule; always use `--page-margin`.

**Breakpoints are hard-coded, not tokens.** CSS custom properties don't work inside media queries, so `@media (min-width: var(--bp-md))` silently does nothing. Write `640px`, `1024px` and `1440px` directly in media queries. A Stylelint rule (`media-feature-name-value-allowed-list`) rejects any other `min-width` value, which keeps the set fixed. (Custom properties *can* be redefined inside a media query, as `--page-margin` is above. They just can't be used as the query's value.)

Design at 360px first. That's the reference device: a mid-range Android phone on mobile data.

Desktop layouts use **asymmetric splits** (5/7, 4/8, 7/5) rather than centred stacks.

On large screens, extra width becomes margin, never wider paragraphs.

Tablet is its own layout, not a stretched phone. The hero stays text-only, but the case study uses two columns.

---

## 6. Shape, borders and elevation

| Token | Value | Use |
|---|---|---|
| `--radius-s` | 4px | Buttons, inputs, chips |
| `--radius-m` | 8px | Panels, images, dossier |
| `--radius-chat` | 12px (4px on the tail corner) | Chat bubbles only |
| `--border-hair` | `1px solid var(--rule)` | Dividers, row separators |
| `--border-strong` | `2px solid var(--ink)` | Process step tops, emphasis rules |
| `--shadow-device` | `0 20px 40px -24px rgb(22 19 15 / 0.25)` | Phone outline in hero only |

There are no other shadows. Hairlines do the separating.

---

## 7. Motion

**Principle: motion explains a change of state. It never decorates.**

```css
--ease:      cubic-bezier(0.2, 0, 0, 1);
--dur-fast:  150ms;  /* hover, press */
--dur-base:  250ms;  /* links, bars, sheets */
--dur-slow:  400ms;  /* chat message arrival */
```

| Element | Behaviour |
|---|---|
| Hero `ChatThread` | Plays once on load: typing indicator, then the assistant reply. About 1.5s total. The only signature animation on the site. |
| Buttons | Background darkens on hover (`--dur-fast`), on hover-capable devices only. Press scales to 0.98. |
| Text links | Underline grows left to right on hover (`--dur-base`), on hover-capable devices only. |
| `StickyActionBar` | Slides up from the bottom (`--dur-base`). |
| `MenuSheet` | Fades and slides in (`--dur-base`). |
| Section content | **No animation.** Visible on first paint. |

Animate only `transform` and `opacity`, the two properties phones can animate smoothly.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

This CSS rule does **not** stop JavaScript timers. Any sequence driven from JS (the `ChatThread` animation) must check the preference itself; see `ChatThread` below.

**Hover styles only on devices that hover.** On Android, a tapped element keeps its hover style until the user taps elsewhere, so a WhatsApp button would look stuck after the user comes back from the app. Wrap every hover rule:

```css
@media (hover: hover) {
  .button--primary:hover { background: var(--ink-hover); }
}
```

`:active` and `:focus-visible` styles stay outside the query, because they apply to touch and keyboard users too.

---

## 8. Components

### Hierarchy

```
Layout
├─ SiteHeader (WordMark, NavLinks, Button/primary, MenuSheet)
├─ main
│  ├─ Hero (MetaLabel, Display, Lede, CTAGroup, ProofLine[StatusChip], ChatThread)
│  ├─ FeaturedWork (SectionHeader, Dossier[FieldList, Narrative, PullQuote], ChatThread[static, <1024px], VisualStrip)
│  ├─ OfferBand (Text, Button/secondary)
│  ├─ Services (SectionHeader, ServiceRow ×3[Tag])
│  ├─ Process (SectionHeader, ProcessStep ×4, PaymentNote)
│  ├─ About (SectionHeader, Statement, TeamMember ×n)
│  └─ Contact (Display, Button/onDark, EmailLink, ResponseNote)
├─ StickyActionBar (mobile only)
└─ SiteFooter

Primitives: Button, TextLink, MetaLabel, StatusChip, SectionHeader,
ChatBubble, TypingIndicator, Rule, Container, Grid, ResponsiveImage
```

### Button

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `--ink` | `--paper` | none | "Chat with us on WhatsApp" only |
| `secondary` | transparent | `--ink` | `1px --ink` | Demo offer, secondary actions |
| `onDark` | `--paper` | `--ink` | none | Primary CTA inside the contact band |
| `ghost` | transparent | `--ink` | none | Menu toggle, low-emphasis actions |

Size: 48px tall on mobile, 44px on desktop. Horizontal padding 20px. Font is body, weight 600. Radius `--radius-s`. Full-width in the mobile `StickyActionBar`.

| State | Treatment |
|---|---|
| Default | As above |
| Hover | Inside `@media (hover: hover)` only. `primary`: background `--ink-hover`. `secondary`: background `--surface-2`. |
| Focus-visible | `2px solid var(--accent)` outline, `2px` offset. Never removed. |
| Active | `transform: scale(0.98)` |
| Disabled | 40% opacity, `cursor: not-allowed`, `aria-disabled="true"` |
| Loading | Spinner replaces the label, button keeps its width, `aria-busy="true"`. Only needed if a form is added. |

WhatsApp buttons include the WhatsApp glyph (20px, left of the label) and visually hidden text "(opens WhatsApp)".

### TextLink

Colour `--accent`, hover `--accent-hover`. The underline is 1px at rest and grows on hover. Hover rules sit inside `@media (hover: hover)`. External links carry visually hidden "(opens in a new tab)" text.

### MetaLabel

Mono, `--text-label`, uppercase, colour `--accent` for section labels and `--ink-2` for field labels in the dossier.

### StatusChip

| State | Dot | Label | Use |
|---|---|---|---|
| `live` | `--live`, 8px | "LIVE" | System is running in production for the client |
| `delivered` | `--ink-2`, 8px | "DELIVERED" | Handed over and no longer being verified as live |

Never show `live` unless the system genuinely is.

### ChatThread

Renders a real conversation in HTML/CSS, never as a screenshot image.

**Placement.** The component appears twice in the HTML, and exactly one copy is displayed at any width:

| Width | Location | Behaviour |
|---|---|---|
| ≥1024px | Hero, beside the text | Animated, as specified below |
| <1024px | Featured work | Static: server-rendered with `data-state="complete"` and no animation |

The other copy is `display: none`, which also removes it from the accessibility tree, so screen readers hear the thread once. The static copy doesn't animate because it sits below the fold. By the time a visitor scrolls to it, the 4s failsafe has already revealed it, and the late-hydration check would stop the animation anyway. The animated copy must also confirm it's actually displayed (`element.offsetParent !== null`) before starting timers; a resize across 1024px doesn't restart it. Structure: an `<ol>` of `ChatBubble` items, each with the speaker identified for screen readers ("Customer:", "ESE assistant:"). Customer bubbles align left on `--surface-2`. Assistant bubbles align right on `--chat-assistant`. A caption below states that the conversation is real and that customer details were changed.

| State | Behaviour |
|---|---|
| Idle | Server-rendered state. First bubble visible; later bubbles hidden only when the browser runs scripts and motion is allowed |
| Animating | Messages arrive in sequence with `TypingIndicator` |
| Complete | Full thread visible |
| Reduced motion | Renders directly in the complete state |

#### Avoiding the flash of complete content

The full conversation is always in the server-rendered HTML, so visitors without JavaScript see the whole thread. The problem to avoid: if the thread is painted complete and JavaScript then hides the later bubbles to animate them, visitors see the answer, watch it vanish, then watch it replay.

So the later bubbles are hidden **by CSS before first paint**, and only for browsers that will run the animation. The technique uses no inline script of its own. (The site's CSP still needs `'unsafe-inline'` in `script-src`, because Next.js emits its own inline scripts under static export; see `architecture.md` §13. Don't tighten the CSP on the strength of this component.)

```css
/* Hide unplayed bubbles only when JS runs and motion is allowed */
@media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
  .chat[data-state="idle"] .chat-bubble:not([data-step="0"]) {
    opacity: 0;
    /* Failsafe: if JS hasn't taken over within 4s (slow 3G, failed bundle), show everything */
    animation: chat-failsafe 0s 4s forwards;
  }

  /* While animating, JS reveals bubbles by setting data-shown on each one */
  .chat[data-state="animating"] .chat-bubble:not([data-shown]) {
    opacity: 0;
  }
}

@keyframes chat-failsafe {
  to { opacity: 1; }
}
```

The server renders `data-state="idle"`, and the component hydrates in that same state, so there is no hydration mismatch. Hidden bubbles use `opacity`, not `display`, so their space is reserved and nothing shifts when they appear.

Before starting any timers, the component makes three checks. If any one fails, it goes straight to the complete state:

```ts
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Browsers that don't support the `scripting` media feature never hid the bubbles,
// so animating them now would cause the flash this pattern exists to prevent.
const hiddenByCss = window.matchMedia('(scripting: enabled)').matches;
// If hydration arrived after the 4s failsafe fired, the visitor is already reading
// the full thread. Hiding it again to animate would cause the same flash.
const lastBubble = threadRef.current?.querySelector('.chat-bubble:last-child');
const alreadyRevealed = !!lastBubble && getComputedStyle(lastBubble).opacity === '1';

if (reduce || !hiddenByCss || alreadyRevealed) { setState('complete'); return; }
setState('animating');
```

| Visitor | What they see |
|---|---|
| JS loads normally | First bubble, then the reply animates in. No flash. |
| JS disabled | Full thread on first paint (`scripting: enabled` doesn't match). |
| JS slow (hydrates after 4s) | First bubble, then the full thread at 4s via the failsafe. JS sees it's revealed and stays complete. |
| JS bundle fails | First bubble, then the full thread at 4s via the failsafe. |
| Reduced motion | Full thread on first paint (the media query excludes it). |
| Older browser without `scripting` support | Full thread on first paint; JS skips the animation. |

### Dossier

On `--surface-2`, radius `--radius-m`. Desktop: `FieldList` in 4 columns, `Narrative` in 8 columns, `VisualStrip` full width below. Mobile: `FieldList` becomes a 2×2 grid above the narrative, and `VisualStrip` becomes a horizontal scroll-snap row with a visible peek of the next panel.

**Missing-data rule:** if an outcome or testimonial is not confirmed, its block is removed. Never leave an empty slot or placeholder text in production.

### ServiceRow

Full-width row separated by `--border-hair`. Desktop: number in columns 1–2, outcome headline (H3) in 3–7, description and `Tag` in 8–12. Mobile: stacks in the same order. No icons.

### ProcessStep

Topped by `--border-strong`. Mono step number, bold title, two sentences. Desktop: four columns. Mobile: vertical stack with the rule on the left edge forming one continuous line.

### TeamMember

Real photo, consistent crop (4:5), same background and natural light for every person, in colour. Name and role only.

### SiteHeader

Desktop: 64px, sticky, always solid `--paper` with a `--border-hair` bottom. No `backdrop-filter`, and no transparent-to-solid change on scroll: the page background is already `--paper`, so that change would only toggle the hairline, at the cost of an extra scroll-detecting client component.

Because the desktop header is sticky, set `scroll-padding-top: 64px` on `html` from 1024px up, so anchor links don't land with their heading hidden under the header.

Mobile: 56px, **not** sticky. Wordmark and menu toggle only. There is no WhatsApp button in the mobile header: the hero CTA, then the sticky bar, cover it.

### StickyActionBar (mobile only)

64px plus `env(safe-area-inset-bottom)`. Contains a full-width `primary` WhatsApp button. On the homepage it appears (slides up) once the hero CTA scrolls out of view, and hides when the Contact section enters the viewport, so two identical buttons never show at once. On pages without a hero CTA (case study, work index) it shows from load and hides when the page's closing CTA enters the viewport. Each page passes its own trigger and hide targets. Add bottom padding to `main` on mobile equal to the bar's height, so the bar never covers the last content. Implement with `IntersectionObserver`, not scroll listeners.

### MenuSheet (mobile)

Built on the native `<dialog>` element, opened with `showModal()`. That gives focus trapping, Escape-to-close and an inert background from the browser; don't hand-roll a focus trap. The component adds two things: closing on link tap, and returning focus to the menu toggle on close (`dialog.addEventListener('close', () => toggle.focus())`).

Full-screen `--paper` sheet. Links at 24px, 56px row height. WhatsApp button pinned to the bottom. Style the backdrop with `dialog::backdrop`.

---

## 9. States beyond the happy path

| Situation | Treatment |
|---|---|
| Work page with one project | Show the single dossier full-width with a quiet line: "More case studies as projects launch." No fake grid. |
| Image fails to load | `ResponsiveImage` with explicit dimensions so the layout holds. `--surface-2` placeholder background. Meaningful alt text. |
| WhatsApp not available (desktop without WhatsApp) | Can't be detected, so the email link always sits next to the WhatsApp button in the Contact section. |
| Contact form error (if a form is added) | Inline message under the field, linked with `aria-describedby`, saying what to fix ("Add your business name"), never just "Invalid". The user's input is never cleared. |
| Contact form success (if a form is added) | Replace the form with a confirmation stating when they'll hear back, plus the WhatsApp link. |
| JavaScript slow or failed | All content is server-rendered and visible. Only the chat animation and sticky bar depend on JS, and the chat thread has a 4s CSS failsafe (see `ChatThread`). |

---

## 10. Accessibility requirements

These are requirements, not polish:

- Every text and background pair meets WCAG 2.2 AA (contrast values above).
- Visible focus on every interactive element via `:focus-visible`.
- Tap targets at least 44×44px.
- Semantic landmarks: `header`, `nav`, `main`, `footer`. One `h1` per page, headings in order.
- `lang="en-GH"` on `<html>`.
- Decorative numbers and glyphs carry `aria-hidden="true"`.
- The page works at 200% zoom and at 320px width with nothing cut off or scrolling sideways.
- `prefers-reduced-motion` is respected everywhere.
- Every image has meaningful alt text describing what it shows, or `alt=""` if purely decorative.

---

## 11. Performance budget

| Metric | Target |
|---|---|
| Total homepage weight | Under ~1 MB |
| Largest Contentful Paint | Under 2.5s on a mid-range Android over 3G |
| Cumulative Layout Shift | ≤ 0.05 (the CI assertion). Design goal: zero shift from fonts and images. Same target as `architecture.md`. |
| Web fonts | One family, self-hosted |
| Third-party scripts | Lightweight, privacy-friendly analytics only |

The site uses Next.js static export, which disables `next/image` optimisation. Don't use `next/image`. Use the `ResponsiveImage` component, which renders `<picture>` with AVIF/WebP sources generated at build time by the `sharp` pipeline in `architecture.md`, with explicit `width` and `height` on every image. The mobile hero has no image, so the LCP element is the headline text. Before launch, test on a real budget Android phone on 3G, not just Chrome device mode.

---

## 12. Full token sheet

```css
:root {
  /* Colour */
  --paper: #F6F3EE;
  --surface-2: #EEE9E1;
  --ink: #16130F;
  --ink-hover: #2B2620;
  --ink-2: #5A534B;
  --rule: #E2DCD3;
  --accent: #A63F26;
  --accent-hover: #963820;
  --live: #2A7349;
  --chat-assistant: #E7F0E9;
  --on-dark: #F6F3EE;
  --on-dark-2: #B8AFA3;
  --accent-on-dark: #E07A5A;
  --rule-on-dark: #2E2924;

  /* Type */
  --font-sans: "Schibsted Grotesk", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SF Mono", "Cascadia Mono", "Roboto Mono", monospace;
  --text-display:   clamp(2.25rem, 1.5rem + 3.33vw, 4.5rem);
  --text-h2:        clamp(1.75rem, 1.4rem + 1.48vw, 2.75rem);
  --text-h3:        clamp(1.25rem, 1.08rem + 0.74vw, 1.75rem);
  --text-statement: clamp(1.5rem, 1.25rem + 1.11vw, 2.25rem);
  --text-body-l:    clamp(1.125rem, 1.08rem + 0.19vw, 1.25rem);
  --text-body:      1rem;
  --text-small:     0.875rem;
  --text-label:     clamp(0.75rem, 0.73rem + 0.09vw, 0.8125rem);

  /* Spacing */
  --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
  --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
  --space-7: 48px;  --space-8: 64px;  --space-9: 96px;
  --space-10: 128px; --space-11: 160px;
  --section-y: clamp(64px, 10vw, 160px);

  /* Shape */
  --radius-s: 4px;
  --radius-m: 8px;
  --radius-chat: 12px;
  --border-hair: 1px solid var(--rule);
  --border-strong: 2px solid var(--ink);
  --shadow-device: 0 20px 40px -24px rgb(22 19 15 / 0.25);

  /* Motion */
  --ease: cubic-bezier(0.2, 0, 0, 1);
  --dur-fast: 150ms;
  --dur-base: 250ms;
  --dur-slow: 400ms;

  /* Layout */
  --container: 1200px;
  --container-xl: 1280px;
  --page-margin: var(--space-4);   /* 16px; becomes 32px at 640px (see §5) */
}

@media (min-width: 640px) {
  :root { --page-margin: var(--space-6); }
}

/* Breakpoints are not tokens: hard-code 640px / 1024px / 1440px in media queries. */
```

---

## Open items before launch

| Item | Owner | Blocks |
|---|---|---|
| Existing logo (if any) reviewed against this system | Franklin | WordMark |
| ESE permission to be named and to show a real conversation | Franklin | Hero ChatThread, Dossier |
| ESE outcome figure and testimonial | Franklin | Dossier Result, PullQuote |
| Confirm the ESE system is still live | Franklin | StatusChip state |
| Team photos in one consistent session | Team | About |
| Dedicated WhatsApp Business number and hello@afrokanlabs.com | Franklin | All CTAs, Contact |

---

## Changelog

**1.4**
- `ChatThread` placement: animated in the desktop hero, static in Featured work below 1024px. The displayed instance alone animates.
- `StickyActionBar`: behaviour on pages without a hero CTA; `main` bottom padding so the bar never covers content.
- `SiteHeader`: no WhatsApp button in the mobile header (reconciled with the homepage strategy).

**1.3**
- `ChatThread`: added a third pre-animation check. If hydration arrives after the 4s failsafe has revealed the thread, the component stays complete instead of hiding and replaying it. Added the `animating`-state CSS rule.
- `ChatThread`: corrected the CSP note. The technique adds no inline script, but the site's CSP still needs `'unsafe-inline'` because of Next.js's own inline scripts.
- CLS target set to ≤ 0.05 as the CI assertion, with zero font and image shift as the design goal, aligned across all three docs.
- `ResponsiveImage` added to the primitives list.
- `SiteHeader`: `scroll-padding-top` for anchor links under the sticky desktop header.

**1.2**
- Added `--page-margin` (16px, 32px from 640px). The container is now calculated from it, so phones get the specified 16px margin instead of 32px.
- `ChatThread`: later bubbles are hidden by CSS before first paint (`@media (scripting: enabled) and (prefers-reduced-motion: no-preference)`), with a 4s CSS failsafe. This removes the flash where the complete thread appeared, vanished and replayed.
- `ChatThread` JS skips the animation when the browser doesn't support the `scripting` media feature.
- Grid table now lists the container width at every breakpoint.

**1.1**
- `--accent` darkened to `#A63F26` and `--live` to `#2A7349`: both failed AA on `--surface-2`. Contrast table now lists both surfaces.
- Added `--ink-hover` and `--chat-assistant`; removed the raw hex values that broke the token rule.
- Breakpoints documented as fixed values, not CSS variables (variables don't work in media queries).
- Container uses `min()` so the `lg` range no longer overflows between 1024px and 1199px.
- Desktop header is always solid; transparent-to-solid behaviour removed.
- `MenuSheet` built on native `<dialog>`.
- Hover styles scoped to `@media (hover: hover)`.
- `ChatThread` checks reduced motion in JavaScript.
- `next/image` replaced with `ResponsiveImage` to match static export.
- CLS target aligned with `architecture.md`.
