# Privacy page copy (Draft v2)

**Status:** drafted by Claude from `architecture.md` §7, §12 and §13 on 2026-10-02. **Awaiting Franklin's approval.** Until it is approved, `src/content/privacy.ts` carries `TODO_PRIVACY_COPY_APPROVAL` and `pnpm launch:check` fails.

Plain language, short, and only what is true of the site. **v2 (2026-10-02, BUILD_PLAN 6.1)** covers the contact form. It adds an item to the analytics list, rewrites the first paragraph of "When you contact us", and adds a section, "The contact form". Architecture §13 requires this to be approved before the form goes live.

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
- whether a contact form message was sent, but never what it says

We use these counts to improve the site.

## When you contact us

If you message us on WhatsApp, email us or use the contact form, we receive what you send, including your name, number or email address. We use it only to reply to you and to work with you. We don't sell it or pass it to anyone else.

WhatsApp and email are run by other companies, which handle your messages under their own privacy policies.

## The contact form

The form asks for your name, your WhatsApp number or email address, and your message. The site doesn't store them. They go straight to our inbox, delivered by Resend, an email service.

To keep out spam, Cloudflare Turnstile checks that the form is being used by a person. To do this, it looks at technical information about your browser and device.

We handle what you send in line with Ghana's Data Protection Act, 2012. To ask what we hold about you, to correct it or to have it deleted, email hello@afrokanlabs.com.

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
4. **Ghana's Data Protection Act, 2012** is now mentioned, because the form collects names and contact details (architecture §13). The Act may also require registering with Ghana's Data Protection Commission. Check that before the form goes live; this isn't legal advice.
5. **"The site doesn't store them."** True of the site and the function. Resend keeps sent emails for a while under its own retention policy. Say so on the page if you'd rather be explicit.
6. **Turnstile and cookies.** Turnstile runs in a Cloudflare frame on /contact only. Before approving, check in the browser that it sets no cookie on afrokanlabs.com, so "doesn't use cookies" under Analytics still holds for the whole site.

---

## Other interface text drafted with this page (also awaiting approval)

| Where | Text |
| --- | --- |
| Footer link (new) | Privacy |
| 404 page title | Page not found |
| 404 page body | This page doesn't exist or has moved. |
| 404 page link | Go to the homepage |
| Work index heading | Work (the approved nav label) |
