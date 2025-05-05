import { Button } from "@/components/ui/button";
import { ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import HeroBannerCarousel from "@/components/HeroBannerCarousel";
import ProductSlider from "@/components/ProductSlider";
import ServiceGrid from "@/components/ServiceGrid";
import { defaultModels } from "@/data/carModel";
import Features from "@/components/Features";

// Type definition for the props
const productSliderModels = defaultModels.map((model) => ({
	id: model.id.toString(),
	name: model.name,
	imageUrl: model.imageUrlModel || model.imageUrlPromo || "/placeholder.svg",
	description: model.description,
}));

export default function HomePage() {
	return (
		<>
			<section className="relative h-screen w-full">
				<div className="absolute inset-0 z-20 pointer-events-none top-shadow"></div>
				<Suspense
					fallback={
						<div className="w-full h-[90vh] bg-gray-900 animate-pulse" />
					}
				>
					<HeroBannerCarousel />
				</Suspense>

				{/* ย้าย bottom-shadow มาอยู่นอก div เนื้อหา */}
				<div className="absolute bottom-0 left-0 right-0 w-full z-20 pointer-events-none bottom-shadow"></div>

				<div className="absolute bottom-0 left-0 right-0 z-20 p-4">
					<div className="container-hero flex justify-center items-center">
						<div className="rounded-xl px-6 md:px-8 py-6 md:py-8 max-w-2xl w-full mx-auto text-left">
							<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
								BYD Metromobile
							</h1>
							<p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-xl mb-4 sm:mb-6 drop-shadow-lg">
								สัมผัสประสบการณ์การขับขี่ที่เหนือระดับด้วยรถยนต์ไฟฟ้าจาก BYD
								ที่มาพร้อมเทคโนโลยีและการออกแบบที่ล้ำสมัย
							</p>
							<div className="flex gap-3 mt-2">
								<Button
									className="bg-white hover:bg-white/90 text-black group text-sm sm:text-base"
									asChild
								>
									<Link href="/promotions">
										ดูโปรโมชั่น
										<ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
									</Link>
								</Button>
								<Button
									className="bg-orange-500 hover:bg-orange-600 text-white group text-sm sm:text-base"
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

			{/* Models Section */}
			<div className="relative min-h-screen">
				{/* Gradient background and blur effects */}
				<div className="pointer-events-none fixed inset-0 -z-10">
					<div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
					<div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-500/10 blur-[100px]" />
					<div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-purple-500/10 blur-[100px]" />
				</div>
				<div className="relative z-10">
					{/* Models Section Header */}
					<div className="w-[90%] md:w-[66%] mx-auto mb-0 pt-6">
						<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
							Models{" "}
							<span className="text-gradient text-sm md:text-base">
								Build your dreams.
							</span>
						</h2>
					</div>

					<ProductSlider items={productSliderModels} buttonText="ทดลองขับ" />

					{/* Services Section */}
					<div className="w-[90%] md:w-[66%] mx-auto mb-3">
						<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
							Services.
						</h2>
					</div>
					{/* Component แสดงรายการบริการ */}
					<Suspense
						fallback={
							<div className="w-full h-[300px] bg-gray-800/30 rounded-xl animate-pulse" />
						}
					>
						<ServiceGrid />
					</Suspense>
					<Features />

					{/* Background with gradient and blur effects */}
					<div className="absolute inset-0 z-0">
						{/* Blur effects similar to cursor.so */}
						<div className="absolute top-1/4 left-1/3 w-1/2 h-1/2 bg-[#3765ff] opacity-10 blur-[120px] rounded-full"></div>
						<div className="absolute bottom-0 right-1/4 w-1/2 h-1/2 bg-[#afb5ff] opacity-10 blur-[100px] rounded-full"></div>
					</div>
					<div className="relative z-10 max-w-4xl mx-auto text-center px-4">
						<div className="flex flex-col sm:flex-row gap-4 justify-center p-8">
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
					</div>
				</div>
			</div>
		</>
	);
}
