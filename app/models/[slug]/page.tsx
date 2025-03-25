"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";
import { findModelBySlug } from "@/data/carModel";
import { PromotionSection } from "@/components/PromotionSection";
import { useParams } from "next/navigation";

export default function ModelPage() {
	// ใช้ useParams เพื่อดึง slug จาก URL
	const { slug } = useParams();

	// ค้นหาข้อมูลรถยนต์ตาม slug
	const carModel = findModelBySlug(slug as string);

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

	const [selectedColor, setSelectedColor] = useState(
		carModel.colors && carModel.colors.length > 0 ? carModel.colors[0] : null
	);
	const [selectedVariant, setSelectedVariant] = useState(
		carModel.variants && carModel.variants.length > 0
			? carModel.variants[0]
			: null
	);
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (carModel.colors && carModel.colors.length > 0 && !selectedColor) {
			setSelectedColor(carModel.colors[0]);
		}
		if (carModel.variants && carModel.variants.length > 0 && !selectedVariant) {
			setSelectedVariant(carModel.variants[0]);
		}
	}, [carModel, selectedColor, selectedVariant]);

	const scrollToShowcase = () => {
		const showcase = document.getElementById("showcase");
		if (showcase) {
			showcase.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="bg-richblack text-white">
			{/* Hero Section with Full Screen Car Image */}
			<div className="relative h-screen w-full" ref={heroRef}>
				<Image
					src={
						carModel.imageUrlHero ||
						carModel.imageUrlModel ||
						"/placeholder.svg"
					}
					alt={carModel.name}
					fill
					className="object-cover"
					priority
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-richblack/80 to-transparent">
					<div className="container mx-auto h-full flex flex-col justify-center items-center text-center px-4">
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
							{carModel.tagline || carModel.description}
						</motion.p>

						{carModel.specs && (
							<motion.div
								className="flex flex-wrap justify-center gap-4 mb-16"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.6 }}
							>
								{carModel.specs.acceleration && (
									<div className="text-center px-6">
										<p className="text-3xl font-bold">
											{carModel.specs.acceleration}
										</p>
										<p className="text-sm text-gray-300">0-100 km/h</p>
									</div>
								)}
								{carModel.specs.range && (
									<div className="text-center px-6 border-l border-r border-gray-600">
										<p className="text-3xl font-bold">{carModel.specs.range}</p>
										<p className="text-sm text-gray-300">Range</p>
									</div>
								)}
								{carModel.specs.drivetrain && (
									<div className="text-center px-6">
										<p className="text-3xl font-bold">
											{carModel.specs.drivetrain}
										</p>
										<p className="text-sm text-gray-300">
											{carModel.specs.motor}
										</p>
									</div>
								)}
							</motion.div>
						)}

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

			{/* Action Buttons Section */}
			<section className="py-12 bg-richblack">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap justify-center gap-4">
						<Button className="bg-bydblue hover:bg-bydblue/80 min-w-[150px]">
							Book Test Drive
						</Button>
						<Button
							variant="outline"
							className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white min-w-[150px]"
						>
							Configure Your BYD
						</Button>
						<Link
							href={`/models/${slug}/loan-calculator
						`}
						>
							<Button
								variant="outline"
								className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white min-w-[150px]"
							>
								ตารางผ่อน
							</Button>
						</Link>
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
							Contact Us
						</Button>
					</div>
				</div>
			</section>

			{/* Promotion Section */}
			<PromotionSection />
		</div>
	);
}
