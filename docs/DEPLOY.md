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
| `NEXT_PUBLIC_ANALYTICS_ID` | Umami website ID for afrokanlabs.com (see §6) | _leave unset_ | Unset means no analytics script loads, so test clicks don't pollute the data. Must be a UUID or the build fails. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | The real site key (see §7) | `1x00000000000000000000AA` | Required, or the build fails. The Preview value is Turnstile's published test key, which always passes. A production build (branch `main`) with a test key fails. |
| `NODE_VERSION` | `24` | `24` | Only if the build log shows the wrong Node version. |
| `PNPM_VERSION` | `10.23.0` | `10.23.0` | Keep in step with `packageManager`. |

The contact form's function also needs three **secrets** (type: Secret), in **Production only**: `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (see §7). The Next build never reads them; `functions/api/contact.ts` reads and checks them on each request. Without them, previews show the form, but sending fails with the "couldn't send" message.

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

## 6. Analytics (Umami Cloud, BUILD_PLAN 4.1)

1. Sign up at [cloud.umami.is](https://cloud.umami.is) (the free Hobby plan is enough).
2. Add two websites: **afrokanlabs.com**, and **afrokanlabs preview test** (domain: your `*.pages.dev` preview host). Copy each one's **Website ID**.
3. **Test on a preview:** set `NEXT_PUBLIC_ANALYTICS_ID` in **Preview** to the *test* website's ID and retry the preview deployment. Open the preview, click the WhatsApp buttons, the case study links and the email link, then check **Realtime** in Umami: each click shows as an event (`whatsapp_click`, `case_study_click`, `email_click`) with its `location`.
4. **Remove** the Preview variable afterwards and redeploy. Confirm in DevTools → Network that no request goes to `umami.is`.
5. Set `NEXT_PUBLIC_ANALYTICS_ID` in **Production** to the afrokanlabs.com website's ID.

The tracker loads from `https://cloud.umami.is` and sends events to `https://gateway.umami.is`. The security headers (BUILD_PLAN 4.2) allow both.

Analytics can't see conversations once a visitor reaches WhatsApp. Both prefilled messages begin "Hi Afrokan Labs,". Log each chat that starts that way in the conversations sheet (architecture §7): Date, Business type, Qualified (Y/N), Became a quote (Y/N).

## 7. Contact form (BUILD_PLAN 6.1)

The form posts to `functions/api/contact.ts`, a Pages Function that Cloudflare deploys automatically from `functions/`. Set this up **before** merging the form to `main`, in this order:

1. **Approve the copy.** Approve `docs/content/contact.md` and the privacy page Draft v2 (`docs/content/privacy.md`). Architecture §13 requires the privacy update before the form goes live.
2. **Turnstile.** Go to Cloudflare dashboard → Turnstile → Add widget. Name it afrokanlabs.com, add the hostname `afrokanlabs.com`, and choose the Managed mode. Copy the **site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` (Production) and the **secret key** into `TURNSTILE_SECRET_KEY` (Production, Secret).
3. **Resend.**
   1. Sign up at [resend.com](https://resend.com) with `admin@afrokanlabs.com`, and turn on 2FA.
   2. Add the domain **`notify.afrokanlabs.com`**, not the root domain, so a deliverability problem can't affect the main mailbox (architecture §6).
   3. Add the SPF and DKIM records Resend shows to Cloudflare DNS, and wait for Resend to show the domain as verified.
   4. Create an API key with **Sending access** for that domain only, and put it in `RESEND_API_KEY` (Production, Secret).
4. **DMARC.** If `_dmarc.afrokanlabs.com` doesn't exist yet, add a TXT record `v=DMARC1; p=none; rua=mailto:admin@afrokanlabs.com`. Tighten it to `p=quarantine` once the reports are clean.
5. **Inbox.** Set `CONTACT_TO_EMAIL` (Production, Secret) to `hello@afrokanlabs.com`.
6. **Rate limit.** Go to Cloudflare dashboard → afrokanlabs.com → Security → WAF → Rate limiting rules → Create rule. Use: URI Path equals `/api/contact`, Method `POST`, 5 requests per 10 minutes per IP, action Block for 10 minutes. The free plan allows one rule; this is it.
7. **Deploy and test.** After the production deploy, send one real message from a phone with an email address in the second field. Check that it arrives at hello@, isn't in spam, and that replying goes to the address you entered. Then send one with a WhatsApp number and no email. The notification then has no Reply-To.

**Testing a preview end to end (optional).** Previews have no secrets, so sending fails there by design. To try it, add Preview-scoped secrets temporarily:
- `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` (the test secret)
- your real `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

Retry the deployment, send a message, then **delete the three Preview secrets**.

**Locally:**

```bash
pnpm build
npx wrangler pages dev out --compatibility-date=2026-08-01
```

Wrangler reads the function's secrets from `.dev.vars`, which is git-ignored (see `.env.example` for its contents). `pnpm test:contact` checks the function with Turnstile and Resend stubbed, and CI runs it.

## Rollback

Pages project → Deployments → pick the last good deployment → **Rollback to this deployment**. Then fix forward through a pull request.

## Local checks before pushing

```bash
pnpm typecheck && pnpm lint && pnpm content:validate && pnpm test:contact && pnpm build && pnpm lhci && pnpm a11y
```

`pnpm lhci` and `pnpm a11y` need Chrome installed (set `CHROME_PATH` if `a11y` can't find it). It writes reports to `.lighthouseci/`, which isn't committed.

### Security headers (BUILD_PLAN 4.2)

`public/_headers` is copied to `out/` and applied by Cloudflare. To test it locally with the CSP applied:

```bash
pnpm build
npx wrangler pages dev out --compatibility-date=2026-08-01
```

Open the printed URL and check the browser console is clean on every page. If you change where analytics loads from, update `src/lib/analytics.ts` and the CSP together: `pnpm content:validate` fails if they disagree.

After the first production deploy, scan https://afrokanlabs.com at [securityheaders.com](https://securityheaders.com). Expect an A: the `'unsafe-inline'` in `script-src` is required by Next's static export (CLAUDE.md override #1).
