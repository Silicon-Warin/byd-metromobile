// app/models/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ModelPageContent from "./modelPageContent";

export async function generateStaticParams() {
	// ดึง slug จาก database
	const models = await prisma.carModel.findMany({
		select: { slug: true },
	});
	return models.map((model: { slug: any }) => ({ slug: model.slug }));
}

export default async function ModelPage({
	params,
}: {
	params: { slug: string };
}) {
	const { slug } = params;

	if (!slug) notFound();

	const carModel = await prisma.carModel.findUnique({
		where: { slug },
		include: {
			variants: {
				// ดึงข้อมูลรุ่นย่อยทั้งหมด
				include: {
					DimensionsWeight: true,
					PowertrainSystem: true,
					Performance: true,
					Battery: true,
					ChargingSystem: true,
				},
			},
			colors: true, // สีทั้งหมดของรุ่นหลัก (ยังคงไว้อยู่)
			features: true, // Include features relation
		},
	});

	if (!carModel) notFound();

	// Pass the fetched carModel data with the correct prop name
	return <ModelPageContent initialCarModel={carModel} slug={slug} />;
}
