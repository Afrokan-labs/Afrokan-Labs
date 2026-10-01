import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Mark, MARK_PATH, Wordmark } from "@/components/Mark";
import { ContactForm } from "@/components/ContactForm";
import { site, team } from "@/site.config";

const services = [
  {
    title: "Websites",
    body: "Fast, mobile-first sites that explain what you do and turn visitors into enquiries. Built to load well on Ghanaian mobile data, and easy for your team to update.",
    examples: "Company sites, landing pages, online catalogues",
  },
  {
    title: "AI assistants and chatbots",
    body: "Assistants that answer customer questions on WhatsApp or your website, using your own documents, prices and policies, so your staff stop answering the same question fifty times a day.",
    examples: "WhatsApp assistants, website chat, internal knowledge bots",
  },
  {
    title: "Backend and workflow systems",
    body: "The tools behind the counter: dashboards, document generators, booking and records systems that replace spreadsheets, paper forms and copy-paste work.",
    examples: "Admin dashboards, document generators, automations",
  },
];

const steps = [
  { title: "Discovery call", body: "We learn how your business runs today and where time or money leaks out." },
  { title: "Plan and quote", body: "You get a clear scope, timeline and fixed price before any work starts." },
  { title: "Build in short cycles", body: "We show you working pieces every week, so there are no surprises at the end." },
  { title: "Launch and support", body: "We go live with you, train your team, and stay on hand as you grow." },
];

