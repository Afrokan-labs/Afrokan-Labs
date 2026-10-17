import type { Metadata } from "next";
import "@/styles/pages/privacy.css";
import "@/styles/not-found.css";
import { Nav } from "@/components/site/Nav";
import { getSite } from "@/lib/content";

const copy = getSite().notFound;

// Next adds <meta name="robots" content="noindex"> to the 404 itself.
export const metadata: Metadata = { title: copy.title };

/** Exported as 404.html: the inner-page nav, a big 404 and a "Back home" pill (brief "Routes"). */
export default function NotFound() {
  return (
    <div className="x x-glow">
      <div className="x-wrap lg-top">
        <Nav dark />
        <section className="nf" aria-labelledby="nf-title">
          <p className="nf-code" aria-hidden="true">
            {copy.code}
          </p>
          <h1 id="nf-title">{copy.heading}</h1>
          <a className="nf-home" href="/">
            {copy.home}
          </a>
        </section>
      </div>
    </div>
  );
}
