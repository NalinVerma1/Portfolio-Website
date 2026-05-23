import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f4ecd8",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#1a1814",
          fontFamily: "Georgia, serif",
          fontWeight: 600,
          fontSize: 18,
          letterSpacing: -1,
          border: "1px solid rgba(26,24,20,0.20)",
        }}
      >
        NV
      </div>
    ),
    { ...size }
  );
}
