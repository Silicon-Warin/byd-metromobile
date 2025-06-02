"use client";
import { motion } from "framer-motion";
import {
	Phone,
	MapPin,
	Heart,
	MessageCircle,
	Link,
	Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TestDriveButton from "@/components/TestDriveButton";
import BranchMapButton from "@/components/BranchMapButton";

const PromotionContactSection = () => {
	const branches = [
		{ name: "พระราม3", phone: "02 291 8889" },
		{ name: "ตลิ่งชัน", phone: "02 448 3999" },
		{ name: "อ่อนนุช", phone: "080 416 1888" },
		{ name: "รามอินทรา", phone: "081 665 6888" },
		{ name: "Line Official", phone: "@BYDMetromobile", isLine: true },
		{ name: "RCA-พระราม9", phone: "082 340 7888" },
	];

	return (
		<section className="py-16 px-4">
			<div className="max-w-7xl mx-auto">
				<motion.div
					className="text-center mb-12"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<div className="flex items-center justify-center gap-3 mb-6">
						<Heart className="w-8 h-8 text-blue-400" />
						<h2 className="text-3xl md:text-5xl font-bold text-white">
							BYD Metromobile
						</h2>
						<Heart className="w-8 h-8 text-blue-400" />
					</div>

					<p className="text-lg md:text-xl text-blue-400 font-semibold mb-2">
						#เมโทรโมบิล
					</p>

					<div className="space-y-2 mb-6">
						<p className="text-lg text-red-300 font-bold">
							ดีลเลอร์ BYD ยอดขายมากกว่า 6,000 คัน
						</p>
						<p className="text-base text-slate-400">
							พร้อมศูนย์บริการ & ศูนย์ซ่อมสีมาตรฐาน
						</p>
						<p className="text-2xl text-red-400 font-bold">5 สาขา 🎉</p>
					</div>
				</motion.div>

				<div className="grid grid-cols-2 lg:grid-cols-3 ap-6 mb-12">
					<motion.div
						className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
					>
						{branches.map((branch, index) => (
							<motion.div
								key={branch.name}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card
									className={`${
										branch.isLine
											? "bg-green-800/50 border-green-600/30"
											: "bg-slate-800/50 border-slate-600/30"
									} backdrop-blur-sm hover:bg-slate-700/50 transition-all duration-300`}
								>
									<CardContent className="p-6">
										<div className="flex items-center gap-3 mb-4">
											{branch.isLine ? (
												<MessageCircle className="w-5 h-5 text-green-400" />
											) : (
												<MapPin className="w-5 h-5 text-red-400" />
											)}
											<h3 className="text-xl font-bold text-white">
												{branch.name}
											</h3>
										</div>

										<div className="flex items-center gap-3">
											{branch.isLine ? (
												<MessageCircle className="w-4 h-4 text-green-400" />
											) : (
												<Phone className="w-4 h-4 text-blue-400" />
											)}
											<a
												href={
													branch.isLine
														? `https://line.me/R/ti/p/${branch.phone}`
														: `tel:${branch.phone.replace(/\s/g, "")}`
												}
												className={`${
													branch.isLine
														? "text-green-300 hover:text-green-200"
														: "text-red-300 hover:text-red-200"
												} font-semibold transition-colors`}
												target={branch.isLine ? "_blank" : undefined}
												rel={branch.isLine ? "noopener noreferrer" : undefined}
											>
												{branch.phone}
											</a>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
				{/* Location Names */}
				<motion.div
					className="text-center space-y-4"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					viewport={{ once: true }}
				>
					<p className="text-lg text-slate-400 font-medium">
						พระราม3 | ตลิ่งชัน | อ่อนนุช | รามอินทรา | RCA-พระราม9
					</p>

					<div className="flex flex-wrap justify-center gap-6 mt-8">
						<BranchMapButton
							variant="outline"
							className="bg-slate-800/50 border-blue-400/50 text-blue-300 hover:bg-blue-400 hover:text-white transition-all"
						/>

						<TestDriveButton className="bg-gradient-to-r from-red-700 to-blue-700 hover:from-red-800 hover:to-blue-800 text-white">
							<Calendar className="mr-2 h-4 w-4" />
							จองทดลองขับ
						</TestDriveButton>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default PromotionContactSection;
