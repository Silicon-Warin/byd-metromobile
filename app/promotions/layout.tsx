// app/promotions/layout.tsx (Server Component - ไม่มี "use client")
import { Metadata } from "next";
import PromotionPage from "./page";

export const metadata: Metadata = {
	title: "โปรโมชั่น",
	description:
		"โปรโมชั่นพิเศษสำหรับรถยนต์ไฟฟ้า BYD ทุกรุ่น พร้อมข้อเสนอสุดพิเศษมากมาย",
};

export default function PromotionsPage() {
	return (
		<main>
			<PromotionPage />
		</main>
	);
}
