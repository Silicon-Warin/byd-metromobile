// app/promotions/layout.tsx
import type { Metadata } from "next";
import PromotionPage from "./page";

export const metadata: Metadata = {
	title: "โปรโมชั่นรถยนต์ไฟฟ้า BYD | ข้อเสนอพิเศษ | BYD Metromobile",
	description:
		"รับข้อเสนอพิเศษสำหรับรถยนต์ไฟฟ้า BYD ทุกรุ่น ทั้ง ATTO 3, DOLPHIN, SEAL และ SEAL U พร้อมโปรโมชั่นส่วนลด ดอกเบี้ย 0% และของแถมพิเศษ",
	keywords:
		"โปรโมชั่นรถ BYD, ส่วนลดรถยนต์ไฟฟ้า, BYD ATTO 3 โปรโมชั่น, BYD DOLPHIN ราคาพิเศษ, BYD SEAL ดอกเบี้ยต่ำ, BYD SEAL U แคมเปญพิเศษ, รถไฟฟ้าราคาพิเศษ",
	alternates: {
		canonical: "https://bydmetromobile.com/promotions",
	},
};

export default function PromotionsPage() {
	return (
		<main>
			<PromotionPage />
		</main>
	);
}
