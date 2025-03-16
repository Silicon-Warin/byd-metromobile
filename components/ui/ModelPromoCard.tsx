import React from "react";
import Link from "next/link";
import { CarModel } from "@/types/Model";
import { Button } from "./button";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	return (
		<Link
			href={model.orderUrl || "#"}
			className="relative group h-full flex flex-col w-full rounded-lg overflow-hidden shadow-lg"
		>
			{/* Background Image */}
			<div className="relative flex-grow w-full h-full transition duration-300 bg-gradient-to-b from-gray-800 to-gray-900">
				<img
					src={model.imageUrl}
					alt={model.name}
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>

				{/* Gradient Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

				{/* Model Info Container */}
				<div className="absolute top-0 left-0 right-0 p-4 z-10">
					<h3 className="text-xl md:text-2xl font-bold text-white">
						{model.name}
					</h3>
					{model.tagline && (
						<p className="text-sm text-gray-200 mt-1">{model.tagline}</p>
					)}
				</div>

				{/* Bottom Section: Order Now Button */}
				<div className="absolute bottom-0 left-0 right-0 p-4 z-10">
					<Button
						className="w-full transition-all duration-300 group-hover:bg-primary group-hover:text-white"
						variant={"outline"}
					>
						Order Now
					</Button>
				</div>
			</div>
		</Link>
	);
}
