"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import { ProductSlider } from "@/components/ProductSlider";
import ServiceGrid from "@/components/ServiceGrid";
import { motion } from "framer-motion";

// Type definition for the props
type HomePageProps = {
	models: {
		id: string;
		name: string;
		imageUrl: string;
	}[];
};

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

export default function HomePage({ models }: HomePageProps) {
	return (
		<>
			<section className="relative h-screen w-full">
				<div className="absolute inset-0 z-10 pointer-events-none top-shadow"></div>
				<Suspense
					fallback={
						<div className="w-full h-[90vh] bg-gray-900 animate-pulse" />
					}
				>
					<HeroBannerCarousel />
				</Suspense>

				{/* ย้าย bottom-shadow มาอยู่นอก div เนื้อหา */}
				<div className="absolute bottom-0 left-0 right-0 w-full z-10 pointer-events-none bottom-shadow"></div>

				<div className="absolute bottom-0 left-0 right-0 z-20 p-4">
					<motion.div
						className="container-custom"
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

			<section className="bg-rich-black-gradient-continuous overflow-visible pt-8 pb-16">
				<div className="absolute top-1/4 left-1/4 w-full h-1/2 bg-[#afb5ff] opacity-10 blur-[100px] rounded-full"></div>
				<div className="absolute bottom-1/4 right-1/4 w-screen h-1/2 bg-[#3765ff] opacity-10 blur-[100px] rounded-full"></div>
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-4"
					>
						<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
							Models.{" "}
							<span className="text-muted-foreground text-sm md:text-base">
								Build your dreams.
							</span>
						</h2>
					</motion.div>
				</div>
				<Suspense
					fallback={
						<div className="w-full h-[400px] bg-gray-800/30 rounded-xl animate-pulse" />
					}
				>
					<ProductSlider
						items={models}
						buttonText="Order Now"
						onItemClick={() => {}}
					/>
				</Suspense>
			</section>

			{/* Services Section */}
			<section className="section-spacing bg-rich-black-gradient-continuous section-fade-connector section-connector-overlay pt-12">
				<div className="container-custom ">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="w-full max-w-md mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-normal text-left md:text-center p-4">
							Services.
						</h2>
					</motion.div>
					{/* Component แสดงรายการบริการ */}
					<Suspense
						fallback={
							<div className="w-full h-[300px] bg-gray-800/30 rounded-xl animate-pulse" />
						}
					>
						<ServiceGrid />
					</Suspense>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="section-spacing bg-rich-black-gradient-continuous section-fade-connector section-connector-overlay">
				<div className="container-custom">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="mb-6 sm:mb-8 md:mb-12"
					>
						<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4">
							ทำไมต้องเลือก BYD Metromobile
						</h2>
						<p className="text-gray-400 text-center max-w-2xl mx-auto text-sm sm:text-base">
							เราให้ความสำคัญกับคุณภาพและความพึงพอใจของลูกค้าเป็นอันดับหนึ่ง
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
					>
						<motion.div
							variants={fadeIn}
							className="glass-effect p-4 sm:p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-4 sm:mb-6">
								<Zap className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
								เทคโนโลยีล้ำสมัย
							</h3>
							<p className="text-gray-400 text-sm sm:text-base">
								นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย
								ให้ประสิทธิภาพสูงสุดและเป็นมิตรกับสิ่งแวดล้อม
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="glass-effect p-4 sm:p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-4 sm:mb-6">
								<Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
								การรับประกันคุณภาพ
							</h3>
							<p className="text-gray-400 text-sm sm:text-base">
								รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง
								เพื่อความมั่นใจในทุกการเดินทาง
							</p>
						</motion.div>

						<motion.div
							variants={fadeIn}
							className="glass-effect p-4 sm:p-6 md:p-8 rounded-xl card-hover"
						>
							<div className="bg-white/5 p-3 rounded-lg w-fit mb-4 sm:mb-6">
								<Clock className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
							</div>
							<h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
								บริการหลังการขาย
							</h3>
							<p className="text-gray-400 text-sm sm:text-base">
								ทีมงานมืออาชีพพร้อมให้บริการหลังการขายที่รวดเร็วและมีประสิทธิภาพ
								ตลอดอายุการใช้งานรถยนต์
							</p>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="section-spacing bg-background relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

				<div className="container-custom relative z-10">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="max-w-3xl mx-auto text-center"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-6">
							ติดต่อ BYD Metromobile
						</h2>
						<p className="text-xl text-gray-300 mb-8">
							พร้อมให้คำปรึกษาและบริการที่ดีที่สุดสำหรับคุณ
							ไม่ว่าจะเป็นการทดลองขับ หรือข้อมูลเพิ่มเติมเกี่ยวกับรถยนต์ของเรา
						</p>

						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group"
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
		</>
	);
}
