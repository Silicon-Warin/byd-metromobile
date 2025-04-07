import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
	const [selectedColor, setSelectedColor] = useState<CarColor>(initialColor);

	const handleColorChange = (color: CarColor) => {
		setSelectedColor(color);
		onColorChange(color);
	};

	return (
		<section className="relative max-h-screen bg-bg-black/10 overflow-hidden">
			{/* Content Container */}
			<div className="md:container md:mx-auto md:rounded-md py-16 relative -mt-20 md:mt-8 md:px-10">
				{/* Car image - Positioned absolutely to overlap text */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="absolute left-1/2 md:left-1/2 top-1/4 -translate-x-1/2 md:-translate-x-[20%] -translate-y-1/2 
					w-[90%] max-w-[350px] sm:w-[65%] md:w-[80%] lg:w-[70%]
					lg:top-[15%] z-20"
				>
					<div
						className="w-full md:min-h-0 
						scale-[0.6] sm:scale-[0.45] md:scale-110 lg:scale-150"
					>
						<Image
							src={selectedColor.image || "/placeholder.svg"}
							alt={`${modelName} in ${selectedColor.name}`}
							fill
							className="object-cover overflow-visible z-20"
							sizes="(max-width: 375px) 200px, (max-width: 640px) 250px, (max-width: 768px) 600px, (max-width: 1280px) 900px, 1200px"
							priority
							style={{
								minWidth: "300px",
								minHeight: "250px",
								padding: "0 10px",
							}}
						/>
					</div>
				</motion.div>

				{/* Text content */}
				<div className="relative z-10 py-12 pl-8 md:pl-0">
					<div className="md:max-w-[40%] lg:w-[45%] space-y-6 ml-0 md:ml-8 lg:ml-16">
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
								{selectedColor.name}
							</h3>

							<div className="flex flex-wrap gap-4 mt-6">
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
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}
