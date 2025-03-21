/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: "https://bydmetromobile.com",
	generateRobotsTxt: true,
	robotsTxtOptions: {
		additionalSitemaps: ["https://bydmetromobile.com/sitemap.xml"],
	},
	exclude: ["/404", "/500"],
	changefreq: "weekly",
	priority: 0.7,
};
