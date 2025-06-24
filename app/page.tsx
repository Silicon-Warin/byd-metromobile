import HeroSection from "@/components/Homepage/HeroSection";
import ModelsSection from "@/components/Homepage/ModelsSection";
import CustomerShowcaseSection from "@/components/Homepage/CustomerShowcaseSection";
import ShowroomSection from "@/components/Homepage/ShowroomSection";
import ShowroomSectionMobile from "@/components/Homepage/ShowroomSectionMobile";

export default function HomePage() {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden">
				<HeroSection />
				<ModelsSection />

				{/* Desktop Showroom Section - with crossfade carousel */}
				<div className="hidden md:block">
					<ShowroomSection />
				</div>

				{/* Mobile Showroom Section - static background */}
				<div className="block md:hidden">
					<ShowroomSectionMobile />
				</div>

				<CustomerShowcaseSection />
				{/* <Features /> */}
				{/* <ContactCTA /> */}
			</div>
		</>
	);
}
