import { Metadata } from "next";

// Dynamic metadata จะถูก override ด้วยข้อมูลจริงในหน้า
export const metadata: Metadata = {
	title: "รายละเอียดรถยนต์ไฟฟ้า BYD | ตารางผ่อน | BYD Metromobile",
	description:
		"ตารางผ่อนและราคารถยนต์ไฟฟ้า BYD พร้อมข้อมูลจำเพาะของรถยนต์ ทดลองคำนวณค่างวดได้ทันที",
};

export default function CarDetailLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
