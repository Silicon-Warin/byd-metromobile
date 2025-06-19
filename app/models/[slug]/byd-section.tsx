"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import BatteryChargingAnimation from "@/components/Models/BatteryChargingAnimation";
import TestDriveButton from "@/components/TestDriveButton";
import { CarModel } from "@/data/carModel";

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
	const mainImageRef = useRef(null);
	const { scrollYProgress: mainImageScroll } = useScroll({
		target: mainImageRef,
		offset: ["start end", "end start"],
	});
	const mainImageY = useTransform(mainImageScroll, [0, 1], [0, -30]);

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
					<BatteryChargingAnimation />
					<h2 className="text-lg uppercase text-primary mb-2 tracking-widest">
						การรับประกันคุณภาพ
					</h2>
					<h1 className="mb-4 text-center text-3xl md:text-5xl font-bold">
						รับประกันแบตเตอรี่นาน
					</h1>
					<h2 className="text-5xl font-bold mb-4 text-center text-balance">
						8 ปี หรือ 160,000 กม.
					</h2>
					<span className="text-sm text-gray-500">
						(แล้วแต่อย่างใดอย่างหนึ่งถึงก่อน)
					</span>
					<h3 className="text-4xl font-bold mb-2">
						{carModel.name} ปลุกพลังใหม่
					</h3>
					<h3 className="text-3xl font-bold text-balance">
						ปลุกชีวิตที่ดีกว่า
					</h3>
				</motion.div>

				{/* Main Blade Battery Image */}
				<div ref={mainImageRef} className="mb-16 overflow-visible">
					<motion.div style={{ y: mainImageY }} className="mx-auto max-w-[90%]">
						<div className="relative rounded-lg overflow-hidden shadow-lg">
							<Image
								src={"/images/section/blade-battery.webp"}
								alt="แบตเตอรี่ BLADE BATTERY"
								width={800}
								height={450}
								className="w-full object-cover"
							/>
							<div className="mt-3 px-2 pb-3">
								<h4 className="font-bold text-md uppercase">BLADE BATTERY</h4>
								<p className="text-lg text-gray-600">
									เทคโนโลยีแบตเตอรี่ความปลอดภัยสูง ชาร์จไวไปได้ไกลกว่า
									ขับขี่ได้อย่างมั่นใจในทุกเส้นทาง
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Two Images Side by Side */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
										carModel.imageUrlDataLeft ||
										"/images/section/e-platform3.webp"
									}
									alt="e-Platform 3.0"
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-4">
								<h4 className="font-bold text-sm uppercase">e-PLATFORM 3.0</h4>
								<p className="text-md text-gray-600 mt-2">
									ยกระดับการขับขี่สู่อนาคตด้วยนวัตกรรมแพลตฟอร์มที่พัฒนาขึ้นเพื่อรถยนต์พลังงานไฟฟ้าโดยเฉพาะ
									ด้วยเทคโนโลยี CTB (CELL-TO-BODY)
									ที่จัดวางแบตเตอรี่และอุปกรณ์โดยคำนึงถึงความแข็งแรงและปลอดภัย
									เพื่อสมรรถนะที่เยี่ยม ทั้งการเกาะถนนและความนุ่มนวล
									สมดุลของทุกการขับขี่
								</p>
							</div>
						</div>
					</motion.div>

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
										carModel.specialFeatureImage ||
										"/images/metromobile-logo.png"
									}
									alt={carModel.specialFeature}
									fill
									className="object-cover"
								/>
							</div>
							<div className="p-4">
								<h4 className="font-bold text-sm uppercase">
									{carModel.specialFeature}
								</h4>
								<p className="text-md text-gray-600 mt-2">
									{carModel.specialFeatureDescription}
								</p>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Test Drive Button */}
				<div className="text-center mt-16">
					<TestDriveButton
						variant="outline"
						size="lg"
						defaultModel={carModel.slug}
						className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 px-10 py-3 rounded-full font-medium"
					>
						ทดลองขับ {carModel.name}
					</TestDriveButton>
				</div>
			</div>
		</section>
	);
}
