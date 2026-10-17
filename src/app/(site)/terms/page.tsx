import "@/styles/pages/terms.css";
import { Nav } from "@/components/site/Nav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/terms", title: "Terms of Service" });

export default function TermsPage() {
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap lg-top">
          <Nav dark />
          <header className="lg-hero">
            <span className="lg-k">Legal · Terms</span>
            <h1>
              Terms of <span>use</span>
            </h1>
            <p>
              The rules for using the Afrokan Labs website, and how our project agreements fit in.
            </p>
            <div className="lg-meta">
              <span>Last updated: 3 October 2026</span>
              <span>Afrokan Labs · Accra, Ghana</span>
              <span className="draft">Draft: pending legal review</span>
            </div>
          </header>
          <div className="lg-body">
            <nav className="lg-toc" aria-label="On this page">
              <b>On this page</b>
              <a href="#s1">About these terms</a>
              <a href="#s2">Using this website</a>
              <a href="#s3">Information on the site</a>
              <a href="#s4">Working with us</a>
              <a href="#s5">Intellectual property</a>
              <a href="#s6">Third-party services and links</a>
              <a href="#s7">Our liability</a>
              <a href="#s8">Privacy</a>
              <a href="#s9">Governing law</a>
              <a href="#s10">Changes and contact</a>
            </nav>
            <article className="lg-doc">
              <section id="s1" aria-labelledby="h1">
                <h2 id="h1">
                  <i>01</i>
                  About these terms
                </h2>
                <p>
                  These terms apply to your use of <strong>afrokanlabs.com</strong>, run by Afrokan
                  Labs, an AI and software studio based in Accra, Ghana. By using the site, you
                  agree to them. If you hire us for a project, the written proposal or contract for
                  that project also applies, and it takes priority if anything conflicts.
                </p>
              </section>
              <section id="s2" aria-labelledby="h2">
                <h2 id="h2">
                  <i>02</i>
                  Using this website
                </h2>
                <ul>
                  <li>
                    Use the site lawfully and do not try to disrupt it, access it without
                    permission, or copy it in bulk.
                  </li>
                  <li>Do not submit false information or anything harmful through our forms.</li>
                  <li>We may change, pause or remove parts of the site at any time.</li>
                </ul>
              </section>
              <section id="s3" aria-labelledby="h3">
                <h2 id="h3">
                  <i>03</i>
                  Information on the site
                </h2>
                <p>
                  Content on this site, including service descriptions, examples, articles and
                  illustrations, is general information about what we do. It is not a binding offer.
                  Examples such as the sample WhatsApp conversation are illustrations, not real
                  customer data. Prices, timelines and scope are only confirmed in a written
                  proposal.
                </p>
              </section>
              <section id="s4" aria-labelledby="h4">
                <h2 id="h4">
                  <i>04</i>
                  Working with us
                </h2>
                <p>
                  Each project follows the process described on our site: a free first conversation,
                  then a written plan with scope, timeline and price that you approve before work
                  begins. Payment terms, deliverables, ownership of the finished work, and support
                  after launch are set out in that project’s agreement.
                </p>
              </section>
              <section id="s5" aria-labelledby="h5">
                <h2 id="h5">
                  <i>05</i>
                  Intellectual property
                </h2>
                <p>
                  The Afrokan Labs name, logo, website design, text and graphics belong to Afrokan
                  Labs unless stated otherwise. You may share links to our pages, but you may not
                  reuse our branding or content without permission. Client names and work shown in
                  our case studies appear with the client’s permission.
                </p>
              </section>
              <section id="s6" aria-labelledby="h6">
                <h2 id="h6">
                  <i>06</i>
                  Third-party services and links
                </h2>
                <p>
                  The site links to services we do not control, such as WhatsApp, LinkedIn and other
                  websites. We are not responsible for their content or policies, and your use of
                  them is governed by their own terms.
                </p>
              </section>
              <section id="s7" aria-labelledby="h7">
                <h2 id="h7">
                  <i>07</i>
                  Our liability
                </h2>
                <p>
                  We work to keep the site accurate and available, but it is provided “as is”. To
                  the extent allowed by Ghanaian law, we are not liable for indirect losses arising
                  from use of this website. Nothing in these terms limits liability that cannot be
                  limited by law. Liability for project work is governed by the project agreement.
                </p>
              </section>
              <section id="s8" aria-labelledby="h8">
                <h2 id="h8">
                  <i>08</i>
                  Privacy
                </h2>
                <p>
                  How we handle personal information is explained in our{" "}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </section>
              <section id="s9" aria-labelledby="h9">
                <h2 id="h9">
                  <i>09</i>
                  Governing law
                </h2>
                <p>
                  These terms are governed by the laws of the Republic of Ghana. Any dispute will
                  first be discussed in good faith, and if it cannot be resolved, it will be handled
                  by the courts of Ghana.
                </p>
              </section>
              <section id="s10" aria-labelledby="h10">
                <h2 id="h10">
                  <i>10</i>
                  Changes and contact
                </h2>
                <p>
                  We may update these terms from time to time; the date at the top shows the latest
                  version. Questions? Email <strong>hello@afrokanlabs.com</strong>.
                </p>
              </section>
              <p className="lg-note">
                This document is a plain-language draft prepared for Afrokan Labs. It is not legal
                advice and should be reviewed by a qualified lawyer in Ghana before the site goes
                live.
              </p>
              <a className="lg-other" href="/privacy">
                Read our Privacy Policy →
              </a>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
