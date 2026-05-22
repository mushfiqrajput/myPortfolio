import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import PanelScroll from "../../components/PanelScroll";
import Cursor from "../../components/Cursor";
import ScrollProgress from "../../components/ScrollProgress";
import Reveal from "../../components/Reveal";
import MagneticButton from "../../components/MagneticButton";
import { professionalWork } from "../../data/projects";

export function generateStaticParams() {
  return professionalWork.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = professionalWork.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    openGraph: { type: "article", title: project.title, description: project.description },
    twitter: { card: "summary_large_image", title: project.title, description: project.description },
  };
}

export default async function CaseStudy({ params }) {
  const { slug } = await params;
  const project = professionalWork.find((p) => p.slug === slug);
  if (!project) notFound();

  const idx = professionalWork.findIndex((p) => p.slug === slug);
  const next = professionalWork[(idx + 1) % professionalWork.length];
  const screenshots = project.screenshots ?? [];

  return (
    <>
      <PanelScroll />
      <Cursor />
      <ScrollProgress />
      <div className="grain" aria-hidden />
      <Nav />

      <main className="flex-1">
        <div id="panel-track" className="panel-track">

          {/* ── PANEL 1: HERO ── */}
          <section data-panel="cs-hero" id="cs-hero" className="panel relative w-full overflow-hidden flex flex-col justify-center px-6 md:px-10 pt-24">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-20 blur-[140px]"
              style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 -left-20 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
              style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
            />

            <div className="relative max-w-6xl mx-auto w-full">
              <Link
                href="/#work"
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-10"
              >
                ← Back to work
              </Link>

              <div className="flex items-center flex-wrap gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--text-tertiary)] mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                <span>{project.year} · {project.role}</span>
                <span className="text-[var(--accent)]">Production · Private</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] md:leading-[0.92] max-w-4xl mb-10 md:mb-12">
                {project.title}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 md:gap-0 border-t border-[var(--border)] md:divide-x md:divide-[var(--border)]">
                <div className="py-5 md:pr-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5">Role</p>
                  <p className="text-sm text-[var(--text-primary)]">{project.role.split(" @ ")[0]}</p>
                </div>
                <div className="py-5 md:px-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5">Company</p>
                  <p className="text-sm text-[var(--text-primary)]">Datazoro</p>
                </div>
                <div className="py-5 md:px-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-1.5">Year</p>
                  <p className="text-sm text-[var(--text-primary)]">{project.year}</p>
                </div>
                <div className="py-5 md:pl-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-[var(--border)] text-[var(--text-secondary)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── PANEL 2: OVERVIEW ── */}
          <section data-panel="cs-overview" id="cs-overview" className="panel relative w-full flex flex-col justify-center px-6 md:px-10 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute top-[20%] -left-20 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
              style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
            />
            <div className="relative max-w-6xl mx-auto w-full">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-6">── Overview</p>
                <p className="max-w-3xl text-xl md:text-2xl leading-relaxed text-[var(--text-secondary)] mb-10">
                  {project.description}
                </p>
              </Reveal>

              {/* at-a-glance facts — hand-written per project, with a derived fallback */}
              <Reveal delay={0.05}>
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14 rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--border)]">
                  {(project.metrics ?? [
                    { v: project.bullets?.length ?? 0, k: "Key capabilities" },
                    { v: project.screenshots?.length ?? 0, k: "Documented surfaces" },
                    { v: project.tech.length, k: "Core technologies" },
                    { v: project.tech[0], k: "Primary stack" },
                  ]).map((m) => (
                    <div key={m.k} className="bg-[var(--background)] px-5 py-6">
                      <dt className="font-display text-2xl md:text-3xl text-[var(--accent)] leading-tight mb-2">
                        {m.v}
                      </dt>
                      <dd className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-tertiary)] leading-relaxed">
                        {m.k}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              {project.bullets && (
                <ul className="divide-y divide-[var(--border)]">
                  {project.bullets.map((b, i) => (
                    <Reveal key={b} delay={0.15 + i * 0.07} as="li">
                      <div className="flex gap-6 md:gap-10 py-6 group">
                        <span className="font-display text-4xl md:text-5xl text-[var(--border)] group-hover:text-[var(--accent)] transition-colors duration-300 leading-none mt-1 select-none tabular-nums">
                          0{i + 1}
                        </span>
                        <span className="text-base md:text-lg leading-relaxed text-[var(--text-secondary)] pt-2 group-hover:text-[var(--text-primary)] transition-colors duration-300">
                          {b}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* ── PANEL 3: SCREENSHOTS ── */}
          {screenshots.length > 0 && (
            <section data-panel="cs-screenshots" id="cs-screenshots" className="panel relative w-full flex flex-col justify-center overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 right-0 h-[400px] w-[400px] rounded-full opacity-10 blur-[120px]"
                style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
              />
              <div className="relative w-full">
                <div className="px-6 md:px-10 mb-8">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">── Screenshots</p>
                </div>

                {/* horizontal scroll strip */}
                <div className="relative">
                  <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-[var(--background)] to-transparent" />
                  <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-[var(--background)] to-transparent" />
                  <div
                    id="screenshot-strip"
                    data-hscroll
                    className="flex gap-4 overflow-x-auto px-6 md:px-10 pb-4"
                    style={{ scrollbarWidth: "none" }}
                  >
                    {screenshots.map((s, i) => (
                      <figure
                        key={s.src || i}
                        className="group relative shrink-0 w-[80vw] md:w-[55vw] lg:w-[45vw] rounded-2xl border border-[var(--border)] overflow-hidden bg-[var(--surface)]"
                      >
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={s.src}
                            alt={s.caption || `${project.title} screenshot ${i + 1}`}
                            fill
                            sizes="(max-width: 768px) 80vw, 55vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          />
                          {s.caption && (
                            <div className="hidden md:block absolute inset-x-0 bottom-0 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                              <p className="font-mono text-[11px] text-white/80">{s.caption}</p>
                            </div>
                          )}
                        </div>
                        {s.caption && (
                          <figcaption className="px-5 py-3 font-mono text-[11px] text-[var(--text-tertiary)] border-t border-[var(--border)]">
                            <span className="text-[var(--accent)] mr-2">0{i + 1}</span>{s.caption}
                          </figcaption>
                        )}
                      </figure>
                    ))}
                  </div>
                </div>

                <p className="px-6 md:px-10 mt-6 font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
                  Scroll → to browse · Scroll ↓ to continue
                </p>
              </div>
            </section>
          )}

          {/* ── PANEL 4: NEXT PROJECT ── */}
          <section data-panel="cs-next" id="cs-next" className="panel relative w-full flex flex-col justify-center px-6 md:px-10 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[140px]"
              style={{ background: "radial-gradient(circle, #00bfdf 0%, transparent 70%)" }}
            />
            <div className="relative max-w-6xl mx-auto w-full">
              <Reveal>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] mb-6">── Next case study</p>
                <Link
                  href={`/work/${next.slug}`}
                  className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.95] md:leading-[0.92] hover:text-[var(--accent)] transition-colors block mb-10 md:mb-16"
                >
                  {next.title} →
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex flex-wrap gap-4 items-center">
                  <MagneticButton
                    href="/#contact"
                    className="inline-flex items-center gap-2 px-6 h-12 rounded-full bg-[var(--accent)] text-black font-medium hover:opacity-90 transition-opacity"
                  >
                    Start a project →
                  </MagneticButton>
                  <MagneticButton
                    href="/#work"
                    strength={0.25}
                    className="inline-flex items-center gap-2 px-6 h-12 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-colors font-mono text-xs uppercase tracking-widest"
                  >
                    ← All work
                  </MagneticButton>
                </div>
              </Reveal>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
