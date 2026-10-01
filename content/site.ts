/**
 * Company details used across the site.
 * Empty strings hide the related buttons, so the WhatsApp and booking
 * options switch on automatically once you fill them in.
 */
export type SiteConfig = {
  name: string;
  domain: string;
  url: string;
  tagline: string[];
  /** Default page description, used for metadata. */
  description: string;
  location: string;
  email: string;
  /** International format, digits only, e.g. "233201234567". Leave empty to hide. */
  whatsapp: string;
  /** e.g. "https://cal.com/afrokanlabs/intro". Leave empty to hide. */
  bookingUrl: string;
  social: {
    linkedin: string;
    x: string;
    instagram: string;
  };
};

export const site: SiteConfig = {
  name: "Afrokan Labs",
  domain: "afrokanlabs.com",
  url: "https://afrokanlabs.com",
  tagline: ["Build", "Innovate", "Unlock Africa"],
  description:
    "Afrokan Labs builds websites, AI chatbots and backend systems for businesses in Ghana, and next, across Africa.",
  location: "Accra, Ghana",

  email: "hello@afrokanlabs.com",
  whatsapp: "",
  bookingUrl: "",

  social: {
    linkedin: "",
    x: "",
    instagram: "",
  },
};

/** Empty when no WhatsApp number is set. */
export const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "";
