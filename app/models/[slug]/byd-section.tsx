"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { CarModel } from "./types";

const fadeIn = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

interface BYDSectionProps {
	carModel: CarModel;
}

export default function BYDSection({ carModel }: BYDSectionProps) {
	// Refs for parallax elements
	const mainImageRef = useRef(null);
	const bottomImageRef = useRef(null);

	// Parallax effects
	const { scrollYProgress: mainImageScroll } = useScroll({
		target: mainImageRef,
		offset: ["start end", "end start"],
	});

	const { scrollYProgress: bottomImageScroll } = useScroll({
		target: bottomImageRef,
		offset: ["start end", "end start"],
	});

	// Transform values for parallax
	const mainImageY = useTransform(mainImageScroll, [0, 1], [0, -30]);
	const bottomImageY = useTransform(bottomImageScroll, [0, 1], [0, -50]);

	return (
		<section className="py-16 bg-white text-slate-800 overflow-hidden">
			<div className="container mx-auto px-4 max-w-4xl">
				{/* Header */}
				<motion.div
					className="text-center mb-12"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={fadeIn}
				>
					<p className="text-md text-gray-500 mb-4">รับประกันแบตเตอรี่นาน</p>
					<h2 className="text-4xl font-bold mb-2">8 ปี หรือ 160,000 กม.</h2>
					<span className="text-sm text-gray-500">
						(แล้วแต่อย่างใดอย่างหนึ่งถึงก่อน)
					</span>
					<h3 className="text-4xl font-bold mb-2">
						{carModel.name} ปลุกพลังใหม่
					</h3>
					<h3 className="text-3xl font-bold">ปลุกชีวิตที่ดีกว่า</h3>
				</motion.div>

				{/* Main Blade Battery Image */}
				<div ref={mainImageRef} className="mb-16 overflow-visible">
					<motion.div
						style={{ y: mainImageY }}
						className="mx-auto max-w-[90%]" // Center and constrain width
					>
						<div className="relative rounded-lg overflow-hidden shadow-lg">
							<Image
								src={
									carModel.batteryImage || "/images/section/blade-battery.webp"
								}
								alt="BLADE BATTERY"
								width={800}
								height={450}
								className="w-full object-cover"
							/>
							<div className="mt-3 px-2 pb-3">
								<h4 className="font-bold text-md uppercase">BLADE BATTERY</h4>
								<p className="text-md text-gray-600">
									เทคโนโลยีแบตเตอรี่ความปลอดภัยสูง
									สุดยอดนวัตกรรมแบตเตอรี่ระดับโลกจาก BYD ชาร์จไวไปได้ไกลกว่า
									ขับขี่ได้อย่างมั่นใจในทุกเส้นทาง
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Two Images Side by Side - No Overlapping */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
					{/* Left Image - e-Platform 3.0 */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
					>
						<div className="rounded-lg overflow-hidden h-full mt-8 mr-8">
							<div className="h-[200px] relative">
								<Image
									src={
										carModel.platformImage || "/images/section/e-platform3.webp"
									}
									alt="e-Platform 3.0"
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-4">
								<h4 className="font-bold text-sm uppercase">e-PLATFORM 3.0</h4>
								<p className="text-xs text-gray-600 mt-2">
									ยกระดับการขับขี่สู่อนาคตด้วยนวัตกรรมแพลตฟอร์มที่พัฒนาขึ้นเพื่อรถยนต์พลังงานไฟฟ้าโดยเฉพาะ
									ด้วยเทคโนโลยี CTB (CELL-TO-BODY)
									ที่จัดวางแบตเตอรี่และอุปกรณ์โดยคำนึงถึงความแข็งแรงและปลอดภัยเพื่อสมรรถนะที่เยี่ยม
									ทั้งการเกาะถนนและความนุ่มนวล สมดุลของทุกการขับขี่
								</p>
							</div>
						</div>
					</motion.div>

					{/* Right Image - Panoramic Roof */}
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={fadeIn}
					>
						<div className="rounded-lg overflow-hidden h-full ml-8">
							<div className="h-[200px] relative">
								<Image
									src={
										carModel.roofImage || "/images/section/silver-platform.webp"
									}
									alt="Panoramic Roof"
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-4">
								<h4 className="font-bold text-sm uppercase">{}</h4>
								<p className="text-md text-gray-600 mt-2">
									หลังคากระจกพาโนรามิค 2 ชั้น ขนาดใหญ่ถึง 1.9 ตารางเมตร
									ให้มุมมองที่กว้างกว่า พร้อมการเคลือบด้วย Silver-plated
									ที่ช่วยลดปริมาณแสงที่ผ่านเข้ามา ให้ห้องโดยสารพร้อมป้องกัน แสง
									UV ทำให้ห้องโดยสารเย็นสบายตลอดการขับขี่
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Car Image - Full width but with margin */}
				<div
					ref={bottomImageRef}
					className="overflow-hidden rounded-lg mx-auto max-w-[90%]"
				>
					<motion.div style={{ y: bottomImageY }}>
						<div className="relative shadow-lg">
							<Image
								src={carModel.exteriorImage || "/images/byd-seal-exterior.jpg"}
								alt={`${carModel.name} Exterior`}
								width={1000}
								height={500}
								className="w-full object-cover rounded-lg"
							/>
							<div className="mt-3 px-2 pb-3">
								<h4 className="font-bold text-sm uppercase">
									e-Motion NEVER Calm
								</h4>
								<p className="text-xs text-gray-600">
									ดีไซน์ภายนอก 1 ใน 3 ของ Ocean Series ออกแบบโดย Wolfgang Egger
									ผู้เคยออกแบบให้กับแบรนด์รถยุโรปชั้นนำ
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Test Drive Button */}
				<div className="text-center mt-16">
					<Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-medium">
						ทดลองขับ {carModel.name}
					</Button>
				</div>
			</div>
		</section>
	);
}
