"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
	ChevronRight,
	ChevronLeft,
	Car,
	Calendar,
	Percent,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { CarModel, CarVariant, defaultModels } from "@/data/carModel";
export default function Home() {
	const [selectedModel, setSelectedModel] = useState<CarModel>(
		defaultModels[0]
	);
	const [selectedVariant, setSelectedVariant] = useState<CarVariant>(
		defaultModels[0].variants[0]
	);
	const [selectedDownPayment, setSelectedDownPayment] = useState<number>(20); // Default 20%
	const [selectedTerm, setSelectedTerm] = useState<number>(60); // Default 60 months
	const [currentModelIndex, setCurrentModelIndex] = useState(0);

	const handleModelChange = (index: number) => {
		const newModel = defaultModels[index];
		setSelectedModel(newModel);
		setSelectedVariant(newModel.variants[0]);
		setCurrentModelIndex(index);
	};

	const handleVariantChange = (variant: CarVariant) => {
		setSelectedVariant(variant);
	};

	const handleDownPaymentChange = (percentage: number) => {
		setSelectedDownPayment(percentage);
	};

	const handleTermChange = (months: number) => {
		setSelectedTerm(months);
	};

	const getDownPaymentOption = () => {
		return selectedVariant.downPaymentOptions.find(
			(option) => option.percentage === selectedDownPayment
		);
	};

	const getMonthlyPayment = () => {
		const downPaymentOption = getDownPaymentOption();
		if (!downPaymentOption) return null;

		return downPaymentOption.monthlyPayments.find(
			(payment) => payment.months === selectedTerm
		);
	};

	const nextModel = () => {
		const nextIndex = (currentModelIndex + 1) % defaultModels.length;
		handleModelChange(nextIndex);
	};

	const prevModel = () => {
		const prevIndex =
			(currentModelIndex - 1 + defaultModels.length) % defaultModels.length;
		handleModelChange(prevIndex);
	};

	const downPaymentOption = getDownPaymentOption();
	const monthlyPayment = getMonthlyPayment();

	return (
		<div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
			<div className="container mx-auto px-4 py-8">
				<header className="mb-8 text-center">
					<div className="flex items-center justify-center mb-4">
						<Image
							src="/placeholder.svg?height=40&width=80"
							alt="BYD Logo"
							width={80}
							height={40}
							className="mr-2"
						/>
						<Image
							src="/placeholder.svg?height=40&width=120"
							alt="Metromobile Logo"
							width={120}
							height={40}
						/>
					</div>
					<h1 className="text-4xl font-bold text-primary mb-2">BYD Thailand</h1>
					<p className="text-muted-foreground">
						เลือกรถยนต์ไฟฟ้าที่ใช่สำหรับคุณ คำนวณค่างวดได้ทันที
					</p>
				</header>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					{/* Car Selection Section */}
					<div className="lg:col-span-2">
						<Card className="overflow-hidden">
							<CardHeader className="relative p-0 h-[300px] md:h-[400px] overflow-hidden">
								<AnimatePresence mode="wait">
									<motion.div
										key={selectedModel.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.5 }}
										className="absolute inset-0"
									>
										<Image
											src={selectedModel.imageUrlModel || "/placeholder.svg"}
											alt={selectedModel.name}
											fill
											className="object-cover"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
											<motion.h2
												className="text-3xl md:text-4xl font-bold text-white"
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.2 }}
											>
												{selectedModel.name}
											</motion.h2>
											<motion.p
												className="text-white/80 text-lg"
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ delay: 0.3 }}
											>
												{selectedModel.description}
											</motion.p>
										</div>
									</motion.div>
								</AnimatePresence>
								<Button
									variant="ghost"
									size="icon"
									className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white z-10"
									onClick={prevModel}
								>
									<ChevronLeft className="h-6 w-6" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white z-10"
									onClick={nextModel}
								>
									<ChevronRight className="h-6 w-6" />
								</Button>
							</CardHeader>
							<CardContent className="p-6">
								<Tabs
									defaultValue={selectedModel.variants[0].id}
									className="w-full"
								>
									<TabsList className="w-full mb-4 grid grid-cols-2 md:grid-cols-3 h-auto">
										{selectedModel.variants.map((variant) => (
											<TabsTrigger
												key={variant.id}
												value={variant.id}
												onClick={() => handleVariantChange(variant)}
												className="py-3"
											>
												{variant.name}
											</TabsTrigger>
										))}
									</TabsList>

									{selectedModel.variants.map((variant) => (
										<TabsContent
											key={variant.id}
											value={variant.id}
											className="space-y-4"
										>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div>
													<h3 className="text-lg font-medium mb-2">
														รายละเอียดรถยนต์
													</h3>
													<p className="text-3xl font-bold text-primary mb-2">
														฿{variant.price.toLocaleString()}
													</p>
													{variant.range && (
														<p className="text-muted-foreground mb-4">
															ระยะทางขับขี่: {variant.range}
														</p>
													)}
												</div>
												<div className="space-y-2">
													<h3 className="text-lg font-medium mb-2">
														คุณสมบัติ
													</h3>
													<ul className="text-sm text-muted-foreground space-y-1">
														{selectedModel.features
															.slice(0, 4)
															.map((feature, index) => (
																<li key={index} className="flex items-start">
																	<div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
																	<span>{feature}</span>
																</li>
															))}
													</ul>
												</div>
											</div>
										</TabsContent>
									))}
								</Tabs>
							</CardContent>
						</Card>

						<div className="mt-6">
							<h3 className="text-lg font-medium mb-4">คุณสมบัติเพิ่มเติม</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{selectedModel.features.map((feature, index) => (
									<div key={index} className="flex items-start">
										<div className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary" />
										<span className="text-sm">{feature}</span>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Payment Calculator Section */}
					<div>
						<Card className="sticky top-4">
							<CardHeader>
								<CardTitle>คำนวณค่างวด</CardTitle>
								<CardDescription>
									เลือกเงินดาวน์และระยะเวลาผ่อนชำระ
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
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
														? "default"
														: "outline"
												}
												onClick={() => handleDownPaymentChange(percentage)}
												className={cn(
													"text-sm h-10",
													selectedDownPayment === percentage &&
														"bg-primary text-primary-foreground"
												)}
											>
												{percentage}%
											</Button>
										))}
									</div>
									{downPaymentOption && (
										<motion.div
											className="mt-2 text-sm text-muted-foreground"
											initial={{ opacity: 0, y: 5 }}
											animate={{ opacity: 1, y: 0 }}
											key={`down-${selectedDownPayment}`}
										>
											เงินดาวน์: ฿{downPaymentOption.amount.toLocaleString()}
										</motion.div>
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
													selectedTerm === months ? "default" : "outline"
												}
												onClick={() => handleTermChange(months)}
												className={cn(
													"text-sm h-10",
													selectedTerm === months &&
														"bg-primary text-primary-foreground"
												)}
											>
												{months} เดือน
											</Button>
										))}
									</div>
								</div>

								<Separator />

								<div className="space-y-4">
									<div className="flex justify-between items-center">
										<span className="text-sm">ราคารถยนต์:</span>
										<span className="font-medium">
											฿{selectedVariant.price.toLocaleString()}
										</span>
									</div>
									{downPaymentOption && (
										<>
											<div className="flex justify-between items-center">
												<span className="text-sm">
													เงินดาวน์ ({selectedDownPayment}%):
												</span>
												<span className="font-medium">
													฿{downPaymentOption.amount.toLocaleString()}
												</span>
											</div>
											<div className="flex justify-between items-center">
												<span className="text-sm">ยอดจัดไฟแนนซ์:</span>
												<span className="font-medium">
													฿{downPaymentOption.remainingBalance.toLocaleString()}
												</span>
											</div>
										</>
									)}
									{monthlyPayment && (
										<div className="flex justify-between items-center">
											<span className="text-sm">อัตราดอกเบี้ย:</span>
											<span className="font-medium">
												{monthlyPayment.interestRate}
											</span>
										</div>
									)}
								</div>

								<div className="bg-muted p-4 rounded-lg">
									<div className="flex justify-between items-center">
										<span className="text-sm font-medium">ค่างวดต่อเดือน:</span>
										<AnimatePresence mode="wait">
											<motion.span
												key={`${selectedVariant.id}-${selectedDownPayment}-${selectedTerm}`}
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: 10 }}
												className="text-2xl font-bold text-primary"
											>
												฿{monthlyPayment?.amount.toLocaleString() || "-"}
											</motion.span>
										</AnimatePresence>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button className="w-full" size="lg">
									<Car className="mr-2 h-4 w-4" />
									จองรถยนต์
								</Button>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
