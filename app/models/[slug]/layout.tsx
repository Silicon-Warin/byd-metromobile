import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";
import { ModelHeader } from "@/components/Header/model-header";

// app/models/[slug]/page.tsx
export default async function ModelPage({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	// รอให้ params resolve ก่อนใช้
	const { slug } = await params;

	const carModel = findModelBySlug(slug);
	if (!carModel) {
		notFound();
	}

	return (
		<section>
			<ModelHeader />
			{children}
		</section>
	);
}
