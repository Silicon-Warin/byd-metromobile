import React, { useState } from "react";
import { CarModel } from "@/data/Model";
import { Button } from "./button";
import Image from "next/image";
import { toast } from "sonner";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	const [isLoading, setIsLoading] = useState(false);

	const handleInquiry = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("/api/inquiries", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					modelId: model.id,
					modelName: model.name,
					price: model.price,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send inquiry");
			}

			toast.success(
				"ขอบคุณสำหรับความสนใจ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด"
			);
		} catch (error) {
			console.error("Inquiry Error:", error);
			toast.error("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setIsLoading(false);
		}
	};

	return (
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
					{model.tagline && (
						<p className="text-sm text-gray-200 mt-1">{model.tagline}</p>
					)}
				</div>

				{/* Bottom Section: Order Now Button */}
				<div className="absolute bottom-0 left-0 right-0 p-4 z-10">
					<Button
						className="w-full transition-all duration-300 bg-white/90 hover:bg-white text-black"
						onClick={handleInquiry}
						disabled={isLoading}
					>
						{isLoading ? "กำลังส่งข้อมูล..." : "สนใจสั่งจอง"}
					</Button>
				</div>
			</div>
		</div>
	);
}
