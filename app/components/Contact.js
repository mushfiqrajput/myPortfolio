"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ShaderBackground from "./ShaderBackground";
import MagneticButton from "./MagneticButton";

const EMAIL = "mushfiq.rajput013@gmail.com";
const GITHUB = "https://github.com/mushfiqrajput";
const LINKEDIN = "https://www.linkedin.com/in/mushfiq-rajput/";

const EASE = [0.16, 1, 0.3, 1];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  return (
    <div className="relative">
      {/* aurora returns to bookend the hero */}
      <ShaderBackground className="opacity-70">
        <div
          className="pointer-events-none absolute bottom-[-10%] left-1/2 -translate-x-1/2 h-[500px] w-[700px] rounded-full opacity-25 blur-[140px]"
          style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
        />
      </ShaderBackground>

      <div className="relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-6 flex items-center"
        >
          <span className="pulse-dot" />
          Available for freelance & contract
        </motion.p>

        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.08, ease: EASE }}
          className="group block font-display text-[clamp(2rem,7vw,6rem)] leading-[0.95] tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors break-all md:break-normal"
        >
          {EMAIL}
          <span className="inline-block ml-2 transition-transform group-hover:translate-x-2">→</span>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
          >
            Start a project →
          </MagneticButton>

          <button
            type="button"
            onClick={copy}
            aria-label={copied ? "Email copied" : "Copy email address"}
            className="relative h-12 px-5 rounded-full border border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "copied" : "copy"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="inline-block"
              >
                {copied ? "Copied ✓" : "Copy email"}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="flex gap-6 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)] ml-auto">
            <a
              href={GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile (opens in new tab)"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile (opens in new tab)"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
