/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		deviceSizes: [320, 640, 768, 1024, 1280, 1600, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		formats: ["image/avif", "image/webp"],
		minimumCacheTTL: 31536000, // 1 year
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
							"This is the official BYD Metromobile website. Report suspicious activity to siliconwarin@gmail.com",
					},
				],
			},
		];
	},
	async redirects() {
		return [
			// เก่า -> ใหม่ (Company Info)
			{
				source: "/about-metromobile",
				destination: "/we-are-byd",
				permanent: true,
			},
			{
				source: "/about",
				destination: "/we-are-byd",
				permanent: true,
			},
			{
				source: "/about-us",
				destination: "/we-are-byd",
				permanent: true,
			},
			{
				source: "/company",
				destination: "/we-are-byd",
				permanent: true,
			},

			// รถยนต์ - เก่า -> ใหม่
			{
				source: "/cars",
				destination: "/models",
				permanent: true,
			},
			{
				source: "/vehicles",
				destination: "/models",
				permanent: true,
			},
			{
				source: "/car",
				destination: "/models",
				permanent: true,
			},
			{
				source: "/model",
				destination: "/models",
				permanent: true,
			},

			// รถยนต์แต่ละรุ่น - เก่า -> ใหม่
			{
				source: "/models/atto3",
				destination: "/models/byd-atto3",
				permanent: true,
			},
			{
				source: "/models/dolphin",
				destination: "/models/byd-dolphin",
				permanent: true,
			},
			{
				source: "/models/seal",
				destination: "/models/byd-seal",
				permanent: true,
			},
			{
				source: "/models/sealion6",
				destination: "/models/byd-sealion6dmi",
				permanent: true,
			},
			{
				source: "/models/sealion7",
				destination: "/models/byd-sealion7",
				permanent: true,
			},
			{
				source: "/models/m6",
				destination: "/models/byd-m6",
				permanent: true,
			},

			// บริการ - เก่า -> ใหม่
			{
				source: "/services",
				destination: "/service",
				permanent: true,
			},
			{
				source: "/test-drive",
				destination: "/contact-us",
				permanent: true,
			},
			{
				source: "/testdrive",
				destination: "/contact-us",
				permanent: true,
			},
			{
				source: "/booking",
				destination: "/contact-us",
				permanent: true,
			},
			{
				source: "/appointment",
				destination: "/contact-us",
				permanent: true,
			},

			// โปรโมชั่น - เก่า -> ใหม่
			{
				source: "/promotion",
				destination: "/promotions",
				permanent: true,
			},
			{
				source: "/promo",
				destination: "/promotions",
				permanent: true,
			},
			{
				source: "/offers",
				destination: "/promotions",
				permanent: true,
			},
			{
				source: "/deals",
				destination: "/promotions",
				permanent: true,
			},

			// ติดต่อ - เก่า -> ใหม่
			{
				source: "/contact",
				destination: "/contact-us",
				permanent: true,
			},

			// บล็อก/ข่าว - เก่า -> ใหม่
			{
				source: "/news",
				destination: "/blog",
				permanent: true,
			},
			{
				source: "/articles",
				destination: "/blog",
				permanent: true,
			},

			// หน้าแรก - เก่า -> ใหม่
			{
				source: "/home",
				destination: "/",
				permanent: true,
			},
			{
				source: "/index",
				destination: "/",
				permanent: true,
			},
			{
				source: "/main",
				destination: "/",
				permanent: true,
			},

			// กรณี path ลงท้ายด้วย /
			{
				source: "/models/",
				destination: "/models",
				permanent: true,
			},
			{
				source: "/contact-us/",
				destination: "/contact-us",
				permanent: true,
			},
			{
				source: "/promotions/",
				destination: "/promotions",
				permanent: true,
			},
			{
				source: "/service/",
				destination: "/service",
				permanent: true,
			},
			{
				source: "/blog/",
				destination: "/blog",
				permanent: true,
			},

			// === URL เก่าจาก Analytics ===
			// Blog posts URL เก่า
			{
				source: "/blog/2",
				destination: "/blog",
				permanent: true,
			},

			// เก่า: form-test-drive -> ใหม่: contact-us
			{
				source: "/form-test-drive",
				destination: "/contact-us",
				permanent: true,
			},

			// เก่า: thank-you -> ใหม่: contact-us (success)
			{
				source: "/thank-you",
				destination: "/contact-us",
				permanent: true,
			},

			// รถยนต์ specs เก่า
			{
				source: "/spec-byd-seal-u-dm-i",
				destination: "/models/byd-sealion7",
				permanent: true,
			},

			// เนื้อหาเก่าเกี่ยวกับ BYD -> redirect ไปหน้าเกี่ยวกับเรา
			{
				source: "/summary-of-2023-vehicle-registration-byd",
				destination: "/we-are-byd",
				permanent: true,
			},
			{
				source: "/tires-ev-car-2",
				destination: "/blog",
				permanent: true,
			},

			// URL encoded Thai content (URL เก่าที่มี Thai text)
			// "ทำความรู้จัก อานาจักร BYD"
			{
				source:
					"/%E0%B8%97%E0%B8%B3%E0%B8%84%E0%B8%A7%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%B9%E0%B9%89%E0%B8%88%E0%B8%B1%E0%B8%81-%E0%B8%AD%E0%B8%B2%E0%B8%93%E0%B8%B2%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3-byd-%E0%B8%A2",
				destination: "/we-are-byd",
				permanent: true,
			},
			// "5 วิธีย์ยืดอายุแบตเตอรี่รถ"
			{
				source:
					"/5-%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%A2%E0%B8%B7%E0%B8%94%E0%B8%AD%E0%B8%B2%E0%B8%A2%E0%B8%B8%E0%B9%81%E0%B8%9A%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B8%96",
				destination: "/blog",
				permanent: true,
			},
			// "Blade Battery หรือเบลดแบตเตอรี่"
			{
				source:
					"/blade-battery-%E0%B8%AB%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B9%80%E0%B8%9A%E0%B8%A5%E0%B8%94%E0%B9%81%E0%B8%9A%E0%B8%95%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B8%B5%E0%B9%88-%E0%B8%AA%E0%B8%B8%E0%B8%94-2-8",
				destination: "/blog",
				permanent: true,
			},
			// "สรุปยอดรถจดทะเบียนประจำ"
			{
				source:
					"/%E0%B8%AA%E0%B8%A3%E0%B8%B8%E0%B8%9B%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%A3%E0%B8%96%E0%B8%88%E0%B8%94%E0%B8%97%E0%B8%B0%E0%B9%80%E0%B8%9A%E0%B8%B5%E0%B8%A2%E0%B8%99%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B8%88",
				destination: "/we-are-byd",
				permanent: true,
			},
			// "BYD เดินสายการผลิตโรงงานใน"
			{
				source:
					"/byd-%E0%B9%80%E0%B8%94%E0%B8%B4%E0%B8%99%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9C%E0%B8%A5%E0%B8%B4%E0%B8%95%E0%B9%82%E0%B8%A3%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99%E0%B9%83",
				destination: "/we-are-byd",
				permanent: true,
			},

			// Specific car model content (URL encoded)
			// "BYD Dolphin ควารางวัลรถยนต์ที่ค"
			{
				source:
					"/byd-dolphin-%e0%b8%84%e0%b8%a7%e0%b9%89%e0%b8%b2%e0%b8%a3%e0%b8%b2%e0%b8%87%e0%b8%a7%e0%b8%b1%e0%b8%a5%e0%b8%a3%e0%b8%96%e0%b8%a2%e0%b8%99%e0%b8%95%e0%b9%8c%e0%b8%97%e0%b8%b5%e0%b9%88%e0%b8%84",
				destination: "/models/byd-dolphin",
				permanent: true,
			},
			// "BYD Sealion 6 DM-i ตารางผ่อน อัพเดทใหม่ล"
			{
				source:
					"/byd-sealion-6-dm-i-%E0%B8%95%E0%B8%B2%E0%B8%A3%E0%B8%B2%E0%B8%87%E0%B8%9C%E0%B9%88%E0%B8%AD%E0%B8%99-%E0%B8%AD%E0%B8%B1%E0%B8%9E%E0%B9%80%E0%B8%94%E0%B8%97%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88%E0%B8%A5",
				destination: "/models/byd-sealion6dmi",
				permanent: true,
			},
		];
	},
};

module.exports = nextConfig;
