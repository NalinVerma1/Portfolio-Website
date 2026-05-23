/* Pixel-art Chrome-style T-Rex.
   22 wide × 24 tall, scale via CSS width.
   Two leg frames cross-fade for the run cycle. */

type Props = {
  size?: number; // px width
  className?: string;
  paused?: boolean;
};

// Grid: 1 = filled, 0 = empty
// Body (shared by both frames)
const BODY: number[][] = [
  // row 0
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0], // eye
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
  [1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0],
  [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0],
  // legs to come from frame arrays
];

// Frame A: left leg up, right leg down
const LEGS_A: number[][] = [
  [0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0],
];

// Frame B: left leg down, right leg up
const LEGS_B: number[][] = [
  [0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

function gridToRects(grid: number[][], yOffset = 0, color = "#1a1814") {
  const rects: { x: number; y: number; w: number; h: number }[] = [];
  // Run-length compress each row into horizontal rects
  grid.forEach((row, y) => {
    let runStart = -1;
    for (let x = 0; x <= row.length; x++) {
      const v = x < row.length ? row[x] : 0;
      if (v === 1 && runStart === -1) runStart = x;
      else if (v === 0 && runStart !== -1) {
        rects.push({ x: runStart, y: y + yOffset, w: x - runStart, h: 1 });
        runStart = -1;
      }
    }
  });
  return rects.map((r, i) => (
    <rect key={`${color}-${i}`} x={r.x} y={r.y} width={r.w} height={r.h} fill={color} />
  ));
}

export default function DinoSprite({
  size = 48,
  className = "",
  paused = false,
}: Props) {
  const W = 22;
  const H = 24;
  const bodyRects = gridToRects(BODY);
  const legsA = gridToRects(LEGS_A, BODY.length);
  const legsB = gridToRects(LEGS_B, BODY.length);

  const aClass = paused ? "" : "v2-dino-leg-a";
  const bClass = paused ? "hidden" : "v2-dino-leg-b";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={(size * H) / W}
      shapeRendering="crispEdges"
      className={`v2-dino-canvas ${className}`}
      aria-label="dinosaur"
      role="img"
    >
      {bodyRects}
      <g className={aClass}>{legsA}</g>
      <g className={bClass}>{legsB}</g>
    </svg>
  );
}
