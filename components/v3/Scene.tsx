"use client";

/* Canvas shell for the artifact, which sits behind the whole page.

   The morph is mapped across the FULL document, so the field evolves as you
   read: scatter in the hero, then cloud, surface, ribbon, and finally the
   text state as you reach the contact section.

   It never fades out entirely — it settles to a low opacity once you are
   past the hero so body copy stays readable on top of it. */

import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PointMorph from "./PointMorph";

function PointerCamera() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.02, dt);
    camera.position.x += (pointer.x * 4.5 - camera.position.x) * k;
    camera.position.y += (6 + pointer.y * -2.5 - camera.position.y) * k;
    camera.lookAt(target.current);
  });
  return null;
}

export default function Scene({ className = "" }: { className?: string }) {
  const [morph, setMorph] = useState(0);
  const [fade, setFade] = useState(1);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = Math.max(1, window.innerHeight);
        const y = window.scrollY;
        const max = Math.max(1, document.documentElement.scrollHeight - vh);

        // the five states spread across the entire page
        setMorph(Math.min(1, Math.max(0, y / max)));

        // full strength over the hero, then settle back behind the copy
        const dim = Math.min(1, Math.max(0, (y - vh * 0.55) / (vh * 0.6)));
        setFade(1 - dim * 0.62);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={className}
      style={{ opacity: fade, transition: "opacity 120ms linear" }}
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 6, 30], fov: 40 }}
        style={{ background: "transparent" }}
      >
        {!reduce && <PointerCamera />}
        <PointMorph morph={reduce ? 0.34 : morph} />
      </Canvas>
      {/* scrim rides with the canvas so it fades out too */}
      <div className="v3-scrim pointer-events-none absolute inset-0" />
    </div>
  );
}
