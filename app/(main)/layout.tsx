import { MainHeader } from "@/components/Header/main-header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import ContactFAB from "@/components/ContactFAB";
import { WebVitalReporter } from "@/components/WebVitalReporter";

export default function MainLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<WebVitalReporter />
			<MainHeader />
			<main className="max-w-[100vw] overflow-x-hidden flex-1">{children}</main>
			<Footer />
			<Toaster />
			<ContactFAB />
			<Analytics />
		</>
	);
}
