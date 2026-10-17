/**
 * reference .x-theme: fixed Dark/Light switch. SiteScripts wires the buttons;
 * the inline script in the root layout applies a saved choice before paint.
 */
export function ThemeToggle() {
  return (
    <div className="x-theme" role="group" aria-label="Colour theme">
      <button type="button" data-t="dark" aria-pressed="true">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor" />
        </svg>
        Dark
      </button>
      <button type="button" data-t="light" aria-pressed="false">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4.2" fill="currentColor" />
          <path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Light
      </button>
    </div>
  );
}

/** Runs in <head> before first paint, so a saved light theme never flashes dark. */
export const THEME_INIT = `try{if(localStorage.getItem('afk-theme')==='light')document.documentElement.setAttribute('data-site-theme','light')}catch(e){}`;
