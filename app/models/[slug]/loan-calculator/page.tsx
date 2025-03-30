"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { findModelBySlug } from "@/data/carModel";
import { useLoanCalculator } from "@/hooks/useLoanCalculator";
import { useParams } from "next/navigation";
import TechSpecTable from "@/components/ui/TechSpecTable";

export default function LoanCalculatorPage() {
	// ใช้ useParams เพื่อดึง slug จาก URL
	const { slug } = useParams();
	const carModel = findModelBySlug(slug as string);
	const [selectedVariant, setSelectedVariant] = React.useState<any>(null);

	React.useEffect(() => {
		if (carModel && carModel.variants.length > 0) {
			setSelectedVariant(carModel.variants[0]);
		}
	}, [carModel]);

	const {
		selectedDownPayment,
		selectedTerm,
		handleDownPaymentChange,
		handleTermChange,
		getDownPaymentOption,
		getMonthlyPayment,
	} = useLoanCalculator(selectedVariant);

	if (!carModel) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-3xl font-bold mb-4">ไม่พบข้อมูลรถยนต์</h1>
					<Button onClick={() => window.history.back()}>ย้อนกลับ</Button>
				</div>
			</div>
		);
	}

	const downPaymentOption = getDownPaymentOption();
	const monthlyPayment = getMonthlyPayment();

	return (
		<div className="min-h-screen bg-background pt-24">
			{/* Hero Section */}
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<motion.h1
						className="text-4xl md:text-5xl font-bold mb-4 text-foreground"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						ตารางผ่อน {carModel.name}
					</motion.h1>
					<p className="text-muted-foreground">{carModel.description}</p>
				</div>

				{/* Main Calculator Section */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
					{/* Left Column - Car Image & Variants */}
					<Card className="p-6">
						<div className="relative h-[300px] mb-6">
							<Image
								src={carModel.imageUrlModel || "/placeholder.svg"}
								alt={carModel.name}
								fill
								className="object-contain"
							/>
						</div>

						<div className="space-y-4">
							<h3 className="text-lg font-semibold">เลือกรุ่น</h3>
							<div className="grid grid-cols-1 gap-2">
								{carModel.variants.map((variant: any) => (
									<Button
										key={variant.id}
										variant={
											selectedVariant?.id === variant.id ? "default" : "outline"
										}
										onClick={() => setSelectedVariant(variant)}
										className="justify-between h-auto py-4"
									>
										<div className="text-left">
											<div className="font-semibold">{variant.name}</div>
											<div className="text-sm opacity-80">
												ระยะทาง {variant.range}
											</div>
										</div>
										<div className="text-right">
											<div className="font-semibold">
												฿{variant.price.toLocaleString()}
											</div>
										</div>
									</Button>
								))}
							</div>
						</div>
					</Card>

					{/* Right Column - Calculator */}
					<div className="space-y-6">
						{/* Down Payment Selection */}
						<Card>
							<CardHeader>
								<CardTitle>เงินดาวน์</CardTitle>
								<CardDescription>
									เลือกเปอร์เซ็นต์เงินดาวน์ที่ต้องการ
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-3 gap-2">
									{selectedVariant?.downPaymentOptions.map((option: any) => (
										<Button
											key={option.percentage}
											variant={
												selectedDownPayment === option.percentage
													? "default"
													: "outline"
											}
											onClick={() => handleDownPaymentChange(option.percentage)}
											className="flex flex-col p-4 h-auto"
										>
											<span className="text-lg font-bold">
												{option.percentage}%
											</span>
											<span className="text-sm">
												฿{option.amount.toLocaleString()}
											</span>
										</Button>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Term Selection */}
						<Card>
							<CardHeader>
								<CardTitle>ระยะเวลาผ่อน</CardTitle>
								<CardDescription>
									เลือกจำนวนงวดที่ต้องการผ่อนชำระ
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
									{downPaymentOption?.monthlyPayments.map((payment: any) => (
										<Button
											key={payment.months}
											variant={
												selectedTerm === payment.months ? "default" : "outline"
											}
											onClick={() => handleTermChange(payment.months)}
											className="flex flex-col p-4 h-auto"
										>
											<span className="text-lg font-bold">
												{payment.months}
											</span>
											<span className="text-sm">เดือน</span>
										</Button>
									))}
								</div>
							</CardContent>
						</Card>

						{/* Summary */}
						<Card className="bg-card text-card-foreground">
							<CardHeader>
								<CardTitle>สรุปการคำนวณ</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid grid-cols-2 gap-4">
									<div>
										<div className="text-sm opacity-80">ราคารถ</div>
										<div className="text-2xl font-bold">
											฿{selectedVariant?.price.toLocaleString()}
										</div>
									</div>
									<div>
										<div className="text-sm opacity-80">เงินดาวน์</div>
										<div className="text-2xl font-bold">
											฿{downPaymentOption?.amount.toLocaleString()}
										</div>
									</div>
									<div>
										<div className="text-sm opacity-80">ดอกเบี้ย</div>
										<div className="text-2xl font-bold">
											{monthlyPayment?.interestRate}
										</div>
									</div>
									<div>
										<div className="text-sm opacity-80">ค่างวดต่อเดือน</div>
										<div className="text-2xl font-bold">
											฿{monthlyPayment?.amount.toLocaleString()}
										</div>
									</div>
								</div>
								<Button
									className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
									size="lg"
									onClick={() =>
										window.open(
											"https://line.me/R/ti/p/%40bydmetromobile",
											"_blank"
										)
									}
								>
									จองรถยนต์
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>

				{/* Features Section */}
				<div className="mb-12">
					<Card>
						<CardHeader>
							<CardTitle>ของแถมและโปรโมชั่น</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
								{carModel.promotion.map((feature: string, index: number) => (
									<div key={index} className="flex items-start space-x-2">
										<div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
											✓
										</div>
										<span>{feature}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Technical Specification Section */}
				{selectedVariant && selectedVariant.techSpec && (
					<div className="mt-16">
						<h2 className="text-2xl font-bold mb-6 text-foreground">
							ข้อมูลทางเทคนิค
						</h2>
						<TechSpecTable
							techSpec={selectedVariant.techSpec}
							variantName={`${carModel.name} ${selectedVariant.name}`}
						/>
					</div>
				)}

				{/* All Variants Specification Table */}
				<div className="mt-16">
					<h2 className="text-2xl font-bold mb-6 text-foreground">
						เปรียบเทียบสเปคทุกรุ่น
					</h2>
					<TechSpecTable
						variantsList={carModel.variants.map((variant: any) => ({
							id: variant.id,
							name: variant.name,
							techSpec: variant.techSpec,
						}))}
						selectedVariantId={selectedVariant?.id}
						onVariantChange={(variantId) => {
							const newVariant = carModel.variants.find(
								(v: any) => v.id === variantId
							);
							if (newVariant) {
								setSelectedVariant(newVariant);
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
}
