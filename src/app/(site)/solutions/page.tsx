import "@/styles/pages/solutions.css";
import { CtaBox } from "@/components/site/CtaBox";
import { Nav } from "@/components/site/Nav";
import { imageUrl } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ path: "/solutions", title: "Solutions" });

export default function SolutionsPage() {
  return (
    <>
      <div className="x x-glow">
        <div className="x-wrap x-hero-wrap">
          <div className="sol-card" id="top">
            <Nav current="solutions" />
            <div className="sol-poster">
              <svg
                className="sol-art"
                viewBox="0 0 1200 760"
                role="img"
                aria-label="Four moments in a business day: enquiry answered at 6:42 am, checklist sent at 9:15 am, order tracked at 1:30 pm, daily report ready at 6:00 pm"
              >
                <defs>
                  <clipPath id="w0">
                    <path d="M46.6 87.3 A480 480 0 0 1 340.4 128.6 L678.0 -563.5 A1250 1250 0 0 0 -87.1 -671.0Z" />
                  </clipPath>
                  <clipPath id="w1">
                    <path d="M340.4 128.6 A480 480 0 0 1 545.7 320.0 L1212.5 -65.0 A1250 1250 0 0 0 678.0 -563.5Z" />
                  </clipPath>
                  <clipPath id="w2">
                    <path d="M545.7 320.0 A480 480 0 0 1 608.8 593.5 L1377.0 647.2 A1250 1250 0 0 0 1212.5 -65.0Z" />
                  </clipPath>
                  <clipPath id="w3">
                    <path d="M608.8 593.5 A480 480 0 0 1 497.7 868.5 L1087.6 1363.5 A1250 1250 0 0 0 1377.0 647.2Z" />
                  </clipPath>
                  <filter id="sh" x="-20%" y="-30%" width="140%" height="180%">
                    <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity=".18" />
                  </filter>
                </defs>
                <rect width="1200" height="760" fill="#ECECEC" />
                <circle cx="130" cy="560" r="476" fill="#fff" />
                <g clipPath="url(#w0)">
                  <image
                    href={imageUrl("assets/images/solutions-morning.webp", 768)}
                    x="24"
                    y="-8"
                    width="384"
                    height="136"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path
                  d="M46.6 87.3 A480 480 0 0 1 340.4 128.6 L678.0 -563.5 A1250 1250 0 0 0 -87.1 -671.0Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <g clipPath="url(#w1)">
                  <image
                    href={imageUrl("assets/images/solutions-office.webp", 1536)}
                    x="336"
                    y="-8"
                    width="768"
                    height="328"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path
                  d="M340.4 128.6 A480 480 0 0 1 545.7 320.0 L1212.5 -65.0 A1250 1250 0 0 0 678.0 -563.5Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <g clipPath="url(#w2)">
                  <image
                    href={imageUrl("assets/images/solutions-yard.webp", 1312)}
                    x="544"
                    y="-8"
                    width="656"
                    height="648"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path
                  d="M545.7 320.0 A480 480 0 0 1 608.8 593.5 L1377.0 647.2 A1250 1250 0 0 0 1212.5 -65.0Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <g clipPath="url(#w3)">
                  <image
                    href={imageUrl("assets/images/solutions-evening.webp", 1264)}
                    x="568"
                    y="592"
                    width="632"
                    height="168"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </g>
                <path
                  d="M608.8 593.5 A480 480 0 0 1 497.7 868.5 L1087.6 1363.5 A1250 1250 0 0 0 1377.0 647.2Z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                  strokeLinejoin="round"
                />
                <g className="sol-pill" transform="translate(72 30)">
                  <rect width="170" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                  <text x="85" y="22" textAnchor="middle">
                    Enquiry answered
                  </text>
                  <text x="85" y="40" textAnchor="middle">
                    @ 6:42 am
                  </text>
                </g>
                <g className="sol-pill" transform="translate(400 40)">
                  <rect width="154" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                  <text x="77" y="22" textAnchor="middle">
                    Checklist sent
                  </text>
                  <text x="77" y="40" textAnchor="middle">
                    @ 9:15 am
                  </text>
                </g>
                <g className="sol-pill" transform="translate(1016 40)">
                  <rect width="145" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                  <text x="73" y="22" textAnchor="middle">
                    Order tracked
                  </text>
                  <text x="73" y="40" textAnchor="middle">
                    @ 1:30 pm
                  </text>
                </g>
                <g className="sol-pill" transform="translate(624 640)">
                  <rect width="187" height="52" rx="26" fill="#fff" filter="url(#sh)" />
                  <text x="94" y="22" textAnchor="middle">
                    Daily report ready
                  </text>
                  <text x="94" y="40" textAnchor="middle">
                    @ 6:00 pm
                  </text>
                </g>
              </svg>
              <div className="sol-text">
                <p className="sol-kicker">
                  Serve customers, run the office,
                  <br />
                  sleep well…
                </p>
                <h1 className="sol-h1">
                  A business day that <b>runs itself</b>
                </h1>
                <p className="sol-tagline">
                  <span>#BuiltForGhana</span> for the businesses that never stop.
                </p>
                <span className="sol-brand">
                  <svg viewBox="105 115 1100 990" aria-hidden="true">
                    <path
                      d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="165"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Afrokan Labs
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="x-wrap">
          <section className="x-sec" aria-labelledby="day-title">
            <div className="x-head">
              <h2 className="x-h2" id="day-title">
                One day, <span className="x-hl">four moments</span>
              </h2>
              <p>
                Here&apos;s how our tools fit into an ordinary working day. Each moment is something
                a business owner used to handle by hand.
              </p>
            </div>
            <ol className="sol-day">
              <li className="sol-moment">
                <span className="sol-time">6:42 am</span>
                <h3>Enquiry answered</h3>
                <dl>
                  <div>
                    <dt>Before</dt>
                    <dd>
                      A customer messages before the office opens and waits hours for a reply, or
                      goes elsewhere.
                    </dd>
                  </div>
                  <div className="sol-with">
                    <dt>With Afrokan</dt>
                    <dd>
                      The WhatsApp assistant answers straight away from your own documents and
                      prices.
                    </dd>
                  </div>
                </dl>
                <span className="sol-tool">WhatsApp AI Assistant</span>
              </li>
              <li className="sol-moment">
                <span className="sol-time">9:15 am</span>
                <h3>Checklist sent</h3>
                <dl>
                  <div>
                    <dt>Before</dt>
                    <dd>
                      Staff explain the same document requirements on the phone, again and again.
                    </dd>
                  </div>
                  <div className="sol-with">
                    <dt>With Afrokan</dt>
                    <dd>
                      The customer gets an exact checklist of what they need, generated in seconds.
                    </dd>
                  </div>
                </dl>
                <span className="sol-tool">Workflow Tool</span>
              </li>
              <li className="sol-moment">
                <span className="sol-time">1:30 pm</span>
                <h3>Order tracked</h3>
                <dl>
                  <div>
                    <dt>Before</dt>
                    <dd>
                      Updates live in paper files and someone&apos;s memory, so customers keep
                      calling to ask.
                    </dd>
                  </div>
                  <div className="sol-with">
                    <dt>With Afrokan</dt>
                    <dd>
                      Every job has a status your team updates once, and everyone sees the same
                      thing.
                    </dd>
                  </div>
                </dl>
                <span className="sol-tool">Backend System</span>
              </li>
              <li className="sol-moment">
                <span className="sol-time">6:00 pm</span>
                <h3>Daily report ready</h3>
                <dl>
                  <div>
                    <dt>Before</dt>
                    <dd>
                      The owner pieces the day together from calls and chats, late into the evening.
                    </dd>
                  </div>
                  <div className="sol-with">
                    <dt>With Afrokan</dt>
                    <dd>
                      A short summary of enquiries and jobs is waiting on the owner&apos;s phone.
                    </dd>
                  </div>
                </dl>
                <span className="sol-tool">Dashboard</span>
              </li>
            </ol>
          </section>
          <section className="x-sec" aria-labelledby="ind-title">
            <div className="x-head">
              <h2 className="x-h2" id="ind-title">
                Built for businesses <span className="x-hl">like yours</span>
              </h2>
              <p>
                We&apos;ve delivered for clearing and forwarding. The same tools fit any business
                that answers the same questions every day.
              </p>
            </div>
            <ul className="sol-ind">
              <li className="sol-i">
                <span className="sol-badge">Delivered</span>
                <h3>Clearing &amp; forwarding</h3>
                <p>
                  WhatsApp assistant, document checklist generator and website for ESE Logistic
                  Solution Limited.
                </p>
              </li>
              <li className="sol-i">
                <span className="sol-badge idea">Good fit</span>
                <h3>Retail &amp; shops</h3>
                <p>
                  Answer price and stock questions on WhatsApp and track orders without a notebook.
                </p>
              </li>
              <li className="sol-i">
                <span className="sol-badge idea">Good fit</span>
                <h3>Schools</h3>
                <p>
                  Handle admissions questions, fees reminders and parent enquiries in one place.
                </p>
              </li>
              <li className="sol-i">
                <span className="sol-badge idea">Good fit</span>
                <h3>Clinics &amp; pharmacies</h3>
                <p>Opening hours, bookings and common questions answered at any time of day.</p>
              </li>
              <li className="sol-i">
                <span className="sol-badge idea">Good fit</span>
                <h3>Real estate</h3>
                <p>
                  Share listings, book viewings and follow up with serious buyers automatically.
                </p>
              </li>
              <li className="sol-i">
                <span className="sol-badge idea">Good fit</span>
                <h3>Restaurants &amp; catering</h3>
                <p>Take orders and event bookings on WhatsApp and see them all in one list.</p>
              </li>
            </ul>
          </section>
          <CtaBox />
        </div>
      </div>
    </>
  );
}
