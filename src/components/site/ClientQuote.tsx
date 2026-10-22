import type { Testimonials } from "@/content/schema";

type Quote = Testimonials["items"][number];

/**
 * Home "What clients say": one approved client quote, word for word. No
 * photo, no stars, no empty slots. The person is credited when their name
 * and role are confirmed; otherwise the company is. Not marked up as a
 * Review: Google ignores reviews a business publishes about itself.
 */
export function ClientQuote({ label, quote }: { label: string; quote: Quote }) {
  return (
    <section className="x-quote" aria-labelledby="quote-title">
      <div className="x-quote-side">
        <h2 className="x-quote-k" id="quote-title">
          {label}
        </h2>
        <svg className="x-quote-mark" viewBox="0 0 48 36" aria-hidden="true">
          <path d="M0 36V22C0 9.6 6 2.4 18 0l2 5C13 7 10 11 10 16h8v20H0zm28 0V22C28 9.6 34 2.4 46 0l2 5c-7 2-10 6-10 11h8v20H28z" />
        </svg>
      </div>
      <figure className="x-quote-fig">
        <blockquote>
          <p>{quote.quote}</p>
        </blockquote>
        <figcaption>
          {quote.name ? (
            <>
              <b>{quote.name}</b>
              <span>
                {quote.role}, {quote.company}
              </span>
            </>
          ) : (
            <b>{quote.company}</b>
          )}
        </figcaption>
      </figure>
    </section>
  );
}
