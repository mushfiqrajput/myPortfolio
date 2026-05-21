import { professionalWork } from "./data/projects";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mushfiq.dev";

export default function sitemap() {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...professionalWork.map((p) => ({
      url: `${SITE_URL}/work/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
  ];
}
