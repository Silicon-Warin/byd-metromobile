import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CarColor } from "./types";

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

	const imageTransition = {
		duration: 1.2,
		ease: [0.22, 1, 0.36, 1],
	};

	return (
		<section className="relative z-10">
			<div className="sm:px-6 sm:flex md:mx-auto relative max-w-[1050px] 2xl:max-w-[1200px]">
				{/* Car Images */}
				<div
					className="absolute left-1/2 -translate-x-1/3 z-20 sm:flex sm:flex-col sm:items-center sm:justify-center "
					style={{
						top: "clamp(10%, 18vw, 24%)",
						transform: "translateX(-50%) scale(clamp(0.85, 1.4vw, 1.25))",
						width: "clamp(280px, 80vw, 800px)",
					}}
				>
					<div className="w-full aspect-[4/2] relative will-change-opacity">
						<AnimatePresence>
							{colorTransition.from && (
								<motion.div
									key={colorTransition.from.name}
									initial={{ opacity: 1 }}
									animate={{ opacity: 0 }}
									exit={{ opacity: 0 }}
									transition={imageTransition}
									className="absolute inset-0 w-full h-full"
								>
									<Image
										src={colorTransition.from.image || "/placeholder.svg"}
										alt={`${modelName} in ${colorTransition.from.name}`}
										fill
										className="object-contain"
										sizes="(max-width: 375px) 300px, (max-width: 640px) 450px, (max-width: 768px) 600px, (max-width: 1280px) 900px, 1200px"
										priority
									/>
								</motion.div>
							)}
						</AnimatePresence>

						<motion.div
							key={colorTransition.to.name}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ ...imageTransition, delay: 0.1 }}
							className="absolute inset-0 w-full h-full"
						>
							<Image
								src={colorTransition.to.image || "/placeholder.svg"}
								alt={`${modelName} in ${colorTransition.to.name}`}
								fill
								className="object-contain"
								sizes="(max-width: 375px) 300px, (max-width: 640px) 450px, (max-width: 768px) 600px, (max-width: 1280px) 900px, 1200px"
								priority
							/>
						</motion.div>
					</div>
				</div>

				{/* Text and Color Selector */}
				<div className="relative z-10 py-12 pl-8 md:pl-0">
					<div className="md:max-w-[60%] lg:w-[65%] space-y-6 ml-0 md:ml-8 lg:ml-16">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-2"
						>
							<h2 className="text-4xl sm:text-5xl lg:text-6xl font-prompt">
								<span className="text-gray-400">เลือกสไตล์</span>
								<br />
								<span className="text-white">ที่ใช่</span>
								<br />
								<span className="text-gray-400">สำหรับรถคุณ</span>
							</h2>
						</motion.div>

						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.3 }}
							className="space-y-4 mt-12 md:mt-24"
						>
							<h3 className="text-3xl text-white font-bold">
								{colorTransition.to.name}
							</h3>

							<div className="flex gap-4 mt-6">
								{colors.map((color) => (
									<motion.button
										key={color.name}
										className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full transition-all relative ${
											colorTransition.to.name === color.name
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
											scale:
												colorTransition.to.name === color.name ? 1.1 : 1.05,
										}}
										whileTap={{ scale: 0.95 }}
										transition={{ type: "spring", stiffness: 300, damping: 15 }}
									>
										{colorTransition.to.name === color.name && (
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
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
