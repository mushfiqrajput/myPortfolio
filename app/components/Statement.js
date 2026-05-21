"use client";

import { motion, useReducedMotion } from "motion/react";

// Oversized editorial statement that reveals line-by-line on scroll-in.
// `lines` is an array of arrays of { t, accent? } segments so we can
// emphasize keywords in the accent color without dangerouslySetInnerHTML.
const LINES = [
  [{ t: "I build the kind of software that " }, { t: "quietly makes teams faster", accent: true }, { t: " —" }],
  [{ t: "CMS platforms admins enjoy, schedulers that never" }],
  [{ t: "double-book, scrapers that don’t break on Mondays." }],
  [{ t: "I care about the " }, { t: "gap between working and right", accent: true }, { t: "." }],
];

const EASE = [0.16, 1, 0.3, 1];

export default function Statement() {
  const reduce = useReducedMotion();

  return (
    <div className="max-w-4xl">
      {LINES.map((segs, i) => (
        <motion.p
          key={i}
          // Animate on mount, not whileInView: the panel-snap layout moves the
          // track by transform and doesn't fire native scroll, so an in-view
          // trigger can leave essential copy stuck invisible. Mount-triggered
          // with a per-line stagger plays cleanly when the panel is reached.
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: EASE }}
          className="font-display text-3xl md:text-5xl lg:text-6xl leading-[1.15] tracking-tight text-[var(--text-secondary)]"
        >
          {segs.map((s, j) => (
            <span key={j} className={s.accent ? "text-[var(--accent)]" : "text-[var(--text-primary)]"}>
              {s.t}
            </span>
          ))}
        </motion.p>
      ))}
    </div>
  );
}
