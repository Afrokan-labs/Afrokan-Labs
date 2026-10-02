"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ResponsiveImage } from "@/components/primitives/ResponsiveImage";
import { ArrowLeft, ArrowRight, QuoteMark } from "@/components/ui/icons";
import type { HomeData } from "@/lib/home";
import styles from "./Testimonials.module.css";

type Props = NonNullable<HomeData["testimonials"]>;

/**
 * reference §9: a track of quote cards with the current one centred and the
 * others dimmed. Moves only on the prev/next buttons, never by itself; the
 * live region announces the quote that comes into view. Off-centre cards are
 * inert, so keyboard focus stays on what is visible.
 */
export function TestimonialCarousel({ label, labels, items }: Props) {
  const [index, setIndex] = useState(Math.min(1, items.length - 1));
  const [offset, setOffset] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  const centre = useCallback(() => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    const view = track.parentElement!.clientWidth;
    setOffset(view / 2 - (card.offsetLeft + card.offsetWidth / 2));
  }, [index]);

  useEffect(() => {
    centre();
    window.addEventListener("resize", centre);
    document.fonts?.ready.then(centre);
    return () => window.removeEventListener("resize", centre);
  }, [centre]);

  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);
  const current = items[index];

  return (
    <section className={styles.quotes} aria-label={label} aria-roledescription="carousel">
      <div className={styles.view}>
        <ul
          ref={trackRef}
          className={styles.track}
          style={{ transform: `translateX(${offset}px)` }}
        >
          {items.map((q, i) => (
            <li
              key={`${q.name}-${i}`}
              className={styles.card}
              data-on={i === index}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${items.length}`}
              inert={i !== index}
            >
              <div className={styles.top}>
                <div className={styles.av}>
                  {q.photo && <ResponsiveImage {...q.photo} alt="" sizes="34px" />}
                </div>
                <div className={styles.who}>
                  <b>{q.name}</b>
                  <span>
                    {q.role}, {q.company}
                  </span>
                </div>
                <QuoteMark className={styles.mark} />
              </div>
              <blockquote>{q.quote}</blockquote>
            </li>
          ))}
        </ul>
      </div>
      {items.length > 1 && (
        <div className={styles.nav}>
          <button type="button" aria-label={labels.previous} onClick={() => go(-1)}>
            <ArrowLeft />
          </button>
          <button type="button" aria-label={labels.next} onClick={() => go(1)}>
            <ArrowRight />
          </button>
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        {current.quote} {current.name}, {current.role}, {current.company}
      </p>
    </section>
  );
}
