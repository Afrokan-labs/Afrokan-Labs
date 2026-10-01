import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Placeholder } from "@/components/Placeholder";
import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { caseStudyPage as copy } from "@/content/home";
import { getCaseStudy, work } from "@/content/work";
import shared from "@/styles/shared.module.css";
import styles from "./page.module.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  // Setting openGraph replaces the parent's, so carry over the shared image, site name and locale.
  const { images, siteName, locale } = (await parent).openGraph ?? {};
  return {
    title: `${c.client} case study`,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: {
      images,
      siteName,
      locale,
      title: `${c.client} case study | Afrokan Labs`,
      description: c.summary,
      url: `/work/${c.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const sections = [
    { id: "problem", title: copy.sectionTitles.problem, body: c.problem },
    { id: "built", title: copy.sectionTitles.built, body: c.built },
    { id: "result", title: copy.sectionTitles.result, body: c.result },
  ];

  return (
    <>
      <Nav />
      <main id="top">
        <section className={`${shared.dark} ${styles.header}`} aria-labelledby="case-title">
          <div className={`${shared.container} ${styles.headerInner}`}>
            <Link href="/#work" className={shared.link}>
              {copy.backLabel}
            </Link>
            <p className={styles.client}>{c.client}</p>
            <h1 id="case-title" className={styles.title}>
              {c.title}
            </h1>
            <p className={`${shared.mutedDark} ${styles.summary}`}>{c.summary}</p>
            <dl className={styles.facts}>
              {c.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <div className={`${shared.light} ${styles.visualBand}`}>
          <div className={shared.container}>
            <Placeholder label={c.visualLabel} ratio="16 / 9" />
          </div>
        </div>

        {sections.map((s, i) => (
          <section
            key={s.id}
            className={`${shared.section} ${i % 2 ? shared.gray : shared.light}`}
            aria-labelledby={`${s.id}-title`}
          >
            <div className={`${shared.container} ${shared.split}`}>
              <h2 id={`${s.id}-title`} className={shared.h2}>
                {s.title}
              </h2>
              <div className={styles.body}>
                {s.body.map((p) => (
                  <p key={p} className={p.startsWith("TODO:") ? styles.todo : undefined}>
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className={`${shared.section} ${shared.dark}`} aria-labelledby="next-title">
          <div className={`${shared.container} ${styles.cta}`}>
            <h2 id="next-title" className={shared.h2}>
              {copy.ctaTitle}
            </h2>
            <Link href={copy.ctaHref} className={`${shared.btn} ${shared.btnPrimary}`}>
              {copy.ctaLabel}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
