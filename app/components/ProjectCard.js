"use client";

import { useRef } from "react";

// Personal-project card with a cyan spotlight that follows the cursor.
// Pure CSS var driven — cheap, no React re-render on mouse move.
export default function ProjectCard({ project, index }) {
  const ref = useRef(null);

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  const p = project;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative flex flex-col h-full rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)]/40 hover:shadow-[0_0_32px_-4px_rgba(0,191,223,0.12)]"
    >
      {/* cursor spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx, 50%) var(--my, 50%), rgba(0,191,223,0.10), transparent 60%)",
        }}
      />
      {/* cyan top line on hover */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[var(--accent)] opacity-0 group-hover:opacity-60 transition-opacity duration-300" />

      <div className="relative flex flex-col flex-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] mb-3">
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3 className="font-display text-xl tracking-tight mb-3">{p.title}</h3>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
          {p.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-[var(--text-secondary)] group-hover:border-[var(--accent)]/40 transition-colors duration-150 cursor-default select-none"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex-1" />

        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          {p.github ? (
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1.5">
                <span className="text-[var(--accent)]">★</span> {p.github.stars}
              </span>
              <span className="flex items-center gap-1.5">⑂ {p.github.forks}</span>
            </div>
          ) : (
            <span />
          )}

          <a
            href={p.github?.url || (p.repo ? `https://github.com/${p.repo}` : "#")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--accent)]/40 text-[var(--accent)] font-mono text-[9px] uppercase tracking-widest hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/70 active:scale-95 transition-all duration-150"
          >
            ↗ GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
