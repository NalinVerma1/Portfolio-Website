/* Hand-drawn flourishes: sketched underline, circle, arrow.
   All use rough wavy paths to look ink-drawn, not vector-perfect. */

type Props = {
  className?: string;
  color?: string;
};

export function SketchUnderline({
  className = "",
  color = "#b8392a",
}: Props) {
  return (
    <svg
      viewBox="0 0 220 14"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 8 C 22 4, 44 11, 70 7 S 120 4, 145 8 S 195 11, 218 6"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        className="v2-draw"
      />
    </svg>
  );
}

export function SketchUnderlineDouble({
  className = "",
  color = "#1a1814",
}: Props) {
  return (
    <svg
      viewBox="0 0 220 18"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 6 C 30 3, 70 9, 110 5 S 190 9, 218 4"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M4 13 C 40 10, 80 16, 130 12 S 200 14, 216 11"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function SketchCircle({
  className = "",
  color = "#b8392a",
}: Props) {
  return (
    <svg
      viewBox="0 0 120 60"
      preserveAspectRatio="none"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 60 4 C 30 6, 8 18, 6 32 C 4 48, 30 56, 60 56 C 92 55, 116 46, 114 30 C 113 14, 90 6, 62 4 Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="v2-draw"
      />
    </svg>
  );
}

export function SketchArrow({
  className = "",
  color = "#1a1814",
}: Props) {
  return (
    <svg
      viewBox="0 0 110 60"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 6 12 C 25 8, 50 14, 68 28 C 78 36, 84 42, 92 48"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        className="v2-draw"
      />
      <path
        d="M 92 48 L 82 38 M 92 48 L 84 52"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SketchStar({
  className = "",
  color = "#b8392a",
}: Props) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M15 3 L17.5 12 L27 13 L19 19 L22 28 L15 23 L8 28 L11 19 L3 13 L12.5 12 Z"
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PaperEdge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 8"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 4 C 100 2, 200 6, 300 3 C 400 1, 500 5, 600 4 C 700 3, 800 6, 900 4 C 1000 2, 1100 5, 1200 4"
        stroke="#1a1814"
        strokeWidth="1"
        fill="none"
        opacity="0.18"
      />
    </svg>
  );
}
