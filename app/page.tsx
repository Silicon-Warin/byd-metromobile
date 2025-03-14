"use client";

import { motion } from "framer-motion";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<motion.section
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="relative h-screen"
			>
				<AspectRatio ratio={16 / 9} className="w-full h-full">
					<img
						src="/images/banners/hero-banner.jpg"
						alt="BYD Metromobile - รถยนต์ไฟฟ้าสำหรับคนรุ่นใหม่"
						className="object-cover w-full h-full"
					/>
				</AspectRatio>
				<div className="absolute inset-0 bg-black/40 flex items-center justify-center">
					<div className="text-center text-white">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 }}
							className="text-5xl font-prompt font-bold mb-4"
						>
							BYD Metromobile
						</motion.h1>
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.5 }}
							className="text-xl mb-8"
						>
							รถยนต์ไฟฟ้าที่ล้ำมัยสำหรับการเดินทางในเมือง
						</motion.p>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7 }}
						>
							<Button
								size="lg"
								className="bg-primary text-white hover:bg-primary/90"
							>
								ดูรถยนต์ทั้งหมด
							</Button>
						</motion.div>
					</div>
				</div>
			</motion.section>

			{/* Featured Models Section */}
			<section className="py-16 px-4 md:px-8 bg-gray-50">
				<div className="container mx-auto">
					<h2 className="text-3xl font-prompt font-bold text-center mb-12">
						รุ่นรถยนต์ที่น่าสนใจ
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Model Cards */}
						<Card className="overflow-hidden">
							<AspectRatio ratio={16 / 9}>
								<img
									src="/images/models/atto3.jpg"
									alt="BYD ATTO 3"
									className="object-cover w-full h-full"
								/>
							</AspectRatio>
							<div className="p-6">
								<h3 className="text-2xl font-prompt font-bold mb-2">ATTO 3</h3>
								<p className="text-gray-600 mb-4">
									รถยนต์ไฟฟ้าอเนกประสงค์สำหรับครอบครัว
								</p>
								<Button variant="outline" className="w-full">
									ดูรายละเอียด
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</section>

			{/* Why Choose Us Section */}
			<section className="py-16 px-4 md:px-8">
				<div className="container mx-auto">
					<h2 className="text-3xl font-prompt font-bold text-center mb-12">
						ทำไมต้องเลือก BYD Metromobile
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
						<div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								บริการหลังการขายครบวงจร
							</h3>
							<p className="text-gray-600">
								ศูนย์บริการมาตรฐานพร้อมทีมช่างผู้เชี่ยวชาญ
							</p>
						</div>
						<div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								เทคโนโลยีล้ำสมัย
							</h3>
							<p className="text-gray-600">
								นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย
							</p>
						</div>
						<div>
							<h3 className="text-xl font-prompt font-bold mb-4">
								การรับประกันคุณภาพ
							</h3>
							<p className="text-gray-600">
								รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16 px-4 md:px-8 bg-gray-900 text-white">
				<div className="container mx-auto text-center">
					<h2 className="text-3xl font-prompt font-bold mb-8">
						ติดต่อ BYD Metromobile
					</h2>
					<p className="text-xl mb-8">
						พร้อมให้คำปรึกษาและบริการที่ดีที่สุดสำหรับคุณ
					</p>
					<Button
						size="lg"
						className="bg-white text-gray-900 hover:bg-gray-100"
					>
						ติดต่อเรา
					</Button>
				</div>
			</section>
		</main>
	);
}
