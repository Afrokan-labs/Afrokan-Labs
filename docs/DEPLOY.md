# Deploying afrokanlabs.com

Static export (`out/`) on **Cloudflare Pages** with Git integration (architecture §10–§12). Every pull request gets a preview URL; merging to `main` deploys production.

## 1. GitHub (once)

1. Create the repository under the **Afrokan Labs organisation** account, not a personal account (architecture §11). Keep it private.
2. Push this repo and set `main` as the default branch.
3. Settings → Branches → add a protection rule for `main`:
   - Require a pull request before merging.
   - Require status checks to pass: **CI / checks** (`.github/workflows/ci.yml`).
4. Turn on 2FA for every member, and give at least two people admin access.

## 2. Cloudflare Pages (once)

Workers & Pages → Create → **Pages** tab → **Connect to Git** (or "Import an existing Git repository") → choose the repository.

> **Pages, not Workers.** The Create screen opens on Workers. A Workers project asks for a **deploy command** (`npx wrangler deploy`); Wrangler then detects Next.js, tries to convert the site with the OpenNext server adapter, and fails with `ENOENT … .next/standalone/.next/server/pages-manifest.json`, because this site is a static export with no server. If the setup form shows a deploy command, go back and pick Pages. The Pages form only asks for a build command and an output directory.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | None |
| Build command | `pnpm build` |
| Build output directory | `out` |
| Root directory | _(blank)_ |

`pnpm build` validates all content first (`pnpm content:validate`), so a deploy with invalid content fails instead of shipping.

### Node and pnpm versions

- **Node:** the build image reads `.nvmrc` (currently `24`). If the build log shows a different version, set the variable `NODE_VERSION` to the value in `.nvmrc`.
- **pnpm:** the build image detects `pnpm-lock.yaml`. Set `PNPM_VERSION` to the version in `package.json` → `packageManager` (currently `10.23.0`) so builds match local installs.

## 3. Environment variables

Settings → Variables and Secrets. Set them separately for **Production** and **Preview**.

| Variable | Production | Preview | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://afrokanlabs.com` | _leave unset_ | Previews fall back to Cloudflare's `CF_PAGES_URL` (see `next.config.ts`). Production never falls back: if it's missing, the build fails. |
| `NEXT_PUBLIC_ANALYTICS_ID` | Umami website ID (from BUILD_PLAN 4.1) | _leave unset_ | Unset means `track()` does nothing, so test clicks don't pollute the data. |
| `NODE_VERSION` | `24` | `24` | Only if the build log shows the wrong Node version. |
| `PNPM_VERSION` | `10.23.0` | `10.23.0` | Keep in step with `packageManager`. |

Phase 6 only (contact form): `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Turnstile's test key in Preview), and the secrets `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, set as **encrypted secrets in Production only**. The Next build never reads the secrets; the Pages Function does at runtime.

Never put a secret in a `NEXT_PUBLIC_` variable: those are inlined into the public site.

## 4. Check a preview (BUILD_PLAN 1.6 acceptance)

1. Open a pull request. CI runs, and Cloudflare comments on the PR with a preview URL.
2. Open the preview URL on a phone. The coming-soon page should load with the Schibsted Grotesk headline.
3. Open `<preview URL>/robots.txt`. The `Sitemap:` line should show the preview's own URL, not afrokanlabs.com.
4. Confirm CI is green on the PR.

## 5. Custom domain (after DNS moves to Cloudflare)

DNS on Cloudflare, registrar lock and 2FA are Phase 0 tasks.

1. Pages project → Custom domains → add `afrokanlabs.com`, then `www.afrokanlabs.com`.
2. Redirect `www` to the apex domain (Rules → Redirect Rules), so there is one canonical address.
3. Check `https://afrokanlabs.com/robots.txt` shows `https://afrokanlabs.com/sitemap.xml`.

## Rollback

Pages project → Deployments → pick the last good deployment → **Rollback to this deployment**. Then fix forward through a pull request.

## Local checks before pushing

```bash
pnpm typecheck && pnpm lint && pnpm content:validate && pnpm build && pnpm lhci
```

`pnpm lhci` needs Chrome installed. It writes reports to `.lighthouseci/`, which isn't committed.
