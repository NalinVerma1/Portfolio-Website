"use client";

import Section from "./Section";
import { motion } from "framer-motion";

type Role = {
  company: string;
  role: string;
  detail?: string;
  period: string;
  current?: boolean;
  blurb: string;
  href?: string;
};

const ROLES: Role[] = [
  {
    company: "Tiger Analytics",
    role: "Analytics Consulting Intern",
    detail: "Banking & Financial Services · Santa Clara",
    period: "May 2026 → now",
    current: true,
    blurb:
      "Building data and AI solutions for global banking clients. Working under Mohit Garg (Associate Vice President & Portfolio Head, BFS) on credit, risk, and quantitative analytics workflows.",
    href: "https://www.tigeranalytics.com",
  },
  {
    company: "WAT.ai",
    role: "ML Researcher — InsightPulse",
    period: "Jan 2026 → now",
    current: true,
    blurb:
      "ML researcher on a cross-asset financial intelligence platform. Building NLP pipelines that pull trading signals out of earnings calls, filings, and market commentary.",
    href: "https://watai.ca",
  },
  {
    company: "Click A Diet",
    role: "Co-founder",
    period: "2025 → now",
    current: true,
    blurb:
      "Nutrition platform with two sides under one roof: AI-generated personalised diet plans, and one-on-one consults with expert dieticians. Co-founded; involved across product, ML, and growth.",
    href: "https://clickadiet.com",
  },
  {
    company: "Purple MicroPort Cardiovascular",
    role: "Operations Intern",
    period: "2025",
    blurb:
      "Process and inventory analytics for a medical device manufacturer. First time using data to drive operational decisions in a regulated industry.",
    href: "https://purplemicroport.com",
  },
];

export default function ExperienceV2() {
  return (
    <Section
      id="experience"
      chapter="02"
      title="Work history."
    >
      <ol className="space-y-12">
        {ROLES.map((r, i) => (
          <motion.li
            key={r.company}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
            className="relative grid gap-3 border-b border-dashed border-[#1a1814]/20 pb-12 last:border-0 md:grid-cols-12 md:gap-8"
          >
            {/* Entry number, in the margin */}
            <div className="md:col-span-1 v2-mono text-[10.5px] uppercase tracking-[0.22em] text-[#1a1814]/45">
              №{String(ROLES.length - i).padStart(2, "0")}
            </div>

            {/* Main column */}
            <div className="md:col-span-7">
              <div className="flex items-baseline gap-3">
                <h3 className="v2-serif text-[clamp(1.7rem,3vw,2.2rem)] leading-tight tracking-[-0.02em] text-[#1a1814]">
                  {r.href ? (
                    <a
                      href={r.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border-b border-[#1a1814]/20 transition-colors hover:border-[#b8392a] hover:text-[#b8392a]"
                    >
                      {r.company}
                    </a>
                  ) : (
                    r.company
                  )}
                </h3>
                {r.current && (
                  <span className="v2-mono inline-flex items-center gap-1.5 rounded-sm border border-[#b8392a]/30 bg-[#b8392a]/10 px-1.5 py-0.5 text-[9.5px] uppercase tracking-[0.2em] text-[#b8392a]">
                    <span className="inline-block h-1 w-1 rounded-full bg-[#b8392a]" />
                    Active
                  </span>
                )}
              </div>
              <div className="mt-1 v2-serif-italic text-[15px] text-[#1a1814]/65">
                {r.role}
                {r.detail && (
                  <span className="text-[#1a1814]/45"> · {r.detail}</span>
                )}
              </div>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#1a1814]/80">
                {r.blurb}
              </p>
            </div>

            {/* Date column */}
            <div className="md:col-span-3 md:col-start-10 md:text-right">
              <div className="v2-mono text-[11px] uppercase tracking-[0.2em] text-[#1a1814]/55">
                {r.period}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
