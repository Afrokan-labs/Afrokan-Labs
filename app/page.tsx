import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Mark, MARK_PATH, Wordmark } from "@/components/Mark";
import { ContactForm } from "@/components/ContactForm";
import { site, whatsappHref } from "@/content/site";
import { services, servicesIntro } from "@/content/services";
import { steps, processTitle } from "@/content/process";
import { products, productsIntro } from "@/content/products";
import { team, teamTitle, joinCard } from "@/content/team";
import { work, workTitle } from "@/content/work";
import { hero, mission, contact } from "@/content/home";

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
              {hero.title}
            </h1>
            <p className="hero-lede">{hero.lede}</p>
            <div className="hero-actions">
              <a href={hero.primary.href} className="btn btn--green">
                {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className="btn btn--ghost-dark">
                {hero.secondary.label}
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Services ---------- */}
        <section id="services" className="section mist" aria-labelledby="services-title">
          <div className="container split">
            <div className="split-head">
              <h2 id="services-title" className="h2">
                {servicesIntro.title}
              </h2>
              <p className="muted">{servicesIntro.body}</p>
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
              {workTitle}
            </h2>

            {work.map((c) => (
              <article key={c.slug} className="case">
                <div className="case-text">
                  <p className="case-client">{c.client}</p>
                  <h3 className="case-title">{c.title}</h3>
                  <p className="muted-dark">{c.summary}</p>
                  <dl className="case-facts">
                    {c.facts.map((f) => (
                      <div key={f.label}>
                        <dt>{f.label}</dt>
                        <dd>{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Process ---------- */}
        <section className="section light" aria-labelledby="process-title">
          <div className="container">
            <h2 id="process-title" className="h2">
              {processTitle}
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
                {productsIntro.title}
              </h2>
              <p className="muted">{productsIntro.body}</p>
            </div>
            <div className="products">
              {products.map((p) =>
                p.comingSoon ? (
                  <article key={p.name} className="product product--soon">
                    <Mark className="product-soon-mark" />
                    <p className="product-name">{p.name}</p>
                    <p className="muted">{p.body}</p>
                  </article>
                ) : (
                  <article key={p.name} className="product">
                    <p className="product-name">{p.name}</p>
                    <p>{p.body}</p>
                    {p.link && (
                      <a href={p.link.href} className="link">
                        {p.link.label}
                      </a>
                    )}
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ---------- Team ---------- */}
        <section id="team" className="section light" aria-labelledby="team-title">
          <div className="container">
            <h2 id="team-title" className="h2">
              {teamTitle}
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
                <p className="h3">{joinCard.title}</p>
                <p className="muted">{joinCard.body}</p>
                <a className="link" href={`mailto:${site.email}?subject=${encodeURIComponent(joinCard.emailSubject)}`}>
                  {joinCard.linkLabel}
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
              {mission.title}
            </h2>
            <p className="muted-dark">{mission.body}</p>
          </div>
        </section>

        {/* ---------- Contact ---------- */}
        <section id="contact" className="section dark contact" aria-labelledby="contact-title">
          <div className="container split">
            <div className="split-head">
              <h2 id="contact-title" className="h2">
                {contact.title}
              </h2>
              <p className="muted-dark">{contact.body}</p>
              <ul className="contact-direct">
                <li>
                  <span>Email</span>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                {whatsappHref && (
                  <li>
                    <span>WhatsApp</span>
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      {contact.whatsappLabel}
                    </a>
                  </li>
                )}
                {site.bookingUrl && (
                  <li>
                    <span>Call</span>
                    <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                      {contact.bookingLabel}
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
