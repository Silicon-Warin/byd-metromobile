"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PromotionSection } from "@/components/PromotionSection";
import { Suspense } from "react";

export default function PromotionsPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<PromotionsContent />
		</Suspense>
	);
}

function PromotionsContent() {
	return (
		<section className="flex min-h-screen flex-col">
			{/* Hero Section */}
			<motion.section
				className="relative h-[50vh] md:h-[60vh] bg-gray-900"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto px-4 h-full flex items-center justify-center text-white text-center">
					<div>
						<h1 className="text-4xl md:text-5xl font-bold mb-4">
							โปรโมชั่นพิเศษ
						</h1>
						<p className="text-xl md:text-2xl text-gray-300">
							ข้อเสนอสุดพิเศษสำหรับรถยนต์ไฟฟ้า BYD ทุกรุ่น
						</p>
					</div>
				</div>
			</motion.section>

			<motion.section
				className="py-12 md:py-16 bg-background"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto px-4">
					<PromotionSection />
				</div>
			</motion.section>

			{/* Contact/CTA Section */}
			<motion.section
				className="py-12 md:py-16 bg-gray-900 text-white"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
						พร้อมให้คำปรึกษาเกี่ยวกับรถยนต์ไฟฟ้า BYD
					</h2>
					<p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto">
						ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำเกี่ยวกับรถยนต์ไฟฟ้า BYD
						ที่เหมาะกับความต้องการของคุณ
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button variant="default" size="lg" className="w-full sm:w-auto">
							รับใบเสนอราคา
						</Button>
						<Button variant="outline" size="lg" className="w-full sm:w-auto">
							นัดหมายทดลองขับ
						</Button>
					</div>
				</div>
			</motion.section>
		</section>
	);
}
