"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import TestDriveButton from "@/components/TestDriveButton"; // ✅ เพิ่ม import
import { motion } from "framer-motion";

export default function HeroSection() {
	return (
		<section className="relative h-screen w-full overflow-hidden">
			{/*HeroBannerCarousel component */}
			<div className="relative z-0">
				<Suspense
					fallback={
						<div className="w-full h-screen bg-gray-900 animate-pulse" />
					}
				>
					<HeroBannerCarousel />
				</Suspense>
			</div>
			{/* Gradient Overlays - Desktop only */}
			<div className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10"></div>

			{/* Mobile Shadows */}
			<div className="md:hidden">
				<div className="absolute inset-0 pointer-events-none top-shadow"></div>
				<div className="absolute bottom-0 left-0 right-0 w-full pointer-events-none bottom-shadow"></div>
			</div>

			{/* Hero Content */}
			<div className="absolute inset-0 lg:z-20">
				<div className="hidden md:flex container mx-auto h-full items-end pb-20 lg:pb-32">
					<div className="w-full lg:w-2/3 space-y-6 px-4">
						{/* เส้นขีด + Heading */}
						<div className="flex items-center gap-3">
							{/* ขีดแนวตั้ง สีฟ้า */}
							<motion.div
								initial={{ opacity: 0, scaleY: 0 }}
								animate={{ opacity: 1, scaleY: 1 }}
								transition={{ duration: 0.6, ease: "easeOut" }}
								className="h-10 lg:h-16 w-1 bg-blue-400 origin-top rounded-full"
							/>
							{/* Heading */}
							<motion.h1
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
								className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent 
				bg-gradient-to-r from-white via-blue-100 to-white"
							>
								BYD Metromobile
							</motion.h1>
						</div>

						{/* Description */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
							className="text-lg lg:text-xl text-gray-200 max-w-2xl"
						>
							สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							ที่มาพร้อมเทคโนโลยีและการออกแบบที่ล้ำสมัย
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
							className="flex gap-4"
						>
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group px-6 py-6 text-base z-20"
								asChild
							>
								<Link href="/promotions" className="flex items-center">
									ดูโปรโมชั่น
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>

							<TestDriveButton
								size="lg"
								className="bg-red-500 hover:bg-red-600 text-white group px-6 py-6 text-base z-20"
							>
								<span className="flex items-center">
									จองทดลองขับ
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</span>
							</TestDriveButton>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
