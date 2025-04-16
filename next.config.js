/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 64, 96, 128, 256, 384],
		formats: ["image/webp", "image/avif"],
		minimumCacheTTL: 31536000,
		dangerouslyAllowSVG: true,
		unoptimized: false,
		loader: "default",
		path: "/_next/image",
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**",
			},
		],
	},
	async headers() {
		return [
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
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value:
							"default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://va.vercel-scripts.com https://static.line-scdn.net; style-src 'self' 'unsafe-inline'; font-src 'self' data: https://fonts.gstatic.com; frame-src 'self' https://www.google.com; img-src 'self' data: blob: https://*; connect-src 'self' https://api.line.me https://liffsdk.line-scdn.net;",
					},
					{
						key: "X-Frame-Options",
						value: "SAMEORIGIN",
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
};

module.exports = nextConfig;
