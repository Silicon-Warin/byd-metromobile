"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, Zap, Clock, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

// Dynamic imports for heavy components
const MotionDiv = dynamic(
	() => import("framer-motion").then((mod) => mod.motion.div),
	{ ssr: false }
);

const HeroBannerCarousel = dynamic(
	() => import("@/components/HeroBannerCarousel"),
	{
		loading: () => (
			<div className="w-full h-[500px] md:h-[600px] lg:h-screen bg-gray-900 animate-pulse" />
		),
	}
);

const ProductSlider = dynamic(
	() => import("@/components/ProductSlider").then((mod) => mod.ProductSlider),
	{
		loading: () => (
			<div className="w-full h-[400px] bg-gray-800/30 rounded-xl animate-pulse" />
		),
	}
);

const ServiceGrid = dynamic(() => import("@/components/ServiceGrid"), {
	loading: () => (
		<div className="w-full h-[300px] bg-gray-800/30 rounded-xl animate-pulse" />
	),
});

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
		<main className="min-h-screen bg-background text-foreground">
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-10 pointer-events-none" />
				<Suspense
					fallback={
						<div className="w-full h-[500px] md:h-[600px] lg:h-screen bg-gray-900 animate-pulse" />
					}
				>
					<HeroBannerCarousel />
				</Suspense>
				<div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-8 lg:p-12">
					<MotionDiv
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
					</MotionDiv>
				</div>
			</section>

			{/* Featured Models Section */}
			<section className="py-12 bg-rich-black-gradient-continuous h-auto relative">
				<div className="absolute top-1/4 left-1/4 w-full h-1/2 bg-[#afb5ff] opacity-10 blur-[100px] rounded-full"></div>
				<div className="absolute bottom-1/4 right-1/4 w-screen h-1/2 bg-[#3765ff] opacity-10 blur-[100px] rounded-full"></div>
				<div className="container-custom z-10 pt-12">
					<MotionDiv
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="w-full max-w-md mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-normal text-left md:text-center p-4">
							Models.{" "}
							<span className="text-muted-foreground text-sm md:text-base">
								Build your dreams.
							</span>
						</h2>
					</MotionDiv>
					<Suspense
						fallback={
							<div className="w-full h-[400px] bg-gray-800/30 rounded-xl animate-pulse" />
						}
					>
						<ProductSlider
							items={models}
							buttonText="ทดลองขับ"
							onItemClick={() => {}}
						/>
					</Suspense>
				</div>
			</section>

			{/* Services Section */}
			<section className="section-spacing bg-rich-black-gradient-continuous section-fade-connector section-connector-overlay pt-12">
				<div className="container-custom ">
					<MotionDiv
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
						className="w-full max-w-md mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-normal text-left md:text-center p-4">
							Services.
						</h2>
					</MotionDiv>
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
					<MotionDiv
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
					</MotionDiv>

					<MotionDiv
						className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
					>
						<MotionDiv
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
						</MotionDiv>

						<MotionDiv
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
						</MotionDiv>

						<MotionDiv
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
						</MotionDiv>
					</MotionDiv>
				</div>
			</section>

			{/* Contact Section */}
			<section className="section-spacing bg-background relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

				<div className="container-custom relative z-10">
					<MotionDiv
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
					</MotionDiv>
				</div>
			</section>
		</main>
	);
}
