import type { Metadata } from "next";
import { Inter, Prompt, IBM_Plex_Sans_Thai } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@/components/Header/Header";
import { Footer } from "@/components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LiffProvider } from "@/context/liffProvider";

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
				<LiffProvider liffId={process.env.NEXT_PUBLIC_LIFF_ID || ""}>
					<SpeedInsights />
					<Header />
					{children}
					<Footer />
					<Analytics />
				</LiffProvider>
			</body>
		</html>
	);
}
