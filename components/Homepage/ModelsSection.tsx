"use client";

import ProductSlider from "@/components/Homepage/ProductSlider";
import { defaultModels } from "@/data/carModel";
import {
	FadeIn,
	ImageScale,
	SectionFade,
	staggerDelays,
} from "@/components/ScrollAnimations";

// Transform models data for the product slider
const productSliderModels = defaultModels.map((model) => ({
	id: model.id.toString(),
	name: model.name,
	imageUrl: model.imageUrlModel,
	description: model.description,
	slug: model.slug || "",
}));

export default function ModelsSection() {
	return (
		<SectionFade className="w-full h-full relative md:py-[8rem] pt-10">
			<div className="absolute top-0 left-0 right-0 h-[10vh] bg-gradient-to-b from-gray-900 to-transparent z-20" />

			{/* Models Section Header */}
			<FadeIn
				delay={staggerDelays.stagger1}
				className="w-[90%] md:w-[66%] mx-auto mb-8 relative z-50"
			>
				<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4">
					<FadeIn delay={staggerDelays.stagger1}>
						<span>Models </span>
					</FadeIn>
					<FadeIn delay={staggerDelays.stagger2}>
						<span className="text-gradient-brand text-sm md:text-base relative z-50">
							Build your dreams.
						</span>
					</FadeIn>
				</h2>
			</FadeIn>

			{/* Product Slider Container */}
			<ImageScale delay={staggerDelays.stagger2} className="relative z-40">
				<ProductSlider items={productSliderModels} />
			</ImageScale>

			{/* Enhanced Fade to next section - Showroom */}
			<div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900 z-10"></div>
		</SectionFade>
	);
}
