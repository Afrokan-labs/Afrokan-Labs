"use client";

import { useEffect, useRef, useState } from "react";
import type { Home, Reviews as ReviewList } from "@/content/schema";
import { Eyebrow } from "./Eyebrow";

export type ReviewItem = ReviewList[number] & {
  /** Pipeline URLs: the big photo and its thumbnail, with the source's size. */
  big: string;
  thumb: string;
  width: number;
  height: number;
};

/**
 * Home "What our clients really say" (site update 1, reference .rv). A
 * thumbnail swaps the big photo (180ms fade) and every line of text; the text
 * block is a polite live region, so the change is announced.
 *
 * A quote shows only for a real client with an approved quote. Until then the
 * slot shows its placeholder line. No star ratings, ever.
 */
export function Reviews({ copy, items }: { copy: Home["reviews"]; items: ReviewItem[] }) {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const r = items[active];
  const big = items[shown];

  function select(i: number) {
    if (i === active) return;
    setActive(i);
    setFading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(i);
      setFading(false);
    }, 180);
  }

  return (
    <section className="rv" id="reviews" aria-labelledby="rv-title">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Eyebrow block>{copy.eyebrow}</Eyebrow>
      </div>
      <h2 className="rv-h" id="rv-title">
        {copy.heading.first}
        <br />
        {copy.heading.lead}
        <span className="rv-mark">{copy.heading.mark}</span>
      </h2>
      <div className="rv-row">
        <div className="rv-big">
          {/* A plain <img>: its src swaps on click (next/image can't run in a static export anyway). */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            id="rvimg"
            className={fading ? "sw" : undefined}
            src={big.big}
            width={big.width}
            height={big.height}
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="rv-text" aria-live="polite">
          <div className={r.real ? "rv-tag" : "rv-tag open"} id="rvtag">
            {r.real ? copy.delivered : copy.openSlot}
          </div>
          <p className="rv-q" id="rvq">
            {r.real && r.quote ? r.quote : r.placeholder}
          </p>
          <p className="rv-f" id="rvf">
            {r.fact}
          </p>
          <i className="rv-line" aria-hidden="true" />
          <b className="rv-n" id="rvn">
            {r.name}
          </b>
          <span className="rv-r" id="rvr">
            {r.role}
          </span>
          <a className="rv-cta" id="rvcta" href={r.cta.href}>
            {r.cta.label} →
          </a>
        </div>
        <div className="rv-thumbs" role="group" aria-label={copy.choose}>
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              className="rv-th"
              aria-label={copy.show.replace("{name}", item.name)}
              aria-pressed={i === active}
              onClick={() => select(i)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.thumb}
                width={item.width}
                height={item.height}
                alt=""
                loading="lazy"
                decoding="async"
              />
              <span>{item.sector}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
