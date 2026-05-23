"use client";

import { motion } from "framer-motion";
import DinoGround from "./DinoGround";
import { GithubIcon, LinkedinIcon } from "../BrandIcons";
import { Mail } from "lucide-react";
import { SketchUnderline } from "./Marginalia";

const LINKS = [
  { label: "Email", href: "mailto:nalin.verma@uwaterloo.ca", icon: Mail, line: "nalin.verma@uwaterloo.ca" },
  { label: "GitHub", href: "https://github.com/NalinVerma1", icon: GithubIcon, line: "@NalinVerma1" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/nalinv11/", icon: LinkedinIcon, line: "in/nalinv11" },
];

export default function FooterV2() {
  return (
    <footer id="contact" className="relative mt-12">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-28">
        {/* Section break cacti */}
        <div className="mb-12 flex items-end justify-center gap-3 opacity-70">
          <div className="opacity-80">
            <span className="block">
              <DinoMarker />
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-3 flex items-center gap-3 v2-mono text-[10.5px] uppercase tracking-[0.25em] text-[#b8392a]">
            <span>05</span>
            <span className="h-px w-32 bg-[#1a1814]/15" />
          </div>

          <div className="relative inline-block">
            <h2 className="v2-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.025em] text-[#1a1814]">
              Write to me.
            </h2>
            <div className="pointer-events-none absolute -bottom-2 left-0 h-3 w-44">
              <SketchUnderline className="h-full w-full" />
            </div>
          </div>

          <p className="mt-8 max-w-xl v2-serif-italic text-[clamp(1.1rem,1.4vw,1.3rem)] leading-relaxed text-[#1a1814]/65">
            I&rsquo;m looking for an Applied AI / ML Engineering internship for{" "}
            <span className="text-[#1a1814]">Winter 2027</span> at firms that
            take both AI and capital markets seriously. If that sounds like
            you, I&rsquo;d love to talk.
          </p>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {LINKS.map((l) => {
              const Icon = l.icon;
              return (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between gap-3 rounded-sm border border-[#1a1814]/15 bg-[#ede4cb]/40 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#b8392a]/50 hover:bg-[#ede4cb]/70"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-sm border border-[#1a1814]/15 bg-[#f8f1de] text-[#1a1814]/80 transition-colors group-hover:border-[#b8392a]/40 group-hover:text-[#b8392a]">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="v2-mono text-[9.5px] uppercase tracking-[0.22em] text-[#1a1814]/50">
                        {l.label}
                      </div>
                      <div className="truncate text-[13.5px] text-[#1a1814]/90">
                        {l.line}
                      </div>
                    </div>
                  </div>
                  <span className="text-[#1a1814]/30 transition-colors group-hover:text-[#b8392a]">↗</span>
                </a>
              );
            })}
          </div>
        </motion.div>

        {/* Colophon */}
        <div className="mt-24 border-t border-dashed border-[#1a1814]/20 pt-5">
          <span className="v2-serif-italic text-[13px] text-[#1a1814]/70">
            Nalin Verma · 2026
          </span>
        </div>
      </div>

      {/* Running dino baseline at the very bottom */}
      <DinoGround />
    </footer>
  );
}

function DinoMarker() {
  return (
    <span className="v2-hand text-[18px] text-[#1a1814]/55">— end —</span>
  );
}
