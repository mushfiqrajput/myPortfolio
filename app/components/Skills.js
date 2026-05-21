import Reveal from "./Reveal";

const GROUPS = [
  {
    label: "Frontend",
    items: [
      { name: "Next.js",         url: "https://nextjs.org/docs" },
      { name: "React",           url: "https://react.dev" },
      { name: "TypeScript",      url: "https://www.typescriptlang.org/docs" },
      { name: "Tailwind CSS",    url: "https://tailwindcss.com/docs" },
      { name: "Motion / Framer", url: "https://motion.dev/docs" },
      { name: "GrapesJS",        url: "https://grapesjs.com/docs" },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",       url: "https://nodejs.org/en/docs" },
      { name: "NestJS",        url: "https://docs.nestjs.com" },
      { name: "Express",       url: "https://expressjs.com/en/4x/api.html" },
      { name: "MongoDB",       url: "https://www.mongodb.com/docs" },
      { name: "REST APIs",     url: "https://restfulapi.net" },
      { name: "Microservices", url: "https://microservices.io" },
    ],
  },
  {
    label: "AI & Integrations",
    items: [
      { name: "OpenAI",       url: "https://platform.openai.com/docs" },
      { name: "Gemini",       url: "https://ai.google.dev/docs" },
      { name: "Stripe",       url: "https://stripe.com/docs" },
      { name: "Google APIs",  url: "https://developers.google.com/apis-explorer" },
      { name: "GoLogin",      url: "https://gologin.com/docs" },
      { name: "Web scraping", url: "https://cheerio.js.org" },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",     url: "https://git-scm.com/doc" },
      { name: "Vercel",  url: "https://vercel.com/docs" },
      { name: "Postman", url: "https://learning.postman.com/docs" },
      { name: "Figma",   url: "https://help.figma.com/hc/en-us" },
      { name: "VS Code", url: "https://code.visualstudio.com/docs" },
    ],
  },
];

export default function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
      {GROUPS.map((g, i) => (
        <Reveal key={g.label} delay={i * 0.06}>
          <div className="group/skill rounded-2xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--surface)]/40 p-5 -m-5 transition-colors duration-300">
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--text-tertiary)] mb-5">
              <span className="font-display text-base text-[var(--accent)] leading-none tabular-nums">
                0{i + 1}
              </span>
              <span className="h-px flex-none w-6 bg-[var(--border)] group-hover/skill:bg-[var(--accent)]/50 transition-colors" />
              {g.label}
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 text-sm text-[var(--text-secondary)] hover:-translate-y-0.5 hover:bg-[var(--accent)]/15 hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)] hover:shadow-[0_0_18px_-6px_rgba(0,191,223,0.5)] transition-all duration-200"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
