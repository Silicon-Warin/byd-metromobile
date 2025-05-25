/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [320, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
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
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://va.vercel-scripts.com https://static.line-scdn.net https://d.line-scdn.net",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' data: https://fonts.gstatic.com",
							"frame-src 'self' https://www.google.com https://liff.line.me",
							"img-src 'self' data: blob: https://*",
							"connect-src 'self' https://api.line.me https://liffsdk.line-scdn.net https://liff.line.me",
							"media-src 'self'",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests",
						].join("; "),
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
						value:
							"geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=(), fullscreen=(self)",
					},
					{
						key: "Strict-Transport-Security",
						value: "max-age=31536000; includeSubDomains; preload",
					},
					{
						key: "X-DNS-Prefetch-Control",
						value: "on",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Cross-Origin-Embedder-Policy",
						value: "unsafe-none",
					},
					{
						key: "Cross-Origin-Opener-Policy",
						value: "same-origin",
					},
					{
						key: "Cross-Origin-Resource-Policy",
						value: "cross-origin",
					},
					{
						key: "X-Security-Alert",
						value:
							"This is the official BYD Metromobile website. Report suspicious activity to security@bydmetromobile.com",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
