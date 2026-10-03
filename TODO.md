# What the site still needs

Everything below shows on the live site as a placeholder, or is left out until it arrives. `pnpm launch:check` lists the content items and fails until they're done. The full asset notes are in `docs/design/handoff/NOTES-AND-ASSETS.md`.

## Photos (replace the `PLACEHOLDER-*` files in `assets/images/`)

Put the real photo in `assets/images/` and point the content file at it. Colour originals are fine: the site shows them in black and white.

| Placeholder                           | Where                                           | What to send                                                             | Content file                            |
| ------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------- |
| `PLACEHOLDER-ideas-team-wide.jpg`     | Ideas row, wide photo                           | The team at laptops, landscape, about 3:2                                | `src/content/home.ts` → `ideas.wide`    |
| `PLACEHOLDER-ideas-portrait-tall.jpg` | Ideas row, tall photo (the red bulb sits on it) | A teammate looking thoughtful, portrait, about 2:3                       | `src/content/home.ts` → `ideas.tall`    |
| `PLACEHOLDER-services-at-work.jpg`    | Services panel (the blue ring circles the head) | Someone working, about 4:5, face in the upper third                      | `src/content/services.ts` → `image`     |
| `PLACEHOLDER-contact-cutout.png`      | "Get in Touch Today!"                           | Transparent PNG of a person, waist up, ideally holding a laptop or phone | `src/content/home.ts` → `contact.image` |
| Hero portrait (interim headshot)      | Hero arch                                       | Optional: a cut-out of Franklin, waist up, at least 1200px tall          | `src/content/home.ts` → `hero.photo`    |

## Business facts (`TODO_` in `src/content/`)

| Item                                                                                                  | File                                                       |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| WhatsApp Business number (E.164, e.g. +233…)                                                          | `site.ts` → `whatsappNumber`                               |
| Reply time for the contact form's thank-you line                                                      | `site.ts` → `replyWithin`                                  |
| LinkedIn, X and Instagram URLs (each icon appears once its URL is set; delete a line to leave it out) | `site.ts` → `social`                                       |
| Franklin's LinkedIn URL                                                                               | `team.ts`                                                  |
| Each other team member: name, role, 1–2 line bio, square headshot, LinkedIn, or delete the entry      | `team.ts`                                                  |
| ESE: the month the system went live; confirm "faster" and "a website that brings in enquiries"        | `projects/ese-logistic.mdx`, `home.ts`                     |
| Caption for a delivered (not live) system, or set ESE live                                            | `tiers.ts`                                                 |
| Search descriptions (`TODO_APPROVE_SEO_DRAFT`)                                                        | `case-study.ts`, `privacy.ts`, `projects/ese-logistic.mdx` |

## Testimonials

None yet, so the carousel is hidden. Add real quotes to `src/content/testimonials.ts`, each with the client's words, name, role, company, an optional small photo or logo, and their written permission. ESE Logistic is the obvious first ask.

## Share images

1200×630 PNGs in `public/og/`: `home.png`, `work.png`, `work-ese-logistic.png`, `contact.png` and `privacy.png`.

## Settings and accounts

| Item                                                                              | Where                                           |
| --------------------------------------------------------------------------------- | ----------------------------------------------- |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (real key, Production)                           | Cloudflare Pages → Variables (DEPLOY.md §3, §7) |
| `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (Production secrets) | Cloudflare Pages → Variables (DEPLOY.md §7)     |
| Resend domain `notify.afrokanlabs.com` with SPF/DKIM, and DMARC                   | Resend and Cloudflare DNS (DEPLOY.md §7)        |
| Rate-limit rule on `/api/contact`                                                 | Cloudflare WAF (DEPLOY.md §7)                   |
| `NEXT_PUBLIC_ANALYTICS_ID` (Umami, Production)                                    | Cloudflare Pages → Variables (DEPLOY.md §6)     |

## Decisions

- **Newsletter:** built but switched off (`site.ts` → `footer.newsletter.enabled`). To turn it on, choose a provider (Mailchimp, Buttondown, Resend Audiences…); the form then needs wiring to it.
- **Words line:** "Innovate ✦ Inspire ✦ Create" are the reference's words. Send your own if you prefer (`home.ts` → `words`).
- **Ticker keywords:** `site.ts` → `ticker`.
