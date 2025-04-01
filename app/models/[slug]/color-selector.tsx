"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { CarColor } from "./types";

interface ColorSelectorProps {
	colors: CarColor[];
	initialColor: CarColor;
	onColorChange: (color: CarColor) => void;
	modelName: string;
}

export default function ColorSelector({
	colors,
	initialColor,
	onColorChange,
	modelName,
}: ColorSelectorProps) {
	const [selectedColor, setSelectedColor] = useState<CarColor>(initialColor);
	const [previousColor, setPreviousColor] = useState<CarColor | null>(null);
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleColorChange = (color: CarColor) => {
		if (color.name === selectedColor.name || isTransitioning) return;

		setIsTransitioning(true);
		setPreviousColor(selectedColor);
		setSelectedColor(color);
		onColorChange(color);

		// Reset transitioning state after animation completes
		setTimeout(() => {
			setIsTransitioning(false);
			setPreviousColor(null);
		}, 600);
	};

	return (
		<div className="w-full">
			<div className="relative w-full h-0 pb-[60%] sm:pb-[56.25%] md:pb-[50%] mb-16 sm:mb-12 rounded-xl overflow-hidden bg-black/10">
				{/* Fixed wrapper with absolute size to prevent resizing */}
				<div className="absolute inset-0 flex items-center justify-center overflow-hidden">
					{/* Previous image (fading out) */}
					{previousColor && (
						<motion.div
							className="absolute inset-0 flex items-center justify-center w-full h-full"
							initial={{ opacity: 1 }}
							animate={{ opacity: 0 }}
							transition={{ duration: 0.6 }}
							// Removed any scale transforms
						>
							<Image
								src={previousColor.image || "/placeholder.svg"}
								alt={`${modelName} in ${previousColor.name}`}
								width={768}
								height={675}
								className="object-contain max-h-full max-w-full pt-6 pb-16 sm:py-6"
								priority
							/>
						</motion.div>
					)}

					{/* Current image (fading in) */}
					<motion.div
						key={selectedColor.name}
						className="absolute inset-0 flex items-center justify-center w-full h-full"
						initial={{ opacity: previousColor ? 0 : 1 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
						// Explicitly setting scale to 1 to prevent any scaling
						style={{ scale: 1 }}
					>
						<Image
							src={selectedColor.image || "/placeholder.svg"}
							alt={`${modelName} in ${selectedColor.name}`}
							width={768}
							height={675}
							className="object-contain max-h-full max-w-full pt-6 pb-16 sm:py-6"
							priority
						/>
					</motion.div>
				</div>

				{/* Color selection buttons - moved to BOTTOM with more space on mobile */}
				<div className="absolute bottom-2 sm:bottom-6 left-0 right-0 flex justify-center">
					<div className="bg-black/60 backdrop-blur-md rounded-full p-2 sm:p-3 flex gap-2 sm:gap-3">
						{colors.map((color) => (
							<motion.button
								key={color.name}
								className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all relative ${
									selectedColor.name === color.name
										? "ring-2 ring-white ring-offset-1 sm:ring-offset-2 ring-offset-black scale-110"
										: "hover:scale-105"
								}`}
								style={{
									background: color.gradient || color.code,
									boxShadow: color.shadow || "none",
									border: color.border || "none",
								}}
								onClick={() => handleColorChange(color)}
								aria-label={`Select ${color.name}`}
								whileHover={{
									scale: selectedColor.name === color.name ? 1.1 : 1.05,
								}}
								whileTap={{ scale: 0.95 }}
								transition={{ type: "spring", stiffness: 300, damping: 15 }}
							>
								{selectedColor.name === color.name && (
									<motion.div
										className="absolute inset-0 rounded-full border-2 border-white"
										initial={{ opacity: 0, scale: 1.2 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
									/>
								)}
							</motion.button>
						))}
					</div>
				</div>

				<div className="absolute top-2 sm:top-6 right-2 sm:right-6 flex gap-2">
					<motion.div
						className="bg-black/60 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						key={selectedColor.name}
						transition={{ delay: 0.3 }}
					>
						{selectedColor.name}
					</motion.div>
				</div>
			</div>
		</div>
	);
}
