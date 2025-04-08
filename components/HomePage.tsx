"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import { ProductSlider } from "@/components/ProductSlider";
import ServiceGrid from "@/components/ServiceGrid";
import { ChevronRight, Shield, Zap, Clock, Phone } from "lucide-react";
import Link from "next/link";

// Type definition for the props
type HomePageProps = {
	models: {
		id: string;
		name: string;
		imageUrl: string;
		description?: string;
	}[];
};

export default function HomePage({ models }: HomePageProps) {
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

	const handleItemClick = (item: { name: string }) => {
		console.log("คุณคลิกที่:", item.name);
	};

	return (
		<div className="min-h-screen bg-background text-foreground overflow-x-hidden">
			{/* Hero Section */}
			<section className="relative w-full">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10 pointer-events-none" />
				<HeroBannerCarousel />
				<div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-12">
					<motion.div
						className="container mx-auto px-4 sm:px-6 lg:px-8"
						initial="hidden"
						animate="visible"
						variants={fadeIn}
					>
						<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
							BYD Metromobile
						</h1>
						<p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-xl mb-4 sm:mb-6 drop-shadow-lg">
							ยานยนต์ไฟฟ้าแห่งอนาคต พร้อมเทคโนโลยีล้ำสมัยเพื่อโลกที่ยั่งยืน
						</p>
						<Button
							className="bg-white hover:bg-white/90 text-black group text-sm sm:text-base"
							asChild
						>
							<Link href="/promotions">
								ค้นพบรถยนต์ของเรา
								<ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
							</Link>
						</Button>
					</motion.div>
				</div>
			</section>

			{/* Featured Models Section */}
			<section className="py-12 md:py-16 lg:py-24 bg-primary min-h-screen relative overflow-hidden">
				{/* ปรับปรุง effects พื้นหลังให้ไม่ทำให้เกิด overflow */}
				<div className="absolute top-1/4 left-0 w-full h-1/2 bg-[#afb5ff] opacity-10 blur-[100px] rounded-full"></div>
				<div className="absolute bottom-1/4 right-0 w-full h-1/2 bg-[#3765ff] opacity-10 blur-[100px] rounded-full"></div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 pt-12">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
							<span className="text-gradient">รถยนต์ไฟฟ้ารุ่นยอดนิยม</span>
						</h2>
						<p className="text-gray-400 text-center max-w-2xl mx-auto">
							ค้นพบรถยนต์ไฟฟ้า BYD รุ่นต่างๆ
							ที่ผสมผสานเทคโนโลยีล้ำสมัยและการออกแบบที่โดดเด่น
						</p>
					</motion.div>
					<ProductSlider
						items={models}
						onItemClick={handleItemClick}
						buttonText="สั่งซื้อเลย"
					/>
				</div>
			</section>

			{/* Services Section */}
			<section className="py-12 md:py-16 lg:py-24 bg-rich-black-gradient-subtle overflow-hidden">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-10px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
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
			<section className="py-12 md:py-16 lg:py-24 bg-rich-black-gradient overflow-hidden">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
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
							className="glass-effect p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-6">
								<Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
							</div>
							<h3 className="text-lg md:text-xl font-bold mb-4">
								เทคโนโลยีล้ำสมัย
							</h3>
							<p className="text-gray-400 text-sm md:text-base">
								นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย
								ให้ประสิทธิภาพสูงสุดและเป็นมิตรกับสิ่งแวดล้อม
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="glass-effect p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-6">
								<Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
							</div>
							<h3 className="text-lg md:text-xl font-bold mb-4">
								การรับประกันคุณภาพ
							</h3>
							<p className="text-gray-400 text-sm md:text-base">
								รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง
								เพื่อความมั่นใจในทุกการเดินทาง
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="glass-effect p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-6">
								<Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
							</div>
							<h3 className="text-lg md:text-xl font-bold mb-4">
								บริการหลังการขาย
							</h3>
							<p className="text-gray-400 text-sm md:text-base">
								ทีมงานมืออาชีพพร้อมให้บริการหลังการขายที่รวดเร็วและมีประสิทธิภาพ
								ตลอดอายุการใช้งานรถยนต์
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-12 md:py-16 lg:py-24 bg-background relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

				<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="max-w-3xl mx-auto text-center"
					>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6">
							ติดต่อ BYD Metromobile
						</h2>
						<p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
							พร้อมให้คำปรึกษาและบริการที่ดีที่สุดสำหรับคุณ
							ไม่ว่าจะเป็นการทดลองขับ หรือข้อมูลเพิ่มเติมเกี่ยวกับรถยนต์ของเรา
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group text-sm md:text-base"
							>
								<Phone className="mr-2 h-4 w-4 md:h-5 md:w-5" />
								ติดต่อเรา
							</Button>

							<Button
								size="lg"
								variant="outline"
								className="border-gray-700 text-white hover:bg-gray-800 text-sm md:text-base"
							>
								นัดหมายทดลองขับ
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
		</div>
	);
}
