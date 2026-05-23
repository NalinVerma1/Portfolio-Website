/* Small pixel cactus, used as section dividers and ground decoration. */

type Props = {
  size?: number;
  variant?: "small" | "tall";
  className?: string;
};

const SMALL: number[][] = [
  [0,1,0,0,0,1,0],
  [0,1,0,0,0,1,0],
  [0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0],
  [0,1,1,1,0,1,0],
  [0,0,0,1,0,1,0],
  [0,0,0,1,1,1,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
];

const TALL: number[][] = [
  [0,1,0,0,0,1,0],
  [0,1,0,0,0,1,0],
  [0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0],
  [0,1,1,1,0,1,0],
  [0,0,0,1,1,1,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
  [0,0,0,1,0,0,0],
];

function toRects(grid: number[][], color: string) {
  const out: React.ReactElement[] = [];
  grid.forEach((row, y) => {
    let s = -1;
    for (let x = 0; x <= row.length; x++) {
      const v = x < row.length ? row[x] : 0;
      if (v === 1 && s === -1) s = x;
      else if (v === 0 && s !== -1) {
        out.push(
          <rect key={`${x}-${y}-${s}`} x={s} y={y} width={x - s} height={1} fill={color} />,
        );
        s = -1;
      }
    }
  });
  return out;
}

export default function Cactus({ size = 24, variant = "small", className = "" }: Props) {
  const grid = variant === "tall" ? TALL : SMALL;
  const w = grid[0].length;
  const h = grid.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={(size * h) / w}
      shapeRendering="crispEdges"
      className={`v2-dino-canvas ${className}`}
      aria-hidden="true"
    >
      {toRects(grid, "#1a1814")}
    </svg>
  );
}
