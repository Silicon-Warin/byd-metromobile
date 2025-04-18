"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import ModelOverview from "./modelOverview";
import ColorSelectorSection from "./color-selector-section";
import BYDSection from "./byd-section";
import type { CarColor, CarModel } from "@/data/carModel";
import { GallerySection } from "@/components/Models/GallerySection";
interface ModelPageContentProps {
	initialCarModel: CarModel;
	slug: string;
}

export default function ModelPageContent({
	initialCarModel,
	slug,
}: ModelPageContentProps) {
	const [carModel] = useState<CarModel>(initialCarModel);
	const [selectedColor, setSelectedColor] = useState<CarColor | null>(
		carModel?.colors && carModel.colors.length > 0 ? carModel.colors[0] : null
	);

	const selectedVariant =
		carModel.variants && carModel.variants.length > 0
			? carModel.variants[0]
			: null;

	const heroRef = useRef<HTMLDivElement>(null);

	const scrollToOverview = () => {
		const overview = document.getElementById("overview");
		if (overview) {
			overview.scrollIntoView({ behavior: "smooth" });
		}
	};

	const highlights = carModel.techHighlight || [];

	return (
		<div className="bg-background text-foreground">
			{/* Hero Section with Full Screen Car Image */}
			<div className="relative h-screen w-full" ref={heroRef}>
				<Image
					src={carModel.imageUrlHero || "/placeholder.svg"}
					alt={carModel.name}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent">
					<div className="container mx-auto h-full flex flex-col justify-evenly items-center text-center px-4">
						<motion.h1
							className="text-5xl md:text-7xl font-bold mb-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							{carModel.name}
						</motion.h1>
						<motion.p
							className="text-xl md:text-2xl mb-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
						>
							{carModel?.tagline || ""}
						</motion.p>

						<motion.div
							className="flex flex-wrap justify-center gap-4 mt-8"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 }}
						>
							<div className="text-center px-6 py-4 sm:py-0 w-full sm:w-auto">
								<p className="text-3xl font-bold">
									{carModel?.specs?.acceleration || ""}
								</p>
								<p className="text-sm text-gray-300">0-100 กม./ชม.</p>
							</div>
							<div className="text-center px-6 py-4 sm:py-0 w-[1/2] sm:w-auto border-t border-b sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r border-gray-600">
								<p className="text-3xl font-bold">
									{carModel?.specs?.range || ""}
								</p>
								<p className="text-sm text-gray-300">ระยะทางขับขี่</p>
							</div>
							<div className="text-center px-6 py-4 sm:py-0 w-full sm:w-auto">
								<p className="text-3xl font-bold">
									{carModel?.specs?.drivetrain || ""}
								</p>
								<p className="text-sm text-gray-300">
									{carModel?.specs?.motor || ""}
								</p>
							</div>
						</motion.div>

						<motion.div
							className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.8 }}
							onClick={scrollToOverview}
						>
							<ChevronDown className="w-10 h-10 animate-scroll-down" />
						</motion.div>
					</div>
				</div>
			</div>

			{/* Overview Section */}
			<ModelOverview
				id="overview"
				carModel={carModel}
				selectedVariant={selectedVariant}
			/>

			{/* BYD Section */}
			<BYDSection carModel={carModel} />

			{/* Showcase Swiper Section */}
			<section
				id="showcase"
				className="py-20 bg-gradient-to-b from-background to-card"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-12 text-start">
						{carModel?.featuresTitle || "คุณสมบัติเด่น"}
					</h2>

					<Swiper
						modules={[Navigation, Pagination, Autoplay]}
						spaceBetween={20}
						slidesPerView={1}
						breakpoints={{
							640: { slidesPerView: 2 },
							1024: { slidesPerView: 3 },
						}}
						navigation
						pagination={{ clickable: true }}
						autoplay={{ delay: 5000 }}
						className="showcase-swiper"
					>
						{carModel?.features &&
							Array.isArray(carModel.features) &&
							carModel.features.map((feature: any, index: number) => (
								<SwiperSlide key={index}>
									<div className="bg-card rounded-lg overflow-hidden h-[500px] relative">
										<Image
											src={
												typeof feature === "object" && feature.image
													? feature.image
													: "/placeholder.svg"
											}
											alt={
												typeof feature === "object" && feature.title
													? feature.title
													: `Feature ${index + 1}`
											}
											fill
											className="object-cover"
										/>
										<div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
											<h3 className="text-lg text-gray-400">
												{typeof feature === "object" && feature.title
													? feature.title
													: ""}
											</h3>
											<p className="text-2xl font-semibold">
												{typeof feature === "object" && feature.description
													? feature.description
													: feature}
											</p>
										</div>
									</div>
								</SwiperSlide>
							))}
					</Swiper>
				</div>
			</section>

			{/* Choose Color and Model Section */}
			<section
				id="colors"
				className="py-10 sm:py-16 md:py-20 bg-gradient-to-b from-card to-background"
			>
				{carModel?.colors &&
					carModel.colors.length > 0 &&
					selectedColor &&
					setSelectedColor && (
						<ColorSelectorSection
							colors={carModel.colors}
							initialColor={selectedColor}
							onColorChange={setSelectedColor}
							modelName={carModel.name}
						/>
					)}
			</section>

			<GallerySection carModel={carModel} highlights={highlights} />

			{/* Cards Section */}
			<section className="container mx-auto py-16 px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{/* Test Drive Card */}
					<Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 h-full">
						<CardHeader>
							<CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
								ทดลองขับ
							</CardTitle>
							<CardDescription className="text-gray-300 text-lg">
								สัมผัสประสบการณ์การขับขี่แห่งอนาคต จองการทดลองขับของคุณวันนี้
							</CardDescription>
						</CardHeader>
						<CardFooter className="mt-auto">
							<Button className="bg-bydblue hover:bg-bydblue/80 text-white font-medium px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all">
								<span>ลงทะเบียนทดลองขับ</span>
								<ArrowRight className="h-4 w-4" />
							</Button>
						</CardFooter>
					</Card>

					{/* Finance Card */}
					<Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-800 h-full">
						<CardHeader>
							<CardTitle className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
								โซลูชันทางการเงิน
							</CardTitle>
							<CardDescription className="text-gray-300 text-lg">
								ค้นพบทางเลือกทางการเงินที่ยืดหยุ่น
								ด้วยแผนการผ่อนชำระที่ออกแบบมาเพื่อไลฟ์สไตล์ของคุณโดยเฉพาะ
							</CardDescription>
						</CardHeader>
						<CardFooter className="mt-auto">
							<Link href={`/models/${slug}/loan-calculator`}>
								<Button className="bg-bydblue hover:bg-bydblue/80 text-white font-medium px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all">
									<span>ดูตารางผ่อน</span>
									<ArrowRight className="h-4 w-4" />
								</Button>
							</Link>
						</CardFooter>
					</Card>
				</div>
			</section>

			{/* Footer Image Area */}
			<section className="relative h-[400px]">
				<Image
					src="/images/footer-image.png"
					alt="BYD Electric Vehicles"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/60 flex items-center justify-center">
					<div className="text-center">
						<h2 className="text-4xl font-bold mb-6">ขับเคลื่อนสู่อนาคต</h2>
						<p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
							ร่วมเป็นส่วนหนึ่งของการปฏิวัติยานยนต์ไฟฟ้ากับ BYD Metromobile
						</p>
					</div>
				</div>
			</section>

			{/* Compare Link Section */}
			<section className="py-10 bg-gradient-to-b from-background to-card">
				<div className="container mx-auto px-4 text-center">
					<h3 className="text-2xl font-bold mb-4">
						ต้องการเปรียบเทียบกับรุ่นอื่นหรือไม่?
					</h3>
					<p className="text-gray-400 mb-6">
						ค้นพบความแตกต่างระหว่างรุ่นต่างๆ
						เพื่อพิจารณาว่ารุ่นไหนที่เหมาะกับคุณมากที่สุด
					</p>
					<Link href="/models/compare">
						<Button className="bg-bydblue hover:bg-bydblue/80 min-w-[200px]">
							เปรียบเทียบรุ่นรถยนต์
						</Button>
					</Link>
				</div>
			</section>

			{/* Action Buttons Section */}
			<section className="py-12 bg-richblack">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-4">
						<Button className="bg-bydblue hover:bg-bydblue/80 min-w-[150px]">
							จองทดลองขับ
						</Button>

						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white min-w-[150px]"
						>
							ติดต่อเรา
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
