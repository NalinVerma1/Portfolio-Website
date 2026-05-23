"use client";

import { motion } from "framer-motion";
import DinoSprite from "./DinoSprite";
import { SketchUnderline, SketchArrow } from "./Marginalia";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroV2() {
  return (
    <header className="relative">
      {/* Top masthead bar */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between border-b border-[#1a1814]/15 px-6 pt-6 pb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/55 sm:px-10">
        <div className="flex items-center gap-3">
          <span>Nalin Verma</span>
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span>Waterloo, Canada</span>
        </div>
        <a
          href="#contact"
          className="rounded-full border border-[#1a1814]/20 px-3 py-1 text-[10px] tracking-[0.22em] transition-colors hover:border-[#1a1814]/60 hover:bg-[#1a1814]/[0.04]"
        >
          Write to me ↗
        </a>
      </div>

      {/* Hero body */}
      <section
        id="top"
        className="relative mx-auto w-full max-w-6xl px-6 pt-20 pb-24 sm:px-10 md:pt-28 md:pb-32"
      >
        {/* Issue date stamp */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-10 inline-flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-[#1a1814]/55"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#b8392a]" />
          <span>Open for Winter 2027 internships</span>
        </motion.div>

        {/* Big serif name with sketched underline */}
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.18 }}
            className="v2-serif text-[clamp(2.85rem,12vw,9.5rem)] leading-[0.95] tracking-[-0.04em] text-[#1a1814]"
          >
            Nalin Verma<span className="text-[#b8392a]">.</span>
          </motion.h1>

          {/* Sketched underline beneath "Nalin" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="pointer-events-none absolute left-0 -bottom-3 h-3 w-[45%] max-w-[420px]"
          >
            <SketchUnderline className="h-full w-full" />
          </motion.div>
        </div>

        {/* Subhead — two-column editorial layout */}
        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
            className="md:col-span-7"
          >
            <p className="v2-serif-italic text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.25] tracking-[-0.01em] text-[#1a1814]">
              A working journal on{" "}
              <span className="relative inline-block">
                applied AI
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#1a1814]/85" />
              </span>{" "}
              and the{" "}
              <span className="relative inline-block">
                quiet edges of the market
                <span className="absolute -bottom-1 left-0 h-[3px] w-full bg-[#1a1814]/85" />
              </span>
              — kept by a Management Engineering student at Waterloo, with a
              dinosaur for company.
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="md:col-span-5 md:col-start-9"
          >
            <div className="rounded-sm border border-[#1a1814]/15 bg-[#ede4cb]/60 p-5">
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#1a1814]/55">
                Contents
              </div>
              <ol className="space-y-2 text-[15px] leading-relaxed text-[#1a1814]">
                {[
                  { n: "01", t: "About", href: "#about" },
                  { n: "02", t: "Work history", href: "#experience" },
                  { n: "03", t: "Things I'm building", href: "#work" },
                  { n: "04", t: "What the money is doing", href: "#markets" },
                  { n: "05", t: "Write to me", href: "#contact" },
                ].map((row) => (
                  <li
                    key={row.n}
                    className="flex items-baseline gap-3 border-b border-dashed border-[#1a1814]/15 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="v2-mono text-[11px] text-[#1a1814]/45">
                      {row.n}
                    </span>
                    <a
                      href={row.href}
                      className="transition-colors hover:text-[#b8392a]"
                    >
                      {row.t}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </motion.aside>
        </div>

        {/* CTA links, like a byline footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.85 }}
          className="mt-16 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-[#1a1814]/15 pt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#1a1814]/65"
        >
          <a
            href="https://github.com/NalinVerma11"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-[#b8392a]"
          >
            <span className="border-b border-[#1a1814]/30 group-hover:border-[#b8392a]">
              GitHub
            </span>
            <span>↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/nalinv11/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-[#b8392a]"
          >
            <span className="border-b border-[#1a1814]/30 group-hover:border-[#b8392a]">
              LinkedIn
            </span>
            <span>↗</span>
          </a>
          <a
            href="mailto:nalin.verma@uwaterloo.ca"
            className="group inline-flex items-baseline gap-1.5 transition-colors hover:text-[#b8392a]"
          >
            <span className="border-b border-[#1a1814]/30 group-hover:border-[#b8392a]">
              Email
            </span>
            <span>↗</span>
          </a>
        </motion.div>

        {/* Dino in the corner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 1.1, ease }}
          className="pointer-events-none absolute right-8 top-24 hidden md:block"
        >
          <div className="v2-bob">
            <DinoSprite size={72} />
          </div>
        </motion.div>
      </section>
    </header>
  );
}
