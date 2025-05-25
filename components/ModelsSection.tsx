import ProductSlider from "@/components/ProductSlider";
import { defaultModels } from "@/data/carModel";

// Transform models data for the product slider
const productSliderModels = defaultModels.map((model) => ({
	id: model.id.toString(),
	name: model.name,
	imageUrl: model.imageUrlModel || model.imageUrlPromo || "/placeholder.svg",
	description: model.description,
}));

export default function ModelsSection() {
	return (
		<div className="w-full">
			{/* Models Section Header */}
			<div className="w-[90%] md:w-[66%] mx-auto mb-0 pt-6">
				<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4 pt-4">
					Models
					<span className="text-gradient text-sm md:text-base">
						Build your dreams.
					</span>
				</h2>
			</div>

			<ProductSlider items={productSliderModels} buttonText="ทดลองขับ" />
		</div>
	);
}
