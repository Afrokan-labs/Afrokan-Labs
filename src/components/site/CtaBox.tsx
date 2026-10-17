import { getLinks } from "@/lib/links";
import { WaIcon } from "./LogoMark";

/** reference .x-cta: the closing box on About, Services, Solutions and Work. */
export function CtaBox() {
  const links = getLinks();
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
        Have a problem in your business we could <span className="x-hl">solve?</span>
      </h2>
      <div className="x-side">
        <p>Tell us what&apos;s slowing your team down. The first conversation is free.</p>
        <a className="x-btn x-btn-lime" href={links.whatsapp} {...links.whatsappAttrs}>
          <WaIcon />
          Chat with us on WhatsApp
        </a>{" "}
        <span className="x-mail">
          or email <a href={links.mailto}>{links.email}</a>
        </span>
      </div>
    </section>
  );
}
