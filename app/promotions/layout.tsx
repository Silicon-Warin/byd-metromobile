import BackgroundEffects from "@/components/BackgroundEffects";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "โปรโมชั่นพฤษภาคม 2025 | รถยนต์ไฟฟ้า BYD | Metromobile",
	description:
		"เปลี่ยนเพื่อชีวิตที่ดีกว่า CHARGE YOUR LIFE ⚡ ไม่มีอะไรยั่งยืน...เท่ากับการ “เปลี่ยน” เลือก BYD แล้วชีวิตจะไม่เหมือนเดิมอีกต่อไป โปรโมชั่นพิเศษประจำเดือนพฤษภาคม 2025 ที่ BYD Metromobile ดีลเลอร์ยอดขายกว่า 5,000 คัน พร้อมศูนย์บริการครบวงจร",
	keywords:
		"โปรโมชั่น BYD พฤษภาคม 2025, รถยนต์ไฟฟ้า BYD, ดีลพิเศษ BYD, เปลี่ยนเพื่อชีวิตที่ดีกว่า, ตารางผ่อน BYD, BYD Metromobile, ดีลเลอร์ BYD, ศูนย์บริการ BYD",
	alternates: {
		canonical: "https://bydmetromobile.com/promotions",
	},
	openGraph: {
		title: "โปรโมชั่น BYD พฤษภาคม 2025 | เปลี่ยนเพื่อชีวิตที่ดีกว่า",
		description:
			"CHARGE YOUR LIFE ⚡ ไม่มีอะไรยั่งยืน...เท่ากับการ “เปลี่ยน” เลือก BYD แล้วชีวิตจะไม่เหมือนเดิมอีกต่อไป โปรโมชั่นใหม่ประจำเดือนพฤษภาคม 2025 ที่ BYD Metromobile ดีลเลอร์ยอดขายกว่า 5,000 คัน",
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
	return (
		<section>
			<BackgroundEffects />
			{children}
		</section>
	);
}
