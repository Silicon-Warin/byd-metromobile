import ProductSlider from "@/components/Homepage/ProductSlider";
import { defaultModels } from "@/data/carModel";

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
		<section className="w-full h-full z-20 relative pt-10 pb-40">
			{/* Fade from previous section */}
			<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-900 to-transparent z-30"></div>

			{/* Models Section Header */}
			<div className="w-[90%] md:w-[66%] mx-auto mb-8 pt-16">
				<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
					Models{" "}
					<span className="text-gradient-brand text-sm md:text-base">
						Build your dreams.
					</span>
				</h2>
			</div>

			<ProductSlider items={productSliderModels} />
			{/* Fade to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-800 z-10"></div>
		</section>
	);
}
