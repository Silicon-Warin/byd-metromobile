import HeroContent from "./components/HeroContent";
import { PromotionSection } from "@/components/PromotionSection";

export default function PromotionsPage() {
	return (
		<div className="min-h-screen ">
			<div className="container mx-auto px-4 py-16">
				<h1 className="text-3xl font-bold mb-8 text-center">โปรโมชั่นพิเศษ</h1>
				<div className="flex justify-center">
					<HeroContent />
				</div>

				<div className=" relative">
					<PromotionSection />
				</div>
			</div>
		</div>
	);
}
