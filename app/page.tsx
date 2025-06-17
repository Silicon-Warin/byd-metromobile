import HeroSection from "@/components/Homepage/HeroSection";
import ModelsSection from "@/components/Homepage/ModelsSection";
import ServicesSection from "@/components/Homepage/ServiceSection";
import CustomerShowcaseSection from "@/components/Homepage/CustomerShowcaseSection";

export default function HomePage() {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden">
				<HeroSection />
				<ModelsSection />
				<ServicesSection />
				<CustomerShowcaseSection />
				{/* <Features /> */}
				{/* <ContactCTA /> */}
			</div>
		</>
	);
}
