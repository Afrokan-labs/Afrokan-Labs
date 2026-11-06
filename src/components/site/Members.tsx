import type { Leads, Members as MemberList } from "@/content/schema";
import { Img } from "./Img";

const SHAPES: Record<MemberList[number]["shape"] | Leads[number]["shape"], React.ReactNode> = {
  circles: (
    <>
      <circle cx="62" cy="70" r="46" />
      <circle cx="148" cy="70" r="46" />
      <circle cx="148" cy="152" r="40" />
    </>
  ),
  triangles: (
    <>
      <path d="M105 18 L170 128 H40Z" />
      <path d="M40 150 L80 82 L120 150Z" opacity=".85" />
      <path d="M128 150 L160 96 L192 150Z" opacity=".85" />
    </>
  ),
  diamond: (
    <>
      <path d="M100 40 L170 110 L100 180 L30 110Z" />
      <path d="M170 10 L196 36 L170 62 L144 36Z" />
    </>
  ),
  ring: (
    <>
      <path d="M105 14a86 86 0 1 1 0 172a86 86 0 1 1 0-172zm0 44a42 42 0 1 0 0 84a42 42 0 1 0 0-84z" />
      <circle cx="186" cy="30" r="18" />
    </>
  ),
  plus: <path d="M80 20h50v58h58v50h-58v58H80v-58H22V78h58z" />,
};

type CardProps = {
  name: readonly [string, string];
  shape: keyof typeof SHAPES;
  cutout: { src: string; alt: string };
  highlight: { label: string; value: string };
  pill: string;
  children: React.ReactNode;
};

function Card({ name, shape, cutout, highlight, pill, children }: CardProps) {
  return (
    <li className="mb-card">
      <div className="mb-vis">
        <svg className="mb-shape" viewBox="0 0 210 200" aria-hidden="true">
          <g fill="currentColor">{SHAPES[shape]}</g>
        </svg>
        <Img src={cutout.src} alt={cutout.alt} sizes="(max-width: 760px) 340px, 30vw" />
        <span className={`mb-pill ${pill}`}>
          <small>{highlight.label}</small> <b>{highlight.value}</b>
        </span>
      </div>
      <h3 className="mb-name">
        <span>{name[0]}</span> <span>{name[1]}</span>
      </h3>
      <p className="mb-role">{children}</p>
    </li>
  );
}

type Props = { title: string; leadsLabel: string; members: MemberList; leads: Leads };

/** About "Members" (updates 1, 2 §7 and 5 §3, reference .mb): cut-outs on green shapes. */
export function Members({ title, leadsLabel, members, leads }: Props) {
  return (
    <section className="mb" aria-labelledby="mb-title">
      <h2 className="mb-title" id="mb-title">
        {title}
        {/* A hidden space keeps "Members 5" two words in the text without moving the 5. */}
        <span className="sr-only"> </span>
        <sup>{members.length + leads.length}</sup>
      </h2>
      <ul className="mb-grid">
        {members.map((m, i) => (
          <Card key={m.abbr} {...m} pill={`p${i}`}>
            <b>{m.abbr}</b> / {m.title}
          </Card>
        ))}
      </ul>
      <div className="mb-sub">
        <span>{leadsLabel}</span>
        <i aria-hidden="true" />
      </div>
      <ul className="mb-grid mb-grid2">
        {leads.map((lead) => (
          <Card key={lead.role} {...lead}>
            <b>{lead.role}</b>
          </Card>
        ))}
      </ul>
    </section>
  );
}
