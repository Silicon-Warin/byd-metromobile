"use client";

import { motion } from "framer-motion";
import { ModernPromo } from "@/components/ui/modernpromo";

export default function HeroContent() {
	return (
		<div className="relative z-10 p-6 rounded-2xl backdrop-blur-sm border border-green-500/20 shadow-xl max-w-7xl mx-auto bg-transparent">
			<motion.div
				className="flex flex-col items-center gap-6"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				{/* สำหรับ Mobile - แสดงเฉพาะส่วนที่สำคัญ */}
				<div className="w-full text-center">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<p className="text-xl text-cyan-100 mb-4">
							ชีวิตไม่ควรต้องหยุดชาร์จแค่ที่ปลั๊ก
							<br className="hidden md:block" />
							เมื่อรถไฟฟ้า BYD พร้อมพาคุณขับสู่จังหวะชีวิตที่ "ใช่" กว่าเคย
						</p>

						{/* ซ่อนกริดบน mobile แต่แสดงบน desktop */}
						<div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
							<div className="flex flex-col items-center p-4 bg-green-900/30 rounded-lg">
								<span className="text-2xl mb-2">🚗</span>
								<p className="text-white text-center">
									ขับไปทำงานก็ประหยัด <br />
									<span className="font-bold text-yellow-300">
										เพิ่มเงินในกระเป๋า
									</span>
								</p>
							</div>
							<div className="flex flex-col items-center p-4 bg-green-900/30 rounded-lg">
								<span className="text-2xl mb-2">🚙</span>
								<p className="text-white text-center">
									ขับไปเที่ยวก็สนุก <br />
									<span className="font-bold text-yellow-300">
										วิ่งได้ไกลแบบไม่ต้องลุ้น
									</span>
								</p>
							</div>
							<div className="flex flex-col items-center p-4 bg-green-900/30 rounded-lg">
								<span className="text-2xl mb-2">✨</span>
								<p className="text-white text-center">
									หยุดน้อยลง <br />
									<span className="font-bold text-yellow-300">
										ใช้ชีวิตได้มากขึ้น
									</span>
								</p>
							</div>
						</div>

						{/* แสดง minimalist version บน mobile */}
						<div className="flex md:hidden justify-center gap-6 mb-4">
							<div className="text-center">
								<span className="text-2xl">🚗</span>
								<p className="text-yellow-300 text-sm font-bold">ประหยัด</p>
							</div>
							<div className="text-center">
								<span className="text-2xl">🚙</span>
								<p className="text-yellow-300 text-sm font-bold">วิ่งไกล</p>
							</div>
							<div className="text-center">
								<span className="text-2xl">✨</span>
								<p className="text-yellow-300 text-sm font-bold">
									ใช้ชีวิตมากขึ้น
								</p>
							</div>
						</div>

						<p className="text-sm text-blue-200 mb-4">
							พร้อมโปรสุดพิเศษ ผ่อนเริ่มเบาๆ!
						</p>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.5 }}
						className="flex flex-col items-center space-y-3 mt-2 max-w-md mx-auto"
					>
						<ModernPromo
							href="https://line.me/R/ti/p/%40bydmetromobile"
							text="รับข้อเสนอพิเศษเพิ่มเติม"
							external={true}
						/>

						<p className="text-xs text-blue-200">
							พิเศษ! เฉพาะตั้งแต่วันที่ 1 พ.ค. 68 – 31 พ.ค. 68 เท่านั้น
						</p>
						<p className="text-xs text-gray-400">
							*เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
						</p>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
}
