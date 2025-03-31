"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { CarModel, CarVariant } from "./types";
import { MapPin, Gauge, Car, Battery, BatteryChargingIcon } from "lucide-react";

interface ModelOverviewProps {
	carModel: CarModel;
	selectedVariant: CarVariant | null;
}

export default function ModelOverview({
	carModel,
	selectedVariant,
}: ModelOverviewProps) {
	// ใช้ข้อมูลจาก selectedVariant ถ้ามี หรือไม่ก็ใช้จาก carModel
	const specs = {
		range: selectedVariant?.range || carModel.specs?.range || "",
		acceleration:
			selectedVariant?.acceleration || carModel.specs?.acceleration || "",
		power: selectedVariant?.power || carModel.specs?.motor || "",
		battery: carModel.specs?.battery || "",
		charging: carModel.specs?.charging || "",
	};

	return (
		<section className="py-16 bg-black">
			<div className="container mx-auto px-4">
				{/* ส่วนบนแสดงข้อมูลหลัก */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-16 mb-16">
					{/* คอลัมน์ซ้าย */}
					<div className="space-y-12">
						<div>
							<motion.div
								className="flex items-start gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
							>
								<div className="min-w-8">
									<MapPin className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<p className="text-red-500 text-xs uppercase tracking-wider mb-1">
										ระยะทางขับขี่
									</p>
									<h3 className="text-4xl font-bold text-white">
										{specs.range.split(" ")[0]} กิโลเมตร
									</h3>
								</div>
							</motion.div>
						</div>

						<div>
							<motion.div
								className="flex items-start gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
							>
								<div className="min-w-8">
									<Gauge className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<p className="text-red-500 text-xs uppercase tracking-wider mb-1">
										0-100 กม/ชม
									</p>
									<h3 className="text-4xl font-bold text-white">
										{specs.acceleration}
									</h3>
								</div>
							</motion.div>
						</div>
					</div>

					{/* คอลัมน์ขวา */}
					<div className="space-y-12">
						<div>
							<motion.div
								className="flex items-start gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.2 }}
							>
								<div className="min-w-8">
									<Car className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<p className="text-red-500 text-xs uppercase tracking-wider mb-1">
										มอเตอร์
									</p>
									<h3 className="text-4xl font-bold text-white">
										{specs.power}
									</h3>
								</div>
							</motion.div>
						</div>

						<div>
							<motion.div
								className="flex items-start gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.3 }}
							>
								<div className="min-w-8">
									<Battery className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<p className="text-red-500 text-xs uppercase tracking-wider mb-1">
										แบตเตอรี่
									</p>
									<h3 className="text-4xl font-bold text-white">
										{specs.battery}
									</h3>
								</div>
							</motion.div>
						</div>

						<div>
							<motion.div
								className="flex items-start gap-4"
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.4 }}
							>
								<div className="min-w-8">
									<BatteryChargingIcon className="w-5 h-5 text-red-500" />
								</div>
								<div>
									<p className="text-red-500 text-xs uppercase tracking-wider mb-1">
										ชาร์จเจอร์
									</p>
									<h3 className="text-2xl font-bold text-white">
										{specs.charging}
									</h3>
								</div>
							</motion.div>
						</div>
					</div>
				</div>

				{/* เส้นคั่นบาง */}
				<div className="h-px bg-gray-800 w-full my-12"></div>

				{/* ส่วนแสดงรุ่นย่อย */}
				{carModel.variants && carModel.variants.length > 1 && (
					<div className="mt-12">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
							{carModel.variants.map((variant, i) => (
								<React.Fragment key={variant.id}>
									<motion.div
										className={`py-8 px-4 text-center ${
											i !== carModel.variants.length - 1
												? "md:border-r border-gray-800"
												: ""
										}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
									>
										<Image
											src="/images/BYD-logo.png"
											alt="BYD Logo"
											width={24}
											height={24}
											className="h-6 w-auto mb-1 mx-auto"
										/>
										<h3 className="text-2xl font-bold text-white mb-1">
											{carModel.name}
										</h3>
										<p className="text-gray-400 mb-6">{variant.name}</p>

										<div className="mb-6">
											<p className="text-3xl font-bold text-white">
												{variant.acceleration?.split(" ")[0] || "7.5"} Sec
											</p>
											<p className="text-xs text-gray-500 mt-1">0-100 กม/ชม</p>
											<p className="text-xs text-gray-500 uppercase mt-1 tracking-wider">
												ACCELERATION
											</p>
										</div>

										<div>
											<p className="text-3xl font-bold text-white">
												{variant.range?.split(" ")[0] || "500"} km
											</p>
										</div>
									</motion.div>
									{i !== carModel.variants.length - 1 && (
										<div className="h-px bg-gray-800 w-full my-4 md:hidden" />
									)}
								</React.Fragment>
							))}
						</div>
					</div>
				)}

				{/* ปุ่มจองทดลองขับ */}
				<div className="mt-12 text-center">
					<motion.button
						className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-medium"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						จองทดลองขับ
					</motion.button>
				</div>
			</div>
		</section>
	);
}
