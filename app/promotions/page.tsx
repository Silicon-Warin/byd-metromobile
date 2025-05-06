import Image from "next/image";
import PromotionSection from "./components/PromotionSection";
import HeroContent from "./components/HeroContent";

export default function PromotionsPage() {
	return (
		<div className="min-h-screen relative pt-[80px] lg:pt-[10%]">
			{/* Hero Banner - Centered */}
			<div className="flex items-center justify-center w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
				<Image
					src="/images/promotions/hero-promotion.jpg"
					alt="BYD Charge Your Life"
					width={1024}
					height={576}
					className="w-full h-full max-w-7xl rounded-xl object-cover"
					priority
				/>
			</div>

			<div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
				<div className="relative max-w-6xl mx-auto">
					<HeroContent />
				</div>

				<div className="mt-16 relative">
					<div className="absolute -top-10 left-0 right-0 h-10"></div>
					<PromotionSection />
				</div>
			</div>
		</div>
	);
}
