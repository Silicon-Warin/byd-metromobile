"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import { ModelCarSlider } from "@/components/ModelCarSlider";
import { ServiceGrid } from "@/components/ServiceCarousel";
import { ChevronRight, Shield, Zap, Clock, Phone } from "lucide-react";

export default function Home() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<main className="min-h-screen bg-black text-white">
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
				<HeroBannerCarousel />
				<div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-12">
					<motion.div
						className="container mx-auto"
						initial="hidden"
						animate="visible"
						variants={fadeIn}
					>
						<h1 className="text-3xl md:text-4xl lg:text-5xl font-prompt font-bold text-white mb-4 drop-shadow-lg">
							BYD Metromobile
						</h1>
						<p className="text-lg md:text-xl text-gray-200 max-w-xl mb-6 drop-shadow-lg">
							ยานยนต์ไฟฟ้าแห่งอนาคต พร้อมเทคโนโลยีล้ำสมัยเพื่อโลกที่ยั่งยืน
						</p>
						<Button
							size="lg"
							className="bg-primary hover:bg-primary/90 text-white group"
						>
							ค้นพบรถยนต์ของเรา
							<ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Featured Models Section */}
			<section className="py-16 md:py-24 overflow-hidden bg-gradient-to-b from-black to-gray-900">
				<div className="container mx-auto">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-prompt font-bold text-center mb-4">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
								รถยนต์ไฟฟ้ารุ่นยอดนิยม
							</span>
						</h2>
						<p className="text-gray-400 text-center max-w-2xl mx-auto">
							ค้นพบรถยนต์ไฟฟ้า BYD รุ่นต่างๆ
							ที่ผสมผสานเทคโนโลยีล้ำสมัยและการออกแบบที่โดดเด่น
						</p>
					</motion.div>
					<ModelCarSlider />
				</div>
			</section>

			{/* Services Section */}
			<section className="py-16 md:py-24 bg-gray-900 lg:px-12">
				<div className="container mx-auto px-4 md:px-8">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-prompt font-bold text-center mb-4">
							บริการของเรา
						</h2>
						<p className="text-gray-400 text-center max-w-2xl mx-auto">
							บริการครบวงจรเพื่อประสบการณ์การใช้รถยนต์ไฟฟ้าที่ไร้กังวล
						</p>
					</motion.div>
					<ServiceGrid />
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black">
				<div className="container mx-auto px-4 md:px-8">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-prompt font-bold text-center mb-4">
							ทำไมต้องเลือก BYD Metromobile
						</h2>
						<p className="text-gray-400 text-center max-w-2xl mx-auto">
							เราให้ความสำคัญกับคุณภาพและความพึงพอใจของลูกค้าเป็นอันดับหนึ่ง
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
					>
						<motion.div
							variants={fadeIn}
							className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
						>
							<div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
								<Zap className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								เทคโนโลยีล้ำสมัย
							</h3>
							<p className="text-gray-400">
								นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย
								ให้ประสิทธิภาพสูงสุดและเป็นมิตรกับสิ่งแวดล้อม
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
						>
							<div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
								<Shield className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								การรับประกันคุณภาพ
							</h3>
							<p className="text-gray-400">
								รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง
								เพื่อความมั่นใจในทุกการเดินทาง
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
						>
							<div className="bg-primary/10 p-3 rounded-lg w-fit mb-6">
								<Clock className="h-8 w-8 text-primary" />
							</div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								บริการหลังการขาย
							</h3>
							<p className="text-gray-400">
								ทีมงานมืออาชีพพร้อมให้บริการหลังการขายที่รวดเร็วและมีประสิทธิภาพ
								ตลอดอายุการใช้งานรถยนต์
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 md:py-24 bg-black relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

				<div className="container mx-auto px-4 md:px-8 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="max-w-3xl mx-auto text-center"
					>
						<h2 className="text-3xl md:text-4xl font-prompt font-bold mb-6">
							ติดต่อ BYD Metromobile
						</h2>
						<p className="text-xl text-gray-300 mb-8">
							พร้อมให้คำปรึกษาและบริการที่ดีที่สุดสำหรับคุณ
							ไม่ว่าจะเป็นการทดลองขับ หรือข้อมูลเพิ่มเติมเกี่ยวกับรถยนต์ของเรา
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-primary hover:bg-primary/90 text-white group"
							>
								<Phone className="mr-2 h-5 w-5" />
								ติดต่อเรา
							</Button>

							<Button
								size="lg"
								variant="outline"
								className="border-gray-700 text-white hover:bg-gray-800"
							>
								นัดหมายทดลองขับ
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</main>
	);
}
