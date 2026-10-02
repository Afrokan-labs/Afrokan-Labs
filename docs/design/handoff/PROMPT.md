# Prompt to paste into Claude Code

Before you start:

1. Copy everything in this folder into the root of your Next.js repo: `CLAUDE.md`, `NOTES-AND-ASSETS.md`, `reference/` and `assets/`. If the repo already has a `CLAUDE.md`, paste this one's contents at the bottom of it instead.
2. Open the repo in Claude Code and paste the prompt below.

---

Build the Afrokan Labs marketing site in this repo.

Read `CLAUDE.md` first. It's the full build brief. The approved design is `reference/afrokan-labs-redesign.html`: open it and treat it as the source of truth for layout, spacing, colours, type and copy. Ignore its review-only parts (the top review bar, `.x-note` paragraphs and `.x-stand` tags), as the brief explains.

Work section by section, in the order listed in the brief:

1. Inspect the repo and tell me what it uses: router, TypeScript or JS, styling approach, package manager. Then set up the design tokens, fonts and shared UI components to match.
2. Build the sections one at a time. After each one, run the dev server, compare it with the reference at 1280px and 400px wide, and fix any differences before moving on.
3. Wire up the behaviour: mobile menu, services accordion, testimonials carousel, ticker, and the contact form with its `/api/contact` route.
4. Finish with the "Done when" checklist in `CLAUDE.md`, then write `TODO.md` listing every placeholder image, missing link and env var still needed. `NOTES-AND-ASSETS.md` has the full list.

Rules: match the existing repo conventions, don't add a new styling system, and never invent stats, ratings, testimonials or team members. Use clearly named placeholders until real content arrives. Commit after each section with a clear message.
