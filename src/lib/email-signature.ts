/**
 * Email signatures for the shared hello@ inbox (Namecheap Private Email),
 * in the letterhead style of src/lib/contact-email.ts. Written to
 * docs/email-signatures/ by `pnpm email:signatures`, to paste into webmail.
 *
 * The team version speaks for the company; the named version adds a
 * "[First name] · Afrokan Labs" line above it for whoever is replying.
 *
 * Table layout, inline styles, no classes, web-safe fonts, at most 400px wide.
 * Text colours are mid-tones that read on white and on dark backgrounds, since
 * clients in dark mode may or may not repaint them. The logo and icons are
 * hosted PNGs on dark tiles (scripts/email-assets.ts).
 */
import { site } from "../content/site";
import { C, esc, FONT, socialIconsHtml } from "./contact-email";
import { confirmed } from "./confirmed";
import { waMeUrl } from "./wa-me";

/** The square logo tile (public/email/logo.png, 176 × 176), shown at 88 × 88. */
export const SIGNATURE_LOGO_PATH = "/email/logo.png";

/** Mid-tones: about 4:1 or better against both white and near-black. */
const TONE = { name: "#3f7e20", text: "#767676" } as const;

/** Placeholder for the named version, replaced by hand in the webmail editor. */
export const FIRST_NAME_PLACEHOLDER = "[First name]";

/** "+233596069011" → "+233 59 606 9011" (Ghana mobile grouping; other numbers as given). */
export function formatPhone(e164: string): string {
  const m = /^\+233(\d{2})(\d{3})(\d{4})$/.exec(e164);
  return m ? `+233 ${m[1]} ${m[2]} ${m[3]}` : e164;
}

export function signatureHtml({
  named = false,
  assetOrigin = `https://${site.domain}`,
}: { named?: boolean; assetOrigin?: string } = {}): string {
  const siteUrl = `https://${site.domain}`;
  const link = (href: string, text: string) =>
    `<a href="${esc(href)}" style="color:${TONE.name};text-decoration:none;">${esc(text)}</a>`;
  type LineStyle = { size?: number; bold?: boolean; colour?: string; after?: number };
  const line = (
    html: string,
    { size = 13, bold = false, colour = TONE.text, after = 0 }: LineStyle = {},
  ) =>
    `<div style="margin:0;padding:0 0 ${after}px;font-family:${FONT};font-size:${size}px;line-height:${size + 6}px;${bold ? "font-weight:bold;" : ""}color:${colour};">${html}</div>`;
  const heading = { bold: true, colour: TONE.name };
  const socials = socialIconsHtml(assetOrigin);

  const lines = [
    named &&
      line(`${esc(FIRST_NAME_PLACEHOLDER)} &middot; ${esc(site.name)}`, { ...heading, size: 15 }),
    line(esc(site.emailSignature.team.replace("{name}", site.name)), {
      ...heading,
      size: named ? 13 : 15,
    }),
    line(esc(site.tagline), { after: 6 }),
    confirmed(site.whatsappNumber) &&
      line(
        `${esc(site.emailSignature.whatsapp)} ${link(waMeUrl(site.whatsappNumber), formatPhone(site.whatsappNumber))}`,
      ),
    line(`${link(`mailto:${site.email}`, site.email)} &middot; ${link(siteUrl, site.domain)}`),
    socials && `<div style="margin:0;padding:8px 0 0;">${socials}</div>`,
  ].filter(Boolean);

  return `<table cellpadding="0" cellspacing="0" border="0" role="presentation" style="border-collapse:collapse;max-width:400px;font-family:${FONT};">
<tr>
<td valign="top" style="padding:0 14px 0 0;vertical-align:top;"><a href="${esc(siteUrl)}" style="text-decoration:none;"><img src="${esc(assetOrigin + SIGNATURE_LOGO_PATH)}" width="88" height="88" alt="${esc(site.name)}" style="display:block;border:0;width:88px;height:88px;"></a></td>
<td valign="top" style="padding:0 0 0 14px;vertical-align:top;border-left:2px solid ${C.accent};">
${lines.join("\n")}
</td>
</tr>
</table>`;
}
