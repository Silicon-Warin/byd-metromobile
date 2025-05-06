import { Suspense } from "react";
import ServiceGrid from "@/components/ServiceGrid";

export default function ServicesSection() {
	return (
		<div className="w-full">
			<div className="w-[90%] md:w-[66%] mx-auto mb-3">
				<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
					Services.
				</h2>
			</div>
			<Suspense
				fallback={
					<div className="w-full h-[300px] bg-gray-800/30 rounded-xl animate-pulse" />
				}
			>
				<ServiceGrid />
			</Suspense>
		</div>
	);
}
