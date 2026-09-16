"use client";

/* A GPU point cloud that walks through four states as you scroll —
   the actual shape of the work, in order:

     0  scatter   raw, unstructured text: no order at all
     1  cloud     embeddings: the model finds clusters
     2  surface   a price / volatility surface: structure appears
     3  ribbon    the signal: one path through the surface

   Points don't slide between states, they *flow*: a curl-ish noise field
   displaces them hardest at the midpoint of each transition and vanishes
   as a state resolves, so the change reads as turbulence settling rather
   than linear interpolation. Depth-of-field (out-of-focus points grow and
   dim) keeps 14k points from looking like flat confetti. */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const GRID = 118;
const COUNT = GRID * GRID; // 13,924
const SPAN = 26;
const CLUSTERS = 7;

/* Each state is placed independently so all four stay in frame and clear
   of the hero copy on the left. */
const OFF_SCATTER = [9.5, -2.0, -3] as const;
const OFF_CLOUD = [6.0, 1.0, -1] as const;
const OFF_SURFACE = [7.5, -10.5, -2] as const;
const OFF_RIBBON = [6.5, -2.0, -1] as const;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function gauss(r: () => number) {
  const u1 = Math.max(1e-6, r());
  const u2 = r();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

/* 0 — raw text: uniform noise, deliberately shapeless */
function buildScatter(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  const r = rng(13317);
  for (let p = 0; p < COUNT; p++) {
    const k = p * 3;
    a[k] = (r() - 0.5) * 21 + OFF_SCATTER[0];
    a[k + 1] = (r() - 0.5) * 16 + OFF_SCATTER[1];
    a[k + 2] = (r() - 0.5) * 22 + OFF_SCATTER[2];
  }
  return a;
}

/* 1 — embedding space: gaussian clusters, like a t-SNE projection */
function buildCloud(): { pos: Float32Array; cluster: Float32Array } {
  const pos = new Float32Array(COUNT * 3);
  const cluster = new Float32Array(COUNT);
  const r = rng(20260915);
  const centres = Array.from({ length: CLUSTERS }, () => [
    (r() - 0.5) * 15,
    (r() - 0.5) * 9,
    (r() - 0.5) * 15,
  ]);
  for (let p = 0; p < COUNT; p++) {
    const ci = p % CLUSTERS;
    const c = centres[ci];
    const spread = 1.4 + r() * 1.4;
    const k = p * 3;
    pos[k] = c[0] + gauss(r) * spread + OFF_CLOUD[0];
    pos[k + 1] = c[1] + gauss(r) * spread * 0.7 + OFF_CLOUD[1];
    pos[k + 2] = c[2] + gauss(r) * spread + OFF_CLOUD[2];
    cluster[p] = ci / (CLUSTERS - 1);
  }
  return { pos, cluster };
}

/* 2 — the surface: layered waves, reads as a vol / price terrain */
function buildSurface(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  for (let i = 0; i < GRID; i++) {
    for (let j = 0; j < GRID; j++) {
      const k = (i * GRID + j) * 3;
      const u = i / (GRID - 1) - 0.5;
      const v = j / (GRID - 1) - 0.5;
      const h =
        Math.sin(u * 7.0) * Math.cos(v * 5.0) * 1.5 +
        Math.sin((u + v) * 11.0) * 0.55 +
        Math.sin(u * 19.0) * Math.sin(v * 17.0) * 0.28 +
        Math.exp(-(u * u + v * v) * 6.0) * 2.4;
      a[k] = u * SPAN + OFF_SURFACE[0];
      a[k + 1] = h + OFF_SURFACE[1];
      a[k + 2] = v * SPAN + OFF_SURFACE[2];
    }
  }
  return a;
}

/* 3 — the signal: a single path, points sleeved around it with the
   spread narrowing along its length (conviction tightening) */
function buildRibbon(): Float32Array {
  const a = new Float32Array(COUNT * 3);
  const r = rng(77413);
  for (let p = 0; p < COUNT; p++) {
    const t = p / (COUNT - 1);
    // the path itself
    const cx = (t - 0.5) * 30;
    const cy =
      Math.sin(t * Math.PI * 2.4) * 3.2 +
      Math.sin(t * Math.PI * 7.1) * 0.8 +
      t * 2.2;
    const cz = Math.cos(t * Math.PI * 1.7) * 3.0;
    // sleeve, tightening toward the end
    const tight = 1.5 * (1.0 - t * 0.75);
    const k = p * 3;
    a[k] = cx + gauss(r) * tight * 0.35 + OFF_RIBBON[0];
    a[k + 1] = cy + gauss(r) * tight + OFF_RIBBON[1];
    a[k + 2] = cz + gauss(r) * tight + OFF_RIBBON[2];
  }
  return a;
}

const VERT = /* glsl */ `
  attribute vec3 aCloud;
  attribute vec3 aSurface;
  attribute vec3 aRibbon;
  attribute float aRand;
  attribute float aCluster;

  uniform float uT;      // 0..4, which state we are in / between
  uniform float uTime;
  uniform float uSize;
  uniform vec3 uMouse;   // cursor, world space
  uniform float uMouseOn;

  varying float vState;
  varying float vHeight;
  varying float vActive;
  varying float vCluster;
  varying float vCoc;

  // --- Ashima simplex noise (3D) -----------------------------------
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
               i.z + vec4(0.0, i1.z, i2.z, 1.0))
             + i.y + vec4(0.0, i1.y, i2.y, 1.0))
             + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  vec3 flow(vec3 p) {
    return vec3(
      snoise(p),
      snoise(p + vec3(17.3, 9.1, 41.7)),
      snoise(p + vec3(43.7, 71.2, 5.4))
    );
  }
  // -----------------------------------------------------------------

  // tent weight: 1 at its own index, falling to 0 at the neighbours
  float w(float t, float i) { return max(0.0, 1.0 - abs(t - i)); }

  void main() {
    // stagger each point so a transition sweeps across the field
    float t = clamp(uT + (aRand - 0.5) * 0.55, 0.0, 3.0);

    float w0 = w(t, 0.0);
    float w1 = w(t, 1.0);
    float w2 = w(t, 2.0);
    float w3 = w(t, 3.0);

    vec3 p = position * w0 + aCloud * w1 + aSurface * w2 + aRibbon * w3;

    // how mid-transition this point is: 0 at a resolved state, 1 halfway
    float peak = max(max(w0, w1), max(w2, w3));
    float turb = clamp((1.0 - peak) * 2.0, 0.0, 1.0);

    // turbulence, strongest mid-transition, plus a little always-on drift
    vec3 f = flow(p * 0.075 + vec3(0.0, 0.0, uTime * 0.12));
    p += f * (turb * 3.4 + 0.18);

    // a slow breath so a resolved state is never completely static
    p.y += sin(uTime * 0.28 + aRand * 6.2831) * 0.14;

    // the cursor pushes points aside as it passes
    vec3 away = p - uMouse;
    float md = length(away);
    p += normalize(away + vec3(1e-4)) * uMouseOn
       * (1.0 - smoothstep(0.0, 9.0, md)) * 3.4;

    vState = t / 3.0;
    vHeight = p.y;
    vActive = turb;
    vCluster = aCluster;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float dist = -mv.z;

    // depth of field: out-of-focus points grow and dim
    float coc = clamp(abs(dist - 30.0) / 26.0, 0.0, 1.0);
    vCoc = coc;

    gl_PointSize = uSize * (0.45 + aRand * 0.8) * (30.0 / dist) * (1.0 + coc * 1.7);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision highp float;

  uniform vec3 uScatter;  // state 0
  uniform vec3 uCloud;    // state 1
  uniform vec3 uSurface;  // state 2
  uniform vec3 uRibbon;   // state 3
  uniform vec3 uHot;

  varying float vState;
  varying float vHeight;
  varying float vActive;
  varying float vCluster;
  varying float vCoc;

  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r2 = dot(d, d);
    if (r2 > 0.25) discard;
    float alpha = (1.0 - smoothstep(0.015, 0.25, r2));

    // travel the palette across the four states
    float s = vState * 3.0;
    vec3 col = uScatter;
    col = mix(col, uCloud,   smoothstep(0.0, 1.0, s));
    col = mix(col, uSurface, smoothstep(1.0, 2.0, s));
    col = mix(col, uRibbon,  smoothstep(2.0, 3.0, s));

    // cluster identity shows only while the embedding state is resolved
    float clusterMix = (1.0 - vActive) * (1.0 - smoothstep(0.6, 1.6, s)) * smoothstep(0.4, 1.0, s);
    col = mix(col, mix(uCloud, uHot, vCluster), clusterMix * 0.55);

    // crests of the surface catch the highlight
    float crest = smoothstep(-9.0, -6.0, vHeight) * smoothstep(1.4, 2.0, s) * (1.0 - smoothstep(2.0, 2.8, s));
    col = mix(col, uHot, crest * 0.6);

    // turbulence burns a little hotter
    col = mix(col, uHot, vActive * 0.28);

    // out-of-focus points dim as they spread
    alpha *= mix(0.95, 0.22, vCoc);

    gl_FragColor = vec4(col, alpha);
  }
`;

export default function PointMorph({ morph = 0 }: { morph?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const pts = useRef<THREE.Points>(null);
  const shown = useRef(0);

  const { scatter, cloud, surface, ribbon, rand, cluster } = useMemo(() => {
    const r = rng(99177);
    const rnd = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) rnd[i] = r();
    const c = buildCloud();
    return {
      scatter: buildScatter(),
      cloud: c.pos,
      surface: buildSurface(),
      ribbon: buildRibbon(),
      rand: rnd,
      cluster: c.cluster,
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uT: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: 9.5 },
      uMouse: { value: new THREE.Vector3(1e4, 1e4, 0) },
      uMouseOn: { value: 0 },
      uScatter: { value: new THREE.Color("#8d867c") },
      uCloud: { value: new THREE.Color("#74b8ff") },
      uSurface: { value: new THREE.Color("#ff7448") },
      uRibbon: { value: new THREE.Color("#ffc46b") },
      uHot: { value: new THREE.Color("#fff0c9") },
    }),
    [],
  );

  const mouseWorld = useRef(new THREE.Vector3(1e4, 1e4, 0));
  const mouseAmt = useRef(0);

  useFrame(({ clock, pointer, viewport }, dt) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;

    const target = morph * 3; // incoming 0..1 -> 0..3 states
    const k = 1 - Math.pow(0.006, Math.min(dt, 0.05));
    shown.current += (target - shown.current) * k;
    u.uT.value = shown.current;
    u.uTime.value = clock.getElapsedTime();

    // pointer -> world space on the z=0 plane, eased so it trails the cursor
    const mk = 1 - Math.pow(0.0008, Math.min(dt, 0.05));
    const live = Math.abs(pointer.x) > 1e-4 || Math.abs(pointer.y) > 1e-4;
    if (live) {
      mouseWorld.current.x +=
        ((pointer.x * viewport.width) / 2 - mouseWorld.current.x) * mk;
      mouseWorld.current.y +=
        ((pointer.y * viewport.height) / 2 - mouseWorld.current.y) * mk;
    }
    mouseAmt.current += ((live ? 1 : 0) - mouseAmt.current) * mk;
    u.uMouse.value.copy(mouseWorld.current);
    u.uMouseOn.value = mouseAmt.current;

    if (pts.current) pts.current.rotation.y = clock.getElapsedTime() * 0.035;
  });

  return (
    <points ref={pts} rotation={[0.16, 0, -0.05]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scatter, 3]} />
        <bufferAttribute attach="attributes-aCloud" args={[cloud, 3]} />
        <bufferAttribute attach="attributes-aSurface" args={[surface, 3]} />
        <bufferAttribute attach="attributes-aRibbon" args={[ribbon, 3]} />
        <bufferAttribute attach="attributes-aRand" args={[rand, 1]} />
        <bufferAttribute attach="attributes-aCluster" args={[cluster, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={VERT}
        fragmentShader={FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
