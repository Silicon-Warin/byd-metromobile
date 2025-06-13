"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import TestDriveButton from "@/components/TestDriveButton";
import { HeroBanner } from "@/components/HeroBanner";

export default function HeroSection() {
	return (
		<section className="relative w-screen flex flex-col">
			{/* Mobile View */}
			<div className="md:hidden">
				<div className="h-[50vh] max-h-[500px]">
					<HeroBanner />
				</div>
				{/* Mobile Content Overlay - Now a part of the flow */}
				<div className="relative -mt-16 z-10 px-4">
					<div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl animate-in-fade-in-up animation-delay-200">
						<div className="space-y-4 text-center">
							<div className="flex items-center justify-center gap-3 animate-in-fade-in-up animation-delay-400">
								<div className="h-8 w-1 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full shadow-lg shadow-blue-400/30" />
								<h1 className="text-3xl font-bold text-gradient">
									BYD Metromobile
								</h1>
							</div>

							<p className="text-sm text-gray-200 leading-relaxed font-medium animate-in-fade-in-up animation-delay-600">
								สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							</p>

							<div className="flex flex-col sm:flex-row gap-3 pt-2 animate-in-fade-in-up animation-delay-800">
								<Button
									size="lg"
									className="w-full bg-white hover:bg-white/90 text-black group py-3 text-base font-semibold 
										shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
									asChild
								>
									<Link
										href="/promotions"
										className="flex items-center justify-center"
									>
										ดูโปรโมชั่น
										<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>

								<TestDriveButton
									size="lg"
									className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
										text-white group py-3 text-base font-semibold shadow-lg hover:shadow-xl 
										transition-all duration-300 hover:scale-105"
								>
									<span className="flex items-center justify-center">
										จองทดลองขับ
										<ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</span>
								</TestDriveButton>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop View – centred layout */}
			<div className="hidden md:flex h-[90svh] min-h-screen w-full justify-center items-center">
				<div className="container mx-auto flex flex-col items-center gap-12 px-6 lg:px-10 relative z-10">
					{/* Headline & CTA */}
					<div className="max-w-3xl text-center space-y-6">
						<div className="flex items-center justify-center gap-4 animate-in-fade-in-left animation-delay-200">
							<div className="h-16 w-1.5 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full shadow-lg shadow-blue-400/50" />
							<h1 className="text-7xl font-bold text-gradient">
								BYD Metromobile
							</h1>
						</div>

						<p className="text-lg lg:text-xl text-gray-200/90 max-w-2xl leading-relaxed animate-in-fade-in-up animation-delay-400">
							สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							ที่มาพร้อมเทคโนโลยีและการออกแบบที่ล้ำสมัย
						</p>

						<div className="flex justify-center gap-4 pt-4 animate-in-fade-in-up animation-delay-600">
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group px-8 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
								asChild
							>
								<Link href="/promotions" className="flex items-center">
									ดูโปรโมชั่น
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>

							<TestDriveButton
								size="lg"
								className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white group px-8 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
							>
								<span className="flex items-center">
									จองทดลองขับ
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</span>
							</TestDriveButton>
						</div>
					</div>

					{/* Image Card */}
					<div className="w-full max-w-5xl aspect-video relative rounded-3xl overflow-hidden shadow-2xl shadow-black/40 animate-in-fade-in-up animation-delay-200">
						<HeroBanner />
					</div>
				</div>
			</div>
		</section>
	);
}
