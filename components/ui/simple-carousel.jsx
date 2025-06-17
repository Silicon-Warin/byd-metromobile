"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export default function SimpleCarousel({
	images,
	autoplayInterval = 3000,
	className,
	imageClassName,
}) {
	const [currentIndex, setCurrentIndex] = useState(0);

	// Generate random rotations for each image (static per image)
	const [imageRotations] = useState(() =>
		images.map(() => Math.random() * 20 - 10)
	);

	// Auto-advance carousel
	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
		}, autoplayInterval);

		return () => clearInterval(interval);
	}, [autoplayInterval, images.length]);

	return (
		<div className={cn("relative w-full overflow-hidden", className)}>
			{/* Images with tilted layout */}
			<div className="flex justify-center items-center h-40 md:h-60">
				{images.map((image, index) => {
					// Calculate position relative to current index
					const position =
						(index - currentIndex + images.length) % images.length;
					const isVisible = position < 5; // Show 5 images at a time

					// Calculate z-index and scale based on position
					let zIndex = 1;
					let scale = 0.7;
					let opacity = 0.4;
					let translateX = 0;

					if (position === 0) {
						// Center image (current)
						zIndex = 10;
						scale = 1;
						opacity = 1;
					} else if (position === 1 || position === images.length - 1) {
						// Adjacent images
						zIndex = 5;
						scale = 0.85;
						opacity = 0.7;
						translateX = position === 1 ? 15 : -15;
					} else if (position === 2 || position === images.length - 2) {
						// Second adjacent images
						zIndex = 3;
						scale = 0.75;
						opacity = 0.5;
						translateX = position === 2 ? 30 : -30;
					}

					return (
						<AnimatePresence key={image.id}>
							{isVisible && (
								<motion.div
									initial={{
										opacity: 0,
										scale: 0.5,
										rotate: imageRotations[index],
									}}
									animate={{
										opacity,
										scale,
										rotate: imageRotations[index],
										x: translateX,
										zIndex,
									}}
									exit={{
										opacity: 0,
										scale: 0.5,
									}}
									transition={{
										duration: 0.8,
										ease: "easeInOut",
									}}
									className={cn(
										"absolute rounded-lg bg-white dark:bg-neutral-800 p-1 shadow-lg border border-neutral-200 dark:border-neutral-700",
										imageClassName
									)}
								>
									<img
										src={image.src}
										alt={image.alt}
										className="rounded-md h-24 w-24 md:h-32 md:w-32 object-cover"
										loading="lazy"
									/>
								</motion.div>
							)}
						</AnimatePresence>
					);
				})}
			</div>
		</div>
	);
}
