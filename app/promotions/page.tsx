import Image from "next/image";
import PromotionSection from "./components/PromotionSection";
import HeroContent from "./components/HeroContent";

export default function PromotionsPage() {
	return (
		<div className="min-h-screen relative pt-[80px] lg:pt-[10%] overflow-visible">
			<div className="container mx-auto px-4 py-4 md:py-8 relative z-10 overflow-visible">
				<div className="relative max-w-6xl mx-auto overflow-visible">
					<HeroContent />
				</div>
				<div className="mt-4 mb-8 w-full overflow-visible">
					<PromotionSection />
				</div>
				<div className="flex items-center justify-center w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px] my-4">
					<Image
						src="/images/promotions/hero-promotion.jpg"
						alt="BYD Charge Your Life"
						width={1024}
						height={576}
						className="w-full h-full max-w-7xl rounded-xl object-cover"
						priority
					/>
				</div>
			</div>
		</div>
	);
}
