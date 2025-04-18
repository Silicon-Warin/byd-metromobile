import { findModelBySlug } from "@/data/carModel";
import { notFound } from "next/navigation";
import ModelPageContent from "./modelPageContent";

// Server Component
export default async function ModelPage({
	params,
}: {
	params: { slug: string };
}) {
	// ใช้ await เพื่อรอให้ params พร้อมใช้งาน
	const { slug } = await Promise.resolve(params);

	const carModel = await findModelBySlug(slug);

	if (!carModel) {
		notFound();
	}

	return <ModelPageContent initialCarModel={carModel} slug={slug} />;
}
