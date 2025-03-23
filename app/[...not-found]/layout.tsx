import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "หน้ากำลังปรับปรุง | BYD Metromobile",
	description: "หน้านี้กำลังอยู่ระหว่างการพัฒนา กรุณากลับมาใหม่ในภายหลัง",
};

export default function ComingSoonLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
