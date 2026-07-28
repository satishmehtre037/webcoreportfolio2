import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url || "https://webcorestudio.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
