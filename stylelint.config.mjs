/**
 * Token enforcement (CLAUDE.md override 5, design-system §5):
 * - no hex colours outside src/styles/tokens.css
 * - colour and font-family values in components must be var(--…); sizes are
 *   ported from the reference and may be raw (CLAUDE.md override 5)
 * - media queries use only the fixed breakpoints
 */

/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-declaration-strict-value"],
  rules: {
    "color-no-hex": true,
    // CSS Module class names are camelCase so they read as styles.someName.
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]*$|^[a-z][a-z0-9-]*$",
      { message: "Use camelCase (CSS Modules) or kebab-case (global classes)" },
    ],
    "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
    // design-system.md writes alpha as a number: rgb(22 19 15 / 0.25)
    "alpha-value-notation": "number",
    // Font family names in custom properties keep their case (Roboto, not roboto).
    "value-keyword-case": ["lower", { ignoreProperties: ["/^--font-/"] }],
    "media-feature-range-notation": "prefix",
    // The reference's breakpoints (design-system §5), as desktop-first max-width queries.
    "media-feature-name-value-allowed-list": {
      "max-width": ["520px", "560px", "760px", "900px", "960px"],
    },
  },
  overrides: [
    {
      files: ["src/styles/tokens.css"],
      rules: { "color-no-hex": null },
    },
    {
      files: ["src/components/**/*.css", "src/app/**/*.css"],
      rules: {
        "scale-unlimited/declaration-strict-value": [
          ["/color$/", "fill", "stroke", "background", "font-family"],
          {
            ignoreValues: [
              "0",
              "auto",
              "inherit",
              "initial",
              "unset",
              "revert",
              "none",
              "transparent",
              "currentcolor",
              "currentColor",
            ],
            disableFix: true,
          },
        ],
      },
    },
  ],
};

export default config;
