// app/models/[slug]/page.tsx
import { findModelBySlug, defaultModels } from "@/data/carModel";
import { notFound } from "next/navigation";
import ModelPageContent from "./modelPageContent";

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
