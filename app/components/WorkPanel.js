import Link from "next/link";
import TiltMockup from "./TiltMockup";

export default function WorkPanel({ project, index, total }) {
  const reverse = index % 2 === 1;

  return (
    <section
      data-panel={`work-${project.slug}`}
      id={`work-${project.slug}`}
      className="panel relative w-full px-6 md:px-10 flex flex-col justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute h-[600px] w-[600px] rounded-full opacity-15 blur-[160px] ${
          reverse ? "top-[-20%] left-[-15%]" : "top-[-20%] right-[-15%]"
        }`}
        style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-16">
        <div className={`lg:col-span-7 ${reverse ? "lg:order-2" : ""}`}>
          <TiltMockup
            src={project.image}
            title={project.title}
            urlPath={project.urlPath || ""}
          />
        </div>

        <div className={`relative lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
          {/* oversized ghost index */}
          <span
            aria-hidden
            className={`pointer-events-none absolute -top-20 select-none font-display leading-none text-[10rem] md:text-[14rem] text-white/[0.025] ${
              reverse ? "right-0" : "-left-4"
            }`}
          >
            0{index + 1}
          </span>
          <div className="relative z-10">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span>
              Work · 0{index + 1}/0{total}
            </span>
            <span className="text-[var(--accent)]">Production · Private</span>
          </div>

          <h3 className="font-display text-3xl md:text-5xl tracking-tight leading-[1.05] mb-5">
            {project.title}
          </h3>

          <p className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] mb-6">
            {project.description}
          </p>

          {project.bullets && (
            <ul className="space-y-2.5 mb-6">
              {project.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-[var(--accent)] mt-1.5">→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
              <button
                key={t}
                type="button"
                className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 text-[var(--text-secondary)] hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/15 hover:text-[var(--text-primary)] active:scale-95 transition-all duration-200"
              >
                {t}
              </button>
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
        </div>
      </div>
    </section>
  );
}
