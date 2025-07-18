"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CarColor } from "@/data/carModel";

interface ColorSelectorSectionProps {
	colors: CarColor[];
	initialColor: CarColor;
	onColorChange: (color: CarColor) => void;
	modelName: string;
}

export default function ColorSelectorSection({
	colors,
	initialColor,
	onColorChange,
	modelName,
}: ColorSelectorSectionProps) {
	const [colorTransition, setColorTransition] = useState<{
		from: CarColor | null;
		to: CarColor;
		isAnimating: boolean;
	}>({
		from: null,
		to: initialColor,
		isAnimating: false,
	});

	const handleColorChange = (color: CarColor) => {
		if (color.name === colorTransition.to.name || colorTransition.isAnimating)
			return;

		setColorTransition({
			from: colorTransition.to,
			to: color,
			isAnimating: true,
		});

		onColorChange(color);

		setTimeout(() => {
			setColorTransition({
				from: null,
				to: color,
				isAnimating: false,
			});
		}, 1300); // match animation duration
	};

	// Fixed transition object with proper Framer Motion easing
	const imageTransition = {
		duration: 1.2,
		ease: "easeInOut" as const,
	};

	return (
		<section className="relative z-10 pb-24 overflow-visible">
			<div className="container mx-auto px-4 relative">
				<div className="max-w-6xl mx-auto relative md:left-4">
					{/* Heading Section - Absolute positioned at the top left */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="absolute top-0 left-0 z-10 md:pt-12"
					>
						<h2 className="text-4xl md:text-7xl font-bold">
							<span className="text-gray-400">เลือกสไตล์</span>
							<br />
							<span className="text-white">ที่ใช่</span>
							<br />
							<span className="text-gray-400">สำหรับคุณ</span>
						</h2>
					</motion.div>

					{/* Car Display Section - Taking full width with proper spacing for heading */}
					<div className="w-full aspect-[16/9] sm:ml-24 md:aspect-[21/9] relative will-change-opacity z-20">
						<AnimatePresence mode="popLayout">
							{colorTransition.from && (
								<motion.div
									key={colorTransition.from.name}
									initial={{ opacity: 1 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={imageTransition}
									className="absolute inset-0 w-full h-full z-10"
								>
									<Image
										src={colorTransition.from.image || "/placeholder.svg"}
										alt={`${modelName} in ${colorTransition.from.name}`}
										fill
										className="object-contain"
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
										priority
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<motion.div
							key={colorTransition.to.name}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={imageTransition}
							className="absolute inset-0 w-full h-full z-20"
						>
							<Image
								src={colorTransition.to.image || "/placeholder.svg"}
								alt={`${modelName} in ${colorTransition.to.name}`}
								fill
								className="object-contain"
								sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 1200px"
								priority
							/>
						</motion.div>
					</div>

					{/* Color Selection Controls - Positioned below car image */}
					<div className="mt-4 flex flex-col items-center justify-center md:mt-4 lg:block lg:mt-0 lg:absolute lg:z-30 lg:bottom-0 lg:left-4 lg:pb-12">
						<h3 className="text-3xl text-white font-bold mb-4">
							{colorTransition.to.name}
						</h3>

						<div className="flex gap-4 md:gap-5">
							{colors.map((color) => (
								<motion.button
									key={color.name}
									className={`relative inline-flex h-16 w-16 md:h-20 md:w-20 lg:h-12 lg:w-12 active:scale-95 transition overflow-hidden rounded-lg p-[2px] focus:outline-none`}
									onClick={() => handleColorChange(color)}
									aria-label={`Select ${color.name}`}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									transition={{ type: "spring", stiffness: 300, damping: 15 }}
								>
									{/* Animated gradient border */}
									<span
										className={`absolute inset-[-1000%] animate-[spin_3s_linear_infinite] ${
											colorTransition.to.name === color.name
												? "bg-[conic-gradient(from_90deg_at_50%_50%,#2C5C8F_0%,#335087_50%,#F5F5F5_100%)]"
												: "bg-transparent"
										}`}
									/>

									{/* Color swatch */}
									<span
										className="inline-flex h-full w-full items-center justify-center rounded-lg backdrop-blur-3xl"
										style={{
											background: color.gradient || color.code,
											boxShadow: color.shadow || "none",
											border: color.border || "none",
										}}
									></span>
								</motion.button>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
