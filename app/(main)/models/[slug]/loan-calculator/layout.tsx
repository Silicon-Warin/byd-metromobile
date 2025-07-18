// app/models/[slug]/loan-calculator/layout.tsx
import type React from "react";
import { notFound } from "next/navigation";
import { findModelBySlug } from "@/data/carModel";

export default async function LoanCalculatorLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	// ตรวจสอบว่ามีรถยนต์ที่ตรงกับ slug หรือไม่
	const { slug } = await params;

	if (!slug) notFound();

	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	return <section>{children}</section>;
}
