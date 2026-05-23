"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import { SketchStar } from "./Marginalia";

type Card = {
  kind: "PROJECT" | "IN PROGRESS" | "STARTUP" | "PAPER";
  title: string;
  blurb: string;
  detail: string; // one specific number / fact, replaces tag stack
  meta: string;
  rotate?: number; // page tilt in degrees
  href?: string;
};

const CARDS: Card[] = [
  {
    kind: "PROJECT",
    title: "InsightPulse",
    blurb:
      "A cross-asset financial intelligence platform. Take in unstructured text from earnings calls, filings, analyst commentary; spit out ranked, time-stamped trading signals through a small API.",
    detail: "NLP signal extraction across equities, FX, and commodities.",
    meta: "WAT.ai · 2026 → now",
    rotate: -1.2,
  },
  {
    kind: "IN PROGRESS",
    title: "AI Investment Research Agent",
    blurb:
      "An autonomous LLM agent that writes institutional-style investment memos: pulls fundamentals, screens news, builds a thesis, drafts the long form — with citations — in under a minute.",
    detail: "First draft of a memo in <60s. Python, LLMs, RAG, tool use.",
    meta: "Side project · 2026",
    rotate: 0.8,
  },
  {
    kind: "STARTUP",
    title: "Click A Diet",
    blurb:
      "Co-founded a nutrition platform that runs on two sides at once: AI-generated personalised diet plans, and one-on-one consults with expert dieticians. Both the algorithmic and the human path under one roof.",
    detail: "Two sides: AI diet plans + expert dietician consults.",
    meta: "Co-founder · 2025 → now",
    rotate: -0.6,
    href: "https://clickadiet.com",
  },
  {
    kind: "PAPER",
    title: "Effects of Digital Gaming on the Mental and Physical Health of Teenagers",
    blurb:
      "Co-authored peer-reviewed research on the mental and physical health effects of digital gaming on teenagers. Published in the International Journal of Advanced Research (IJAR), 2024, with Dr. Vinay Goel, Chairman of Neurology at Medanta.",
    detail: "Survey design, statistical analysis, academic writing.",
    meta: "IJAR · 2024",
    rotate: 1.4,
    href: "https://www.journalijar.com/article/46222/effects-of-digital-gaming-on-the-mental-and-physical-health-of-teenagers/",
  },
];

export default function WorkV2() {
  return (
    <Section
      id="work"
      chapter="03"
      title="Things I'm building."
    >
      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {CARDS.map((c, i) => (
          <motion.article
            key={c.title}
            initial={{ opacity: 0, y: 18, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: c.rotate || 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
              delay: (i % 2) * 0.08,
            }}
            whileHover={{ y: -4, rotate: 0, transition: { duration: 0.35 } }}
            className="group relative rounded-sm border border-[#1a1814]/15 bg-[#f8f1de] p-6 shadow-[2px_3px_0_rgba(26,24,20,0.06)] sm:p-7"
            style={{ transformOrigin: "center" }}
          >
            {/* Tape / corner mark */}
            <div className="absolute -top-2 right-6 h-5 w-12 rotate-3 bg-[#e9dcae]/70 backdrop-blur-[1px]" />

            {/* Stamp */}
            <div className="mb-5 flex items-center justify-between">
              <span
                className={`v2-mono inline-flex items-center rounded-sm border px-2 py-0.5 text-[9.5px] uppercase tracking-[0.22em] ${
                  c.kind === "PAPER"
                    ? "border-[#b8392a]/40 bg-[#b8392a]/10 text-[#b8392a]"
                    : "border-[#1a1814]/25 text-[#1a1814]/75"
                }`}
              >
                {c.kind}
              </span>
              <span className="v2-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1814]/40">
                {String(i + 1).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
              </span>
            </div>

            <h3 className="v2-serif text-[clamp(1.6rem,2.4vw,2rem)] leading-tight tracking-[-0.02em] text-[#1a1814]">
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-2 border-b border-[#1a1814]/15 transition-colors hover:border-[#b8392a] hover:text-[#b8392a]"
                >
                  {c.title}
                  <span className="text-[14px] text-[#1a1814]/40">↗</span>
                </a>
              ) : (
                c.title
              )}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-[#1a1814]/80">
              {c.blurb}
            </p>

            <div className="mt-5 border-t border-dashed border-[#1a1814]/20 pt-3 v2-mono text-[11px] text-[#1a1814]/65">
              {c.detail}
            </div>

            <div className="mt-3 flex items-baseline justify-between v2-mono text-[10px] uppercase tracking-[0.22em] text-[#1a1814]/45">
              <span>{c.meta}</span>
              {c.kind === "PAPER" && (
                <span className="inline-flex items-center gap-1.5">
                  <SketchStar className="h-3 w-3 text-[#b8392a]" />
                  published
                </span>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
