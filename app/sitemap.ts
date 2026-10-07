import type { MetadataRoute } from "next";
const base = process.env.NEXT_PUBLIC_SITE_URL || "https://www.fitworksstudio.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ["/", "/fitting-technology", "/fits-and-pricing", "/book-a-fit", "/privacy"].map((p) => ({ url: `${base}${p}`, lastModified: now }));
}
