# Afrokan Labs website

Next.js 15 (App Router) + TypeScript. One page, no CSS framework, brand tokens in `app/globals.css`.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Edit content

- **Contact details, WhatsApp, booking link, team** → `site.config.ts`
  - Fill in `whatsapp` (digits only, e.g. `233201234567`) and the WhatsApp links plus the floating button appear.
  - Fill in `bookingUrl` (e.g. a Cal.com link) and a "Book a call" link appears in the contact section.
  - Add teammates to the `team` array and drop their photos in `public/team/`.
- **Page copy** (services, case study, process, products, mission) → `app/page.tsx`
- **Colours, type, spacing** → the variables at the top of `app/globals.css`

## Contact form

The form posts to `app/api/contact/route.ts`, which sends the message through [Resend](https://resend.com).

1. Create a free Resend account and verify `afrokanlabs.com` (add the DNS records it gives you).
2. Copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY`.
3. On Vercel, add the same variables under Project → Settings → Environment Variables.

Until the key is set, the form shows a clear message pointing visitors to the email address instead.

## Deploy on Vercel

1. Push this folder to a GitHub repo.
2. Import the repo at vercel.com/new (it detects Next.js automatically).
3. Add the environment variables above.
4. In Project → Settings → Domains, add `afrokanlabs.com` and `www.afrokanlabs.com`, then set the DNS records Vercel shows you at your domain registrar.

## Email on the domain

`hello@afrokanlabs.com` needs a mailbox. Zoho Mail (free tier) or Google Workspace both work; add their MX records at your registrar. These sit alongside Vercel's and Resend's records without conflict.
