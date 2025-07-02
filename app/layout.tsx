import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import { MainHeader } from "@/components/Header/main-header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import type { Viewport } from "next";
import { Toaster } from "sonner";
import ContactFAB from "@/components/ContactFAB";
import { WebVitalReporter } from "@/components/WebVitalReporter";

import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const ibmPlexThai = IBM_Plex_Sans_Thai({
	subsets: ["thai"],
	weight: ["300", "400", "700"],
	variable: "--font-ibm",
	display: "swap",
});

const prompt = Prompt({
	subsets: ["thai"],
	weight: ["300", "400", "700"],
	variable: "--font-prompt",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://bydmetromobile.com"),
	title: "BYD Metromobile | เมโทรโมบิล ผู้นำด้านรถยนต์ไฟฟ้า BYD ในประเทศไทย",
	description:
		"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย พร้อมให้คำปรึกษาด้านรถยนต์ไฟฟ้าครบวงจร โดย เมโทรโมบิล",
	keywords: [
		"เมโทรโมบิล",
		"BYD",
		"รถยนต์ไฟฟ้า",
		"Metromobile",
		"ศูนย์บริการ BYD",
	],
	// Canonical URL to prevent duplicate content from URL parameters
	alternates: {
		canonical: "https://bydmetromobile.com",
	},
	openGraph: {
		title: "BYD Metromobile | เมโทรโมบิล ผู้นำด้านรถยนต์ไฟฟ้า BYD ในประเทศไทย",
		description:
			"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย",
		images: ["/images/og-image.jpg"],
		url: "https://bydmetromobile.com",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: "#000000",
	viewportFit: "cover",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="th"
			className={`dark ${inter.variable} ${prompt.variable} ${ibmPlexThai.variable}`}
		>
			<head>
				<meta name="format-detection" content="telephone=no" />
				<meta name="image-rendering" content="optimizeQuality" />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

				{/* Critical Image Preloads for LCP Optimization */}
				<link
					rel="preload"
					as="image"
					href="/images/banners/byd-banner-1.webp"
					fetchPriority="high"
					type="image/webp"
				/>

				{/* Responsive preloads for different screen sizes */}
				<link
					rel="preload"
					as="image"
					href="/_next/image?url=/images/banners/byd-banner-1.webp&w=768&q=75"
					media="(max-width: 768px)"
					type="image/webp"
				/>
				<link
					rel="preload"
					as="image"
					href="/_next/image?url=/images/banners/byd-banner-1.webp&w=1200&q=85"
					media="(min-width: 769px) and (max-width: 1200px)"
					type="image/webp"
				/>
				<link
					rel="preload"
					as="image"
					href="/_next/image?url=/images/banners/byd-banner-1.webp&w=1920&q=85"
					media="(min-width: 1201px)"
					type="image/webp"
				/>

				{/* DNS prefetch for external resources */}
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
			</head>
			<body className="font-prompt bg-background text-foreground antialiased">
				<WebVitalReporter />
				<MainHeader />
				<main className="max-w-[100vw] overflow-x-hidden flex-1">
					{children}
				</main>
				<Footer />
				<Toaster />
				<ContactFAB />

				<Analytics />
			</body>
		</html>
	);
}
