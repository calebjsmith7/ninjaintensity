import type { MetadataRoute } from "next";
import { business } from "./data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${business.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: [`${business.url}/images/home-3.jpg`],
    },
  ];
}
