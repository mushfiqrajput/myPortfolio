"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const EASE = [0.16, 1, 0.3, 1];

// Two-line headlines that crossfade + slide between each other.
// Each headline is two lines; the second line is the cyan accent.
const HEADLINES = [
  [{ t: "Hi there," }, { t: "I am Mushfiq.", accent: true }],
  [{ t: "I build the software" }, { t: "teams ship on.", accent: true }],
];

export default function HeroHeadline() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % HEADLINES.length), 3000);
    return () => clearInterval(id);
  }, [reduce]);

  const current = HEADLINES[i];

  return (
    // Reserve two lines of height so the layout below never jumps.
    <div className="relative font-display text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] tracking-tight min-h-[2em]">
      <AnimatePresence mode="wait">
        <motion.h1
          key={i}
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? {} : { opacity: 0, y: -28 }}
          transition={{ duration: 0.7, ease: EASE }}
          aria-live="polite"
        >
          {current[0].t}
          <br />
          <span className="text-[var(--accent)]">{current[1].t}</span>
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
