# Afrokan Labs — Website Content

Source of truth for homepage strategy and copy. Developers build from these files; nobody writes copy directly in components. Must stay consistent with `../design-system.md` and `../architecture.md`.

## Files

| File | Purpose | Status |
|---|---|---|
| `homepage-strategy.md` | Goals, audiences, CTAs, section specs, navigation, mobile rules, launch checklist | Approved draft v2.1 |
| `homepage-copy.md` | Section-by-section copy, with tier variants for the ESE content | Draft v2.1 — has placeholders |
| `case-studies/ese-logistics.md` | ESE permission tiers, what to collect, page structure, schema mapping | Waiting on ESE |

## Build approach

Build starts now, in parallel with content. The content schema blocks unverified items from rendering, so missing ESE data never blocks the build. Copy sign-off is the last step, not the first.

## Placeholders in code

Every bracketed placeholder in `homepage-copy.md` becomes a `TODO_` string in `src/content/` (e.g. `[X hours]` → `"TODO_REPLY_HOURS"`). `pnpm launch:check` fails while any remain.

**Exception:** brackets inside a prefilled WhatsApp message (`I run a [type of business]`) are intentional prompts for the visitor to overwrite. They ship as written and are not placeholders.

## Open decisions

1. **Which ESE deliverable did the client value most?** Sets the order of "What we build" and the hero subhead. Default: WhatsApp assistant first. Asked in a separate check-in with ESE, never alongside the permission request.
2. **Demo offer (OfferBand): ship at launch or later?** Ship only if a reusable sandbox assistant exists and one demo costs about 1 hour of work or less. Set a weekly cap of [N] demos. If either condition isn't met, launch without it. In code: `site.demoOffer.enabled`.
3. **Pricing signal:** publish "from GH₵X" or use "quoted after a free first conversation."
4. **Dedicated WhatsApp Business number** for the site, not a personal line.
5. **Domain email:** create `hello@afrokanlabs.com`.
6. **ESE's location for the anonymised label.** Default is "a Ghanaian clearing and forwarding firm." Name a city only once it's confirmed.

## ESE status

Publish at the highest tier confirmed (see case study file). **Deadline: two weeks from the permission request.** After that, launch at the current tier and upgrade later through a content edit.

## Rules

- Only delivered or live client work appears on the site.
- No invented numbers, logos, or testimonials. Unconfirmed items are omitted, never filled with placeholders on the live site.
- No real customer messages are published, blurred or otherwise. Demo conversations come from staff test numbers.
- Deuel's Designs is not mentioned except as "formerly Deuel's Designs" in the named-tier ESE case study.
- Use "Ghanaian," not "African," in all claims about who we build for. All our proof is in Ghana.

## v2.1 reconciliation with the architecture and design system

| Topic | Resolution |
|---|---|
| Analytics events | One canonical list in `architecture.md` §7; the strategy table now matches it |
| Contact form | Phase 6 only, on `/contact`, three fields from the copy doc. Not on the homepage |
| About page | Out of scope until it has copy. "About" links to the homepage `#about` section |
| Mobile header WhatsApp button | Not shown; hero CTA then sticky bar cover it (design-system §8) |
| Chat conversation | Animated in the desktop hero; static and complete in Featured work on mobile and tablet |
| Anonymised label | "A Ghanaian clearing and forwarding firm" until a city is confirmed |
