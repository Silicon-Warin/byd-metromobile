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
	title: "BYDMetromobile",
	description:
		"BYD Metromobile รถไฟฟ้าที่ล้ำสมัยสำหรับการเดินทางในเมือง ด้วยเทคโนโลยีแบตเตอรี่ขั้นสูง การทำงานที่เป็นมิตรกับสิ่งแวดล้อม และฟีเจอร์การเชื่อมต่ออัจฉริยะ BYD Metromobile มอบทางเลือกการขนส่งสาธารณะที่มีประสิทธิภาพและยั่งยืนสำหรับเมืองสมัยใหม่",
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
