"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PromotionCarousel } from "@/components/PromotionCarousel";
import { defaultBanners } from "@/types/BannerData";
import { PromotionSection } from "@/components/PromotionSlider";
import { ServiceCarousel } from "@/components/ServiceCarousel";
import { Button } from "@/components/ui/button";

export default function Promotion() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			{/* Main content */}
			<main className="flex flex-col">
				{/* Hero Banner Section */}
				<section className="relative min-h-[50vh] md:min-h-[70vh] lg:min-h-[80vh] w-full">
					<PromotionCarousel banners={defaultBanners} />
					<Button
						onClick={() =>
							window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
						}
						className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-2 rounded-full shadow-md hover:bg-gray-200 transition"
					>
						ดูเพิ่มเติม ⬇️
					</Button>
				</section>

				{/* Promotions Section */}
				<section id="promotions" className="py-8 md:py-12 bg-background">
					<div className="container mx-auto px-4">
						<h1 className="text-3xl font-bold text-center mb-6 md:mb-8">
							โปรโมชั่น
						</h1>
					</div>
					<PromotionSection />
				</section>

				{/* Contact/CTA Section */}
				<section className="py-12 md:py-16 bg-gray-900 text-white">
					<div className="container mx-auto px-4 text-center">
						<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
							พร้อมให้คำปรึกษาเกี่ยวกับรถยนต์ไฟฟ้า BYD
						</h2>
						<p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
							ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำเกี่ยวกับรถยนต์ไฟฟ้า BYD
							ที่เหมาะกับความต้องการของคุณ
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button className="px-6 md:px-8 py-3 bg-blue-600 text-white text-base md:text-lg rounded-md hover:bg-blue-700 transition-colors w-full sm:w-auto">
								รับใบเสนอราคา
							</Button>
							<Button className="px-6 md:px-8 py-3 bg-transparent border-2 border-white text-white text-base md:text-lg rounded-md hover:bg-white hover:text-gray-900 transition-colors w-full sm:w-auto">
								นัดหมายทดลองขับ
							</Button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
