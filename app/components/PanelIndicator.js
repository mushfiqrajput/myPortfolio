"use client";

import { useEffect, useState } from "react";

export default function PanelIndicator() {
  const [enabled, setEnabled] = useState(false);
  const [panels, setPanels] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (
      !window.matchMedia("(min-width: 768px) and (pointer: fine)").matches
    )
      return;
    setEnabled(true);

    const read = () => {
      const els = Array.from(document.querySelectorAll("[data-panel]"));
      setPanels(els.map((el) => el.getAttribute("data-panel")));
      const hash = window.location.hash.slice(1);
      const idx = els.findIndex((el) => el.getAttribute("data-panel") === hash);
      setActive(idx === -1 ? 0 : idx);
    };
    requestAnimationFrame(read);
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  if (!enabled || panels.length === 0) return null;

  const total = panels.length;
  // progress percentage along the line
  const progress = total > 1 ? (active / (total - 1)) * 100 : 0;

  return (
    <div
      aria-hidden
      className="fixed right-8 top-1/2 -translate-y-1/2 z-40 h-[60vh] flex flex-col items-center"
    >
      {/* background line */}
      <div className="relative w-px h-full bg-[var(--border)]">
        {/* filled progress line */}
        <div
          className="absolute left-0 top-0 w-px bg-[var(--accent)] transition-[height] duration-[1200ms] ease-[cubic-bezier(0.83,0,0.17,1)]"
          style={{ height: `${progress}%` }}
        />
        {/* tick marks per panel */}
        {panels.map((id, i) => {
          const top = total > 1 ? (i / (total - 1)) * 100 : 0;
          const isActive = i === active;
          const isPassed = i < active;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-label={`Go to ${id}`}
              className="absolute -left-2 group flex items-center"
              style={{ top: `${top}%`, transform: "translateY(-50%)" }}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  isActive
                    ? "w-5 bg-[var(--accent)]"
                    : isPassed
                    ? "w-3 bg-[var(--accent)] opacity-60"
                    : "w-2 bg-[var(--text-tertiary)] group-hover:w-3 group-hover:bg-[var(--text-primary)]"
                }`}
              />
              {/* hover label */}
              <span
                className={`absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-opacity duration-200 ${
                  isActive
                    ? "opacity-100 text-[var(--text-primary)]"
                    : "opacity-0 group-hover:opacity-100 text-[var(--text-secondary)]"
                }`}
              >
                {labelFor(id)}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function labelFor(id) {
  if (id === "hero") return "Intro";
  if (id.startsWith("work-")) return `Work · ${id.slice(5).replace(/-/g, " ")}`;
  return id;
}
