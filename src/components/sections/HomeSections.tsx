import type { HomeData } from "@/lib/home";
import { About } from "./About";
import { Contact } from "./Contact";
import { FeaturedWork } from "./FeaturedWork";
import { Hero } from "./Hero";
import { OfferBand } from "./OfferBand";
import { Process } from "./Process";
import { Services } from "./Services";

/** The homepage sections in page order (homepage-strategy.md, Section order). */
export function HomeSections({ data }: { data: HomeData }) {
  return (
    <>
      <Hero {...data.hero} />
      {data.featuredWork && <FeaturedWork {...data.featuredWork} />}
      {data.offer && <OfferBand {...data.offer} />}
      <Services {...data.services} />
      <Process {...data.process} />
      <About {...data.about} />
      <Contact {...data.contact} />
    </>
  );
}
