# afrokanlabs.com

Company website for Afrokan Labs, Accra. Next.js (App Router) with static export, TypeScript and CSS Modules over design tokens. Hosted on Cloudflare Pages.

> **Status:** foundation in progress. The home page is a bare placeholder until BUILD_PLAN 1.6 (coming soon) and Phase 2 (homepage).

## Start here

| File                    | What it decides                                           |
| ----------------------- | --------------------------------------------------------- |
| `CLAUDE.md`             | Stack, rules and overrides. Wins over the other docs      |
| `docs/architecture.md`  | Architecture and reasoning                                |
| `docs/BUILD_PLAN.md`    | Ordered tasks with acceptance criteria                    |
| `docs/design-system.md` | Tokens, grid, type and components                         |
| `docs/content/`         | Approved copy and strategy                                |
| `docs/AUDIT.md`         | What was kept and removed from the previous site, and why |

## Run it locally

Use the Node version in `.nvmrc` and pnpm.

```bash
pnpm install
pnpm dev              # http://localhost:3000
```

## Commands

```bash
pnpm build            # static export to out/
pnpm typecheck        # route types + tsc --noEmit
pnpm lint             # ESLint + Stylelint (token enforcement)
pnpm format           # Prettier
pnpm content:validate # Zod-validate all content
pnpm images           # optimise source images to AVIF/WebP
pnpm lhci             # Lighthouse CI against out/
pnpm launch:check     # fails while any TODO_ placeholder remains
```

`typecheck`, `lint`, `content:validate` and `build` must all pass before a change is done.

`content:validate`, `images` and `lhci` are stubs until BUILD_PLAN 1.4, 2.6 and 1.6. `launch:check` is a stub until 1.5 and fails on purpose until then.

Don't run `pnpm build` while `pnpm dev` is running. Both write to `.next/`, and the dev server breaks.

## Styling rules

- Every raw colour, size and font value lives in `src/styles/tokens.css`.
- In `src/components/**`, colour, spacing and font properties must use `var(--…)`. Stylelint fails the build otherwise.
- Media queries use only `min-width: 640px`, `1024px` or `1440px`.

## Project structure

```
assets/images/   Source images (already redacted); optimised at build time
docs/            Architecture, build plan, design system, approved copy
src/app/         Routes, layout, sitemap, robots
src/components/  Components (Mark.tsx is the logo; keep its path as is)
src/content/     All copy and business facts
src/styles/      Design tokens and base styles
```

## Environment

Copy `.env.example` to `.env.local`. Only `NEXT_PUBLIC_*` variables are used by the build. Business details such as the WhatsApp number and email are content, so they live in `src/content/site.ts`, not in env files.
