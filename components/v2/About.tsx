"use client";

import Section from "./Section";
import { SketchCircle, SketchStar } from "./Marginalia";

export default function AboutV2() {
  return (
    <Section id="about" chapter="01" title="About.">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Drop-cap intro */}
        <div className="md:col-span-7">
          <div className="space-y-6 text-[17px] leading-[1.85] text-[#1a1814]/85">
            <p className="first-letter:v2-serif first-letter:float-left first-letter:mr-2 first-letter:text-[64px] first-letter:leading-[0.85] first-letter:text-[#1a1814]">
              I&rsquo;m a Management Engineering student at the University of
              Waterloo. By day I consult on data &amp; AI problems for banks at{" "}
              <span className="v2-serif-italic">Tiger Analytics</span>. On the
              side I&rsquo;m an ML researcher at WAT.ai on{" "}
              <span className="v2-serif-italic">InsightPulse</span> &mdash; a
              cross-asset intelligence platform turning unstructured market
              text into trading signals.
            </p>
            <p>
              My interest sits at a particular intersection: applied AI,
              capital markets, and the discipline of putting{" "}
              <span className="relative inline-block">
                <span className="relative z-10">real money</span>
                <span className="absolute inset-x-0 bottom-0 -z-0 h-2 bg-[#b8392a]/20" />
              </span>{" "}
              into live markets. I want to do this work full-time at firms
              that take both halves seriously.
            </p>
          </div>
        </div>

        {/* Side card — the basics, journal-style */}
        <aside className="relative md:col-span-4 md:col-start-9">
          <div className="absolute -top-6 -right-4 hidden md:block">
            <SketchStar className="h-7 w-7" />
          </div>
          <div className="rounded-sm border border-[#1a1814]/15 bg-[#ede4cb]/50 p-6">
            <div className="mb-5 v2-hand text-[22px] leading-none text-[#1a1814]/80">
              the basics —
            </div>
            <dl className="space-y-3.5 text-[14px]">
              {(
                [
                  { k: "Major", v: "Management Engineering" },
                  {
                    k: "Also",
                    v: "London School of Economics",
                    sub: "AI for Business",
                  },
                  { k: "Grad", v: "2030, co-op" },
                  { k: "Now", v: "Tiger Analytics · Santa Clara" },
                  { k: "Research", v: "WAT.ai · InsightPulse" },
                  { k: "Startup", v: "Click A Diet" },
                  { k: "Home", v: "Waterloo" },
                  { k: "Asking", v: "Winter 2027 internship" },
                ] as { k: string; v: string; sub?: string }[]
              ).map(({ k, v, sub }) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#1a1814]/15 pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/50">
                    {k}
                  </dt>
                  <dd className="text-right text-[#1a1814]/85">
                    <div>{v}</div>
                    {sub && (
                      <div className="v2-serif-italic text-[12px] text-[#1a1814]/55">
                        {sub}
                      </div>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mt-6 flex items-center gap-3 pl-2">
            <div className="relative inline-block">
              <span className="v2-hand relative z-10 px-3 py-1 text-[18px] text-[#1a1814]">
                hire me?
              </span>
              <SketchCircle className="absolute -inset-1 h-[calc(100%+8px)] w-[calc(100%+8px)]" />
            </div>
            <span className="v2-hand text-[18px] text-[#1a1814]/60">→</span>
            <a
              href="mailto:nalin.verma@uwaterloo.ca"
              className="text-[13px] tracking-tight text-[#1a1814]/70 underline decoration-[#1a1814]/25 underline-offset-4 hover:text-[#b8392a] hover:decoration-[#b8392a]"
            >
              nalin.verma@uwaterloo.ca
            </a>
          </div>
        </aside>
      </div>
    </Section>
  );
}
