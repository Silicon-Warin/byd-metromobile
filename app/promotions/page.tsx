import HeroContent from "./components/HeroContent";
import { PromotionSection } from "@/components/PromotionSection";

export default function PromotionsPage() {
	return (
		<div className="min-h-screen relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950">
			<div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
				<div className="text-center mb-10">
					<h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-white">
						<span className="inline-block transform hover:scale-105 transition-transform">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-cyan-300">
								BIG SPLASH BIG DEAL
							</span>
						</span>
					</h1>
					<p className="text-xl text-blue-200">
						โปรโมชั่นพิเศษรับเทศกาลสงกรานต์
					</p>
				</div>

				<div className="relative max-w-6xl mx-auto">
					<HeroContent />
				</div>

				<div className="mt-16 relative">
					<div className="absolute -top-10 left-0 right-0 h-10 bg-gradient-to-b from-transparent to-blue-900/50"></div>
					<h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-blue-100">
						รุ่นรถที่ร่วมรายการ
					</h2>
					<PromotionSection />
				</div>
			</div>
		</div>
	);
}
