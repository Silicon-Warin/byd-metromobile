import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";

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
			<div className="absolute inset-0 z-20">
				{/* Desktop Layout */}
				<div className="hidden md:flex container mx-auto h-full items-end pb-20 lg:pb-32">
					<div className="w-full lg:w-2/3 space-y-6 px-4">
						<h1
							className="text-5xl lg:text-7xl font-bold bg-clip-text text-transparent 
                    bg-gradient-to-r from-white via-blue-100 to-white animate-fade-in"
						>
							BYD Metromobile
						</h1>

						{/* Description with better width control */}
						<p className="text-lg lg:text-xl text-gray-200 max-w-2xl animate-fade-in-up delay-100">
							สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							ที่มาพร้อมเทคโนโลยีและการออกแบบที่ล้ำสมัย
						</p>

						{/* CTA Buttons with hover effects */}
						<div className="flex gap-4 animate-fade-in-up delay-200">
							<Button
								size="lg"
								className="bg-white hover:bg-white/90 text-black group px-6 py-6 text-base"
								asChild
							>
								<Link href="/promotions" className="flex items-center">
									ดูโปรโมชั่น
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button
								size="lg"
								className="bg-red-500 hover:bg-red-600 text-white group px-6 py-6 text-base"
								asChild
							>
								<Link href="/test-drive" className="flex items-center">
									จองทดลองขับ
									<ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Mobile Layout */}
			<div className="md:hidden flex h-full items-end">
				<div className="container-hero flex justify-center items-center w-full">
					<div className="rounded-xl px-6 py-6 max-w-2xl w-full mx-auto text-left">
						<h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow-lg">
							BYD Metromobile
						</h1>
						<p className="text-sm sm:text-lg text-gray-200 max-w-xl mb-4 drop-shadow-lg">
							สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
							ที่มาพร้อมเทคโนโลยีและการออกแบบที่ล้ำสมัย
						</p>
						<div className="flex gap-3 mt-2">
							<Button
								className="bg-white hover:bg-white/90 text-black group text-sm"
								asChild
							>
								<Link href="/promotions">
									ดูโปรโมชั่น
									<ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button
								className="bg-red-500 hover:bg-red-600 text-white group text-sm"
								asChild
							>
								<Link href="/test-drive">
									จองทดลองขับ
									<ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
