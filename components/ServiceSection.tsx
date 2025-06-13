import { Suspense } from "react";
import ServiceGrid from "@/components/ServiceGrid";

export default function ServicesSection() {
	return (
		<div className="w-full flex flex-col">
			<div className="page-container mb-8 md:mb-12">
				<h2 className="text-4xl md:text-5xl font-bold mb-2 text-gradient">
					Our Services
				</h2>
				<p className="text-lg md:text-xl text-muted-foreground">
					Comprehensive care for your peace of mind.
				</p>
			</div>
			<Suspense
				fallback={
					<div className="w-full h-[300px] bg-secondary/30 rounded-xl animate-pulse" />
				}
			>
				<ServiceGrid />
			</Suspense>
		</div>
	);
}
