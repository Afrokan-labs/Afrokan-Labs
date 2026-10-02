# Search titles and descriptions

**Status: Draft v1, awaiting approval.** Drafted 2026-10-02 from approved copy only (homepage-copy.md, case-studies/ese-logistics.md, privacy.md). No new claims.

These texts appear in search results and link previews. They aren't shown on the page itself. The site appends " | Afrokan Labs" to every title except the homepage's.

| Page | Field | Draft | Length |
| --- | --- | --- | --- |
| `/work` | Description | Projects Afrokan Labs has built for Ghanaian businesses: WhatsApp AI assistants, workflow tools and web platforms. | 114 / 155 |
| `/work/ese-logistic` | Title | WhatsApp assistant for a clearing firm in Ghana | 47 / 60 |
| `/work/ese-logistic` | Description | How we built a WhatsApp assistant that answers customers' clearance document questions, and a document checklist generator, for a Ghanaian clearing firm. | 153 / 155 |
| `/privacy` | Description | What afrokanlabs.com collects: cookieless analytics with no personal data, and only what you send us on WhatsApp, by email or with the contact form. | 148 / 155 |
| `/contact` | Description | Tell Afrokan Labs what your business does and what you need help with. We reply by WhatsApp or email. (Approved with contact.md.) | 101 / 155 |

The homepage title and description are already approved (homepage-copy.md, Meta).

## To check before approving

1. **The case study texts don't name ESE.** They read correctly at every permission tier and target searches like "WhatsApp assistant Ghana". Naming ESE is allowed (named tier), if you'd rather.
2. **They leave out "faster" and "brings in enquiries",** which are still unverified (`TODO_VERIFY_FASTER`, `TODO_VERIFY_WEBSITE_ENQUIRIES`). Add them once confirmed if you want them here.
3. **The privacy description depends on the privacy page.** Approve them together.

## To approve

Remove the `TODO_APPROVE_SEO_DRAFT` comments in `src/content/case-study.ts`, `src/content/privacy.ts` and `src/content/projects/ese-logistic.mdx`. `launch:check` fails while they remain.
