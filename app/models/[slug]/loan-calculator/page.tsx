//app/models/[slug]/loan-calculator/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { findModelBySlug, defaultModels } from "@/data/carModel";
import LoanCalculatorPage from "./loanCalculatorPage";

export const metadata: Metadata = {
	title: "คำนวณสินเชื่อรถยนต์ BYD | BYD Metromobile",
	description:
		"คำนวณค่างวดและสร้างแผนการผ่อนชำระรถยนต์ BYD ได้ง่ายๆ กับ BYD Metromobile",
};

// สร้าง static routes สำหรับทุกรุ่นรถที่มีอยู่ใน defaultModels
export async function generateStaticParams() {
	return defaultModels.map((model) => ({
		slug: model.slug,
	}));
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	// รอให้ params resolve ก่อนใช้
	const { slug } = await params;

	if (!slug) notFound();

	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	return <LoanCalculatorPage initialCarModel={carModel} />;
}
