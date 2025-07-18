import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import type { Viewport } from "next";
import "./globals.css";

// Optimized font loading
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "optional", // เร็วกว่า swap
	preload: true,
});

const ibmPlexThai = IBM_Plex_Sans_Thai({
	subsets: ["thai"],
	weight: ["400", "700"], // ลดน้อยลง
	variable: "--font-ibm",
	display: "optional",
	preload: false, // โหลดเมื่อใช้
});

const prompt = Prompt({
	subsets: ["thai"],
	weight: ["400", "700"], // ลดน้อยลง
	variable: "--font-prompt",
	display: "optional",
	preload: true,
});

// Optimized metadata
export const metadata: Metadata = {
	metadataBase: new URL("https://bydmetromobile.com"),
	title: {
		default: "BYD Metromobile | เมโทรโมบิล ผู้นำรถยนต์ไฟฟ้า BYD",
		template: "%s | BYD Metromobile",
	},
	description:
		"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมการขาย บริการ และศูนย์บริการหลังการขาย โดย เมโทรโมบิล",
	keywords: ["เมโทรโมบิล", "BYD", "รถยนต์ไฟฟ้า"],
	authors: [{ name: "BYD Metromobile" }],
	creator: "BYD Metromobile",
	publisher: "BYD Metromobile",
	alternates: {
		canonical: "https://bydmetromobile.com",
	},
	openGraph: {
		type: "website",
		locale: "th_TH",
		url: "https://bydmetromobile.com",
		siteName: "BYD Metromobile",
		title: "BYD Metromobile | เมโทรโมบิล ผู้นำรถยนต์ไฟฟ้า BYD",
		description:
			"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมการขาย บริการ และศูนย์บริการหลังการขาย",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "BYD Metromobile",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "BYD Metromobile | เมโทรโมบิล ผู้นำรถยนต์ไฟฟ้า BYD",
		description: "ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
		images: ["/images/og-image.jpg"],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#000000" },
	],
	colorScheme: "dark",
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
				{/* Essential preconnects */}
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
				<link rel="preconnect" href="https://va.vercel-scripts.com" />

				{/* DNS prefetch for performance */}
				<link rel="dns-prefetch" href="//fonts.googleapis.com" />
				<link rel="dns-prefetch" href="//vercel-analytics.com" />
			</head>
			<body className="font-prompt bg-background text-foreground antialiased">
				{children}
			</body>
		</html>
	);
}
