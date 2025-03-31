import { Suspense } from "react";
import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";
import ModelPageContent from "./model-page-content";
import ModelPageLoading from "./loading";
import type { CarModel } from "./types";

type ParamsType = Promise<{ slug: string }>;

export default async function ModelPage({ params }: { params: ParamsType }) {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	if (!carModel) {
		notFound();
	}

	return (
		<Suspense fallback={<ModelPageLoading />}>
			<ModelPageContent initialCarModel={carModel as CarModel} slug={slug} />
		</Suspense>
	);
}
