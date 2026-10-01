export type Product = {
  name: string;
  body: string;
  /** Optional call to action. */
  link?: { label: string; href: string };
  /** Renders as a "coming soon" placeholder card. */
  comingSoon?: boolean;
};

export const productsIntro = {
  title: "Our products",
  body: "Afrokan Labs is the home for a growing family of products and services.",
};

/** Add new products above the "More in the lab" card. */
export const products: Product[] = [
  {
    name: "Deuel's Designs",
    body: "Our web and digital design studio. Deuel's Designs takes on client websites and platforms, from brand-new company sites to full systems like the ESE Logistic build.",
    link: { label: "Work with Deuel's Designs", href: "/#contact" },
  },
  {
    name: "More in the lab",
    body: "New products for African businesses are in development. Watch this space.",
    comingSoon: true,
  },
];
