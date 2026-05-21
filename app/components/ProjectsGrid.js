import Reveal from "./Reveal";
import ProjectCard from "./ProjectCard";

async function fetchRepo(repo) {
  if (!repo) return null;
  if (process.env.NODE_ENV !== "production") return null;
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      url: data.html_url,
    };
  } catch {
    return null;
  }
}

export default async function ProjectsGrid({ projects }) {
  const enriched = await Promise.all(
    projects.map(async (p) => ({ ...p, github: await fetchRepo(p.repo) }))
  );

  return (
    <>
      <p className="font-mono text-xs text-[var(--text-tertiary)] mb-8 max-w-xl">
        Side projects I built to learn — open on GitHub.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {enriched.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.06}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
