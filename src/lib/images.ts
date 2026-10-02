/**
 * Looks up an image in the manifest written by scripts/optimize-images.ts and
 * returns the props ResponsiveImage needs. Server-side, build time only.
 *
 * A referenced image that isn't in the manifest stops the build with a
 * message naming it (BUILD_PLAN 2.6).
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { ImageSource } from "@/components/primitives/ResponsiveImage";

type ManifestEntry = { width: number; height: number; fallback: string; sources: ImageSource[] };

const MANIFEST = join(process.cwd(), "src", "generated", "images.json");

let cache: Record<string, ManifestEntry> | undefined;

function manifest(): Record<string, ManifestEntry> {
  if (cache) return cache;
  if (!existsSync(MANIFEST)) {
    throw new Error("Image manifest not found (src/generated/images.json). Run `pnpm images`.");
  }
  cache = JSON.parse(readFileSync(MANIFEST, "utf8")) as Record<string, ManifestEntry>;
  return cache;
}

/** Props for <ResponsiveImage>, e.g. getImage("assets/images/franklin-wiafe.jpg"). */
export function getImage(src: string) {
  const entry = manifest()[src];
  if (!entry) {
    throw new Error(
      `Image "${src}" is not in the image manifest. Put the source file in assets/images/ and run \`pnpm images\`.`,
    );
  }
  return { src: entry.fallback, width: entry.width, height: entry.height, sources: entry.sources };
}
