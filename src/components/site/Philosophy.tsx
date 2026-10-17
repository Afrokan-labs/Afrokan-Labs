import { Eyebrow } from "./Eyebrow";

const ICON = {
  audit: (
    <>
      <circle cx="10" cy="10" r="6.5" />
      <path d="M15 15l6 6M10 7v6M7 10h6" />
    </>
  ),
  systems: (
    <>
      <rect x="2" y="9" width="6" height="6" rx="1.5" />
      <rect x="15" y="3" width="7" height="6" rx="1.5" />
      <rect x="15" y="15" width="7" height="6" rx="1.5" />
      <path d="M8 12h4V6h3M12 12v6h3" />
    </>
  ),
  results: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 13v-2M12 13V8M16 13v-4M8 20l4-4 4 4" />
    </>
  ),
};

const CARDS = [
  {
    title: "Problem audits",
    icon: ICON.audit,
    body: "We look at how enquiries, paperwork and data move through your business today and find where time is being lost.",
  },
  {
    title: "Workflow systems",
    icon: ICON.systems,
    body: "We build WhatsApp assistants, tools and platforms that connect, so customers and staff get answers without chasing anyone.",
  },
  {
    title: "Measurable results",
    icon: ICON.results,
    body: "We agree up front what success looks like, from faster replies to less paperwork, and check it after launch.",
  },
];

/** About "Our philosophy" (site update 1, reference .ph): three cards with line icons. */
export function Philosophy() {
  return (
    <section className="x-sec ph" aria-labelledby="ph-title">
      <Eyebrow>Our philosophy</Eyebrow>
      <h2 id="ph-title">
        Engineer-led<span>Built on your workflow</span>
      </h2>
      <p>
        We don&apos;t just make things look good. We build systems around how your business really
        works, so they keep paying off after launch.
      </p>
      <ul className="ph-cards">
        {CARDS.map((c) => (
          <li key={c.title} className="ph-card">
            <h3>{c.title}</h3>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {c.icon}
              </g>
            </svg>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
