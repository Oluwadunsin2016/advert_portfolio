import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// The preview image shown when the site is shared on social media or in chats.
export const alt = `${site.name} | ${site.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#0b0b0c",
          color: "#f4f2ee",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, color: "#d7f75b" }}>AI-POWERED VIDEO ADVERTISING</div>
        <div style={{ fontSize: 88, fontWeight: 700, lineHeight: 1.02, maxWidth: 950 }}>
          Make Your Product Impossible to Ignore.
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#a3a29e" }}>
          {site.name} · {site.title}
        </div>
      </div>
    ),
    size,
  );
}
