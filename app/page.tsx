// app/page.tsx
import { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { defaultModels } from "@/data/carModel";

export const metadata: Metadata = {
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
	openGraph: {
		title: "BYD Metromobile | เมโทรโมบิล ผู้นำด้านรถยนต์ไฟฟ้า BYD ในประเทศไทย",
		description:
			"ศูนย์รถยนต์ไฟฟ้า BYD อย่างเป็นทางการ ครอบคลุมทั้งการขาย บริการ และศูนย์บริการหลังการขาย",
		images: ["/images/og-image.jpg"],
	},
};

export default function Home() {
	const models = defaultModels.map((model) => ({
		id: model.id.toString(),
		name: model.name,
		imageUrl: model.imageUrlModel,
		description: model.description,
	}));

	return <HomePage models={models} />;
}
