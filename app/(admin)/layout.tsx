import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

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
	title: "BYD Metro Admin Panel",
	description: "ระบบจัดการเนื้อหาสำหรับ BYD Metromobile",
	robots: "noindex, nofollow", // ป้องกันไม่ให้ search engines index admin panel
};

export default function AdminRootLayout({
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
				<meta name="robots" content="noindex, nofollow" />
				<meta name="googlebot" content="noindex, nofollow" />
			</head>
			<body className="font-prompt bg-gray-50 dark:bg-gray-900 text-foreground antialiased">
				{/* Admin-specific layout without main site header/footer */}
				<div className="min-h-screen">{children}</div>
				<Toaster />
			</body>
		</html>
	);
}
