import { MetadataRoute } from "next";
import { navCarModels } from "@/data/navCarModels";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://bydmetromobile.com";

	// หน้าหลัก
	const mainPages = [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
			changeFrequency: "daily" as const,
			priority: 1.0,
		},
		{
			url: `${baseUrl}/models`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/promotions`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/service`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/contact-us`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/we-are-byd`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
		{
			url: `${baseUrl}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/models/compare`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
	];

	// หน้ารถยนต์แต่ละรุ่น
	const carPages = navCarModels.flatMap((model) => [
		{
			url: `${baseUrl}${model.href}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}${model.href}/loan-calculator`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.6,
		},
	]);

	return [...mainPages, ...carPages];
}
