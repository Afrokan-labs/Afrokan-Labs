/**
 * Builds the /contact page props from validated content (BUILD_PLAN 6.1).
 * Pages call getContactData(); ContactForm receives the result as props.
 */
import { confirmed } from "./confirmed";
import { LIMITS, type Field } from "./contact-fields";
import { getContactCopy, getSite } from "./content";
import { env } from "./env";
import { whatsappLink } from "./whatsapp";

export function getContactData() {
  const copy = getContactCopy();
  const site = getSite();

  const field = <F extends Field>(name: F) => {
    const { errors, ...rest } = copy.fields[name];
    const max = LIMITS[name].toLocaleString("en-GB");
    return {
      ...rest,
      errors: { ...errors, tooLong: errors.tooLong.replace("{max}", max) },
    };
  };

  // The contact band's CTA wording; on this page it sits under the intro and in the confirmation.
  const whatsapp = { ...whatsappLink({ location: "contact" }), label: copy.whatsappCta };

  const success = {
    title: copy.success.title,
    body: confirmed(site.replyWithin)
      ? copy.success.body.replace("{replyWithin}", site.replyWithin)
      : copy.success.bodyUnconfirmed,
    whatsapp,
  };

  return {
    title: copy.title,
    description: copy.description,
    intro: copy.intro,
    whatsapp,
    notSent: copy.notSent,
    form: {
      fields: { name: field("name"), contact: field("contact"), message: field("message") },
      honeypotLabel: copy.honeypotLabel,
      submit: copy.submit,
      sending: copy.sending,
      failed: copy.failed,
      noScript: copy.noScript.replace("{email}", site.email),
      success,
      turnstileSiteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
  };
}
