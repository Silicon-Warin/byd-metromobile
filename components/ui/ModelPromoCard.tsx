import React from "react";
import { CarModel } from "@/data/Model";
import Image from "next/image";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	return (
		<>
			<div className="relative group h-full flex flex-col w-full rounded-lg overflow-hidden shadow-lg">
				<div className="relative flex-grow w-full h-full transition duration-300 bg-gradient-to-b from-gray-800 to-gray-900">
					<Image
						src={model.imageUrlPromo}
						alt={model.name}
						width={model.imageWidth}
						height={model.imageHeight}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

					{/* Model Info Container */}
					<div className="absolute top-0 left-0 right-0 p-4 z-10">
						<h3 className="text-xl md:text-2xl font-bold text-white">
							{model.name}
						</h3>
						<p className="text-sm text-gray-200 mt-1">
							ราคาเริ่มต้น {model.price.toLocaleString()} บาท
						</p>
					</div>

					{/* Bottom Section: Order Now Button */}
					<div className="absolute bottom-0 left-0 right-0 p-4 z-10"></div>
				</div>
			</div>
		</>
	);
}
