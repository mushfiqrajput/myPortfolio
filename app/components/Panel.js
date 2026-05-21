const GLOW_POSITIONS = {
  "top-right":    "top-[-10%] right-[-10%]",
  "bottom-left":  "bottom-[-10%] left-[-10%]",
  "bottom-right": "bottom-[-10%] right-[-10%]",
  "top-left":     "top-[-10%] left-[-10%]",
  "center-right": "top-[30%] right-[-15%]",
  "center-left":  "top-[30%] left-[-15%]",
};

export default function Panel({ id, eyebrow, title, children, className = "", glow = "top-right" }) {
  const pos = GLOW_POSITIONS[glow] ?? GLOW_POSITIONS["top-right"];
  return (
    <section
      data-panel={id}
      id={id}
      className={`panel relative w-full px-6 md:px-10 flex flex-col justify-center overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute ${pos} h-[500px] w-[500px] rounded-full opacity-20 blur-[140px]`}
        style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
      />
      <div className="relative max-w-6xl mx-auto w-full py-16 md:py-20">
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--text-tertiary)] mb-4">
            ── {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="font-display text-4xl md:text-6xl tracking-tight mb-10 md:mb-14">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
