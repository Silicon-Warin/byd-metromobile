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
			<BackgroundEffects />
			<div className="relative z-10 flex flex-col">
				<HeroSection />
				{/* Sections Container */}
				<div className="flex flex-col gap-16 sm:gap-24 md:gap-32 lg:gap-40">
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
