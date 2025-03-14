import type { Metadata } from "next";
import { Inter, Prompt } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

const promptThai = Prompt({
	variable: "--font-prompt",
	subsets: ["thai"],
	weight: ["400", "700"],
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
		<html lang="en" className={`${inter.variable}  ${promptThai.variable} `}>
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
