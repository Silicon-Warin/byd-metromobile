import { Suspense } from "react";
import { PromotionSection } from "@/components/PromotionSection";
import HeroContent from "./components/HeroContent";
import ContactSection from "./components/ContactSection";

export default function PromotionsPage() {
	// นี่คือ Server Component
	return (
		<section className="flex min-h-screen flex-col bg-black text-white">
			{/* Hero Section wrapper - ส่วน static */}
			<div className="relative h-[60vh] md:h-[70vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>

				{/* Content container */}
				<div className="container mx-auto px-4 h-full flex items-center justify-center text-white relative z-10">
					{/* Client Component สำหรับ interactive content */}
					<Suspense fallback={<HeroSectionSkeleton />}>
						<HeroContent />
					</Suspense>
				</div>
			</div>

			{/* ส่วนเนื้อหาอื่นๆ ที่ไม่ต้องการ interactivity สามารถเป็น Server Component */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<div className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							โปรโมชั่นพิเศษ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							เลือกรถยนต์ไฟฟ้า BYD ที่ใช่สำหรับคุณ พร้อมรับข้อเสนอสุดพิเศษ
						</p>
					</div>

					<PromotionSection />
				</div>
			</section>

			{/* Client Components อื่นๆ เช่น Contact Form, FAQ, etc. */}
			<Suspense fallback={<ContactSectionSkeleton />}>
				<ContactSection />
			</Suspense>
		</section>
	);
}

function HeroSectionSkeleton() {
	return (
		<div className="text-center max-w-4xl">
			<div className="h-12 bg-gray-800/50 animate-pulse rounded-lg mb-6 w-3/4 mx-auto"></div>
			<div className="h-6 bg-gray-800/50 animate-pulse rounded-lg mb-8 w-1/2 mx-auto"></div>
			<div className="h-20 bg-gray-800/50 animate-pulse rounded-lg mb-8 w-3/4 mx-auto"></div>
			<div className="h-12 bg-gray-800/50 animate-pulse rounded-lg w-40 mx-auto"></div>
		</div>
	);
}

function ContactSectionSkeleton() {
	return (
		<div className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative">
			<div className="container mx-auto px-4 text-center">
				<div className="h-10 bg-gray-800/50 animate-pulse rounded-lg mb-6 w-1/2 mx-auto"></div>
				<div className="h-6 bg-gray-800/50 animate-pulse rounded-lg mb-8 w-3/4 mx-auto"></div>
				<div className="bg-gray-800/50 animate-pulse rounded-xl h-80 max-w-3xl mx-auto"></div>
			</div>
		</div>
	);
}
