"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CarModel, defaultModels } from "@/data/carModel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car, Calendar, Percent, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CarDetailPage() {
	const params = useParams();
	const carSlug = params.car as string;
	const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
	const [activeTab, setActiveTab] = useState("specs");
	const [selectedVariant, setSelectedVariant] = useState<any>(null);
	const [selectedDownPayment, setSelectedDownPayment] = useState<number>(20); // Default 20%
	const [selectedTerm, setSelectedTerm] = useState<number>(60); // Default 60 months

	useEffect(() => {
		// ค้นหารถจาก slug
		if (carSlug) {
			const foundModel = defaultModels.find((model) => {
				const mainName = model.name
					.replace("BYD", "")
					.replace("NEW", "")
					.trim();
				const slug = mainName.toLowerCase().replace(/\s+/g, "");
				return slug === carSlug;
			});

			if (foundModel) {
				setSelectedModel(foundModel);
				setSelectedVariant(foundModel.variants[0]);
			}
		}
	}, [carSlug]);

	const handleVariantChange = (variant: any) => {
		setSelectedVariant(variant);
	};

	const handleDownPaymentChange = (percentage: number) => {
		setSelectedDownPayment(percentage);
	};

	const handleTermChange = (months: number) => {
		setSelectedTerm(months);
	};

	const getDownPaymentOption = () => {
		if (!selectedVariant) return null;
		return selectedVariant.downPaymentOptions.find(
			(option: any) => option.percentage === selectedDownPayment
		);
	};

	const getMonthlyPayment = () => {
		const downPaymentOption = getDownPaymentOption();
		if (!downPaymentOption) return null;

		return downPaymentOption.monthlyPayments.find(
			(payment: any) => payment.months === selectedTerm
		);
	};

	const downPaymentOption = getDownPaymentOption();
	const monthlyPayment = getMonthlyPayment();

	if (!selectedModel) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">ไม่พบข้อมูลรถยนต์</h1>
					<Link href="/models">
						<Button>
							<ArrowLeft className="mr-2 h-4 w-4" />
							กลับไปยังหน้ารุ่นรถยนต์
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
			<div className="container mx-auto px-4 py-8">
				<Link
					href="/models"
					className="inline-flex items-center text-primary mb-6 hover:underline"
				>
					<ArrowLeft className="mr-2 h-4 w-4" />
					กลับไปยังหน้ารุ่นรถยนต์ทั้งหมด
				</Link>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Car Image and Info */}
					<div className="lg:col-span-2">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-6">
								<Image
									src={selectedModel.imageUrlModel || "/placeholder.svg"}
									alt={selectedModel.name}
									fill
									className="object-cover"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
									<h1 className="text-3xl md:text-4xl font-bold text-white">
										{selectedModel.name}
									</h1>
									<p className="text-white/80 text-lg">
										{selectedModel.description}
									</p>
								</div>
							</div>

							<Tabs
								defaultValue="specs"
								className="w-full"
								onValueChange={setActiveTab}
							>
								<TabsList className="grid w-full grid-cols-3">
									<TabsTrigger value="specs">ข้อมูลจำเพาะ</TabsTrigger>
									<TabsTrigger value="features">คุณสมบัติ</TabsTrigger>
									<TabsTrigger value="variants">รุ่นและราคา</TabsTrigger>
								</TabsList>

								<TabsContent value="specs" className="mt-6">
									<Card>
										<CardHeader>
											<CardTitle>ข้อมูลจำเพาะ</CardTitle>
										</CardHeader>
										<CardContent className="space-y-4">
											<p>ข้อมูลจำเพาะเกี่ยวกับรถรุ่น {selectedModel.name}</p>

											{selectedModel.variants.map((variant) => (
												<div key={variant.id} className="border-t pt-4 mt-4">
													<h3 className="font-medium mb-2">{variant.name}</h3>
													<div className="grid grid-cols-2 gap-4">
														<div>
															<p className="text-sm text-gray-500">ราคา</p>
															<p className="font-medium">
																฿{variant.price.toLocaleString()}
															</p>
														</div>
														{variant.range && (
															<div>
																<p className="text-sm text-gray-500">
																	ระยะทางขับขี่
																</p>
																<p className="font-medium">{variant.range}</p>
															</div>
														)}
													</div>
												</div>
											))}
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="features" className="mt-6">
									<Card>
										<CardHeader>
											<CardTitle>คุณสมบัติ</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												{selectedModel.features.map((feature, index) => (
													<div key={index} className="flex items-start">
														<div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
														<span className="text-sm">{feature}</span>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="variants" className="mt-6">
									<Card>
										<CardHeader>
											<CardTitle>รุ่นและราคา</CardTitle>
										</CardHeader>
										<CardContent>
											<div className="space-y-4">
												{selectedModel.variants.map((variant) => (
													<div
														key={variant.id}
														className="border-t pt-4 mt-4 first:border-t-0 first:pt-0 first:mt-0"
													>
														<h3 className="font-medium text-lg mb-2">
															{variant.name}
														</h3>
														<p className="text-2xl font-bold text-primary mb-2">
															฿{variant.price.toLocaleString()}
														</p>
														{variant.range && (
															<p className="text-gray-500 mb-4">
																ระยะทางขับขี่: {variant.range}
															</p>
														)}
														<Button
															onClick={() => handleVariantChange(variant)}
															className="mt-2"
														>
															คำนวณค่างวด
														</Button>
													</div>
												))}
											</div>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</motion.div>
					</div>

					{/* Payment Calculator */}
					<div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.2 }}
						>
							<Card className="sticky top-24">
								<CardHeader>
									<CardTitle>ตารางผ่อน {selectedModel.name}</CardTitle>
								</CardHeader>
								<CardContent className="space-y-6">
									<div>
										<h3 className="text-sm font-medium mb-3 flex items-center">
											<Car className="w-4 h-4 mr-2" />
											เลือกรุ่น
										</h3>
										<div className="grid grid-cols-1 gap-2">
											{selectedModel.variants.map((variant) => (
												<Button
													key={variant.id}
													variant={
														selectedVariant?.id === variant.id
															? "outline"
															: "ghost"
													}
													onClick={() => handleVariantChange(variant)}
													className="justify-start h-auto py-2 px-3"
												>
													<div className="text-left">
														<div className="font-medium">{variant.name}</div>
														<div className="text-xs opacity-80">
															฿{variant.price.toLocaleString()}
														</div>
													</div>
												</Button>
											))}
										</div>
									</div>

									<div>
										<h3 className="text-sm font-medium mb-3 flex items-center">
											<Percent className="w-4 h-4 mr-2" />
											เงินดาวน์
										</h3>
										<div className="grid grid-cols-3 gap-2">
											{[5, 10, 15, 20, 25, 30].map((percentage) => (
												<Button
													key={percentage}
													variant={
														selectedDownPayment === percentage
															? "outline"
															: "ghost"
													}
													onClick={() => handleDownPaymentChange(percentage)}
													className="text-sm"
												>
													{percentage}%
												</Button>
											))}
										</div>
										{downPaymentOption && (
											<div className="mt-2 text-sm text-gray-500">
												เงินดาวน์: ฿{downPaymentOption.amount.toLocaleString()}
											</div>
										)}
									</div>

									<div>
										<h3 className="text-sm font-medium mb-3 flex items-center">
											<Calendar className="w-4 h-4 mr-2" />
											ระยะเวลาผ่อนชำระ
										</h3>
										<div className="grid grid-cols-2 gap-2">
											{[48, 60, 72, 84].map((months) => (
												<Button
													key={months}
													variant={
														selectedTerm === months ? "outline" : "ghost"
													}
													onClick={() => handleTermChange(months)}
													className="text-sm"
												>
													{months} เดือน
												</Button>
											))}
										</div>
									</div>

									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger>รายละเอียดการผ่อน</AccordionTrigger>
											<AccordionContent>
												<div className="space-y-2">
													<div className="flex justify-between">
														<span className="text-sm">ราคารถยนต์:</span>
														<span>
															฿{selectedVariant?.price.toLocaleString()}
														</span>
													</div>

													{downPaymentOption && (
														<>
															<div className="flex justify-between">
																<span className="text-sm">
																	เงินดาวน์ ({selectedDownPayment}%):
																</span>
																<span>
																	฿{downPaymentOption.amount.toLocaleString()}
																</span>
															</div>
															<div className="flex justify-between">
																<span className="text-sm">ยอดจัดไฟแนนซ์:</span>
																<span>
																	฿
																	{downPaymentOption.remainingBalance.toLocaleString()}
																</span>
															</div>
														</>
													)}

													{monthlyPayment && (
														<div className="flex justify-between">
															<span className="text-sm">อัตราดอกเบี้ย:</span>
															<span>{monthlyPayment.interestRate}</span>
														</div>
													)}
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>

									<div className="bg-card-foreground p-4 rounded-lg">
										<div className="flex justify-between items-center">
											<span className="text-sm font-medium">
												ค่างวดต่อเดือน:
											</span>
											<span className="text-2xl font-bold text-secondary">
												฿{monthlyPayment?.amount.toLocaleString() || "-"}
											</span>
										</div>
									</div>

									<Link
										href="https://line.me/R/ti/p/%40bydmetromobile"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button className="w-full" size="lg">
											ติดต่อเพื่อสอบถามเพิ่มเติม
										</Button>
									</Link>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