const whatsappHref = site.whatsapp ? `https://wa.me/${site.whatsapp}` : "";

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="hero dark" aria-labelledby="hero-title">
          <div className="hero-streak" aria-hidden="true" />
          <svg className="hero-mark" viewBox="105 115 1100 990" aria-hidden="true">
            <path className="hero-mark-ghost" d={MARK_PATH} />
            <path className="hero-mark-line" d={MARK_PATH} pathLength={1} />
          </svg>

          <div className="container hero-inner">
            <p className="hero-tagline">{site.tagline.join("  ·  ")}</p>
            <h1 id="hero-title" className="hero-title">
              Software and AI built for the way Ghanaian businesses work.
            </h1>
            <p className="hero-lede">
              Afrokan Labs builds websites, AI assistants and backend systems that take repetitive work off your
              team&apos;s hands. We start in Ghana, and we&apos;re building for the whole continent.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn--green">
                Start a project
              </a>
              <a href="#work" className="btn btn--ghost-dark">
                See our work
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section mist" aria-labelledby="services-title">
          <div className="container split">
            <div className="split-head">
              <h2 id="services-title" className="h2">
                What we build
              </h2>
              <p className="muted">
                Three kinds of work, often combined. Most clients start with one and add the others as the first one pays
                off.
              </p>
            </div>
            <ul className="service-list">
              {services.map((s) => (
                <li key={s.title} className="service">
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.body}</p>
                  <p className="service-examples">{s.examples}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Work ---------- */}
        <section id="work" className="section dark" aria-labelledby="work-title">
          <div className="container">
            <h2 id="work-title" className="h2">
              Recent work
            </h2>

            <article className="case">
              <div className="case-text">
                <p className="case-client">ESE Logistic Solution Limited</p>
                <h3 className="case-title">A website, a document tool and a WhatsApp assistant for a logistics company</h3>
                <p className="muted-dark">
                  ESE&apos;s customers kept asking the same questions about shipments and paperwork. We built them a
                  marketing website, a generator that tells each customer exactly which documents to prepare, and an AI
                  assistant on WhatsApp that answers questions from ESE&apos;s own information, day or night.
                </p>
                <dl className="case-facts">
                  <div>
                    <dt>Delivered</dt>
                    <dd>Website, document checklist generator, WhatsApp AI assistant</dd>
                  </div>
                  <div>
                    <dt>Built under</dt>
                    <dd>Deuel&apos;s Designs, an Afrokan Labs product</dd>
                  </div>
                </dl>
              </div>

              <figure className="chat" aria-label="Illustrative WhatsApp conversation with the assistant">
                <div className="chat-head">
                  <span className="chat-avatar">
                    <Mark />
                  </span>
                  <span>
                    <strong>ESE Assistant</strong>
                    <small>online</small>
                  </span>
                </div>
                <div className="chat-body">
                  <p className="bubble bubble--in">Hi, which documents do I need for my import shipment?</p>
                  <p className="bubble bubble--out">
                    For most imports you&apos;ll need the bill of lading, commercial invoice and packing list. Tell me
                    what you&apos;re shipping and I&apos;ll send your full checklist.
                  </p>
                  <p className="bubble bubble--in">Used vehicle from the UK</p>
                  <p className="bubble bubble--out">Got it. Here&apos;s your checklist 📄</p>
                </div>
                <figcaption>Illustration of the assistant&apos;s flow</figcaption>
              </figure>
            </article>
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section className="section light" aria-labelledby="process-title">
          <div className="container">
            <h2 id="process-title" className="h2">
              How a project runs
            </h2>
            <ol className="steps">
              {steps.map((s, i) => (
                <li key={s.title} className="step">
                  <span className="step-num" aria-hidden="true">
                    {i + 1}
                  </span>
                  <h3 className="h3">{s.title}</h3>
                  <p className="muted">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Products ---------- */}
        <section id="products" className="section mist" aria-labelledby="products-title">
          <div className="container">
            <div className="split-head split-head--wide">
              <h2 id="products-title" className="h2">
                Our products
              </h2>
              <p className="muted">Afrokan Labs is the home for a growing family of products and services.</p>
            </div>
            <div className="products">
              <article className="product">
                <p className="product-name">Deuel&apos;s Designs</p>
                <p>
                  Our web and digital design studio. Deuel&apos;s Designs takes on client websites and platforms, from
                  brand-new company sites to full systems like the ESE Logistic build.
                </p>
                <a href="#contact" className="link">
                  Work with Deuel&apos;s Designs
                </a>
              </article>
              <article className="product product--soon" aria-label="More products coming">
                <Mark className="product-soon-mark" />
                <p className="product-name">More in the lab</p>
                <p className="muted">New products for African businesses are in development. Watch this space.</p>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Team ---------- */}
        <section id="team" className="section light" aria-labelledby="team-title">
          <div className="container">
            <h2 id="team-title" className="h2">
              The team
            </h2>
            <div className="team">
              {team.map((m) => (
                <article key={m.name} className="person">
                  <div className="person-photo">
                    <Image
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      fill
                      sizes="(max-width: 720px) 100vw, 360px"
                      priority={false}
                    />
                  </div>
                  <div className="person-text">
                    <h3 className="h3">{m.name}</h3>
                    <p className="person-role">{m.role}</p>
                    <p className="muted">{m.bio}</p>
                  </div>
                </article>
              ))}
              <article className="person person--join">
                <p className="h3">We&apos;re growing</p>
                <p className="muted">
                  We work with engineers, designers and data people who want to build for African businesses.
                </p>
                <a className="link" href={`mailto:${site.email}?subject=Joining%20Afrokan%20Labs`}>
                  Get in touch
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* ---------- Mission ---------- */}
        <section className="section dark mission" aria-labelledby="mission-title">
          <div className="hero-streak hero-streak--soft" aria-hidden="true" />
          <div className="container mission-inner">
            <h2 id="mission-title" className="mission-title">
              Ghana first. Then the rest of Africa.
            </h2>
            <p className="muted-dark">
              Most software is designed somewhere else and adapted for us later. We do it the other way round: we build
              for how businesses here actually operate, with mobile money, WhatsApp-first customers and patchy
              connections in mind. What works in Accra becomes the base for products across the continent.
            </p>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="section dark contact" aria-labelledby="contact-title">
          <div className="container split">
            <div className="split-head">
              <h2 id="contact-title" className="h2">
                Start a project
              </h2>
              <p className="muted-dark">
                Tell us what&apos;s slowing your business down. We&apos;ll reply within two working days with
                questions or a first idea.
              </p>
              <ul className="contact-direct">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                {whatsappHref && (
                  <li>
                    <span>WhatsApp</span>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      Chat with us
                    </a>
                  </li>
                )}
                {site.bookingUrl && (
                  <li>
                    <span>Call</span>
                    <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                      Book a 20-minute call
                    </a>
                  </li>
                )}
                <li>
                  <span>Based in</span>
                  <p>{site.location}</p>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer dark">
        <div className="container footer-inner">
          <Wordmark />
          <p className="footer-tag">{site.tagline.join("  ·  ")}</p>
          <p className="footer-legal">
            © {new Date().getFullYear()} Afrokan Labs. {site.location}.
          </p>
        </div>
      </footer>

      {whatsappHref && (
        <a className="wa-float" href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with Afrokan Labs on WhatsApp">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.4 14.1c-.2.6-1.3 1.2-1.8 1.3-.5 0-1 .3-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c0 .2.1.3 0 .5l-.3.5-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6 0l.9-1.1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z"
            />
          </svg>
        </a>
      )}
    </>
  );
}
