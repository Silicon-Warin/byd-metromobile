"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
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
				{/* Background pattern */}
				<div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] opacity-10 bg-cover bg-center"></div>

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
								ติดต่อเรา
							</span>
						</motion.h1>

						<motion.p
							className="text-xl md:text-2xl text-gray-300 mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
						>
							เราพร้อมให้บริการและตอบคำถามทุกข้อสงสัยของคุณ
						</motion.p>
					</div>
				</div>
			</section>

			{/* Contact Info Section */}
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
							ข้อมูลการติดต่อ
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto">
							หลายช่องทางในการติดต่อเรา เลือกช่องทางที่สะดวกสำหรับคุณ
						</p>
					</motion.div>

					<motion.div
						className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
						variants={staggerContainer}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Phone className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">โทรศัพท์</h3>
									<p className="text-gray-400">02-123-4567, 089-765-4321</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Mail className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">อีเมล</h3>
									<p className="text-gray-400">
										info@bydmetromobile.com, sales@bydmetromobile.com
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<MapPin className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">ที่อยู่</h3>
									<p className="text-gray-400">
										เลขที่ 123 ถนนรัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400
									</p>
								</CardContent>
							</Card>
						</motion.div>

						<motion.div variants={fadeIn}>
							<Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-primary/30 transition-all duration-300 h-full">
								<CardContent className="p-6 flex flex-col items-center text-center">
									<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
										<Clock className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2">เวลาทำการ</h3>
									<p className="text-gray-400">
										วันจันทร์ - วันเสาร์: 8:30 - 17:30 น.
										<br />
										วันอาทิตย์: 9:00 - 16:00 น.
									</p>
								</CardContent>
							</Card>
						</motion.div>
					</motion.div>
				</div>
			</section>

			{/* Contact Form */}
			<section className="py-16 md:py-24 bg-gray-900">
				<div className="container mx-auto px-4">
					<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={fadeIn}
						>
							<h2 className="text-3xl md:text-4xl font-bold mb-6">
								ส่งข้อความถึงเรา
							</h2>
							<p className="text-gray-400 mb-8">
								กรอกแบบฟอร์มด้านล่างเพื่อส่งข้อความถึงเรา
								เราจะตอบกลับโดยเร็วที่สุด
							</p>

							<form className="space-y-6">
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label htmlFor="name" className="block text-white mb-2">
											ชื่อ-นามสกุล
										</label>
										<input
											type="text"
											id="name"
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="กรอกชื่อ-นามสกุล"
										/>
									</div>
									<div>
										<label htmlFor="email" className="block text-white mb-2">
											อีเมล
										</label>
										<input
											type="email"
											id="email"
											className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
											placeholder="กรอกอีเมล"
										/>
									</div>
								</div>

								<div>
									<label htmlFor="phone" className="block text-white mb-2">
										เบอร์โทรศัพท์
									</label>
									<input
										type="tel"
										id="phone"
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="กรอกเบอร์โทรศัพท์"
									/>
								</div>

								<div>
									<label htmlFor="subject" className="block text-white mb-2">
										หัวข้อ
									</label>
									<input
										type="text"
										id="subject"
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="กรอกหัวข้อ"
									/>
								</div>

								<div>
									<label htmlFor="message" className="block text-white mb-2">
										ข้อความ
									</label>
									<textarea
										id="message"
										rows={5}
										className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary"
										placeholder="กรอกข้อความ"
									></textarea>
								</div>

								<Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6">
									<Send className="h-5 w-5 mr-2" />
									ส่งข้อความ
								</Button>
							</form>
						</motion.div>

						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={{
								hidden: { opacity: 0, x: 50 },
								visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
							}}
							className="relative h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden"
						>
							<div className="absolute inset-0">
								{/* แทรกแผนที่หรือรูปภาพสำนักงาน */}
								<div className="w-full h-full bg-gray-700 flex items-center justify-center">
									<p className="text-white">แผนที่สำนักงาน</p>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</main>
	);
}
