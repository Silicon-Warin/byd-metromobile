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
			<HeroSection />
			{/* Models & Services Section with Background */}
			<div className="relative min-h-screen">
				<BackgroundEffects />
				<div className="relative z-10">
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
