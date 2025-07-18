import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: [
				"/private/",
				"/admin*",
				"/(admin)*",
				"/admin-q9k8v3n1-metro*",
				"/api/admin*",
				"/_next/static/admin*",
			],
		},
		sitemap: "https://bydmetromobile.com/sitemap.xml",
	};
}
