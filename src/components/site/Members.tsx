import type { Members as MemberList } from "@/content/schema";
import { Img } from "./Img";

const SHAPES: Record<MemberList[number]["shape"], React.ReactNode> = {
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
};

/** About "Members" (site update 1, reference .mb): cut-outs on green shapes. */
export function Members({ members }: { members: MemberList }) {
  return (
    <section className="mb" aria-labelledby="mb-title">
      <h2 className="mb-title" id="mb-title">
        Members<sup>{members.length}</sup>
      </h2>
      <ul className="mb-grid">
        {members.map((m) => (
          <li key={m.abbr} className="mb-card">
            <div className="mb-vis">
              <svg className="mb-shape" viewBox="0 0 210 200" aria-hidden="true">
                <g fill="currentColor">{SHAPES[m.shape]}</g>
              </svg>
              <Img src={m.cutout.src} alt={m.cutout.alt} sizes="(max-width: 760px) 340px, 30vw" />
            </div>
            <h3 className="mb-name">
              <span>{m.name[0]}</span>
              <span>{m.name[1]}</span>
            </h3>
            <p className="mb-role">
              <b>{m.abbr}</b> / {m.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
