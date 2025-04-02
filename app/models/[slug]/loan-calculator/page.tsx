import { Suspense } from "react";
import { findModelBySlug } from "@/data/carModel";
import LoanCalculatorPage from "./loanCalculatorPage";
import ModelPageLoading from "../loading";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	// If the car model doesn't exist, the layout will handle the not found case
	if (!carModel) {
		return null;
	}

	return (
		<Suspense fallback={<ModelPageLoading />}>
			<LoanCalculatorPage initialCarModel={carModel} slug={slug} />
		</Suspense>
	);
}
