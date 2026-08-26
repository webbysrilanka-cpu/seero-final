import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const staticRoutes = [
    { path: "", priority: 1, freq: "weekly" as const },
    { path: "/services", priority: 0.9, freq: "monthly" as const },
    { path: "/pricing", priority: 0.9, freq: "monthly" as const },
    { path: "/portfolio", priority: 0.8, freq: "monthly" as const },
    { path: "/about", priority: 0.7, freq: "yearly" as const },
    { path: "/contact", priority: 0.8, freq: "yearly" as const },
    { path: "/blog", priority: 0.7, freq: "weekly" as const },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${site.url}${r.path}`,
      lastModified: new Date(),
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
