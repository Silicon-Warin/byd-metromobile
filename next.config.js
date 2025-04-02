/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 64, 96, 128, 256, 384],
		minimumCacheTTL: 3600,
		dangerouslyAllowSVG: true,
	},
	async headers() {
		return [
			// Cache Control สำหรับรูปภาพ
			{
				source: "/images/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=31536000",
					},
				],
			},
			{
				source: "/_next/image/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=31536000",
					},
				],
			},
			// Security Headers 🔒
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com;",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "geolocation=(), microphone=()",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/model/byd-sealion-6-dm-i",
				destination: "/models/byd-sealion6dmi",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
