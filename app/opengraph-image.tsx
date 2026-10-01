import { ImageResponse } from "next/og";
import { MARK_PATH } from "@/components/Mark";
import { site } from "@/content/site";

// DESIGN: placeholder social share image. Replace with the final design,
// either by editing this file or by swapping it for a static app/opengraph-image.png (1200×630).

export const alt = "Afrokan Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0B0B0B",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <svg width="120" height="108" viewBox="105 115 1100 990">
          <path d={MARK_PATH} fill="none" stroke="#00C853" strokeWidth={165} strokeLinejoin="round" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3 }}>{site.name}</div>
          <div style={{ fontSize: 36, color: "#A3A8AD" }}>{site.tagline.join("  ·  ")}</div>
        </div>
      </div>
    ),
    size,
  );
}
