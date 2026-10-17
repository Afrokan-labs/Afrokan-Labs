import "@/styles/pages/privacy.css";
import { Nav } from "@/components/site/Nav";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/privacy", title: "Privacy Policy" });

export default function PrivacyPage() {
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap lg-top">
          <Nav dark />
          <header className="lg-hero">
            <span className="lg-k">Legal · Privacy</span>
            <h1>
              Privacy <span>policy</span>
            </h1>
            <p>
              How Afrokan Labs collects, uses and protects your personal information when you visit
              our website or work with us.
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
              <a href="#s1">Who we are</a>
              <a href="#s2">What we collect</a>
              <a href="#s3">How we use it</a>
              <a href="#s4">Legal basis</a>
              <a href="#s5">Who we share it with</a>
              <a href="#s6">Client projects and AI tools</a>
              <a href="#s7">How long we keep it</a>
              <a href="#s8">Your rights</a>
              <a href="#s9">Security</a>
              <a href="#s10">Changes to this policy</a>
            </nav>
            <article className="lg-doc">
              <section id="s1" aria-labelledby="h1">
                <h2 id="h1">
                  <i>01</i>
                  Who we are
                </h2>
                <p>
                  Afrokan Labs (“we”, “us”) is an AI and software studio based in Accra, Ghana. We
                  build WhatsApp AI assistants, websites, workflow tools and backend systems for
                  businesses. This policy explains how we handle personal information collected
                  through <strong>afrokanlabs.com</strong> and when you contact us.
                </p>
                <p>
                  For any privacy question, email <strong>hello@afrokanlabs.com</strong>.
                </p>
              </section>
              <section id="s2" aria-labelledby="h2">
                <h2 id="h2">
                  <i>02</i>
                  What we collect
                </h2>
                <ul>
                  <li>
                    <strong>Details you give us</strong>: your name, company, email address,
                    WhatsApp number and the message you send through our contact form, by email or
                    on WhatsApp.
                  </li>
                  <li>
                    <strong>Project information</strong>: documents, requirements and other material
                    you share with us so we can scope or build a project.
                  </li>
                  <li>
                    <strong>Basic technical data</strong>: information your browser sends
                    automatically, such as device type, pages visited and approximate location,
                    collected through standard server logs or privacy-friendly analytics.
                  </li>
                  <li>
                    <strong>Your theme choice</strong>: if you switch between light and dark mode,
                    your browser remembers the choice locally. It is not sent to us.
                  </li>
                </ul>
                <p>
                  We do not knowingly collect information from children, and we do not ask for
                  sensitive information such as health or financial details through this website.
                </p>
              </section>
              <section id="s3" aria-labelledby="h3">
                <h2 id="h3">
                  <i>03</i>
                  How we use it
                </h2>
                <ul>
                  <li>To reply to your enquiry and talk about a possible project.</li>
                  <li>
                    To prepare plans, quotes and contracts, and to deliver and support the work you
                    hire us for.
                  </li>
                  <li>To keep the website secure and working properly.</li>
                  <li>
                    To send you updates or articles, only if you have asked to receive them. You can
                    unsubscribe at any time.
                  </li>
                </ul>
                <p>
                  We do not sell your personal information, and we do not use it for advertising.
                </p>
              </section>
              <section id="s4" aria-labelledby="h4">
                <h2 id="h4">
                  <i>04</i>
                  Legal basis
                </h2>
                <p>
                  We process personal information in line with Ghana’s{" "}
                  <strong>Data Protection Act, 2012 (Act 843)</strong>. Depending on the situation,
                  we rely on your consent (for example when you submit the contact form), on the
                  steps needed to enter into or perform a contract with you, or on our legitimate
                  interest in running and securing our business.
                </p>
              </section>
              <section id="s5" aria-labelledby="h5">
                <h2 id="h5">
                  <i>05</i>
                  Who we share it with
                </h2>
                <p>
                  We share information only when needed to provide our services, with providers that
                  help us operate, such as:
                </p>
                <ul>
                  <li>
                    Hosting and email providers that store and deliver our website and messages.
                  </li>
                  <li>WhatsApp (Meta), when you choose to contact us on WhatsApp.</li>
                  <li>Form or newsletter services, if and when we connect them.</li>
                </ul>
                <p>
                  These providers may store data outside Ghana. Where that happens we choose
                  reputable providers with appropriate safeguards. We may also disclose information
                  if required by law.
                </p>
              </section>
              <section id="s6" aria-labelledby="h6">
                <h2 id="h6">
                  <i>06</i>
                  Client projects and AI tools
                </h2>
                <p>
                  When we build tools for a client, such as a WhatsApp assistant, the client decides
                  what data the tool uses and is responsible for its own customers’ data. We act on
                  the client’s instructions, keep that data confidential, and use it only to build,
                  run and support the tool. Details are set out in each project agreement.
                </p>
              </section>
              <section id="s7" aria-labelledby="h7">
                <h2 id="h7">
                  <i>07</i>
                  How long we keep it
                </h2>
                <p>
                  We keep enquiry details for up to 24 months after our last contact, and project
                  records for as long as needed to support the work and meet legal and tax
                  obligations. After that we delete or anonymise them.
                </p>
              </section>
              <section id="s8" aria-labelledby="h8">
                <h2 id="h8">
                  <i>08</i>
                  Your rights
                </h2>
                <p>Under Act 843 you can ask us to:</p>
                <ul>
                  <li>Tell you what personal information we hold about you and give you a copy.</li>
                  <li>Correct information that is wrong or out of date.</li>
                  <li>
                    Delete your information or stop using it, where there is no reason for us to
                    keep it.
                  </li>
                  <li>Stop sending you marketing messages.</li>
                </ul>
                <p>
                  Email <strong>hello@afrokanlabs.com</strong> and we will respond within a
                  reasonable time. If you are not satisfied, you can contact Ghana’s{" "}
                  <strong>Data Protection Commission</strong>.
                </p>
              </section>
              <section id="s9" aria-labelledby="h9">
                <h2 id="h9">
                  <i>09</i>
                  Security
                </h2>
                <p>
                  We use reasonable technical and organisational measures to protect personal
                  information, such as access controls and encrypted connections. No method of
                  transmission over the internet is completely secure, so we cannot guarantee
                  absolute security.
                </p>
              </section>
              <section id="s10" aria-labelledby="h10">
                <h2 id="h10">
                  <i>10</i>
                  Changes to this policy
                </h2>
                <p>
                  We may update this policy from time to time. The date at the top shows when it
                  last changed. Significant changes will be highlighted on this page.
                </p>
              </section>
              <p className="lg-note">
                This document is a plain-language draft prepared for Afrokan Labs. It is not legal
                advice and should be reviewed by a qualified lawyer in Ghana before the site goes
                live.
              </p>
              <a className="lg-other" href="/terms">
                Read our Terms of Use →
              </a>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
