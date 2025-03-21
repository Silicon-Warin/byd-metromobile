/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 64, 96, 128, 256, 384],
		domains: ["bydmetromobile.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "bydmetromobile.com",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 3600,
		dangerouslyAllowSVG: true,
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
		];
	},
};

module.exports = nextConfig;
