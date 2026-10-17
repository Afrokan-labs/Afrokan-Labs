import { Fragment } from "react";
import type { LegalDoc } from "@/content/schema";
import { Nav } from "./Nav";

type Props = { doc: LegalDoc; email: string; domain: string };

/** **bold** and [label](/path), with {email} and {domain} filled in. */
function Inline({ text, email, domain }: { text: string; email: string; domain: string }) {
  const filled = text.replaceAll("{email}", email).replaceAll("{domain}", domain);
  return filled.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/).map((part, i) => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) return <strong key={i}>{bold[1]}</strong>;
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link)
      return (
        <a key={i} href={link[2]}>
          {link[1]}
        </a>
      );
    return <Fragment key={i}>{part}</Fragment>;
  });
}

/** Privacy and Terms (reference privacy.html, terms.html): hero, contents list, numbered sections. */
export function LegalPage({ doc, email, domain }: Props) {
  const inline = (text: string) => <Inline text={text} email={email} domain={domain} />;
  return (
    <div className="x x-glow">
      <div className="x-wrap lg-top">
        <Nav dark />
        <header className="lg-hero">
          <span className="lg-k">{doc.kicker}</span>
          <h1>
            {doc.heading.lead}
            <span>{doc.heading.mark}</span>
          </h1>
          <p>{doc.intro}</p>
          <div className="lg-meta">
            <span>{doc.updated}</span>
            <span>{doc.place}</span>
            {doc.draft && <span className="draft">{doc.draft}</span>}
          </div>
        </header>
        <div className="lg-body">
          <nav className="lg-toc" aria-label={doc.tocLabel}>
            <b>{doc.tocLabel}</b>
            {doc.sections.map((s, i) => (
              <a key={s.title} href={`#s${i + 1}`}>
                {s.title}
              </a>
            ))}
          </nav>
          <article className="lg-doc">
            {doc.sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} aria-labelledby={`h${i + 1}`}>
                <h2 id={`h${i + 1}`}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  {s.title}
                </h2>
                {s.blocks.map((b, j) =>
                  "p" in b ? (
                    <p key={j}>{inline(b.p)}</p>
                  ) : (
                    <ul key={j}>
                      {b.ul.map((item) => (
                        <li key={item}>{inline(item)}</li>
                      ))}
                    </ul>
                  ),
                )}
              </section>
            ))}
            <p className="lg-note">{doc.note}</p>
            <a className="lg-other" href={doc.other.href}>
              {doc.other.label}
            </a>
          </article>
        </div>
      </div>
    </div>
  );
}
