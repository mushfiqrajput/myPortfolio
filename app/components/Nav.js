"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { professionalWork } from "../data/projects";

const WORK_IDS = professionalWork.map((p) => `work-${p.slug}`);

const LINKS = [
  { id: "work", target: `work-${professionalWork[0].slug}`, label: "Work" },
  { id: "projects", target: "projects", label: "Projects" },
  { id: "about", target: "about", label: "About" },
  { id: "experience", target: "experience", label: "Experience" },
  { id: "contact", target: "contact", label: "Contact →", accent: true },
];

export default function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    function read() {
      const id = window.location.hash.slice(1);
      if (!id) {
        setActive("");
        return;
      }
      if (WORK_IDS.includes(id)) {
        setActive("work");
      } else {
        setActive(id);
      }
    }
    read();
    window.addEventListener("hashchange", read);

    // Fallback for native scroll (mobile) — use IntersectionObserver
    const isPanelMode = window.matchMedia(
      "(min-width: 768px) and (pointer: fine)"
    ).matches;
    let observer;
    if (!isPanelMode) {
      const all = [
        ...WORK_IDS,
        "projects",
        "about",
        "skills",
        "experience",
        "contact",
      ];
      const els = all.map((id) => document.getElementById(id)).filter(Boolean);
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (visible) {
            const id = visible.target.id;
            setActive(WORK_IDS.includes(id) ? "work" : id);
          }
        },
        { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
      );
      els.forEach((el) => observer.observe(el));
    }

    return () => {
      window.removeEventListener("hashchange", read);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(10,10,11,0.6)] border-b border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Home"
          className="font-display text-xl tracking-tight text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          M.
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
          {LINKS.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.target}`}
                className={`relative flex items-center transition-colors pb-1 ${
                  link.accent
                    ? "text-[var(--accent)] hover:opacity-80"
                    : "hover:text-[var(--text-primary)]"
                } ${isActive && !link.accent ? "text-[var(--text-primary)]" : ""}`}
              >
                {link.label}
                <span
                  aria-hidden
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[var(--accent)] origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <a
          href="/resume.pdf"
          download
          aria-label="Download resume PDF"
          className="hidden md:inline-flex items-center gap-2 h-9 px-4 rounded-full border border-[var(--border)] font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-colors"
        >
          <Download className="w-3.5 h-3.5" strokeWidth={2} />
          Resume
        </a>
      </div>
    </header>
  );
}
