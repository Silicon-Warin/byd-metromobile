"use client";

import { useState, useEffect } from "react";
import { defaultModels } from "@/data/carModel";
import CarSpecComparison from "@/components/CarSpecComparison";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function CompareModels() {
	// จำนวนรุ่นที่สามารถเลือกได้สูงสุด
	const MAX_SELECTED_MODELS = 3;
	const [selectedModelIds, setSelectedModelIds] = useState<string[]>([]);
	const [displayedModelIds, setDisplayedModelIds] = useState<string[]>([]);

	// ตั้งค่าเริ่มต้นให้แสดง 3 รุ่นแรก
	useEffect(() => {
		if (defaultModels.length > 0) {
			const initialIds = defaultModels
				.slice(0, MAX_SELECTED_MODELS)
				.map((model) => model.id.toString());
			setSelectedModelIds(initialIds);
			setDisplayedModelIds(initialIds);
		}
	}, []);

	// แปลงข้อมูลโมเดลสำหรับ CarSpecComparison
	const getModelDataForComparison = (modelId: string | number) => {
		const model = defaultModels.find(
			(m) => m.id.toString() === modelId.toString()
		);
		if (!model) return null;

		return {
			id: model.id.toString(),
			brand: "BYD",
			model: model.name.split(" ")[1] || "",
			name: model.name,
			image: model.imageUrlModel || "/placeholder.svg",
			colors: model.colors?.map((color) => color.code) || [
				"#000000",
				"#FFFFFF",
				"#808080",
			],
			battery: {
				type: model.specs?.battery || "BYD Blade Battery",
			},
			drivetrain: model.specs?.drivetrain || "FWD",
			power: {
				value: model.variants[0].power || "150",
				unit: "kW",
			},
			acceleration: {
				value: model.specs?.acceleration || "7.5",
			},
			range: {
				wltp: model.variants[0].range || "500 KM",
			},
			wheels: {
				size: '19"',
				type: "Alloy",
			},
			weight: {
				value: "2,185",
				unit: "กก.",
			},
		};
	};

	// จัดการการเลือกรุ่น
	const handleModelSelection = (modelId: string) => {
		setSelectedModelIds((prev) => {
			// ถ้ามีอยู่แล้ว ให้ลบออก
			if (prev.includes(modelId)) {
				return prev.filter((id) => id !== modelId);
			}

			// ถ้ายังไม่มีและยังไม่เกิน MAX_SELECTED_MODELS ให้เพิ่มเข้าไป
			if (prev.length < MAX_SELECTED_MODELS) {
				return [...prev, modelId];
			}

			// ถ้าเลือกครบแล้ว ให้แทนที่ตัวแรก
			return [...prev.slice(1), modelId];
		});
	};

	// เปรียบเทียบรุ่นที่เลือก
	const handleCompare = () => {
		setDisplayedModelIds(selectedModelIds);
	};

	// รุ่นที่แสดงในการเปรียบเทียบ
	const displayedModels = displayedModelIds
		.map((id) => getModelDataForComparison(id))
		.filter(
			(
				model
			): model is NonNullable<ReturnType<typeof getModelDataForComparison>> =>
				model !== null
		);

	return (
		<div className="bg-background">
			{/* Hero Section */}
			<div className="relative bg-black py-24">
				<div className="container mx-auto px-4">
					<div className="text-center">
						<h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
							เปรียบเทียบรุ่นรถยนต์ BYD
						</h1>
						<p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
							เลือกรุ่นรถยนต์ไฟฟ้า BYD ที่คุณสนใจเพื่อเปรียบเทียบ
							และค้นพบรุ่นที่ตอบโจทย์ความต้องการของคุณมากที่สุด
						</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="py-12">
				<div className="container mx-auto px-4">
					{/* Model Selection */}
					<div className="mb-12">
						<h2 className="text-2xl font-bold mb-4 text-foreground">
							เลือกรุ่นที่ต้องการเปรียบเทียบ (เลือกได้สูงสุด{" "}
							{MAX_SELECTED_MODELS} รุ่น)
						</h2>

						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
							{defaultModels.map((model) => (
								<div
									key={model.id}
									className={cn(
										"border rounded-lg p-4 cursor-pointer transition-all relative",
										selectedModelIds.includes(model.id.toString())
											? "border-blue-500 bg-blue-50/5"
											: "border-border hover:border-gray-400"
									)}
									onClick={() => handleModelSelection(model.id.toString())}
								>
									{selectedModelIds.includes(model.id.toString()) && (
										<Badge className="absolute top-2 right-2 bg-blue-500">
											<CheckIcon className="h-3 w-3 mr-1" />
											{selectedModelIds.indexOf(model.id.toString()) + 1}
										</Badge>
									)}
									<div className="flex items-center justify-center mb-3">
										<div className="w-16 h-16 relative">
											<Image
												src={model.imageUrlModel}
												alt={model.name}
												fill
												className="object-contain"
											/>
										</div>
									</div>
									<p className="text-sm text-center font-medium">
										{model.name}
									</p>
								</div>
							))}
						</div>

						<div className="flex justify-center mt-6">
							<Button
								size="lg"
								className="bg-blue-600 hover:bg-blue-700 min-w-[200px]"
								onClick={handleCompare}
								disabled={selectedModelIds.length === 0}
							>
								เปรียบเทียบรุ่นที่เลือก
							</Button>
						</div>
					</div>

					{/* Car Comparison Component */}
					{displayedModels.length > 0 ? (
						<CarSpecComparison cars={displayedModels} />
					) : (
						<div className="text-center p-12 bg-gray-50 rounded-lg">
							<p className="text-lg text-gray-500">
								กรุณาเลือกรุ่นที่ต้องการเปรียบเทียบ
							</p>
						</div>
					)}

					{/* Call to Action */}
					<div className="mt-16 text-center">
						<h2 className="text-2xl font-bold mb-4 text-foreground">
							พร้อมที่จะสัมผัสประสบการณ์การขับขี่รถยนต์ไฟฟ้า BYD แล้วหรือยัง?
						</h2>
						<p className="text-gray-500 mb-8">
							ค้นพบรายละเอียดเพิ่มเติมเกี่ยวกับรถยนต์ไฟฟ้า BYD
							หรือนัดหมายทดลองขับได้แล้ววันนี้
						</p>
						<div className="flex flex-wrap justify-center gap-4">
							<Button className="bg-blue-600 hover:bg-blue-700">
								นัดหมายทดลองขับ
							</Button>
							<Link href="/models">
								<Button variant="outline">ดูรถยนต์ทั้งหมด</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
