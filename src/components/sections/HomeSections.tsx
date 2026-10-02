import type { HomeData } from "@/lib/home";
import { Contact } from "./Contact";
import { FeaturedWork } from "./FeaturedWork";
import { Hero } from "./Hero";
import { Ideas } from "./Ideas";
import { OfferBand } from "./OfferBand";
import { Process } from "./Process";
import { Services } from "./Services";
import { Stats } from "./Stats";
import { Team } from "./Team";
import { TestimonialCarousel } from "./TestimonialCarousel";
import { Ticker } from "./Ticker";
import { WordsLine } from "./WordsLine";
import styles from "./HomeSections.module.css";

/**
 * The homepage in the reference's order (docs/design/handoff/reference.html).
 * The hero card holds the site header, so the whole page, header included,
 * sits in <main>; the skip link jumps past the nav to the headline.
 */
export function HomeSections({ data }: { data: HomeData }) {
  return (
    <>
      <div className={`container ${styles.heroWrap}`}>
        <Hero {...data.hero} />
      </div>
      <div className={styles.glow}>
        <div className="container">
          <Stats {...data.stats} />
          <Ideas {...data.ideas} />
          <Services {...data.services} />
          {data.featuredWork && <FeaturedWork {...data.featuredWork} />}
          {data.offer && <OfferBand {...data.offer} />}
          <WordsLine {...data.words} />
          <Process {...data.process} />
          <Team {...data.team} />
          {data.testimonials && <TestimonialCarousel {...data.testimonials} />}
          <Ticker {...data.ticker} />
          <Contact {...data.contact} />
        </div>
      </div>
    </>
  );
}
