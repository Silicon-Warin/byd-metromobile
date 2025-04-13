// app/promotions/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
	title:
		"โปรโมชั่นสงกรานต์ BIG SPLASH BIG DEAL | รถยนต์ไฟฟ้า BYD | Metromobile",
	description:
		"โปรโมชั่นสงกรานต์ BIG SPLASH BIG DEAL กับรถยนต์ไฟฟ้า BYD ผ่อนเริ่มต้นเบาๆ แค่ 5,213 บาท ราคาเริ่มต้นเพียง 499,900 บาท พร้อมข้อเสนอพิเศษรับหน้าร้อน ถึง 30 เมษายน 2568",
	keywords:
		"โปรโมชั่นสงกรานต์ BYD, BIG SPLASH BIG DEAL, รถยนต์ไฟฟ้าราคาพิเศษ, BYD DOLPHIN โปรโมชั่น, BYD ATTO 3 ผ่อนถูก, รถไฟฟ้าสงกรานต์, รถไฟฟ้าหน้าร้อน, รถไฟฟ้าราคาพิเศษ",
	alternates: {
		canonical: "https://bydmetromobile.com/promotions",
	},
	openGraph: {
		title: "โปรโมชั่นสงกรานต์ BIG SPLASH BIG DEAL | รถยนต์ไฟฟ้า BYD",
		description:
			"ดีลร้อนแรงที่สุดของปี! ผ่อนเริ่มต้นเบาๆ แค่ 5,213 บาท ราคาเริ่มต้นเพียง 499,900 บาท",
		images: ["/images/songkran-promotion-og.jpg"],
		type: "website",
		locale: "th_TH",
	},
};

export default function PromotionsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main>{children}</main>;
}
