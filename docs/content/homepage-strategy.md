# Homepage Strategy (v2.1)

## Core insight

Most visitors arrive from a referral or a WhatsApp link, on a phone, to check whether we're real. The homepage is primarily a **verification tool**. Within ten seconds it has to answer three questions:

1. What do you do?
2. Have you done it for someone like me?
3. How do I reach you?

Any section that doesn't serve one of these is cut.

## Goals

- **Primary:** Turn qualified visitors into WhatsApp conversations about a real business problem.
- **Secondary:** Give referred visitors enough proof to reach out instead of leaving.
- **Not goals:** recruiting, fundraising, brand storytelling.

## Audiences

- **Primary:** The owner or operations manager of an operations-heavy Ghanaian SME, with logistics and clearing first. Typically runs customer communication on WhatsApp and processes on paper or Excel.
- **Secondary:** Referrers and partners (agencies, consultants, freelancers) who might send us work.
- Everyone else is served by the "Who we are" section or not at all.

## CTAs

- **Primary:** "Chat with us on WhatsApp." A WhatsApp Business link with a prefilled message:
  `Hi Afrokan Labs, I run a [type of business] and I'd like to talk about…`
  The fixed opening line lets us count chats that came from the site.
- **Secondary:** "See the case study," for visitors who aren't ready to talk.
- **Offer (if shipped):** the demo offer in section 2b.
- Email is a fallback contact method, not a CTA.

## Section order

1. Hero
2. Featured work (ESE, at the highest confirmed tier)
2b. Demo offer (OfferBand), only if open decision #2 says ship
3. What we build (`#services`)
4. How we work (`#process`)
5. Who we are (`#about`)
6. Contact
7. Footer

**Deliberately excluded:** logo strip, stats bar, FAQ, testimonial carousel, blog, newsletter.

## Section specs

### 1. Hero
- **Objective:** Say what we do and offer the first action within one mobile screen.
- **Information:** Headline, a subhead naming concrete outputs, a proof line (wording depends on the ESE tier and live status), the primary CTA, and the secondary link.
- **User action:** Tap WhatsApp, or scroll to the proof.
- **Why it exists:** Referred visitors decide here whether to stay.

### 2. Featured work
- **Objective:** Prove we've solved a real problem for a real business.
- **Information:** The client (named or anonymised, by tier), the problem, the three things we built, and a status chip with the "live since" date. At the full tier, add the result block and pull quote. Include the assistant conversation **rendered in HTML** (never as an image), taken from a fresh exchange on a staff test number. Screenshots are only for the checklist tool and the website.
- **Conversation placement:** on desktop (≥1024px) the conversation sits in the hero and animates. On mobile and tablet it appears in this section instead, rendered complete and static.
- **User action:** Open the full case study, or go to WhatsApp.
- **Why it exists:** Proof is our strongest credibility asset.

