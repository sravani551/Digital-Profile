import { ImageResponse } from "next/og";
import { focusAreas, personalInfo } from "@/data/resume-data";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#07090e",
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(56,189,248,0.25), transparent 45%), radial-gradient(circle at 95% 5%, rgba(139,92,246,0.2), transparent 40%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 12,
              border: "2px solid rgba(56,189,248,0.5)",
              color: "#38bdf8",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            SN
          </div>
          <span style={{ fontSize: 24, color: "#94a3b8" }}>{personalInfo.siteUrl.replace("https://", "")}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 84, fontWeight: 700, letterSpacing: "-0.03em" }}>{personalInfo.name}</span>
          <span style={{ fontSize: 40, color: "#cbd5e1", marginTop: 8 }}>{personalInfo.title}</span>
        </div>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {focusAreas.map((f) => (
            <span
              key={f}
              style={{
                fontSize: 22,
                color: "#e2e8f0",
                padding: "10px 18px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                backgroundColor: "rgba(255,255,255,0.04)",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
