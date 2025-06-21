// app/models/[slug]/layout.tsx
import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";
import type { ReactNode } from "react";

type ModelPageLayoutParams = {
	children: ReactNode;
	params: Promise<{ slug: string }>;
};

export default async function ModelPageLayout({
	children,
	params,
}: ModelPageLayoutParams) {
	const { slug } = await params;

	if (!slug) notFound();

	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	return <section>{children}</section>;
}
