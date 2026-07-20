import type { MetadataRoute } from "next";

const BASE = "https://skpux.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/skp", "/kalakari", "/case-studies/case-study-one", "/case-studies/case-study-two"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
