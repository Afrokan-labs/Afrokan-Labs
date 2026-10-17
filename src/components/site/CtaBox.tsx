import type { Site } from "@/content/schema";
import { getLinks } from "@/lib/links";
import { WaIcon } from "./LogoMark";

/** reference .x-cta: the closing box on About, Services, Solutions and Work. */
export function CtaBox({ copy }: { copy: Site["ctaBox"] }) {
  const links = getLinks();
  const [beforeEmail, afterEmail] = copy.email.split("{email}");
  return (
    <section className="x-cta" aria-labelledby="cta-title">
      <div className="x-blocks" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="x-stem" aria-hidden="true">
        <span>
          <WaIcon />
        </span>
      </div>
      <h2 className="x-h2" id="cta-title">
        {copy.heading.lead}
        <span className="x-hl">{copy.heading.mark}</span>
      </h2>
      <div className="x-side">
        <p>{copy.body}</p>
        <a className="x-btn x-btn-lime" href={links.whatsapp} {...links.whatsappAttrs}>
          <WaIcon />
          {copy.whatsapp}
        </a>{" "}
        <span className="x-mail">
          {beforeEmail}
          <a href={links.mailto}>{links.email}</a>
          {afterEmail}
        </span>
      </div>
    </section>
  );
}
