import HeroSection from "@/components/Homepage/HeroSection";
import ModelsSection from "@/components/Homepage/ModelsSection";
import ServicesSection from "@/components/Homepage/ServiceSection";
import Features from "@/components/Homepage/Features";
import ContactCTA from "@/components/Homepage/ContactCTA";
import ContactFAB from "@/components/contact-fab";

export default function HomePage() {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden">
				<HeroSection />
				<ModelsSection />
				<ServicesSection />
				{/* <Features /> */}
				{/* <ContactCTA /> */}
				<ContactFAB />
			</div>
		</>
	);
}
