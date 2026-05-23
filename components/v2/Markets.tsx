"use client";

import Section from "./Section";
import { motion } from "framer-motion";
import Counter from "./Counter";
import { SketchArrow, SketchUnderlineDouble } from "./Marginalia";

const SECTORS = [
  { name: "Broad market", role: "Core" },
  { name: "Gold", role: "Hedge" },
  { name: "Silver", role: "Hedge" },
  { name: "Nasdaq 100", role: "US tech tilt" },
  { name: "Defence", role: "Thematic" },
];

const THESES = [
  {
    title: "Why ETFs, mostly.",
    body:
      "At my size, any edge from individual stock picking gets eaten by execution friction and the urge to fiddle. ETFs let me express a thematic view with single-digit expense ratios, no idiosyncratic blow-up risk, and a clean process I can actually stick to.",
  },
  {
    title: "Why I'm holding defence.",
    body:
      "Defence is in a structural reshoring cycle globally — multi-decade capex commitments, indigenization mandates across major economies, a long order book. Policy-backed rather than cyclical; the thesis plays out across European primes, US defence, or any clean expression of the trade.",
  },
];

export default function MarketsV2() {
  return (
    <Section
      id="markets"
      chapter="04"
      title="What the money is doing."
      subtitle="A small personal portfolio I've kept since June 2025. Real money, modest sums, tracked carefully."
    >

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Headline number */}
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative inline-flex items-start"
          >
            <span className="v2-mono mt-4 mr-2 text-[28px] text-[#1a1814]/55">
              +
            </span>
            <span className="v2-serif text-[clamp(5rem,17vw,12rem)] leading-[0.85] tracking-[-0.04em] text-[#1a1814]">
              <Counter to={19} />
            </span>
            <span className="v2-serif mt-4 ml-1 text-[clamp(2rem,5vw,3.5rem)] text-[#1a1814]/65">
              %
            </span>

            {/* hand-drawn arrow + label */}
            <div className="pointer-events-none absolute -right-44 top-10 hidden xl:block">
              <SketchArrow className="h-12 w-32 rotate-180 text-[#1a1814]" />
              <span className="v2-hand absolute -right-2 -top-6 whitespace-nowrap text-[20px] text-[#b8392a]">
                inception to date
              </span>
            </div>
          </motion.div>

          <div className="mt-2 v2-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1814]/55">
            PAST 1 YEAR · NIFTY 50 +0.2%
          </div>

          {/* Hand-drawn equity curve sketch */}
          <div className="mt-10 max-w-xl">
            <svg
              viewBox="0 0 400 130"
              className="w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="paperGrid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#1a1814"
                    strokeWidth="0.5"
                    opacity="0.10"
                  />
                </pattern>
              </defs>
              <rect width="400" height="130" fill="url(#paperGrid)" />

              {/* Baseline */}
              <line
                x1="0"
                x2="400"
                y1="105"
                y2="105"
                stroke="#1a1814"
                strokeWidth="0.8"
                opacity="0.25"
              />

              {/* Curve, hand-drawn feel */}
              <motion.path
                d="M 4 100 C 32 96, 60 88, 88 84 C 116 80, 140 92, 168 80 C 196 70, 220 60, 248 52 C 276 44, 300 50, 328 38 C 356 28, 380 22, 396 18"
                stroke="#1a1814"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 2.4, ease: "easeOut" }}
              />

              {/* Annotation */}
              <circle cx="396" cy="18" r="4" fill="#b8392a" />
              <text
                x="370"
                y="14"
                fontFamily="var(--font-caveat), cursive"
                fontSize="16"
                fill="#b8392a"
                textAnchor="end"
              >
                here →
              </text>

              <text
                x="6"
                y="120"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="9"
                fill="#1a1814"
                opacity="0.5"
                letterSpacing="1.2"
              >
                JUN &apos;25
              </text>
              <text
                x="394"
                y="120"
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="9"
                fill="#1a1814"
                opacity="0.5"
                letterSpacing="1.2"
                textAnchor="end"
              >
                MAY &apos;26
              </text>
            </svg>
          </div>

          <p className="mt-10 max-w-xl text-[16px] leading-[1.8] text-[#1a1814]/85">
            The portfolio is built around{" "}
            <span className="relative inline-block">
              <span className="relative z-10">ETF-driven thematic exposure</span>
              <span className="absolute inset-x-0 bottom-0 -z-0 h-2 bg-[#b8392a]/20" />
            </span>{" "}
            — broad indexes, precious metals, US tech via Nasdaq 100, and one
            targeted sector bet on defence. Long holding period, minimal
            turnover, position sizing driven by conviction not optionality.
          </p>

          <p className="mt-4 max-w-xl v2-serif-italic text-[15px] text-[#1a1814]/60">
            It is a modest sum. The point is the process.
          </p>
        </div>

        {/* Stat card / journal entry box */}
        <aside className="md:col-span-4 md:col-start-9">
          <div className="rounded-sm border border-[#1a1814]/15 bg-[#ede4cb]/50 p-6">
            <div className="mb-4 v2-hand text-[22px] leading-none text-[#1a1814]/80">
              the rules —
            </div>
            <ol className="space-y-3 text-[14px] leading-relaxed text-[#1a1814]/85">
              {[
                "Process before picks.",
                "Uncorrelated bets.",
                "If it's not a 5-year hold, it's not a buy.",
                "Cash is a position.",
                "Don't fiddle.",
              ].map((r, i) => (
                <li
                  key={r}
                  className="flex items-baseline gap-3 border-b border-dashed border-[#1a1814]/15 pb-2.5 last:border-0 last:pb-0"
                >
                  <span className="v2-mono text-[10.5px] text-[#1a1814]/45">
                    0{i + 1}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>

      {/* Sectors */}
      <div className="mt-24">
        <div className="mb-6 flex items-end justify-between border-b border-[#1a1814]/15 pb-3">
          <div>
            <div className="v2-hand text-[24px] leading-none text-[#1a1814]/85">
              sectors —
            </div>
            <div className="mt-2 v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/50">
              Investing in these since Jun &rsquo;25
            </div>
          </div>
          <div className="v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/45">
            {SECTORS.length} sectors
          </div>
        </div>

        <ol className="divide-y divide-dashed divide-[#1a1814]/15">
          {SECTORS.map((s, i) => (
            <motion.li
              key={s.name}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="grid grid-cols-[28px_1fr_auto] items-baseline gap-4 py-4 sm:gap-6"
            >
              <span className="v2-mono text-[10.5px] uppercase tracking-[0.18em] text-[#1a1814]/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="v2-serif text-[clamp(1.1rem,1.6vw,1.3rem)] tracking-[-0.01em] text-[#1a1814]">
                {s.name}
              </span>
              <span className="v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/50">
                {s.role}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Theses */}
      <div className="mt-24 grid gap-10 md:grid-cols-2 md:gap-14">
        {THESES.map((t, i) => (
          <motion.div
            key={t.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h3 className="v2-serif text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight tracking-[-0.02em] text-[#1a1814]">
              {t.title}
            </h3>
            <div className="mt-2 mb-5 h-3 w-32">
              <SketchUnderlineDouble className="h-full w-full" />
            </div>
            <p className="text-[15px] leading-[1.85] text-[#1a1814]/80">
              {t.body}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer — dry */}
      <div className="mt-20 flex flex-wrap items-baseline justify-between gap-3 border-t border-dashed border-[#1a1814]/20 pt-5 v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/45">
        <div className="v2-serif-italic normal-case tracking-normal text-[#1a1814]/55">
          Five sectors, ETF-driven. Not investment advice.
        </div>
        <div>As of May 22, 2026</div>
      </div>
    </Section>
  );
}
