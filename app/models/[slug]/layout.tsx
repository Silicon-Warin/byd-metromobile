// app/models/[slug]/layout.tsx
import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";

export default async function ModelPageLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	if (!slug) notFound();

	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	return <section>{children}</section>;
}
