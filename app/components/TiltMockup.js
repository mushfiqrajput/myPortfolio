"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

// Browser-chrome mockup that tilts toward the cursor in 3D, with a sheen
// sweep on enter and a glow that shifts behind it. No-op on reduced motion.
export default function TiltMockup({ src, title, urlPath = "" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 150, damping: 18, mass: 0.4 });
  const smy = useSpring(my, { stiffness: 150, damping: 18, mass: 0.4 });

  const rotateY = useTransform(smx, [0, 1], [7, -7]);
  const rotateX = useTransform(smy, [0, 1], [-5, 5]);
  // glow drifts opposite the tilt for a parallax feel
  const glowX = useTransform(smx, [0, 1], ["-12%", "12%"]);
  const glowY = useTransform(smy, [0, 1], ["-12%", "12%"]);
  // sheen rides the cursor across the glass
  const sheenX = useTransform(smx, [0, 1], ["-30%", "130%"]);

  function onMove(e) {
    if (reduce) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function reset() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-2xl shadow-black/40"
      >
        {/* browser chrome */}
        <div className="flex items-center gap-2 px-4 h-9 border-b border-[var(--border)] bg-black/30" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
          <div className="ml-4 flex-1 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
            datazoro.app{urlPath}
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-gradient-to-br from-[var(--surface)] via-[#0f0f12] to-black">
          {src ? (
            <Image
              src={src}
              alt={`${title} preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
              Screenshot · {title}
            </div>
          )}

          {/* moving sheen */}
          {!reduce && (
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12"
              style={{
                left: sheenX,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
              }}
            />
          )}
        </div>
      </motion.div>

      {/* glow that drifts behind the mockup */}
      <motion.div
        aria-hidden
        className="absolute -inset-8 -z-10 rounded-3xl blur-3xl opacity-30"
        style={{
          x: reduce ? 0 : glowX,
          y: reduce ? 0 : glowY,
          background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
