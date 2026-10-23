import type { getLinks } from "@/lib/links";

type Phone = NonNullable<ReturnType<typeof getLinks>["phone"]>;

/**
 * The phone number as text, then a Call (tel:) and a WhatsApp link, each with
 * its own accessible name and a 44px target, and the business hours below
 * (Contact page and footer).
 */
export function PhoneLinks({ phone, whatsapp }: { phone: Phone; whatsapp: string }) {
  return (
    <span className="phone">
      <span className="phone-row">
        <span className="phone-num">{phone.display}</span>
        <span className="phone-links">
          <a className="phone-link" href={phone.tel} aria-label={phone.callLabel}>
            {phone.call}
          </a>
          <a className="phone-link" href={whatsapp} aria-label={phone.whatsappLabel}>
            {phone.whatsapp}
          </a>
        </span>
      </span>
      <small className="phone-hours">{phone.hours}</small>
    </span>
  );
}
