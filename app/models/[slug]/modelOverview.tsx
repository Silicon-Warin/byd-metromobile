"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { CarModel } from "@/data/carModel";
import {
	MapPin,
	Gauge,
	Car,
	Battery,
	BatteryChargingIcon,
	Zap,
} from "lucide-react";
import { CarVariant } from "@/data/carModel";
import TestDriveButton from "@/components/TestDriveButton";

interface ModelOverviewProps {
	carModel: CarModel;
	selectedVariant: CarVariant | null;
	id?: string;
}

export default function ModelOverview({
	carModel,
	selectedVariant,
	id,
}: ModelOverviewProps) {
	const specs = {
		range: carModel.specs?.range || "",
		acceleration: carModel.specs?.acceleration || "",
		motor: carModel.specs?.motor || "",
		battery: carModel.specs?.battery || "",
		charging: carModel.specs?.charging || "",
		annotate: carModel.specs?.annotate || "",
	};

	return (
		<section id={id} className="py-16 bg-black">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				{/* Top section with car model name and specs */}
				{/* Desktop version with vertical dividers (md and up) */}
				<div className="hidden md:block">
					{/* Top specs section */}
					<div className="mb-12">
						<div className="grid grid-cols-4 gap-0">
							{/* Performance section header */}
							<div className="col-span-2 mb-4">
								<h2 className="text-red-600 text-md font-medium">
									Performance
								</h2>
							</div>
							{/* Battery section header */}
							<div className="col-span-2 mb-4">
								<h2 className="text-red-600 text-md font-medium">Battery</h2>
							</div>

							{/* Maximum distance */}
							<div className="pr-6 border-r border-blue-900">
								<div className="flex items-center gap-2 mb-2">
									<MapPin className="w-4 h-4 text-red-600" />
									<span className="text-sm text-gray-400">
										Maximum distance
									</span>
								</div>
								<div className="text-3xl font-bold text-white">
									{specs.range.split(" ")[0]} km
								</div>
							</div>

							{/* 0-100 km/h */}
							<div className="px-6 border-r border-blue-900">
								<div className="flex items-center gap-2 mb-2">
									<Gauge className="w-4 h-4 text-red-600" />
									<span className="text-sm text-gray-400">0-100 km/h</span>
								</div>
								<div className="text-3xl font-bold text-white">
									{specs.acceleration.split(" ")[0]} s
								</div>
							</div>

							{/* Motor */}
							<div className="px-6 border-r border-blue-900">
								<div className="flex items-center gap-2 mb-2">
									<Car className="w-4 h-4 text-red-600" />
									<span className="text-sm text-gray-400">Motor</span>
								</div>
								<div className="text-3xl font-bold text-white">
									{specs.motor.split(" ")[0]} kW
								</div>
							</div>

							{/* Charging */}
							<div className="pl-6">
								<div className="flex items-center gap-2 mb-2">
									<Battery className="w-4 h-4 text-red-600" />
									<span className="text-sm text-gray-400">Charging</span>
								</div>
								<div className="text-3xl font-bold text-white">
									{specs.battery.split(" ")[0]} kWh
								</div>
							</div>
						</div>

						{/* EV Charger row */}
						<div className="mt-8 border-t border-blue-900 pt-8">
							<div className="flex items-center gap-2 mb-2">
								<Zap className="w-4 h-4 text-red-600" />
								<span className="text-sm text-gray-400">EV charger</span>
							</div>
							<div className="text-3xl font-bold text-white">
								AC type 2 / DC CCS 2 (150kW)
							</div>
						</div>

						{/* AWD Performance range */}
						<div className="mt-8 border-t border-blue-900 pt-4 text-center text-sm text-gray-400">
							{carModel.specs?.annotate}
						</div>

						{/* Technical information button */}
						<div className="mt-4 text-center">
							<Link href="#technical-info">
								<button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium">
									Technical information
								</button>
							</Link>
						</div>
					</div>

					{/* Variants comparison */}
					{carModel.variants && carModel.variants.length > 1 && (
						<div className="mt-16 pt-8 border-t border-blue-900">
							<div className="grid grid-cols-3 gap-0">
								{carModel.variants.map((variant, i) => (
									<div
										key={variant.id}
										className={`text-center ${
											i !== carModel.variants.length - 1
												? "border-r border-blue-900"
												: ""
										}`}
									>
										<div className="text-xl font-bold text-white mb-1">
											{carModel.name}
										</div>
										<div className="text-gray-400 mb-6">{variant.name}</div>

										<div className="mb-4">
											<div className="text-3xl font-bold text-white">
												{variant.acceleration?.split(" ")[0] || "7.5"} Sec
											</div>
											<div className="text-xs text-gray-500 mt-1">
												0-100 km/h
											</div>
											<div className="text-xs text-gray-400 uppercase mt-1 tracking-wider">
												ACCELERATION
											</div>
										</div>

										<div className="mt-6">
											<div className="text-3xl font-bold text-white">
												{variant.range?.split(" ")[0] || "500"} km
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				{/* Mobile version (original layout) */}
				<div className="md:hidden">
					{/* ส่วนบนแสดงข้อมูลหลัก */}
					<div className="grid grid-cols-1 gap-y-8 mb-8 md:mb-16">
						{/* คอลัมน์ซ้าย */}
						<div className="flex flex-col gap-8 p-8">
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
											{specs.motor}
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
										<span className="text-xs text-gray-400 text-balance">
											{specs.annotate}
										</span>
									</div>
								</motion.div>
							</div>
						</div>
					</div>
				</div>

				{/* ปุ่มจองทดลองขับ */}
				<div className="my-4 md:mt-12 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.6 }}
					>
						<TestDriveButton
							variant="default"
							size="lg"
							defaultModel={carModel.slug}
						>
							ทดลองขับ {carModel.name}
						</TestDriveButton>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
