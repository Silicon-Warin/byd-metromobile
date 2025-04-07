"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import BatteryChargingAnimation from "@/components/Models/BatteryChargingAnimation";

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

const staggerChildren = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export default function BYDSection() {
	return (
		<section className="py-16 bg-white text-slate-800">
			<div className="container mx-auto px-4">
				{/* Battery Warranty */}
				<motion.div
					className="flex flex-col items-center text-center mb-16"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeIn}
				>
					<BatteryChargingAnimation />
					<h3 className="text-sm uppercase tracking-wider text-slate-600 mb-1">
						รับประกันแบตเตอรี่นาน
					</h3>
					<h2 className="text-4xl font-bold mb-3">8 years or 160,000 km</h2>
					<div className="w-16 h-1 bg-blue-600 mx-auto"></div>
				</motion.div>

				{/* BYD SEAL Heading */}
				<motion.div
					className="text-center mb-12"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeIn}
				>
					<h2 className="text-3xl font-bold mb-4">
						BYD SEAL: energy
						<br />
						innovation for better
						<br />
						living experience
					</h2>
				</motion.div>

				{/* Main Feature Image */}
				<motion.div
					className="mb-16"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeIn}
				>
					<Card className="overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700">
						<CardContent className="p-0">
							<Image
								src="/images/byd-seal-battery.jpg"
								alt="BYD SEAL battery technology"
								width={800}
								height={400}
								className="w-full object-cover"
							/>
							<p className="text-xs text-slate-300 p-4">
								BYD SEAL features groundbreaking Battery technology, including
								innovative Cell-to-Body (CTB) provides best-in-class safety
								features with optimal fit and weight distribution.
							</p>
						</CardContent>
					</Card>
				</motion.div>

				{/* Feature Cards */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerChildren}
				>
					{/* Feature 1 */}
					<motion.div variants={fadeIn}>
						<Card className="h-full">
							<CardContent className="p-4">
								<Image
									src="/images/byd-seal-drivetrain.jpg"
									alt="BYD SEAL drivetrain"
									width={400}
									height={250}
									className="w-full object-cover rounded-md mb-4"
								/>
								<p className="text-xs text-slate-600">
									High-performance dual-motor configuration provides exceptional
									power and acceleration with precise control for both everyday
									driving and sporty experiences.
								</p>
							</CardContent>
						</Card>
					</motion.div>

					{/* Feature 2 */}
					<motion.div variants={fadeIn}>
						<Card className="h-full">
							<CardContent className="p-4">
								<Image
									src="/images/byd-seal-panoramic-roof.jpg"
									alt="BYD SEAL panoramic roof"
									width={400}
									height={250}
									className="w-full object-cover rounded-md mb-4"
								/>
								<p className="text-xs text-slate-600">
									Ultra-efficient panoramic glass roof design combines maximum
									visibility with advanced UV protection for a bright, airy
									cabin while maintaining thermal comfort and efficiency levels.
								</p>
							</CardContent>
						</Card>
					</motion.div>
				</motion.div>

				{/* Bottom Car Image with Features */}
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeIn}
				>
					<Card className="overflow-hidden bg-gradient-to-r from-slate-800 to-slate-700">
						<CardContent className="p-0 relative">
							<Image
								src="/images/byd-seal-exterior.jpg"
								alt="BYD SEAL exterior"
								width={1000}
								height={500}
								className="w-full object-cover"
							/>

							{/* Feature List */}
							<div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white">
								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-2">
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">
												Ocean X inspired aerodynamic design
											</p>
										</div>
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">
												Impressive 0.219 drag coefficient
											</p>
										</div>
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">
												Up to 650km maximum range (NEDC)
											</p>
										</div>
									</div>
									<div className="space-y-2">
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">
												Intelligent temperature management system
											</p>
										</div>
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">Rapid DC charging capability</p>
										</div>
										<div className="flex items-center">
											<div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
											<p className="text-xs">
												Vehicle-to-Load (V2L) power sharing
											</p>
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}
