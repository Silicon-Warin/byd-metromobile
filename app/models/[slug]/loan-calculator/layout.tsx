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
	const carModel = findModelBySlug(slug);

	// ถ้าไม่พบรถยนต์ที่ตรงกับ slug ให้แสดงหน้า not found
	if (!carModel) {
		notFound();
	}

	return <section>{children}</section>;
}
