// app/page.tsx (Server Component)
import HomePageComponent from "@/components/HomePage";
import { defaultModels } from "@/data/carModel";

// ตั้งค่า ISR regenerate ทุก 24 ชั่วโมง
export const dynamic = "force-static";
export const revalidate = 86400;

export default function HomePage() {
	// แปลงข้อมูลให้ตรงกับที่ HomePage component ต้องการ
	const models = defaultModels.map((model) => ({
		id: model.id.toString(),
		name: model.name,
		imageUrl: model.imageUrlModel,
	}));

	// เพิ่ม metadata เพื่อ optimization
	// ส่งข้อมูลที่ได้ไปให้ Client Component
	return <HomePageComponent models={models} />;
}
