import { Metadata } from "next";
import { notFound } from "next/navigation";
import { findModelBySlug, defaultModels } from "@/data/carModel";
import LoanCalculatorPage from "./loanCalculatorPage";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
// ✅ Dynamic Metadata Generation
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	if (!carModel) {
		return {
			title: "ไม่พบรุ่นรถ",
			description: "ไม่พบรุ่นรถที่คุณค้นหา",
		};
	}

	// สร้าง metadata เฉพาะสำหรับแต่ละรุ่น
	return {
		title: `คำนวณสินเชื่อ ${carModel.name} | ตารางผ่อน ${carModel.name}`,
		description: `คำนวณค่างวด ${
			carModel.name
		} ฟรี ✓ ตารางผ่อนชำระ ✓ คิดดอกเบี้ย ✓ เปรียบเทียบแผนการผ่อน ${
			carModel.name
		} ราคาเริ่มต้น ${carModel.price?.toLocaleString()} บาท`,

		keywords: [
			`ผ่อน ${carModel.name}`,
			`ตารางผ่อน ${carModel.name}`,
			`คำนวณสินเชื่อ ${carModel.name}`,
			`คิดดอกเบี้ย ${carModel.name}`,
			`${carModel.name} loan calculator`,
			`แผนการผ่อน ${carModel.name}`,
			`เงินดาวน์ ${carModel.name}`,
			`BYD ${carModel.name} ผ่อน`,
			`BYD ${carModel.name} installment`,
			`BYD Metromobile ${carModel.name}`,
		].join(", "),

		// Specific Open Graph
		openGraph: {
			title: `คำนวณสินเชื่อ ${carModel.name} | BYD Metromobile`,
			description: `คำนวณค่างวด ${carModel.name} ฟรี ตารางผ่อนชำระ คิดดอกเบี้ย เปรียบเทียบแผนการผ่อน`,
			images: [
				{
					url:
						carModel.imageUrlHero ||
						`/images/models/${carModel.slug}/og-loan-calculator.jpg`, // Fallback
					width: 1200,
					height: 630,
					alt: `คำนวณสินเชื่อ ${carModel.name} - BYD Metromobile`,
				},
			],
			url: `https://bydmetromobile.com/models/${carModel.slug}/loan-calculator`,
		},

		// Canonical URL
		alternates: {
			canonical: `https://bydmetromobile.com/models/${carModel.slug}/loan-calculator`,
		},
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const carModel = findModelBySlug(slug);

	if (!carModel) notFound();

	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebApplication",
		name: `${carModel.name} Loan Calculator`,
		description: `คำนวณสินเชื่อ ${carModel.name} ออนไลน์ฟรี`,
		url: `https://bydmetromobile.com/models/${carModel.slug}/loan-calculator`,
		applicationCategory: "FinanceApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "THB",
		},
		provider: {
			"@type": "Organization",
			name: "BYD Metromobile",
			url: "https://bydmetromobile.com",
		},
		about: {
			"@type": "Product",
			name: carModel.name,
			brand: "BYD",
			offers: {
				"@type": "Offer",
				price: carModel.price,
				priceCurrency: "THB",
			},
		},
	};

	return (
		<>
			{/* JSON-LD Structured Data */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>

			<LoanCalculatorPage initialCarModel={carModel} />
		</>
	);
}
