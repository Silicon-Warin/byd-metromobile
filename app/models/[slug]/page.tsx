// app/models/[slug]/page.tsx
import { findModelBySlug, defaultModels } from "@/data/carModel";
import { notFound } from "next/navigation";
import ModelPageContent from "./modelPageContent";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
	{ params }: { params: Promise<{ slug: string }> },
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	if (!carModel) {
		return {
			title: "ไม่พบรุ่นรถยนต์",
			description: "ขออภัย ไม่พบข้อมูลรถยนต์รุ่นที่คุณค้นหา",
		};
	}

	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: `${carModel.name} | BYD Metromobile`,
		description: carModel.description,
		openGraph: {
			title: `${carModel.name} | BYD Metromobile`,
			description: carModel.description,
			images: [
				{
					url: carModel.imageUrlHero || "/images/og-default.jpg",
					width: 1200,
					height: 630,
					alt: carModel.name,
				},
				...previousImages,
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${carModel.name} | BYD Metromobile`,
			description: carModel.description,
			images: [carModel.imageUrlHero || "/images/og-default.jpg"],
		},
	};
}

// สร้าง static routes สำหรับทุกรุ่นรถที่มีอยู่ใน defaultModels
export async function generateStaticParams() {
	return defaultModels.map((model) => ({
		slug: model.slug,
	}));
}

export default async function ModelPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	if (!slug) notFound();

	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	return <ModelPageContent initialCarModel={carModel} slug={slug} />;
}
