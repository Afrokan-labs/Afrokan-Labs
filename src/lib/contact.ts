/**
 * Props for /contact/sent and /contact/not-sent, the pages the contact form
 * lands on when posted without JavaScript. Pages call getContactData().
 */
import { confirmed } from "./confirmed";
import { getContactCopy, getSite } from "./content";
import { whatsappLink } from "./whatsapp";

export function getContactData() {
  const copy = getContactCopy();
  const site = getSite();
  const whatsapp = { ...whatsappLink(), label: copy.whatsappCta };
  return {
    whatsapp,
    success: {
      title: copy.success.title,
      body: confirmed(site.replyWithin)
        ? copy.success.body.replace("{replyWithin}", site.replyWithin)
        : copy.success.bodyUnconfirmed,
      whatsapp,
    },
    notSent: copy.notSent,
  };
}
