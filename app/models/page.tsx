"use client";

import { motion } from "framer-motion";
import { defaultModels } from "@/data/carModel";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export default function ModelsPage() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const staggerContainer = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<main className="min-h-screen bg-black text-white pt-24">
			{/* Hero Section */}
			<section className="relative h-[40vh] md:h-[50vh] bg-gradient-to-b from-gray-900 to-black overflow-hidden">
				{/* Overlay gradient */}
				<div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black"></div>

				{/* Content */}
				<div className="container mx-auto px-4 h-full flex items-center justify-center text-white relative z-10">
					<div className="text-center max-w-4xl">
						<motion.h1
							className="text-4xl md:text-6xl font-bold mb-6"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
						>
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
								รุ่นรถยนต์
							</span>
							<br />
							BYD Metromobile
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							ค้นพบรถยนต์ไฟฟ้า BYD รุ่นต่างๆ
							ที่ผสมผสานเทคโนโลยีล้ำสมัยและการออกแบบที่โดดเด่น
						</motion.p>
					</div>
				</div>
			</section>

			{/* Models Section */}
			<section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
				<div className="container mx-auto px-4">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeIn}
						className="text-center mb-12"
					>
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							รถยนต์ไฟฟ้ารุ่นต่างๆ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							เลือกรถยนต์ไฟฟ้า BYD ที่ใช่สำหรับคุณ
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{defaultModels.map((model) => (
							<motion.div
								key={model.id}
								variants={fadeIn}
								className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full flex flex-col"
							>
								<div className="relative h-56 md:h-64 overflow-hidden">
									<Image
										src={model.imageUrlModel || "/placeholder.svg"}
										alt={model.name}
										fill
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
										className="object-cover transition-transform duration-500 hover:scale-105"
									/>
								</div>
								<div className="p-6 flex-1 flex flex-col">
									<h3 className="text-xl font-bold mb-2">{model.name}</h3>
									<p className="text-gray-400 mb-4">{model.description}</p>
									<div className="mt-auto">
										<p className="text-xl font-bold text-primary mb-4">
											฿{model.price.toLocaleString()}
										</p>
										<div className="grid grid-cols-3 gap-2 mb-4">
											<div className="bg-gray-700/50 p-3 rounded-lg">
												<p className="text-xs text-gray-400">ระยะทางขับขี่</p>
												<p className="text-sm font-medium">
													{model.specifications.range}
												</p>
											</div>
											<div className="bg-gray-700/50 p-3 rounded-lg">
												<p className="text-xs text-gray-400">อัตราเร่ง</p>
												<p className="text-sm font-medium">
													{model.specifications.acceleration}
												</p>
											</div>
											<div className="bg-gray-700/50 p-3 rounded-lg">
												<p className="text-xs text-gray-400">กำลัง</p>
												<p className="text-sm font-medium">
													{model.specifications.power}
												</p>
											</div>
										</div>
										<Link href={`/models/${model.id}`}>
											<Button
												variant="outline"
												className="w-full border-gray-600 hover:bg-primary hover:text-white hover:border-primary text-white"
											>
												รายละเอียดเพิ่มเติม
												<ChevronRight className="h-4 w-4 ml-2" />
											</Button>
										</Link>
									</div>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>
		</main>
	);
}
