"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import { ModelCarSlider } from "@/components/ModelCarSlider";
import { ServiceCarousel } from "@/components/ServiceCarousel";

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<motion.section>
				<HeroBannerCarousel />
			</motion.section>
			{/* Featured Models Section */}
			<motion.section>
				<ModelCarSlider />
			</motion.section>

			{/* Why Choose Us Section */}
			<section className="py-16 px-4 md:px-8">
				<div className="container mx-auto">
					<h1 className="text-3xl font-prompt font-bold text-center mb-12">
						ทำไมต้องเลือก BYD Metromobile
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						{/* Services Section */}
						<section className="py-12 md:py-16 bg-background">
							<div className="container mx-auto px-4">
								<h1 className="text-3xl font-bold text-center mb-6 md:mb-12">
									บริการของเรา
								</h1>
								<ServiceCarousel />
							</div>
						</section>
						<div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								เทคโนโลยีล้ำสมัย
							</h3>
							<p className="text-gray-600">
								นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย
							</p>
						</div>
						<div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								การรับประกันคุณภาพ
							</h3>
							<p className="text-gray-600">
								รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 px-4 md:px-8 bg-gray-900 text-white">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-prompt font-bold mb-8">
						ติดต่อ BYD Metromobile
					</h2>
					<p className="text-xl mb-8">
						พร้อมให้คำปรึกษาและบริการที่ดีที่สุดสำหรับคุณ
					</p>
					<Button
						size="lg"
						className="bg-white text-gray-900 hover:bg-gray-100"
					>
						ติดต่อเรา
					</Button>
				</div>
			</section>
		</main>
	);
}
