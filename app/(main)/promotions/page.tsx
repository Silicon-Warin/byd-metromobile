"use client";

import SupermanBackground from "./components/SupermanBackground";
import HeroContent from "./components/HeroContent";
import PromotionSection from "./components/PromotionSection";
import PromotionContactSection from "./components/ContactSection";

export default function PromotionsPage() {
	return (
		<div className="relative min-h-screen">
			<SupermanBackground />
			<div className="relative z-10">
				<HeroContent />
				<PromotionSection />
				<PromotionContactSection />
			</div>
		</div>
	);
}
