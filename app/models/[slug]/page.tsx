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
import { CarModel, CarColor, CarVariant } from "./types";

export default function ModelPage() {
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [carModel, setCarModel] = useState<CarModel | null>(null);
	const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);
	const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const heroRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadModel = async () => {
			if (!slug) {
				setError("Invalid model identifier");
				setIsLoading(false);
				return;
			}

			try {
				const model = findModelBySlug(slug as string);
				if (!model) {
					setError("ไม่พบข้อมูลรถยนต์ที่คุณกำลังค้นหา");
					setCarModel(null);
				} else {
					setCarModel(model);
					if (model.colors && model.colors.length > 0) {
						setSelectedColor(model.colors[0]);
					}
					if (model.variants && model.variants.length > 0) {
						setSelectedVariant(model.variants[0]);
					}
					setError(null);
				}
			} catch (err) {
				setError("เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง");
				console.error("Error loading model:", err);
			}
			setIsLoading(false);
		};

		setIsLoading(true);
		loadModel();
	}, [slug]);

	// อัพเดตสีและรุ่น (ถ้าจำเป็น)
	useEffect(() => {
		if (carModel) {
			if (carModel.colors && carModel.colors.length > 0 && !selectedColor) {
				setSelectedColor(carModel.colors[0]);
			}
			if (
				carModel.variants &&
				carModel.variants.length > 0 &&
				!selectedVariant
			) {
				setSelectedVariant(carModel.variants[0]);
			}
		}
	}, [carModel, selectedColor, selectedVariant]);

	const scrollToShowcase = () => {
		const showcase = document.getElementById("showcase");
		if (showcase) {
			showcase.scrollIntoView({ behavior: "smooth" });
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-richblack">
				<div className="text-center text-white">
					<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-bydblue mx-auto mb-4"></div>
					<p className="text-xl">กำลังโหลดข้อมูล...</p>
				</div>
			</div>
		);
	}

	if (error || !carModel) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-richblack">
				<div className="text-center text-white">
					<h1 className="text-3xl font-bold mb-4">
						{error || "ไม่พบข้อมูลรถยนต์"}
					</h1>
					<div className="flex gap-4 justify-center">
						<Button
							className="bg-bydblue hover:bg-bydblue/80"
							onClick={() => window.history.back()}
						>
							ย้อนกลับ
						</Button>
						<Link href="/models">
							<Button
								variant="outline"
								className="border-bydblue text-bydblue hover:bg-bydblue hover:text-white"
							>
								ดูรถยนต์ทั้งหมด
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

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
						<Link href={`/models/${slug}/loan-calculator`}>
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
