# Contact form copy (v1)

**Status: Approved 2026-10-02, as written** (em dash in the success line kept). Drafted by Claude for BUILD_PLAN 6.1.

Approved wording reused as-is:

- The three field labels: homepage-copy.md §6 (Form).
- "Thanks — we'll reply within [X hours]." and the "Send us a message" link: architecture §5. "on weekdays" is added to match the contact band.

Everything else below is new and needs approval.

---

## /contact

**Title (also the page title):** Send us a message

**Meta description:** Tell Afrokan Labs what your business does and what you need help with. We reply by WhatsApp or email.

**Intro:** Tell us what your business does and what you need help with. We'll reply on WhatsApp or by email, whichever you give us. If you'd rather chat now, message us on WhatsApp.

**Button under the intro:** Chat with us on WhatsApp

| Field   | Label                                                       | Hint              |
| ------- | ----------------------------------------------------------- | ----------------- |
| Name    | Name                                                        | none              |
| Contact | WhatsApp number or email                                    | We'll reply here. |
| Message | What does your business do, and what do you need help with? | none              |

**Submit button:** Send message. While sending, screen readers hear "Sending your message".

## Error messages

Shown under the field, saying what to fix (architecture §5). They never say "Invalid", and the visitor's text is never cleared.

| Field      | When                                               | Message                                                                                             |
| ---------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Name       | empty                                              | Add your name.                                                                                      |
| Name       | over 100 characters                                | Shorten your name to 100 characters or fewer.                                                       |
| Contact    | empty                                              | Add a WhatsApp number or an email address, so we can reply.                                         |
| Contact    | neither a number nor an email                      | Check this: enter a WhatsApp number with its full digits, or an email address.                      |
| Contact    | over 254 characters                                | Shorten this to 254 characters or fewer.                                                            |
| Message    | empty                                              | Tell us what your business does and what you need help with.                                        |
| Message    | over 2,000 characters                              | Shorten your message to 2,000 characters or fewer.                                                  |
| Whole form | sending failed (bot check, network, email service) | We couldn't send your message. Please try again, or message us on WhatsApp. Your text is still here. |

## Without JavaScript

Turnstile, the bot check, needs JavaScript, so a visitor without it can't send the form. Shown under the form, only to them:

> This form needs JavaScript to check you're not a bot. Please message us on WhatsApp, or email hello@afrokanlabs.com.

## After sending

|                                         | Title                    | Body                                                                                                                                  |
| --------------------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Sent                                    | Message sent             | Thanks — we'll reply within [X hours] on weekdays. _(Until the reply time is confirmed: "Thanks — we'll reply as soon as we can.")_ |
| Not sent (only reached by posting without JavaScript) | Your message wasn't sent | Go back to check your message and try again, or message us on WhatsApp.                                                               |

Both show the "Chat with us on WhatsApp" button.

## Homepage contact band

**New link, under the email:** Send us a message → (to `/contact`)

## Notification email (to hello@)

**Subject:** New message from the website contact form. It's fixed: the visitor's text never goes into the subject.

**Body labels:** Name, WhatsApp or email, Message.

**From:** Afrokan Labs website <notify@notify.afrokanlabs.com>. **Reply-To:** the visitor's address, when they gave an email.

## Hidden field

**Honeypot label:** Leave this field empty. People never see it, and it's hidden from screen readers.

---

## To check before approving

1. **"We'll reply on WhatsApp or by email, whichever you give us."** Only approve this if replies really go back on the channel the visitor gave.
2. **The em dash in "Thanks — we'll reply…"** comes from architecture §5. The rest of the site's copy avoids dashes; "Thanks. We'll reply…" would match it better.
3. **The privacy page changes** (privacy.md, Draft v2) must be approved before the form goes live (architecture §13).
