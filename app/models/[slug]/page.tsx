import { Suspense } from "react";
import { findModelBySlug } from "@/data/carModel";
import ModelPageContent from "./modelPageContent";
import ModelPageLoading from "./loading";
import { notFound } from "next/navigation";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	// If the car model doesn't exist, show the not-found page
	if (!carModel) {
		notFound();
	}

	// Check if carModel has variants
	if (!carModel.variants || carModel.variants.length === 0) {
		console.warn(`Car model ${slug} has no variants`);
		// You could add default variants here if needed
		carModel.variants = [];
	}

	return (
		<Suspense fallback={<ModelPageLoading />}>
			<ModelPageContent initialCarModel={carModel} slug={slug} />
		</Suspense>
	);
}
