"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import ModalPromotion from "./ModalPromotion";
import LineOALinkButton from "@/components/Line/line-button";

export const carModels = [
	{
		id: 1,
		name: "ATTO 3",
		subtitle: "ENERGY AWAKEN",
		image: "/images/promotions/atto3.webp",
		variants: [
			{ name: "รุ่น Premium", price: "699,900" },
			{ name: "รุ่น Extended", price: "799,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิก ยี่ห้อ XUV Max และสิทธิประโยชน์จาก RÊVER Care*",
	},
	{
		id: 2,
		name: "DOLPHIN",
		subtitle: "SURGE OF INNOVATION",
		image: "/images/promotions/dolphin.webp",
		variants: [
			{ name: "รุ่น Standard Range", price: "499,900" },
			{ name: "รุ่น Extended Range", price: "599,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิก ยี่ห้อ XUV Max และสิทธิประโยชน์จาก RÊVER Care*",
	},
	{
		id: 3,
		name: "M6",
		subtitle: "WHERE LIFE COMES TOGETHER",
		image: "/images/promotions/m6.webp",
		variants: [
			{ name: "รุ่น Dynamic (6-seat)", price: "799,900" },
			{ name: "รุ่น Extended (6-seat, 7-seat)", price: "899,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิก ยี่ห้อ XUV Max และสิทธิประโยชน์จาก RÊVER Care*",
	},
	{
		id: 4,
		name: "SEAL",
		subtitle: "DRIVE INTO THE FUTURE",
		image: "/images/promotions/seal.webp",
		variants: [
			{ name: "รุ่น Dynamic (MY 24)", price: "999,900" },
			{ name: "รุ่น Premium (MY 24)", price: "1,099,900" },
			{ name: "รุ่น AWD Performance (MY 24)", price: "1,199,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิก ยี่ห้อ XUV Max และสิทธิประโยชน์จาก RÊVER Care*",
	},
	{
		id: 5,
		name: "SEALION 6 DM-i",
		subtitle: "EFFICIENCY UNLEASHED",
		image: "/images/promotions/sealion6dmi.webp",
		variants: [
			{ name: "รุ่น Dynamic", price: "899,900" },
			{ name: "รุ่น Premium", price: "999,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิค ยี่ห้อ XUV Max และโฮมชาร์จเจอร์ ยี่ห้อ AUTEL พร้อมบริการติดตั้ง*",
	},
	{
		id: 6,
		name: "SEALION 6 DM-i",
		subtitle: "RÊVER ForceEdge Edition",
		image: "/images/promotions/sealion6dmi-rever-force-edge.webp",
		variants: [
			{ name: "รุ่น Premium (RÊVER ForceEdge Edition)", price: "1,029,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิค ยี่ห้อ XUV Max และโฮมชาร์จเจอร์ ยี่ห้อ AUTEL พร้อมบริการติดตั้ง*",
	},
	{
		id: 7,
		name: "SEALION 7",
		subtitle: "LIFE IN MOTION",
		image: "/images/promotions/sealion7.webp",
		variants: [
			{ name: "รุ่น Premium", price: "1,149,900" },
			{ name: "รุ่น AWD Performance", price: "1,249,900" },
		],
		promotion:
			"รับฟรี! ฟิล์ม เซรามิค ยี่ห้อ XUV Max และสิทธิประโยชน์จาก RÊVER Care*",
	},
];

// Type สำหรับ car model
type CarModel = (typeof carModels)[0];

const PromotionSection = () => {
	const [selectedCar, setSelectedCar] = useState<CarModel | null>(null);

	// Function สำหรับ format ตัวเลข
	const formatPrice = (price: string) => {
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<>
			<section className="py-16 px-4">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
							BYD SUPERCHARGED LINEUP
						</h2>
						<p className="text-lg md:text-xl text-blue-200">
							เลือกรถยนต์ไฟฟ้าที่เหมาะกับคุณ
						</p>
					</motion.div>

					{/* Simple Carousel with Autoplay */}
					<Carousel
						opts={{
							align: "start",
							loop: true,
						}}
						plugins={[
							Autoplay({
								delay: 5000,
								stopOnInteraction: true,
								stopOnMouseEnter: true,
							}),
						]}
						className="w-full hidden md:block"
					>
						<CarouselContent>
							{carModels.map((car, index) => (
								<CarouselItem key={car.id}>
									<div className="rounded-3xl bg-gradient-to-br from-slate-800/50 to-blue-900/50 backdrop-blur-sm border border-white/10">
										<div className="p-6 md:p-12">
											<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
												{/* Car Image */}
												<div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl">
													<Image
														src={car.image}
														alt={`BYD ${car.name}`}
														fill
														className="object-cover"
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
														priority={index === 0}
													/>
												</div>

												{/* Car Details */}
												<div className="space-y-6">
													<div>
														<h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
															NEW BYD {car.name}
														</h3>
														<p className="text-lg md:text-xl text-blue-300 font-medium">
															{car.subtitle}
														</p>
													</div>

													{/* Variants */}
													<div className="space-y-3">
														{car.variants.map((variant, idx) => (
															<div
																key={idx}
																className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/10"
															>
																<span className="text-white font-medium">
																	{variant.name}
																</span>
																<span className="text-yellow-400 font-bold text-lg">
																	ราคาพิเศษ {formatPrice(variant.price)} บาท*
																</span>
															</div>
														))}
													</div>

													{/* Promotion */}
													<div className="p-4 rounded-lg bg-red-600/20 border border-red-500/30">
														<p className="text-white font-medium text-sm md:text-base">
															<span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
																รับฟรี!
															</span>
															{car.promotion}
														</p>
													</div>

													<LineOALinkButton className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-6 rounded-full">
														<MessageCircle className="mr-2 h-5 w-5" />
														ติดต่อผ่าน LINE
													</LineOALinkButton>
												</div>
											</div>
										</div>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious className="left-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
						<CarouselNext className="right-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" />
					</Carousel>

					{/* Mobile Grid View */}
					<div className="md:hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
						{carModels.map((car) => (
							<motion.div
								key={car.id}
								className="cursor-pointer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								onClick={() => setSelectedCar(car)}
							>
								<Card className="bg-white/5 border-white/10 overflow-hidden">
									<CardContent className="p-0">
										<div className="relative aspect-square">
											<Image
												src={car.image}
												alt={`BYD ${car.name}`}
												fill
												className="object-cover"
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
											<div className="absolute bottom-4 left-4 right-4">
												<h4 className="text-white font-bold text-sm md:text-base">
													BYD {car.name}
												</h4>
												<p className="text-yellow-400 text-xs md:text-sm">
													เริ่มต้น {formatPrice(car.variants[0].price)} บาท*
												</p>
											</div>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section>
			{/* Render ModalPromotion when selectedCar is set */}
			<ModalPromotion
				selectedCar={selectedCar}
				setSelectedCar={setSelectedCar}
			/>
		</>
	);
};

export default PromotionSection;
