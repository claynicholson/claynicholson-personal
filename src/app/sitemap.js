import { getPostSlugs } from "@/lib/blog";

const SITE = "https://claynicholson.com";

export default function sitemap() {
  return [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/blog`, changeFrequency: "monthly", priority: 0.7 },
    ...getPostSlugs().map((slug) => ({
      url: `${SITE}/blog/${slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    })),
  ];
}
