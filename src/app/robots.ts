import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_NGOX || "http://localohost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"], // cấm crawler vào admin, api
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
