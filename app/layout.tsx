import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { MainHeader } from "@/components/Header/main-header";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Viewport } from "next";
import { Toaster } from "sonner";
import URLParameterCleanup from "@/components/URLParameterCleanup";
import ScrollAnimations from "@/components/ScrollAnimations";

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
			</head>
			<body className="font-prompt bg-background text-foreground antialiased">
				<URLParameterCleanup />
				<ScrollAnimations />
				<SpeedInsights />
				<MainHeader />
				<main className="max-w-[100vw] overflow-x-hidden">{children}</main>
				<Toaster />
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
