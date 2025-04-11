"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ModernPromo } from "@/components/ui/modernpromo";

export default function HeroContent() {
	return (
		<div className="relative z-10 bg-gradient-to-r from-blue-900/80 to-purple-900/80 p-6 rounded-2xl backdrop-blur-sm border border-blue-500/20 shadow-xl max-w-7xl mx-auto">
			<motion.div
				className="flex flex-col md:flex-row items-center gap-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* Left content */}
				<div className="md:w-3/5 text-left">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<h1 className="text-3xl md:text-4xl font-bold mb-3 text-gradient-water">
							<span className="text-blue-300">🌊</span> BIG SPLASH BIG DEAL{" "}
							<span className="text-blue-300">💦</span>
						</h1>

						<p className="text-xl text-cyan-100 mb-4">
							ฤดูร้อนนี้ ขับไปให้สุดทุกเส้นทาง
							<br />
							กับดีลร้อนแรงที่สุดของปี
						</p>

						<div className="space-y-2 mb-4">
							<div className="flex items-center text-white">
								<span className="bg-blue-500 rounded-full p-1 mr-2 flex-shrink-0">
									⚡
								</span>
								<p>
									ผ่อนเริ่มต้นเบาๆ แค่{" "}
									<span className="font-bold text-yellow-300">5,213 บาท</span>
								</p>
							</div>
							<div className="flex items-center text-white">
								<span className="bg-blue-500 rounded-full p-1 mr-2 flex-shrink-0">
									🌟
								</span>
								<p>
									ราคาเริ่มต้นเพียง{" "}
									<span className="font-bold text-yellow-300">499,900 บาท</span>
								</p>
							</div>
						</div>

						<p className="text-sm text-blue-200 mb-4">
							จะเที่ยว จะทำงาน หรือชิลในเมือง ก็เอาอยู่ทุกเส้นทาง
							<br />
							เติมเต็มทุกทริปของคุณให้สดชื่นเหมือนสายลมทะเล
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="flex flex-col space-y-3 mt-2"
					>
						<ModernPromo
							href="https://line.me/R/ti/p/%40bydmetromobile"
							text="รับข้อเสนอพิเศษสงกรานต์"
							external={true}
						/>

						<p className="text-xs text-blue-200">
							ดีลดีแบบนี้ มีถึงแค่ 30 เมษายน 68 นี้เท่านั้น!
						</p>
						<p className="text-xs text-gray-400">
							**เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
						</p>
					</motion.div>
				</div>

				{/* Right content - Image */}
				<motion.div
					className="hidden md:block md:w-2/5 relative h-[400px]"
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.7, delay: 0.3 }}
				>
					<Image
						src="/images/promotions/sealion6dmi-force-edge.webp"
						alt="BYD Songkran Special"
						fill
						className="object-cover rounded-xl"
						priority
					/>
				</motion.div>
			</motion.div>
		</div>
	);
}
