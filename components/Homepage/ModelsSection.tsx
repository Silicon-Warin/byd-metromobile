"use client";

import ProductSlider from "@/components/Homepage/ProductSlider";
import { defaultModels } from "@/data/carModel";
import { motion } from "framer-motion";

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
		<motion.section className="w-full h-full relative pt-10 pb-40">
			{/* Animated Fade Gradient */}
			<div className="absolute top-0 left-0 right-0 h-[10vh] bg-gradient-to-b from-gray-900 to-transparent z-20" />

			{/* Enhanced Models Section Header */}
			<motion.div
				className="w-[90%] md:w-[66%] mx-auto mb-8 relative z-50"
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{
					duration: 0.6,
					staggerChildren: 0.2,
					delayChildren: 0.3,
				}}
				viewport={{ once: true, margin: "-100px" }}
			>
				<h2 className="text-3xl md:text-4xl font-semibold text-start mb-4">
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.8, delay: 0.5 }}
					>
						Models{" "}
					</motion.span>
					<motion.span
						className="text-gradient-brand text-sm md:text-base relative z-50"
						initial={{ opacity: 0, x: 20, scale: 0.9 }}
						whileInView={{ opacity: 1, x: 0, scale: 1 }}
						transition={{ duration: 0.7, delay: 0.6, ease: "easeInOut" }}
						viewport={{ once: true }}
					>
						Build your dreams.
					</motion.span>
				</h2>
			</motion.div>

			{/* Enhanced Product Slider Container */}
			<motion.div
				className="relative z-40"
				initial={{ opacity: 0, y: 50, scale: 0.95 }}
				whileInView={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
				viewport={{ once: true }}
			>
				<ProductSlider items={productSliderModels} />
			</motion.div>
		</motion.section>
	);
}
