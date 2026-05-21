"use client";

import Link from "next/link";

function ProjectRow({ project, index }) {
  const reverse = index % 2 === 1;

  return (
    <article
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-20 lg:py-28 border-t border-[var(--border)]"
    >
      <div
        className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}
      >
        <div className="lg:sticky lg:top-28">
          <div className="relative">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden shadow-2xl shadow-black/40">
              {/* fake browser chrome */}
              <div className="flex items-center gap-2 px-4 h-9 border-b border-[var(--border)] bg-black/30">
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#3a3a3f]" />
                <div className="ml-4 flex-1 text-center font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
                  datazoro.app{project.urlPath || ""}
                </div>
              </div>
              <div className="aspect-[16/10] flex items-center justify-center bg-gradient-to-br from-[var(--surface)] via-[#0f0f12] to-black">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
                    Screenshot · {project.title}
                  </div>
                )}
              </div>
            </div>
            {/* violet glow */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
            />
          </div>
        </div>
      </div>

      <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span>0{index + 1} · {project.year}</span>
          <span className="text-[var(--accent)]">Production · Private</span>
        </div>

        <h3 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05] mb-6">
          {project.title}
        </h3>

        <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] mb-8">
          {project.description}
        </p>

        {project.bullets && (
          <ul className="space-y-3 mb-8">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                <span className="text-[var(--accent)] mt-1.5">→</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
            >
              {t}
            </span>
          ))}
        </div>

        {project.slug && (
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--accent)] hover:gap-3 transition-all"
          >
            Read case study <span>→</span>
          </Link>
        )}
      </div>
    </article>
  );
}

export default function WorkShowcase({ projects }) {
  return (
    <div className="relative">
      {projects.map((p, i) => (
        <ProjectRow key={p.title} project={p} index={i} />
      ))}
    </div>
  );
}
