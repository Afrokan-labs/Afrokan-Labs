const SEEN_KEY = "afk-seen";

/**
 * Update 6: the first-load panel. Inline, so it paints before the stylesheet
 * arrives, which is why its colours are raw here and not tokens. The panel covers
 * the page at once, the logo fades in after 400ms (a fast load only sees a quick
 * fade), and CSS hides it at 6s if the script never runs.
 */
const CSS = `
#afk-loader{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#121212;animation:afk-failsafe .3s ease 6s forwards}
:root[data-site-theme="light"] #afk-loader{background:#F3F3EF}
@keyframes afk-show{to{opacity:1}}
@keyframes afk-failsafe{to{opacity:0;visibility:hidden}}
html.afk-done #afk-loader{animation:none;opacity:0;visibility:hidden;transition:opacity .3s ease,visibility 0s linear .3s}
.afk-l-in{display:grid;opacity:0;animation:afk-show .2s ease .4s forwards}
html.afk-done .afk-l-in{animation:none}
.afk-l-mark{width:64px;height:58px;color:#94DE57;overflow:visible}
.afk-l-mark path{stroke-dasharray:2400}
@media (prefers-reduced-motion:no-preference){
.afk-l-mark path{animation:afk-draw 1.2s cubic-bezier(.6,0,.3,1) infinite}
@keyframes afk-draw{0%{stroke-dashoffset:2400}70%,100%{stroke-dashoffset:0}}
}
@media (prefers-reduced-motion:reduce){html.afk-done #afk-loader{transition:none}}
`;

/**
 * For <head>. Every internal link is a full page load, so this is what keeps the
 * loader to the first load of a visit: later pages start with it already hidden,
 * and the browser keeps the old page up until the next one can paint.
 */
export const LOADER_HEAD = `try{if(sessionStorage.getItem("${SEEN_KEY}"))document.documentElement.classList.add("afk-done");else sessionStorage.setItem("${SEEN_KEY}","1")}catch(e){}`;

/** Hides the panel when the DOM is ready, without waiting for images. 5s failsafe. */
const HIDE = `(function(){var d=document.documentElement,L=document.getElementById("afk-loader");if(!L)return;function done(){d.classList.add("afk-done");L.setAttribute("aria-hidden","true")}if(document.readyState!=="loading")done();else document.addEventListener("DOMContentLoaded",done);setTimeout(done,5000)})()`;

/** For the top of <body>, in the server HTML, so it's there before hydration. */
export function PageLoader() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <noscript
        dangerouslySetInnerHTML={{ __html: "<style>#afk-loader{display:none!important}</style>" }}
      />
      {/* The script below sets aria-hidden before React hydrates. */}
      <div id="afk-loader" role="status" aria-label="Loading" suppressHydrationWarning>
        <div className="afk-l-in" aria-hidden="true">
          <svg className="afk-l-mark" viewBox="105 115 1100 990">
            <path
              d="M685 500 L513 212 Q372 598 200 1010 Q482 842 750 645 L993 1003 L1160 922"
              fill="none"
              stroke="currentColor"
              strokeWidth="165"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: HIDE }} />
    </>
  );
}
