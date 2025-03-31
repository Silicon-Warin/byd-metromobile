import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SpecTable, SpecItem, SpecDivider } from "@/components/ui/table";
import Image from "next/image";

interface CarSpecComparisonProps {
	cars: {
		id: string;
		brand: string;
		model: string;
		name: string;
		image: string;
		colors: string[];
		battery: {
			type: string;
		};
		drivetrain: string;
		power: {
			value: number | string;
			unit: string;
		};
		acceleration: {
			value: number | string;
		};
		range: {
			nedc?: number | string;
			wltp?: number | string;
		};
		wheels: {
			size: string;
			type: string;
		};
		weight: {
			value: number | string;
			unit: string;
		};
	}[];
	defaultSelectedColor?: string;
	isVariantComparison?: boolean;
}

export default function CarSpecComparison({
	cars,
	defaultSelectedColor = "blue",
	isVariantComparison = false,
}: CarSpecComparisonProps) {
	const [selectedColors, setSelectedColors] = useState<Record<string, string>>(
		cars.reduce((acc, car) => ({ ...acc, [car.id]: defaultSelectedColor }), {})
	);

	const handleColorChange = (carId: string, color: string) => {
		setSelectedColors((prev) => ({
			...prev,
			[carId]: color,
		}));
	};

	const textColor = isVariantComparison ? "text-foreground" : "text-white";
	const labelColor = isVariantComparison ? "text-gray-500" : "text-gray-400";

	return (
		<div
			className={cn(
				"w-full",
				isVariantComparison ? "bg-transparent" : "bg-black text-white py-12"
			)}
		>
			<div className="container mx-auto px-4">
				{!isVariantComparison && (
					<div className="text-center mb-8">
						<h2 className="text-3xl font-bold mb-2">เปรียบเทียบรุ่นรถยนต์</h2>
						<a
							href="#"
							className="text-white hover:underline inline-flex items-center"
						>
							ดาวน์โหลดโบรชัวร์ &gt;
						</a>
					</div>
				)}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{cars.map((car) => (
						<div key={car.id} className="flex flex-col">
							{/* รูปรถยนต์ */}
							<div className="mb-6 flex justify-center">
								<div className="relative w-full max-w-[300px] h-[200px]">
									<Image
										src={car.image}
										alt={`${car.brand} ${car.model} ${car.name}`}
										fill
										className="object-contain"
									/>
								</div>
							</div>

							{/* เลือกสี */}
							<div className="flex items-center justify-center gap-2 mb-4">
								{car.colors.map((color) => (
									<button
										key={color}
										className={cn(
											"w-5 h-5 rounded-full border border-gray-600",
											selectedColors[car.id] === color
												? `ring-2 ${
														isVariantComparison ? "ring-primary" : "ring-white"
												  } ring-offset-2 ${
														isVariantComparison
															? "ring-offset-background"
															: "ring-offset-black"
												  }`
												: ""
										)}
										style={{ backgroundColor: color }}
										onClick={() => handleColorChange(car.id, color)}
										aria-label={`เลือกสี ${color}`}
									/>
								))}
							</div>

							{/* ชื่อรุ่นรถยนต์ */}
							<div className="mb-4 text-center">
								<div className={cn("text-sm", labelColor)}>
									{car.brand} {car.model}
								</div>
								<h3 className={cn("text-2xl font-bold", textColor)}>
									{car.name}
								</h3>
							</div>

							<div
								className={cn(
									"border-t border-gray-800 my-4",
									isVariantComparison ? "border-gray-200" : "border-gray-800"
								)}
							></div>

							{/* ข้อมูลสเปค */}
							<div className="space-y-6 flex-grow">
								<div>
									<div className={cn("text-sm", labelColor)}>แบตเตอรี่</div>
									<div className={textColor}>{car.battery.type}</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>
										ระบบขับเคลื่อน
									</div>
									<div className={textColor}>{car.drivetrain}</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>กำลังสูงสุด</div>
									<div className={textColor}>
										{car.power.value}
										{car.power.unit}
									</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>
										อัตราเร่ง 0-100 กม./ชม.
									</div>
									<div className={textColor}>{car.acceleration.value}s</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>ระยะทางขับขี่</div>
									<div className={textColor}>
										{car.range.nedc && `${car.range.nedc}KM NEDC`}
										{car.range.nedc && car.range.wltp && ", "}
										{car.range.wltp && `${car.range.wltp}KM WLTP`}
									</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>ล้อ</div>
									<div className={textColor}>
										{car.wheels.size} {car.wheels.type}
									</div>
								</div>

								<div>
									<div className={cn("text-sm", labelColor)}>น้ำหนักรถ</div>
									<div className={textColor}>
										{car.weight.value} {car.weight.unit}
									</div>
								</div>
							</div>

							<div
								className={cn(
									"border-t border-gray-800 my-4",
									isVariantComparison ? "border-gray-200" : "border-gray-800"
								)}
							></div>

							{/* ปุ่มสั่งซื้อ */}
							<Button
								className={cn(
									"w-full rounded-full py-3 font-medium",
									isVariantComparison
										? "bg-blue-600 hover:bg-blue-700 text-white"
										: "bg-blue-600 hover:bg-blue-700 text-white"
								)}
							>
								{isVariantComparison ? "Order Now" : "สั่งซื้อตอนนี้"}
							</Button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
