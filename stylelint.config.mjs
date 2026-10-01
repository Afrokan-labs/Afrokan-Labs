/**
 * Token enforcement (CLAUDE.md override 5, design-system §5):
 * - no hex colours outside src/styles/tokens.css
 * - colour, spacing and font values in components must be var(--…)
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
    "media-feature-name-value-allowed-list": {
      "min-width": ["640px", "1024px", "1440px"],
    },
  },
  overrides: [
    {
      files: ["src/styles/tokens.css"],
      rules: { "color-no-hex": null },
    },
    {
      files: ["src/components/**/*.css"],
      rules: {
        "scale-unlimited/declaration-strict-value": [
          [
            "/color$/",
            "fill",
            "stroke",
            "/^margin/",
            "/^padding/",
            "/gap$/",
            "font",
            "font-family",
            "font-size",
            "font-weight",
          ],
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
