export default function WorkCard({ title, role, year, description, tech, status = "Production · Private" }) {
  return (
    <article className="group relative rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8 transition-all duration-300 hover:border-[var(--accent)] hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h3 className="font-display text-2xl md:text-3xl mb-2 tracking-tight">{title}</h3>
          <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)]">
            {role} · {year}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)] border border-[var(--accent)]/40 px-2 py-1 rounded-full whitespace-nowrap">
          {status}
        </span>
      </div>

      {/* screenshot placeholder */}
      <div className="aspect-[16/10] rounded-lg bg-[var(--surface-2)] border border-[var(--border)] mb-6 flex items-center justify-center overflow-hidden">
        <span className="font-mono text-xs text-[var(--text-tertiary)]">
          Screenshot placeholder
        </span>
      </div>

      <p className="text-[var(--text-secondary)] leading-relaxed mb-6">{description}</p>

      <div className="flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border)] px-2.5 py-1 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}
