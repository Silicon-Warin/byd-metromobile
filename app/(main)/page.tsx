import HeroSection from "@/components/Homepage/HeroSection";
import ModelsSection from "@/components/Homepage/ModelsSection";
import { LazySection } from "@/components/LazySection";
import { lazy, Suspense } from "react";

// Lazy load non-critical components
const CustomerShowcaseSection = lazy(
	() => import("@/components/Homepage/CustomerShowcaseSection")
);
const ShowroomSection = lazy(
	() => import("@/components/Homepage/ShowroomSection")
);
const ShowroomSectionMobile = lazy(
	() => import("@/components/Homepage/ShowroomSectionMobile")
);

// Loading fallback components
const ShowroomFallback = () => (
	<div className="h-96 bg-gray-900 animate-pulse flex items-center justify-center">
		<div className="text-gray-400">กำลังโหลดโชว์รูม...</div>
	</div>
);

const CustomerFallback = () => (
	<div className="h-80 bg-gray-900 animate-pulse flex items-center justify-center">
		<div className="text-gray-400">กำลังโหลดรีวิวลูกค้า...</div>
	</div>
);

export default function HomePage() {
	return (
		<>
			<div className="min-h-screen overflow-x-hidden">
				{/* Critical sections - load immediately */}
				<HeroSection />
				<ModelsSection />

				{/* Non-critical sections - lazy load */}
				<LazySection
					className="hidden md:block"
					loadingClassName="h-96 bg-gray-900"
				>
					<Suspense fallback={<ShowroomFallback />}>
						<ShowroomSection />
					</Suspense>
				</LazySection>

				<LazySection
					className="block md:hidden"
					loadingClassName="h-64 bg-gray-900"
				>
					<Suspense fallback={<ShowroomFallback />}>
						<ShowroomSectionMobile />
					</Suspense>
				</LazySection>

				<LazySection loadingClassName="h-80 bg-gray-900">
					<Suspense fallback={<CustomerFallback />}>
						<CustomerShowcaseSection />
					</Suspense>
				</LazySection>

				{/* <Features /> */}
				{/* <ContactCTA /> */}
			</div>
		</>
	);
}
