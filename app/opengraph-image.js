import { ImageResponse } from "next/og";

export const alt = "Mushfiq — Full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(circle at 20% 20%, rgba(0,217,255,0.35) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,217,255,0.2) 0%, transparent 50%), #0A0A0B",
          color: "#FAFAFA",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#A1A1AA",
            fontFamily: "monospace",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#00D9FF",
              display: "block",
            }}
          />
          Mushfiq · Full-stack engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 128,
              lineHeight: 1,
              letterSpacing: -2,
              fontFamily: "serif",
            }}
          >
            Hi, I&apos;m&nbsp;
            <span style={{ color: "#00D9FF", fontStyle: "italic" }}>
              Mushfiq.
            </span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#A1A1AA",
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            I build CMS-driven platforms, scraping pipelines, and AI-integrated
            tooling.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 18,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6B6B72",
            fontFamily: "monospace",
          }}
        >
          <span>Next.js · React · Node · AI</span>
          <span>mushfiq.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
