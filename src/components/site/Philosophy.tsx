import type { About } from "@/content/schema";
import { Eyebrow } from "./Eyebrow";

const ICON: Record<About["philosophy"]["cards"][number]["icon"], React.ReactNode> = {
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

/** About "Our philosophy" (site update 1, reference .ph): three cards with line icons. */
export function Philosophy({ copy }: { copy: About["philosophy"] }) {
  return (
    <section className="x-sec ph" aria-labelledby="ph-title">
      <Eyebrow>{copy.eyebrow}</Eyebrow>
      <h2 id="ph-title">
        {copy.heading[0]}
        <span>{copy.heading[1]}</span>
      </h2>
      <p>{copy.body}</p>
      <ul className="ph-cards">
        {copy.cards.map((c) => (
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
                {ICON[c.icon]}
              </g>
            </svg>
            <p>{c.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
