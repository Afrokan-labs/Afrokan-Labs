# Repo audit (BUILD_PLAN 1.1)

Approved by Franklin on 2026-10-01.

## Starting point

- Next 15.5.4, React 19.1.0, App Router, TypeScript `strict: true`.
- Routes: `/`, `/work/[slug]` (ESE), 404, `sitemap.ts`, `robots.ts`, a generated OG image, and `POST /api/contact` (Resend).
- Components: ten home page sections (Nav, Hero, Services, Work, Process, Products, Team, Mission, Contact, Footer), plus `ContactForm`, `WhatsAppButton`, `Placeholder` and `Mark`.
- Styling: CSS Modules over a tokens file, using the previous brand (black, `#00C853` green, Sora).
- Tooling: npm and Node 22. No ESLint, Stylelint, Prettier or `.nvmrc`. `next lint` is deprecated.
- `npm audit`: critical advisories against `next@15.5.4`.

## Cleanup list

**Keep**
- Next 15 / React 19 / App Router / TS strict.
- `components/Mark.tsx`, unchanged (logo review is an open design item).
- `app/icon.svg`.
- The CSS Modules + tokens pattern.
- Skip link, `.sr-only`, `:focus-visible` and reduced-motion handling.
- Sitemap, robots and 404 logic, made `force-static`.

**Change**
1. Move the docs into `docs/` and `docs/content/`, move code into `src/`, and point `@/*` at `./src/*`.
2. Switch npm to pnpm and add `.nvmrc`.
3. `next.config.ts`: `output: 'export'`, `images.unoptimized`.
4. Replace Sora with Schibsted Grotesk via `next/font/google` (BUILD_PLAN 1.3).
5. Rebuild tokens from design-system §12, and split `globals.css` into `base.css` and `grid.css` (BUILD_PLAN 1.3).
6. Replace `next lint` with ESLint (flat config), and add Stylelint and Prettier.
7. Rewrite `README.md` and `.env.example`.

**Delete**
- `Nav` (backdrop-filter, pill buttons and a scroll-detecting client component conflict with design-system §1 and §8).
- `ContactForm`, `app/api/contact/` and the Resend variables (they return in Phase 6 as a Pages Function).
- `WhatsAppButton` (replaced by `StickyActionBar`).
- `Products` and `Mission` sections, and `content/products.ts`.
- `Placeholder`, `styles/shared.module.css`, and the gradient `DESIGN:` notes.
- `opengraph-image.tsx` (static PNGs go in `public/og/`).
- `next/image` usage.
- All previous-site copy, including the invented chat transcript, which didn't come from a staff test number.

The remaining sections and the case study page are rebuilt in Phases 2 and 3.

## Decisions

| # | Decision | Outcome |
|---|---|---|
| 1 | Dependencies not named in CLAUDE.md | Approved: `eslint-config-next`, `stylelint-config-standard`, `@lhci/cli`, `tsx` |
| 2 | Node version | 24 (current LTS) in `.nvmrc` |
| 3 | Next security advisories | Upgrade to the latest 15.5.x and React 19.1.x |
| 4 | Case study slug | Neutral slug until ESE approves being named (an `ese-…` URL names the client) |
| 5 | Existing founder photo | Move to `assets/images/`; use until the Phase 0 photo session |
| 6 | CLS target | ≤ 0.05 in CI; 0 is the design goal |
| 7 | "More case studies as projects launch." (design-system §9) | Dropped, per the CLAUDE.md no-filler rule |
| 8   | Font loading: `display: swap` (design-system §3) vs zero font shift (§11) | Keep `swap` (2026-10-01). Text may re-wrap when the font arrives; CLS stays within the 0.05 CI budget. `/_primitives` is excluded from Lighthouse |

## Notes

- Until ESE approves the anonymised description, the ESE project stays `published: false`. Deployed builds then show no featured work, no proof line and no `/work`.
- BUILD_PLAN 2.1 also builds `SectionHeader`, `ChatBubble` and `TypingIndicator`, which design-system §8 lists as primitives.
