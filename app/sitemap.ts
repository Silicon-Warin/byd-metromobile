import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: "https://www.bydmetromobile.com/",
			lastModified: new Date(),
		},
		{
			url: "https://www.bydmetromobile.com/promotions",
			lastModified: new Date(),
		},
		{
			url: "https://www.bydmetromobile.com/we-are-byd",
			lastModified: new Date(),
		},
		{
			url: "https://www.bydmetromobile.com/blog",
			lastModified: new Date(),
		},
	];
}
