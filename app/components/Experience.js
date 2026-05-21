"use client";

import { motion, useReducedMotion } from "motion/react";
import Reveal from "./Reveal";

const TIMELINE = [
  {
    when: "2025 — Present",
    role: "Full-stack Engineer",
    org: "Datazoro",
    blurb:
      "Shipping CMS-driven platforms, scheduling systems, scraping pipelines, and AI-integrated tooling used by real teams.",
  },
  {
    when: "2023 — 2024",
    role: "Final-year Project — Lead Frontend",
    org: "NCEAC Accreditation System",
    blurb:
      "MERN-stack accreditation platform with custom CSS, a Gemini-powered domain chatbot, and end-to-end student workflows.",
  },
  {
    when: "2020 — 2024",
    role: "B.S. Computer Science",
    org: "University",
    blurb:
      "Built personal projects on the side — banking app, movie library, expense tracker, UI showcase — to learn fast and ship.",
  },
];

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <div className="relative max-w-3xl">
      {/* track */}
      <div aria-hidden className="absolute left-2 top-2 bottom-2 w-px bg-[var(--border)]" />
      {/* cyan line draws itself down on scroll-in */}
      <motion.div
        aria-hidden
        className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-[var(--accent)] to-[var(--accent)]/20 origin-top"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <ol className="space-y-12">
        {TIMELINE.map((t, i) => (
          <Reveal key={t.when} delay={i * 0.08}>
            <li className="relative pl-10 group/exp">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-[18px] w-[18px] rounded-full border-2 border-[var(--accent)] bg-[var(--background)] group-hover/exp:shadow-[0_0_0_4px_rgba(0,191,223,0.15)] transition-shadow duration-300"
              />
              <span
                aria-hidden
                className={`absolute left-[5px] top-[11px] h-2 w-2 rounded-full bg-[var(--accent)] ${
                  i === 0 && !reduce ? "animate-[ping-accent_2s_ease-in-out_infinite]" : ""
                }`}
              />
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] mb-2">
                {t.when}
              </div>
              <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                {t.role}{" "}
                <span className="text-[var(--accent)]">— {t.org}</span>
              </h3>
              <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
                {t.blurb}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
