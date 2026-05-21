import Reveal from "./Reveal";

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="px-6 md:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <Reveal className="mb-12 md:mb-16">
          {eyebrow && (
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-4">
              ── {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="font-display text-4xl md:text-6xl tracking-tight">
              {title}
            </h2>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
