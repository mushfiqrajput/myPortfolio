import { ImageResponse } from "next/og";
import { professionalWork } from "../../data/projects";

export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata() {
  return professionalWork.map((p) => ({
    id: p.slug,
    alt: `${p.title} — Case study`,
    size,
    contentType,
  }));
}

export default async function Image({ params }) {
  const project = professionalWork.find((p) => p.slug === params.slug);
  if (!project) return new Response("Not found", { status: 404 });

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
            "radial-gradient(circle at 80% 20%, rgba(0,217,255,0.35) 0%, transparent 50%), #0A0A0B",
          color: "#FAFAFA",
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
          Case study · {project.year} · Production · Private
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -1,
              fontFamily: "serif",
              maxWidth: 1000,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#A1A1AA",
              maxWidth: 1000,
              lineHeight: 1.4,
            }}
          >
            {project.description}
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
          <span>{project.tech.join(" · ")}</span>
          <span>mushfiq.dev</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
