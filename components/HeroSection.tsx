"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import TestDriveButton from "@/components/TestDriveButton";
import { motion } from "framer-motion";

export default function HeroSection() {
	return (
		<section className="relative w-screen flex flex-col">
			{/* Mobile View */}
			<div className="md:hidden">
				<div className="h-[55vh] min-h-[350px] max-h-[500px]">
					<Suspense
						fallback={
							<div className="w-full h-full bg-gray-900 animate-pulse" />
						}
					>
						<HeroBannerCarousel />
					</Suspense>
				</div>
				{/* Overlay */}
				<div className="relative -mt-12 z-10 px-4">
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
						<div className="space-y-4 text-center">
							<div className="flex items-center justify-center gap-3">
								<div className="h-8 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full" />
								<h1 className="text-3xl font-bold text-gradient">
									BYD Metromobile
								</h1>
							</div>
							<p className="text-sm text-gray-200">
								สัมผัสประสบการณ์ไฟฟ้าเหนือระดับ
							</p>
							<div className="flex flex-col sm:flex-row gap-3 pt-2">
								<Button
									size="lg"
									className="w-full bg-white text-black"
									asChild
								>
									<Link
										href="/promotions"
										className="flex items-center justify-center"
									>
										ดูโปรโมชั่น
										<ChevronRight className="ml-1 h-4 w-4" />
									</Link>
								</Button>
								<TestDriveButton
									size="lg"
									className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white"
								>
									<span className="flex items-center justify-center">
										จองทดลองขับ
										<ChevronRight className="ml-1 h-4 w-4" />
									</span>
								</TestDriveButton>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop View */}
			<div className="hidden md:block relative h-screen w-full overflow-hidden">
				{/* Background */}
				<div className="absolute inset-0">
					<Suspense
						fallback={
							<div className="w-full h-full bg-gray-900 animate-pulse" />
						}
					>
						<HeroBannerCarousel />
					</Suspense>
				</div>
				{/* Content */}
				<div className="absolute inset-0 lg:z-20 flex items-end pb-20 lg:pb-32">
					<div className="container mx-auto w-full lg:w-2/3 space-y-6 px-4">
						<div className="flex items-center gap-3">
							<motion.div
								initial={{ scaleY: 0 }}
								animate={{ scaleY: 1 }}
								transition={{ duration: 0.6 }}
								className="h-10 lg:h-16 w-1 bg-blue-400 origin-top rounded-full"
							/>
							<motion.h1
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{ duration: 0.8, delay: 0.4 }}
								className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white"
							>
								BYD Metromobile
							</motion.h1>
						</div>
						<motion.p
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-lg lg:text-xl text-gray-200 max-w-2xl"
						>
							สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							ที่มาพร้อมเทคโนโลยีล้ำสมัย
						</motion.p>
						<motion.div
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="flex gap-4"
						>
							<Button size="lg" className="bg-white text-black" asChild>
								<Link href="/promotions" className="flex items-center">
									ดูโปรโมชั่น
									<ChevronRight className="ml-2 h-5 w-5" />
								</Link>
							</Button>
							<TestDriveButton
								size="lg"
								className="bg-gradient-to-r from-red-500 to-red-600 text-white"
							>
								<span className="flex items-center">
									จองทดลองขับ
									<ChevronRight className="ml-2 h-5 w-5" />
								</span>
							</TestDriveButton>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
