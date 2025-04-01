"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ArrowRight,
} from "lucide-react";
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

import type { CarModel, CarColor, CarVariant } from "./types";
import TechSpecTable from "@/components/ui/TechSpecTable";
import CarSpecComparison from "@/components/CarSpecComparison";
import ModelOverview from "./model-overview";
import ColorSelector from "./color-selector";

export default function ModelPageContent({
	initialCarModel,
	slug,
}: {
	initialCarModel: CarModel;
	slug: string;
}) {
	const [carModel] = useState<CarModel>(initialCarModel);
	const [selectedColor, setSelectedColor] = useState<CarColor | null>(
		carModel.colors && carModel.colors.length > 0 ? carModel.colors[0] : null
	);
	const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(
		carModel.variants && carModel.variants.length > 0
			? carModel.variants[0]
			: null
	);
	const heroRef = useRef<HTMLDivElement>(null);

	const scrollToShowcase = () => {
		const showcase = document.getElementById("showcase");
		if (showcase) {
			showcase.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-background text-foreground">
			{/* Hero Section with Full Screen Car Image */}
			<div className="relative h-screen w-full" ref={heroRef} id="overview">
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
							onClick={scrollToShowcase}
						>
							<ChevronDown className="w-10 h-10 animate-scroll-down" />
						</motion.div>
					</div>
				</div>
			</div>

			{/* Overview Section - เพิ่มใหม่ */}
			<ModelOverview carModel={carModel} selectedVariant={selectedVariant} />

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
				className="py-20 bg-gradient-to-b from-card to-background"
			>
				<div className="container mx-auto px-4">
					<motion.h2
						className="text-4xl font-bold mb-12 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						การออกแบบ
					</motion.h2>

					{carModel.colors && carModel.colors.length > 0 && selectedColor && (
						<ColorSelector
							colors={carModel.colors}
							initialColor={selectedColor}
							onColorChange={setSelectedColor}
							modelName={carModel.name}
						/>
					)}

					<div className="mt-16">
						<h3 className="text-2xl font-bold mb-6 text-center">
							เลือกรุ่นที่เหมาะกับคุณ
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{carModel?.variants &&
								carModel.variants.map((variant: CarVariant) => (
									<motion.div
										key={variant.id}
										className={`border rounded-lg p-6 cursor-pointer transition-all ${
											selectedVariant?.id === variant.id
												? "border-bydblue bg-card/40"
												: "border-border hover:border-border/60"
										}`}
										onClick={() => setSelectedVariant(variant)}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<h4 className="text-xl font-bold mb-2">
											{carModel?.name || ""} {variant.name}
										</h4>
										<p className="text-3xl font-bold mb-4">
											฿{variant.price.toLocaleString()}
										</p>
										<div className="grid grid-cols-2 gap-4 text-sm">
											<div>
												<p className="text-gray-400">กำลัง</p>
												<p>{variant.power}</p>
											</div>
											<div>
												<p className="text-gray-400">ระยะทาง</p>
												<p>{variant.range}</p>
											</div>
										</div>
									</motion.div>
								))}
						</div>
					</div>
				</div>
			</section>

			{/* Two Side Pic and Paragraph Section */}
			<section className="py-20 bg-gradient-to-b from-richblack to-black">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div className="relative h-[400px] rounded-xl overflow-hidden">
							<Image
								src="/images/cell-to-body.png"
								alt="Advanced Cell-to-Body Technology"
								fill
								className="object-cover"
							/>
						</div>
						<div>
							<h2 className="text-4xl font-bold mb-4">
								Advanced Cell-to-Body{" "}
								<span className="text-bydblue">Technology.</span>
							</h2>
							<p className="text-gray-300 mb-6">
								BYD SEAL is the first vehicle to implement the Cell-to-Body
								(CTB) technology, which fully integrates the BYD Blade Battery
								into the entire vehicle structure and enhances the vehicle's
								safety.
							</p>
							<p className="text-gray-300 mb-6">
								It is inspired by the high-strength honeycomb aluminium panel
								structure.
							</p>
							<Button
								variant="outline"
								className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white"
							>
								Learn More <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-24">
						<div className="order-2 md:order-1">
							<h2 className="text-4xl font-bold mb-4">
								Dynamic <span className="text-bydblue">cornering.</span>
							</h2>
							<p className="text-gray-300 mb-6">
								Frequency Selective Damping (FSD) blends road handling and
								comfort.
							</p>
							<p className="text-gray-300 mb-6">
								This groundbreaking FSD technology means the BYD SEAL
								Performance hugs corners with ease while giving a high quality,
								comfortable ride.
							</p>
							<Button
								variant="outline"
								className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white"
							>
								Learn More <ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
						<div className="relative h-[400px] rounded-xl overflow-hidden order-1 md:order-2">
							<Image
								src="/images/dynamic-cornering.png"
								alt="Dynamic Cornering"
								fill
								className="object-cover"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Showcase 2 Swiper Section */}
			<section className="py-20 bg-gradient-to-b from-black to-richblack">
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-4 text-center">
						Premium style.{" "}
						<span className="text-bydblue">Intelligent architecture.</span>
					</h2>
					<p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
						Experience the perfect blend of aesthetics and engineering in the
						BYD SEAL.
					</p>

					{carModel?.gallery && carModel.gallery.length > 0 && (
						<Swiper
							modules={[Navigation, Pagination, Autoplay]}
							spaceBetween={20}
							slidesPerView={1}
							breakpoints={{
								768: { slidesPerView: 2 },
								1280: { slidesPerView: 3 },
							}}
							navigation={{
								nextEl: ".swiper-button-next",
								prevEl: ".swiper-button-prev",
							}}
							pagination={{ clickable: true }}
							autoplay={{ delay: 5000 }}
							className="gallery-swiper"
						>
							{carModel.gallery.map((image: string, index: number) => (
								<SwiperSlide key={index}>
									<div className="relative h-[400px] rounded-xl overflow-hidden">
										<Image
											src={image || "/placeholder.svg"}
											alt={`${carModel.name} Gallery Image ${index + 1}`}
											fill
											className="object-cover"
										/>
									</div>
								</SwiperSlide>
							))}
							<div className="swiper-button-prev absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">
								<ChevronLeft className="h-6 w-6" />
							</div>
							<div className="swiper-button-next absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white">
								<ChevronRight className="h-6 w-6" />
							</div>
						</Swiper>
					)}
				</div>
			</section>

			{/* 16:9 Pic of Car */}
			<section className="py-20 bg-gradient-to-b from-background to-black">
				<div className="container mx-auto px-4">
					<div className="relative aspect-video rounded-xl overflow-hidden">
						<Image
							src="/images/seal-widescreen.png"
							alt={carModel.name}
							fill
							className="object-cover"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
							<div>
								<h2 className="text-4xl font-bold mb-4">
									สัมผัสประสบการณ์การขับขี่แห่งอนาคต
								</h2>
								<p className="text-xl text-gray-300 max-w-2xl">
									BYD SEAL ผสมผสานเทคโนโลยีล้ำสมัยกับการออกแบบที่สง่างาม
									เพื่อมอบประสบการณ์การขับขี่ที่ไม่เหมือนใคร
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

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
								สัมผัสประสบการณ์การขับขี่แห่งอนาคตกับ BYD SEAL
								จองการทดลองขับของคุณวันนี้
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

			{/* Variants Comparison Section */}
			{/* <section
				id="variants"
				className="py-20 bg-gradient-to-b from-richblack to-black"
			>
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold mb-4">
							เปรียบเทียบรุ่นย่อย {carModel.name}
						</h2>
						<p className="text-gray-300">
							<Link href="#" className="text-bydblue hover:underline">
								ดาวน์โหลดโบรชัวร์
							</Link>
						</p>
					</div>

					{carModel.variants && carModel.variants.length > 1 ? (
						<CarSpecComparison
							cars={carModel.variants.map((variant) => ({
								id: variant.id,
								brand: "BYD",
								model: carModel.name,
								name: variant.name,
								image:
									selectedColor?.image ||
									carModel.imageUrlModel ||
									"/placeholder.svg",
								colors: carModel.colors?.map((color) => color.code) || [
									"#000000",
									"#FFFFFF",
									"#808080",
								],
								battery: {
									type: carModel.specs?.battery || "BYD Blade Battery",
								},
								drivetrain:
									variant.id.includes("awd") ||
									variant.id.includes("performance")
										? "All-wheel drive"
										: "Rear-wheel drive",
								power: {
									value: variant.power || "150",
									unit: "kW",
								},
								acceleration: {
									value:
										variant.acceleration ||
										carModel.specs?.acceleration ||
										"7.5",
								},
								range: {
									nedc: variant.range?.includes("NEDC")
										? variant.range.split("NEDC")[0].trim()
										: "",
									wltp: variant.range?.includes("WLTP")
										? variant.range.split("WLTP")[0].trim()
										: variant.range || "500 KM",
								},
								wheels: {
									size:
										variant.id.includes("performance") ||
										variant.id.includes("premium")
											? '19" Alloy'
											: '18" Alloy',
									type: "R19",
								},
								weight: {
									value: variant.id.includes("performance")
										? "2,185"
										: variant.id.includes("premium")
										? "2,055"
										: "1,922",
									unit: "KG",
								},
							}))}
							isVariantComparison={true}
						/>
					) : (
						<div className="text-center text-gray-400">
							รถยนต์รุ่นนี้มีเพียงรุ่นเดียว ไม่สามารถเปรียบเทียบรุ่นย่อยได้
						</div>
					)}
				</div>
			</section> */}

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
							ออกแบบรถของคุณ
						</Button>
						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white min-w-[150px]"
						>
							Line OA
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

			{/* Tech Spec Section */}
			<section
				className="py-20 bg-gradient-to-b from-card to-background"
				id="specs"
			>
				<div className="container mx-auto px-4">
					<h2 className="text-4xl font-bold mb-12 text-center">
						ข้อมูลด้านเทคนิค
					</h2>

					{/* ใช้ component TechSpecTable */}
					<TechSpecTable
						variantsList={carModel?.variants?.map((variant) => ({
							id: variant.id,
							name: variant.name,
							techSpec: variant.techSpec,
						}))}
						selectedVariantId={selectedVariant?.id}
						onVariantChange={(variantId) => {
							const newVariant = carModel?.variants?.find(
								(v) => v.id === variantId
							);
							if (newVariant) {
								setSelectedVariant(newVariant);
							}
						}}
					/>
				</div>
			</section>
		</div>
	);
}
