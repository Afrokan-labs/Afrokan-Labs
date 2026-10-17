import type { Site } from "@/content/schema";
import { CurveArrow, Eyebrow } from "./Eyebrow";
import { Img } from "./Img";

const ICONS: Record<Site["industries"][number]["icon"], React.ReactNode> = {
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  bag: <path d="M4 8h16l-1 12H5zM8 8a4 4 0 0 1 8 0" />,
  cap: <path d="M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5" />,
  cross: <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z" />,
  house: <path d="M3 11l9-7 9 7M5 10v10h14V10" />,
  dish: <path d="M4 14h16M6 14a6 6 0 0 1 12 0M12 6V4M3 18h18" />,
  person: (
    <>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
    </>
  ),
};

function Industry({ item }: { item: Site["industries"][number] }) {
  return (
    <span>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {ICONS[item.icon]}
        </g>
      </svg>
      {item.label}
    </span>
  );
}

/**
 * Home "Welcome" block (site update 1, reference .ae-intro, .ae-split and
 * .ae-strip): intro headline, the dark "About the team" card beside the CEO
 * photo with two stat cards, then the industry marquee.
 */
export function WelcomeBlock({ industries }: { industries: Site["industries"] }) {
  return (
    <>
      <section className="ae-intro" aria-labelledby="ae-title">
        <Eyebrow>Welcome to Afrokan Labs</Eyebrow>
        <h2 className="ae-h" id="ae-title">
          Your next best business{" "}
          <span className="ae-tile" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path
                d="M6 6c0 7 4 11 12 11M18 17l-4-4M18 17l-4 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>{" "}
          <span className="g">decision starts here</span>
        </h2>
        <p>
          We&apos;re a small engineering team in Accra building WhatsApp assistants, web platforms
          and workflow tools. Look at what we&apos;ve shipped, and let the work do the talking.
        </p>
      </section>
      <div className="ae-split">
        <div className="ae-dark">
          <Eyebrow>About the team</Eyebrow>
          <h3>
            Engineering first.
            <br />
            <span>Always.</span>
          </h3>
          <p>
            We start with how your business actually runs, then design and build the tools around
            it. The people who scope your project are the people who write the code.
          </p>
          <div className="ae-btns">
            <a className="ae-btn g" href="/about">
              More about us <CurveArrow />
            </a>
            <a className="ae-btn w" href="/services">
              See services <CurveArrow />
            </a>
          </div>
          <a className="ae-mini" href="/work#cases">
            <Img src="work-bg-port.webp" alt="" sizes="84px" />
            <span>
              <b>WhatsApp assistant, checklist tool and website for ESE Logistic</b>
              <small>
                See details <CurveArrow />
              </small>
            </span>
          </a>
        </div>
        <div className="ae-photo">
          <Img
            src="team-ceo-franklin.webp"
            alt="Franklin Asare Wiafe, CEO of Afrokan Labs"
            sizes="(max-width: 860px) 100vw, 50vw"
          />
          <div className="ae-stats">
            <div className="ae-stat">
              <b>
                3<i>×</i>
              </b>
              <span>Tools delivered for ESE Logistic</span>
              <em>↑ One client, three systems</em>
            </div>
            <div className="ae-stat">
              <b>
                24/7<i>.</i>
              </b>
              <span>WhatsApp answers, day or night</span>
              <em>↑ No extra staff</em>
            </div>
          </div>
        </div>
      </div>
      <div className="ae-strip" aria-label="Industries we build for">
        <div className="ae-strip-in">
          {industries.map((item) => (
            <Industry key={item.label} item={item} />
          ))}
          {/* The copy that makes the loop seamless; screen readers hear the list once. */}
          <span aria-hidden="true" style={{ display: "contents" }}>
            {industries.map((item) => (
              <Industry key={item.label} item={item} />
            ))}
          </span>
        </div>
      </div>
    </>
  );
}
