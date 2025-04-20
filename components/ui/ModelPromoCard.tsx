import React from "react";
import { CarModel } from "@/data/carModel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	// สร้าง slug จากชื่อรถ
	const getModelSlug = (name: string) => {
		// ตัด BYD ออกและหา keyword หลัก (SEAL, ATTO 3, DOLPHIN, etc.)
		const mainName = name.replace("BYD", "").replace("NEW", "").trim();
		// แปลงเป็น lowercase และ remove spaces
		return mainName.toLowerCase().replace(/\s+/g, "-");
	};

	// ใช้ slug จาก model ถ้ามี หรือสร้างจากชื่อถ้าไม่มี
	const slug = model.slug || getModelSlug(model.name);

	const detailPageUrl = `/models/${slug}/loan-calculator`;

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
					loading="lazy"
					quality={75}
				/>

				{/* Model Info Container */}
				<div className="absolute top-0 left-0 right-0 p-4 z-10">
					<h3 className="text-xl md:text-2xl font-bold text-white">
						{model.name}
					</h3>
					<p className="text-sm text-gray-200 mt-1">
						ราคาเริ่มต้น {model.price.toLocaleString()} บาท
					</p>
				</div>

				{/* Bottom Section: View Details Button */}
				<div className="absolute bottom-0 left-0 right-0 p-4 z-10">
					<Link href={detailPageUrl}>
						<Button
							className="w-full bg-primary/80 hover:bg-primary text-white group transition-all duration-300 shadow-lg"
							size="sm"
						>
							<span>ดูรายละเอียด</span>
							<ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
