import { ImageResponse } from "next/og";

export const alt = "Nalin Verma — Notebook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f4ecd8",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          position: "relative",
          fontFamily: "Georgia, serif",
          color: "#1a1814",
        }}
      >
        {/* Top masthead bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: 16,
            borderBottom: "1px solid rgba(26,24,20,0.25)",
            fontFamily: "ui-monospace, monospace",
            fontSize: 14,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(26,24,20,0.6)",
          }}
        >
          <div>Nalin Verma</div>
          <div>Waterloo · May 2026</div>
        </div>

        {/* Issue line */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: "ui-monospace, monospace",
            fontSize: 16,
            letterSpacing: 3.5,
            textTransform: "uppercase",
            color: "rgba(26,24,20,0.55)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              background: "#b8392a",
              borderRadius: 999,
            }}
          />
          Open for Winter 2027 internships
        </div>

        {/* Big serif name */}
        <div
          style={{
            marginTop: 22,
            fontSize: 168,
            fontWeight: 400,
            letterSpacing: -7,
            lineHeight: 0.95,
            display: "flex",
          }}
        >
          Nalin Verma<span style={{ color: "#b8392a" }}>.</span>
        </div>

        {/* Subhead */}
        <div
          style={{
            marginTop: 28,
            fontSize: 36,
            fontStyle: "italic",
            color: "rgba(26,24,20,0.7)",
            lineHeight: 1.25,
            letterSpacing: -0.5,
            maxWidth: 980,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>A working journal on applied AI and the quiet</div>
          <div>edges of the market.</div>
        </div>

        {/* Bottom byline */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, monospace",
            fontSize: 15,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(26,24,20,0.5)",
            paddingTop: 16,
            borderTop: "1px solid rgba(26,24,20,0.25)",
          }}
        >
          <div>Waterloo · 2026</div>
          <div style={{ color: "#b8392a" }}>nalinverma.com</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