### 2b. Demo offer (OfferBand), conditional
- **Objective:** Let visitors see the product working on their own business.
- **Information:** "Send us the 10 questions your customers ask most…" plus the CTA, which opens WhatsApp with a demo-specific prefilled message.
- **User action:** Request a demo.
- **Why it exists:** It's the only conversion point that shows our work on the visitor's own problem.
- **Constraints:** Requests are screened on WhatsApp first (we need the business name and confirmation they're a decision-maker). Built on the reusable sandbox assistant only. Capped at [N] per week. Requests over the cap go on a waitlist, and the person is told honestly when their turn is.

### 3. What we build
- **Objective:** Let visitors recognize their own problem.
- **Information:** Exactly three capabilities, each stated as a business outcome first and the technology second.
- **User action:** Recognize the problem, then make contact.
- **Why it exists:** It turns one case study into a range of possible engagements.

### 4. How we work
- **Objective:** Remove the fear that we'll take a deposit and disappear.
- **Information:** Four steps (understand, scope and quote, build with check-ins, hand over and support), one line on support after launch, and one honest pricing signal.
- **User action:** Feel safe enough to start a conversation.
- **Why it exists:** For Ghanaian SMEs, reliability is a bigger objection than capability.

### 5. Who we are
- **Objective:** Put real people behind the work.
- **Information:** Two or three sentences on why we build for Ghanaian businesses, the founding team with real photos and roles, and "Based in Accra." No stock photos.
- **User action:** Trust us enough to reach out.
- **Why it exists:** SMEs buy from people they trust.

### 6. Contact
- **Objective:** Convert the warmest visitors, the ones who scrolled to the bottom.
- **Information:** The WhatsApp CTA, the domain email, a response-time promise we can keep (including during exam periods), and "Accra, Ghana."
- **Form:** not on the homepage. If built (Phase 6, after launch), it lives on `/contact` with three fields: name, WhatsApp number or email (required), and "What does your business do, and what do you need help with?" This section then gains a "Send us a message" link to it.
- **Why it exists:** The warmest visitor shouldn't have to scroll back up.

### 7. Footer
Company name, email, LinkedIn and any other socials we actually keep active, and links to Work and the "Who we are" section.

## Above the fold (mobile, 360px wide)

Only four elements: headline, subhead, proof line, and the WhatsApp button. If the button falls below the fold, shorten the subhead. Never shrink the button. On desktop, the HTML-rendered assistant conversation may sit beside the text. On mobile, it moves to section 2.

## Not on the homepage

- Investor content, careers, global ambition
- ClearCart and other prototypes
- Deuel's Designs as a separate brand
- Tech stack logos
- Invented figures
- Stock photos
- A newsletter signup
- Real customer messages, blurred or not
- An AI chatbot widget on our own site (the demo offer does that job with less risk)
- The contact form (see section 6)

## User journeys

1. **Referred owner (most common, so optimize for this):** WhatsApp link → hero → featured work → WhatsApp CTA.
2. **Searcher with a problem:** search → hero → featured work → demo offer or what we build → case study page → contact.
3. **Partner or agency:** hero → what we build → who we are → email.

## Conversion points and events

These match the canonical list in `architecture.md` §7.

| # | Point | Event |
|---|---|---|
| 1 | Header button (desktop) | `whatsapp_click` (location: `header`) |
| 2 | Mobile menu button | `whatsapp_click` (location: `menu`) |
| 3 | Hero CTA | `whatsapp_click` (location: `hero`) |
| 4 | Hero secondary link | `case_study_click` (location: `hero`) |
| 5 | After featured work | `whatsapp_click` (location: `featured-work`) / `case_study_click` (location: `featured-work`) |
| 6 | Demo offer (if shipped) | `demo_offer_click` |
| 7 | What we build CTA | `whatsapp_click` (location: `services`) |
| 8 | After how we work | `whatsapp_click` (location: `process`) |
| 9 | Contact section | `whatsapp_click` (location: `contact`) / `email_click` (location: `contact`) |
| 10 | Sticky mobile button | `whatsapp_click` (location: `sticky`) |
| 11 | Case study page CTA | `whatsapp_click` (location: `case-study`) |
| 12 | Contact form (Phase 6) | `contact_form_submit` (result: `success` / `error`) |

Case study page views are counted by the analytics tool's normal page-view tracking; no custom event is needed.

**North-star metric:** qualified business conversations per month that start from the site. Clicks are diagnostics, not the goal.

## Sticky WhatsApp button (mobile)

On the homepage, it appears after the visitor scrolls past the hero CTA and hides when the Contact section comes into view. On pages without a hero CTA (case study, work index), it shows from load and hides when the page's closing CTA comes into view.

## Project showcase

- Homepage: one featured case study at its highest confirmed tier. It becomes a card grid only once there's more delivered work.
- Each project page follows this order: context → problem → what we built → how it works → result → testimonial. Sections that need unconfirmed data are left out.
- Only delivered or live client work is eligible.

## Images

Commit high-quality PNG source files to `assets/`. The build pipeline generates AVIF and WebP versions. Don't pre-compress. The assistant conversation is always HTML.

## Mobile priorities

- Design for a mid-range Android phone on mobile data first.
- Keep total page weight under about 1 MB. No video, no heavy animation, and at most one web font with system fallbacks.
- Render pages statically with Next.js.
- Use large tap targets, the sticky WhatsApp button, and text that's readable without zooming.
- Test on a real low-cost Android phone on 3G before launch.

## Navigation

**Work · What we build · How we work · About · [WhatsApp us]**

| Label | Target |
|---|---|
| Work | `/work` |
| What we build | `/#services` |
| How we work | `/#process` |
| About | `/#about` |
| WhatsApp us | WhatsApp link (desktop header; pinned in the mobile menu) |

On mobile, the header shows the wordmark and menu toggle only. The hero CTA, then the sticky bar, keep WhatsApp one tap away without two identical buttons on screen (design-system §8).

## Timeline

Start the build now, using the content schema, about two weeks of development. Content and ESE permissions run in parallel. Target launch is within one week of copy sign-off. ESE delays never block launch, because the page ships at whatever tier is confirmed.

## Pre-launch checklist

**Content**
- [ ] ESE confirmed at some tier (or the two-week deadline has passed)
- [ ] `pnpm launch:check` passes: no unresolved placeholder appears on the live site
- [ ] Demo offer decision made; if shipped, the sandbox is ready and the cap is set

**Contact**
- [ ] WhatsApp Business number live; prefilled links tested on Android and iOS
- [ ] `hello@afrokanlabs.com` live and monitored
- [ ] Form submissions reach a monitored inbox (only if the form has shipped)

**Tracking**
- [ ] Every event in the table above fires correctly

**Performance**
- [ ] Page weight under about 1 MB; tested on a real Android phone on 3G
- [ ] Sticky button shows and hides correctly

**Security and accounts**
- [ ] 2FA turned on for every account (registrar, hosting, email, WhatsApp Business, analytics)
- [ ] Registrar lock turned on for afrokanlabs.com
- [ ] A second admin added to every critical account
- [ ] Google Search Console verified
- [ ] Google Business Profile created
