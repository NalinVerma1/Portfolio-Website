"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Cactus from "./Cactus";

type Props = {
  id?: string;
  chapter?: string; // e.g. "II."
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionV2({
  id,
  chapter,
  title,
  subtitle,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl scroll-mt-16 px-6 py-20 sm:px-10 md:py-28 ${className}`}
    >
      {/* Section break: small cacti row */}
      <div className="mb-12 flex items-end justify-center gap-3 opacity-70">
        <Cactus size={14} variant="small" />
        <Cactus size={20} variant="tall" />
        <Cactus size={14} variant="small" />
      </div>

      {(chapter || title) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {chapter && (
            <div className="mb-3 flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.25em] text-[#b8392a]">
              <span>{chapter}</span>
              <span className="h-px flex-1 max-w-[260px] bg-[#1a1814]/15" />
            </div>
          )}
          {title && (
            <h2 className="v2-serif text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.025em] text-[#1a1814]">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="v2-serif-italic mt-3 max-w-2xl text-[clamp(1.05rem,1.4vw,1.25rem)] text-[#1a1814]/60">
              {subtitle}
            </p>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      >
        {children}
      </motion.div>
    </section>
  );
}
