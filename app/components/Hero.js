"use client";

import { motion } from "motion/react";
import RotatingRole from "./RotatingRole";
import HeroHeadline from "./HeroHeadline";
import ShaderBackground from "./ShaderBackground";
import MagneticButton from "./MagneticButton";

const EASE = [0.16, 1, 0.3, 1];

// What I build, framed as outcomes for a client — honest, no invented metrics.
const CAPABILITIES = [
  { k: "CMS platforms", v: "Admins ship without devs" },
  { k: "Automation & scraping", v: "Pipelines that don't break" },
  { k: "AI workflows", v: "OpenAI · Gemini · agents" },
  { k: "Full-stack delivery", v: "React · Node · Postgres" },
];

export default function Hero() {
  return (
    <section
      data-panel="hero"
      id="hero"
      className="panel relative flex items-center px-6 md:px-10 pt-32 pb-20 overflow-hidden"
    >
      {/* signature WebGL aurora — falls back to static glows */}
      <ShaderBackground>
        <div
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
        />
      </ShaderBackground>

      <motion.div className="relative z-10 max-w-6xl mx-auto w-full min-w-0">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[var(--text-tertiary)] mb-8 flex items-center flex-wrap"
        >
          <span className="pulse-dot" />
          Freelance &amp; contract · Available now
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
        >
          <HeroHeadline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="mt-6 font-mono text-sm md:text-base uppercase tracking-[0.2em] text-[var(--text-tertiary)]"
        >
          <RotatingRole />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
          className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[var(--text-secondary)]"
        >
          I&apos;m Mushfiq — a full-stack engineer who turns rough ideas into
          production systems: CMS platforms, scraping pipelines, and AI-augmented
          tooling. If you need it built right, I&apos;m the one you call.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href="#contact"
            className="group inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
          >
            Start a project
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </MagneticButton>
          <MagneticButton
            href="#work"
            strength={0.25}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--surface)] hover:border-[var(--accent)] transition-colors"
          >
            See the work
          </MagneticButton>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6 font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] border-t border-[var(--border)] pt-6"
        >
          {CAPABILITIES.map((c) => (
            <div key={c.k}>
              <dt className="text-[var(--text-primary)] font-display text-lg md:text-xl mb-1 normal-case tracking-normal">
                {c.k}
              </dt>
              <dd>{c.v}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
