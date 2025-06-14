import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import ServicesSection from "@/components/ServiceSection";
import Features from "@/components/Features";
import ContactCTA from "@/components/ContactCTA";
import ContactFAB from "@/components/contact-fab";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function HomePage() {
	return (
		<>
			<div className="relative min-h-screen overflow-x-hidden">
				<BackgroundEffects />
				<div className="relative z-10">
					<HeroSection />
					<ModelsSection />
					<ServicesSection />
					<Features />
					<ContactCTA />
				</div>
				<ContactFAB />
			</div>
		</>
	);
}
