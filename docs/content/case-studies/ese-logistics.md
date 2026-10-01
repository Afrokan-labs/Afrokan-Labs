# Case Study: ESE Logistic Solution Limited

**Rule:** publish at the highest confirmed tier. **Deadline:** two weeks from the permission request. After that, launch at the current tier and upgrade later through a content edit.

## Publication tiers

| Tier | What's needed | What gets published |
|---|---|---|
| Anonymised | ESE's OK to describe the work at all | "A Ghanaian clearing and forwarding firm." No ESE name or branding in any text or visual. |
| Named | Written permission to name ESE | Real name, the "Built and running for ESE" proof line, the named caption, and "formerly Deuel's Designs" attribution |
| Full | Named tier, plus a confirmed outcome figure and an approved testimonial | Result block and pull quote |

At the anonymised tier, a screenshot that shows ESE's name, logo or branding counts as naming them. The website screenshot will almost certainly show it, so it stays off the site until the named tier.

## Step 0: before contacting ESE

- [ ] Check the ESE contract for confidentiality or publicity clauses. If there are any, they decide what we can ask for.
- [ ] Draft the outcome figure from our own logs (see the definition below).
- [ ] Run a fresh demo conversation with the live assistant from a staff test number.

## Step 1: the permission request (one message, permissions only)

Ask each item as its own question:

- [ ] OK to describe the work anonymously
- [ ] OK to name ESE
- [ ] OK to show the website screenshot
- [ ] OK to show the checklist tool screenshot
- [ ] OK to show the demo conversation (from a staff test number, with no customer data)
- [ ] Confirm the attribution: "Delivered by Afrokan Labs (formerly Deuel's Designs)"
- [ ] Confirm the system is still live, and since when (this drives `StatusChip` and `liveSince`)
- [ ] Confirm the outcome figure we drafted
- [ ] Confirm the claims in the homepage copy marked **[verify]** (faster answers; the website bringing in enquiries)
- [ ] Testimonial: exact final wording approved in writing, plus consent to show the person's name and role. "We draft it, you approve it" is fine, as long as the approval covers the final text.

**Do not include commercial questions in this message.**

## Step 2: a separate check-in (commercial, at least a few days later)

Frame it as "How's the system working for you?" and ask:
- What gets used most: the assistant, the checklist tool, or the website?
- Would you want it maintained or extended?

The answer resolves open decision #1 (which capability we lead with).

## Outcome figure: definition

- Count **customer conversations (or questions) answered by the assistant**, in aggregate, from launch to date.
- **Exclude** staff numbers, test numbers, and conversations handed over to a person.
- Publish aggregate counts only, and only after ESE approves the exact figure and its wording.

## Demo conversation

- Use a staff test number only. **Never publish a real customer's messages, blurred or otherwise.** They belong to ESE's customers, who never agreed to appear on our website.
- Ask the questions customers typically ask.
- Render it as HTML on the site, never as an image.
- Captions by tier:
  - Named / Full: "A real exchange with ESE's live assistant."
  - Anonymised: "A real exchange with a live assistant we built."

## Assets

- [ ] PNG source screenshots of the checklist tool and the website (mobile), committed to `assets/`. The build pipeline generates AVIF and WebP. Don't pre-compress.
- [ ] Demo conversation transcript saved as structured data for HTML rendering (the `conversation` field below).

## Page structure

1. **Client and context.** Named or anonymised, by tier.
2. **The problem**
3. **What we built.** WhatsApp AI assistant (answers from the firm's own documents), document checklist generator, and website.
4. **How it works.** The HTML conversation plus screenshots, each with a one-line caption.
5. **Result.** Full tier only.
6. **Testimonial.** Full tier only.
7. **CTA.** "Have a similar problem? Chat with us on WhatsApp."

## Schema mapping (`src/content/projects/ese-logistic.mdx`)

Each permission above sets one field. The build refuses combinations the tiers don't allow (`architecture.md` §4).

| Permission or fact | Field |
|---|---|
| OK to describe anonymously | `client.descriptionApproved: true` (required for `published: true`) |
| OK to name ESE | `client.nameApproved: true` |
| Anonymised wording | `client.anonymisedLabel: "A Ghanaian clearing and forwarding firm"` |
| Attribution confirmed | `formerBrand: "Deuel's Designs"` (rendered at named tier only) |
| Still live, since when | `status: "live"`, `liveSince: "YYYY-MM"` |
| Screenshot approved | That image's `clientApproved: true`; set `showsClientBranding` truthfully |
| Demo conversation approved | `conversation.clientApproved: true`, `conversation.fromStaffTestNumber: true` |
| Outcome figure approved | `result: { text, confirmed: true }` (needs named tier) |
| Testimonial approved | `testimonial: { quote, name, role, writtenPermission: true }` (needs named tier) |

## Before any permission arrives

**Development.** Drafts (`published: false`) render only under `next dev` on a developer's machine. They never render in any deployed build, previews included, because Cloudflare preview URLs are public. Showing ESE's work there would be publishing it without permission.

**If ESE never approves even the anonymised tier.** Then there is no publishable proof, and the omission rule applies site-wide. The homepage drops Featured work, the hero proof line and the "See the case study" link, and `/work` is not generated. The site still builds and works, but it loses its strongest asset. Before relying on this path, check whether the ESE contract already permits describing the work anonymously.
