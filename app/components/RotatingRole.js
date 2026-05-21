"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const ROLES = [
  "Full-stack engineer",
  "CMS architect",
  "Scraping & automation",
  "AI-integrated tooling",
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·/<>#$%&";

// Cycles roles with a text-scramble decode transition.
// Each character locks into place left-to-right while unlocked chars flicker.
export default function RotatingRole() {
  const [display, setDisplay] = useState(ROLES[0]);
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();
  const frame = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    if (reduced) {
      setDisplay(ROLES[i]);
      return;
    }
    const target = ROLES[i];
    const prev = ROLES[(i - 1 + ROLES.length) % ROLES.length];
    const len = Math.max(target.length, prev.length);
    frame.current = 0;
    const FRAMES_PER_CHAR = 2;
    const totalFrames = len * FRAMES_PER_CHAR + 8;

    function tick() {
      const f = frame.current;
      let out = "";
      for (let c = 0; c < len; c++) {
        const settleAt = c * FRAMES_PER_CHAR;
        const ch = target[c] ?? "";
        if (f >= settleAt + 6) {
          out += ch;
        } else if (f >= settleAt) {
          out += ch === " " ? " " : CHARS[(Math.random() * CHARS.length) | 0];
        } else {
          out += prev[c] ?? "";
        }
      }
      setDisplay(out);
      frame.current += 1;
      if (frame.current <= totalFrames) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    }
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [i, reduced]);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((n) => (n + 1) % ROLES.length), 3200);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-flex items-center">
      <span
        aria-live="polite"
        aria-atomic="true"
        className="inline-block text-[var(--text-primary)] tabular-nums"
        style={{ fontVariantLigatures: "none" }}
      >
        {display}
      </span>
      <span
        aria-hidden
        className="ml-3 h-[1em] w-[2px] bg-[var(--accent)] animate-[blink_1s_steps(2)_infinite]"
      />
    </span>
  );
}
