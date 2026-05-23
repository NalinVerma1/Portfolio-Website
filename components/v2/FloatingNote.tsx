"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

/* Small floating button in the bottom-right with a soft red pulse.
   On click, opens a Post-it style note with a contact line.
   Designed to read as a wink rather than a screaming "ATTENTION" banner. */

export default function FloatingNote() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Delay mount slightly so the button doesn't compete with the hero entrance
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <motion.div
            key="note"
            initial={{ opacity: 0, y: 16, rotate: -6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
            exit={{ opacity: 0, y: 14, rotate: -8, scale: 0.92 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto relative max-w-[280px] origin-bottom-right rounded-sm border border-[#1a1814]/15 bg-[#f8e89c] p-5 text-[#1a1814] shadow-[3px_4px_0_rgba(26,24,20,0.08),0_18px_40px_-12px_rgba(26,24,20,0.18)] sm:max-w-[320px]"
          >
            {/* Tape strip */}
            <div className="absolute -top-2 left-6 h-4 w-14 rotate-[-4deg] bg-[#ede4cb]/80" />

            {/* Close × */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss"
              className="absolute right-2 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-[15px] leading-none text-[#1a1814]/50 transition-colors hover:bg-[#1a1814]/[0.06] hover:text-[#1a1814]"
            >
              ×
            </button>

            <div className="v2-mono text-[9.5px] uppercase tracking-[0.25em] text-[#b8392a]">
              P.S.
            </div>
            <p className="mt-2 v2-serif text-[clamp(1.05rem,1.3vw,1.2rem)] leading-[1.35] text-[#1a1814]">
              If anything here landed, I&rsquo;d love to hear from you.
            </p>
            <a
              href="mailto:nalin.verma@uwaterloo.ca"
              className="mt-3 inline-flex items-baseline gap-1.5 v2-mono text-[11px] uppercase tracking-[0.18em] text-[#b8392a] hover:underline"
              onClick={() => setOpen(false)}
            >
              nalin.verma@uwaterloo.ca
              <span>↗</span>
            </a>
            <div className="mt-3 v2-hand text-[16px] leading-none text-[#1a1814]/50">
              — N
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red dot button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close note" : "Open contact note"}
        className="pointer-events-auto group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#1a1814]/15 bg-[#b8392a] text-white shadow-[2px_3px_0_rgba(26,24,20,0.12),0_6px_18px_-4px_rgba(184,57,42,0.45)] transition-transform hover:scale-105 active:scale-95"
      >
        {/* Soft pulse halo */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[#b8392a]/40 motion-safe:animate-ping"
          />
        )}
        <span className="relative v2-serif text-[18px] font-semibold leading-none">
          {open ? "×" : "!"}
        </span>
      </motion.button>
    </div>
  );
}
