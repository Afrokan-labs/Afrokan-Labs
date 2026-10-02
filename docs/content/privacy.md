# Privacy page copy (Draft v1)

**Status:** drafted by Claude from `architecture.md` §7, §12 and §13 on 2026-10-02. **Awaiting Franklin's approval.** Until it is approved, `src/content/privacy.ts` carries `TODO_PRIVACY_COPY_APPROVAL` and `pnpm launch:check` fails.

Plain language, short, and only what is true of the site at launch (no contact form, cookieless analytics). Update it **before** the Phase 6 contact form goes live (architecture §13).

---

**Title**
Privacy

**Intro**
This site is built to collect as little as possible. Here is everything it collects, and why.

## Analytics

We use Umami, a privacy-friendly analytics service, to count how the site is used. It doesn't use cookies and doesn't collect personal data. It can't identify you, and we don't try to.

It records:

- which pages are visited, and which site linked to them
- the type of browser and device, and the country the visit came from
- clicks on our WhatsApp, email and case study links

We use these counts to improve the site.

## When you contact us

The site has no forms. If you message us on WhatsApp or email us, we receive what you send, including your name, number or email address. We use it only to reply to you and to work with you. We don't sell it or pass it to anyone else.

WhatsApp and email are run by other companies, which handle your messages under their own privacy policies.

## Hosting

The site is hosted on Cloudflare. To deliver the pages and protect the site from attacks, Cloudflare processes basic technical information, such as your IP address.

## Questions

Email hello@afrokanlabs.com and we'll answer any question about your data.

**Last updated:** 2 October 2026

---

## To check before approving

1. **Umami is named as the analytics provider.** Architecture §7 makes it the default, but it isn't connected yet (BUILD_PLAN 4.1). If you choose Plausible, change the name.
2. **"Doesn't use cookies."** True of the site's code and of Umami. Re-check after the security headers task (4.2) that Cloudflare sets no cookies on the domain.
3. **"We don't sell it or pass it to anyone else."** Only approve this if it's how Afrokan Labs handles messages.
4. **Ghana's Data Protection Act, 2012** isn't mentioned, because the site collects no personal data itself. Architecture §13 says it applies once the Phase 6 form collects names and emails; add it then.

---

## Other interface text drafted with this page (also awaiting approval)

| Where | Text |
| --- | --- |
| Footer link (new) | Privacy |
| 404 page title | Page not found |
| 404 page body | This page doesn't exist or has moved. |
| 404 page link | Go to the homepage |
| Work index heading | Work (the approved nav label) |
