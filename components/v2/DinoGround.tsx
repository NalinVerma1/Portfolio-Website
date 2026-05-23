"use client";

import { useEffect, useRef } from "react";
import DinoSprite from "./DinoSprite";
import Cactus from "./Cactus";

/* The dinosaur runs in place; cacti scroll past on the ground.
   When a cactus approaches, the dino auto-jumps to clear it.
   All motion is driven by direct ref-based transforms (no React state per frame). */

const N_CACTI = 6;
const GROUND_HEIGHT = 150; // px, container height — must fit dino + full jump arc
const DINO_LEFT = 56; // px from left edge to dino's left
const DINO_SIZE = 56;
const DINO_HEIGHT_PX = Math.round(DINO_SIZE * (24 / 22)); // ≈ 61
const BASELINE_PAD = 6; // px above container bottom where the ground sits
const CACTUS_SMALL_W = 14;
const CACTUS_TALL_W = 22;

// Apex jump height the physics should target, with a safety margin to the ceiling
const HEADROOM = 8; // px gap between dino's top at apex and container top
const TARGET_APEX = GROUND_HEIGHT - BASELINE_PAD - DINO_HEIGHT_PX - HEADROOM; // ≈ 75

// Physics derived from TARGET_APEX so the dino never clips the top of the strip
const GRAVITY = 2400; // px/sec^2
const JUMP_V = Math.sqrt(2 * GRAVITY * TARGET_APEX); // initial upward velocity
const JUMP_V_SHORT = JUMP_V * 0.85; // shorter hop for small cacti
const GROUND_SPEED = 220; // px/sec
// At ~0.5s airtime, the cactus moves ~110 px left during the jump. For a clean
// landing the cactus's right edge must be past the dino at touchdown.
// Trigger at dx ≈ 70 → at landing dx ≈ -40, cactus right ≈ -18..-26: well clear.
const TRIGGER_DX = 70;
const LANDING_COOLDOWN_MS = 280;
const MIN_CACTI_GAP = 260;

type CactusSlot = {
  variant: "small" | "tall";
};

// Deterministic per-slot variants so server and client render identical markup
// (avoids hydration mismatch). Visually still varied as the 6 slots rotate.
const SLOT_VARIANTS: CactusSlot[] = [
  { variant: "small" },
  { variant: "tall" },
  { variant: "small" },
  { variant: "small" },
  { variant: "tall" },
  { variant: "small" },
];

