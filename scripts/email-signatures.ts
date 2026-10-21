/**
 * pnpm email:signatures — writes the hello@ email signatures to
 * docs/email-signatures/, each file holding only the signature markup:
 *
 *   email-signature-team.html   The Afrokan Labs Team (default)
 *   email-signature-named.html  adds "[First name] · Afrokan Labs" on top
 *
 * Markup: src/lib/email-signature.ts. Facts and links: src/content/site.ts.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { signatureHtml } from "../src/lib/email-signature";

const DIR = join(process.cwd(), "docs", "email-signatures");
mkdirSync(DIR, { recursive: true });
for (const [file, named] of [
  ["email-signature-team.html", false],
  ["email-signature-named.html", true],
] as const) {
  writeFileSync(join(DIR, file), `${signatureHtml({ named })}\n`);
  console.log(`email:signatures: docs/email-signatures/${file}`);
}
