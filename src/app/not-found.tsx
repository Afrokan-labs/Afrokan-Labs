import type { Metadata } from "next";
import "@/styles/pages/privacy.css";
import "@/styles/not-found.css";
import { Nav } from "@/components/site/Nav";

// Next adds <meta name="robots" content="noindex"> to the 404 itself.
export const metadata: Metadata = { title: "Page not found" };

/** Exported as 404.html: the inner-page nav, a big 404 and a "Back home" pill (brief "Routes"). */
export default function NotFound() {
  return (
    <div className="x x-glow">
      <div className="x-wrap lg-top">
        <Nav dark />
        <section className="nf" aria-labelledby="nf-title">
          <p className="nf-code" aria-hidden="true">
            404
          </p>
          <h1 id="nf-title">This page doesn&apos;t exist or has moved.</h1>
          <a className="nf-home" href="/">
            Back home
          </a>
        </section>
      </div>
    </div>
  );
}
