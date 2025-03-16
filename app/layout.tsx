import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const ibmPlexThai = IBM_Plex_Sans_Thai({
	subsets: ["thai", "latin"],
	weight: ["300", "400", "700"],
	variable: "--font-ibm",
});

const prompt = Prompt({
	subsets: ["thai", "latin"],
	weight: ["300", "400", "700"],
	variable: "--font-prompt",
});

export const metadata: Metadata = {
	title: "BYD Metromobile - ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
	description:
		"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย พร้อมให้คำปรึกษาด้านรถยนต์ไฟฟ้าครบวงจร",
	openGraph: {
		title: "BYD Metromobile - ตัวแทนจำหน่ายรถยนต์ไฟฟ้า BYD อย่างเป็นทางการ",
		description:
			"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย",
		images: ["/images/og-image.jpg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en-th"
			className={`${inter.variable} ${prompt.variable} ${ibmPlexThai.variable}`}
		>
			<body>
				<Header />
				{children}
				<Footer />
				<Analytics />
			</body>
		</html>
	);
}