export default function DinoGround() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const dinoRef = useRef<HTMLDivElement | null>(null);
  const cactusRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cactusXs = useRef<number[]>([]);
  const cactusVariants = useRef<CactusSlot[]>(SLOT_VARIANTS);

  // Dino state
  const dinoY = useRef(0); // px above ground (positive = up)
  const dinoV = useRef(0); // velocity (px/sec, + = up)
  const jumping = useRef(false);
  const lastLandedAt = useRef(0); // performance.now() at last landing

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const init = () => {
      const w = wrap.offsetWidth || 800;
      // Spread cacti to the right of the dino with varied spacing
      for (let i = 0; i < N_CACTI; i++) {
        const baseGap = w / N_CACTI;
        cactusXs.current[i] =
          w + i * baseGap * 1.1 + (i % 2 === 0 ? 40 : -25);
      }
    };
    init();

    if (reduce) {
      // Static pose: place cacti once, no animation
      for (let i = 0; i < N_CACTI; i++) {
        const el = cactusRefs.current[i];
        if (el) el.style.transform = `translateX(${cactusXs.current[i]}px)`;
      }
      return;
    }

    let raf = 0;
    let last = performance.now();
    let mounted = true;

    const tick = (now: number) => {
      if (!mounted) return;
      const dt = Math.min((now - last) / 1000, 0.05); // clamp big gaps when tab hidden
      last = now;

      const w = wrap.offsetWidth || 800;

      // Move cacti left
      let nearestAhead = Infinity;
      let nearestVariant: "small" | "tall" = "small";
      for (let i = 0; i < N_CACTI; i++) {
        cactusXs.current[i] -= GROUND_SPEED * dt;
        if (cactusXs.current[i] < -40) {
          // wrap to right with a generous, varied gap so the dino has time to land
          const maxX = Math.max(...cactusXs.current);
          cactusXs.current[i] = maxX + MIN_CACTI_GAP + Math.random() * 220;
          // Variants are fixed per slot to keep SSR/hydration in sync
        }
        const dx = cactusXs.current[i] - DINO_LEFT;
        if (dx > 0 && dx < nearestAhead) {
          nearestAhead = dx;
          nearestVariant = cactusVariants.current[i].variant;
        }

        const el = cactusRefs.current[i];
        if (el) {
          el.style.transform = `translateX(${cactusXs.current[i]}px)`;
        }
      }

      // Trigger jump if a cactus is close ahead, we're on the ground,
      // and the post-landing cooldown has elapsed (prevents double-jumps)
      if (
        !jumping.current &&
        now - lastLandedAt.current > LANDING_COOLDOWN_MS &&
        nearestAhead < TRIGGER_DX &&
        nearestAhead > 0
      ) {
        jumping.current = true;
        dinoV.current = nearestVariant === "tall" ? JUMP_V : JUMP_V_SHORT;
      }

      // Integrate dino physics
      if (jumping.current) {
        dinoV.current -= GRAVITY * dt;
        dinoY.current += dinoV.current * dt;
        if (dinoY.current <= 0) {
          dinoY.current = 0;
          dinoV.current = 0;
          jumping.current = false;
          lastLandedAt.current = now;
        }
      }

      const dinoEl = dinoRef.current;
      if (dinoEl) {
        dinoEl.style.transform = `translateY(${-dinoY.current}px)`;
        // Pause leg cycle while airborne
        if (jumping.current) {
          dinoEl.dataset.air = "1";
        } else {
          dinoEl.dataset.air = "0";
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onResize = () => init();
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden"
      style={{ height: GROUND_HEIGHT }}
      aria-label="A small dinosaur running and jumping over cacti"
    >
      {/* Cacti — absolutely positioned, transforms updated per frame */}
      {Array.from({ length: N_CACTI }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            cactusRefs.current[i] = el;
          }}
          className="absolute will-change-transform"
          style={{
            bottom: BASELINE_PAD,
            left: 0,
            transform: "translateX(9999px)", // start off-screen until init
          }}
        >
          <Cactus
            size={
              cactusVariants.current[i].variant === "tall"
                ? CACTUS_TALL_W
                : CACTUS_SMALL_W
            }
            variant={cactusVariants.current[i].variant}
          />
        </div>
      ))}

      {/* Dino — anchored at DINO_LEFT, vertical transform updated per frame */}
      <div
        ref={dinoRef}
        className="absolute will-change-transform"
        style={{
          left: DINO_LEFT,
          bottom: BASELINE_PAD,
          transform: "translateY(0)",
        }}
        data-air="0"
      >
        <DinoFrame />
      </div>

      {/* Baseline */}
      <div
        className="absolute inset-x-0 h-px bg-[#1a1814]/40"
        style={{ bottom: BASELINE_PAD - 1 }}
      />
      <div
        className="absolute inset-x-0 h-px bg-[#1a1814]/15"
        style={{ bottom: BASELINE_PAD - 3 }}
      />
    </div>
  );
}

/* Wraps the sprite and freezes leg animation when the parent has data-air="1" */
function DinoFrame() {
  return (
    <div className="dino-frame">
      <DinoSprite size={DINO_SIZE} />
      <style jsx>{`
        :global([data-air="1"]) .dino-frame :global(.v2-dino-leg-a),
        :global([data-air="1"]) .dino-frame :global(.v2-dino-leg-b) {
          animation-play-state: paused !important;
        }
      `}</style>
    </div>
  );
}
