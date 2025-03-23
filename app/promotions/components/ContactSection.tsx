"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Phone } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

export default function ContactSection() {
	// Animation variants
	const fadeIn = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6 },
		},
	};

	const faqItems = [
		{
			question: "โปรโมชั่นนี้มีระยะเวลาถึงเมื่อไหร่?",
			answer:
				"โปรโมชั่นนี้มีระยะเวลาถึงสิ้นเดือนนี้เท่านั้น หรือจนกว่าสินค้าจะหมด ขึ้นอยู่กับเงื่อนไขใดถึงก่อน",
		},
		{
			question: "การรับประกันแบตเตอรี่ครอบคลุมอะไรบ้าง?",
			answer:
				"การรับประกันแบตเตอรี่ครอบคลุมความบกพร่องจากการผลิตและการเสื่อมสภาพที่เกินกว่าปกติ โดยรับประกันว่าความจุแบตเตอรี่จะไม่ต่ำกว่า 70% ภายในระยะเวลารับประกัน",
		},
		{
			question: "มีบริการช่วยเหลือฉุกเฉินอะไรบ้าง?",
			answer:
				"บริการช่วยเหลือฉุกเฉินครอบคลุมการลากรถ การชาร์จแบตเตอรี่ฉุกเฉิน การช่วยเหลือในกรณีรถเสียกะทันหัน และบริการให้คำปรึกษาทางโทรศัพท์ตลอด 24 ชั่วโมง",
		},
		{
			question: "สามารถนำรถเก่ามาแลกซื้อได้หรือไม่?",
			answer:
				"ได้ เรามีบริการประเมินราคารถเก่าทุกรุ่นทุกยี่ห้อ เพื่อนำมาเป็นส่วนลดในการซื้อรถยนต์ไฟฟ้า BYD รุ่นใหม่",
		},
	];

	return (
		<motion.section
			className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
		>
			{/* Overlay gradient */}
			<div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black"></div>

			<div className="container mx-auto px-4 text-center relative z-10">
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={fadeIn}
				>
					<h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
						อย่าพลาดโอกาสรับข้อเสนอพิเศษ
					</h2>
					<p className="text-lg md:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-gray-300">
						ทีมงานผู้เชี่ยวชาญของเราพร้อมให้คำแนะนำเกี่ยวกับรถยนต์ไฟฟ้า BYD
						และโปรโมชั่นที่เหมาะกับความต้องการของคุณ
					</p>

					{/* Contact Form */}
					<div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-8 rounded-xl max-w-3xl mx-auto mb-10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									ชื่อ-นามสกุล
								</label>
								<input
									type="text"
									className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
									placeholder="กรุณากรอกชื่อ-นามสกุล"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									เบอร์โทรศัพท์
								</label>
								<input
									type="tel"
									className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
									placeholder="กรุณากรอกเบอร์โทรศัพท์"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									อีเมล
								</label>
								<input
									type="email"
									className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
									placeholder="กรุณากรอกอีเมล"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-400 mb-2">
									รุ่นรถที่สนใจ
								</label>
								<select className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50">
									<option value="">เลือกรุ่นรถที่สนใจ</option>
									<option value="atto3">BYD ATTO 3</option>
									<option value="dolphin">BYD DOLPHIN</option>
									<option value="seal">BYD SEAL</option>
									<option value="sealion7">BYD SEALION7</option>
									<option value="sealion6-dm-i">BYD SEALION6-DM-I</option>
									<option value="m6">BYD M6</option>
								</select>
							</div>
						</div>

						<Button
							size="lg"
							className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg"
						>
							รับข้อเสนอพิเศษวันนี้
						</Button>
					</div>

					<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
						<div className="flex items-center gap-2">
							<Clock className="h-5 w-5 text-primary" />
							<span className="text-gray-400">
								วันจันทร์-อาทิตย์ 08.30-17.30 น.
							</span>
						</div>
						<div className="flex items-center gap-2">
							<Phone className="h-5 w-5 text-primary" />
							<span className="text-gray-400">02-291-8889</span>
						</div>
					</div>

					{/* Interactive FAQ Section */}
					<div className="py-16 md:py-24">
						<h2 className="text-3xl md:text-4xl font-bold mb-4">
							คำถามที่พบบ่อย
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto mb-12">
							ข้อสงสัยเกี่ยวกับโปรโมชั่นและรถยนต์ไฟฟ้า BYD
						</p>

						<motion.div
							className="max-w-3xl mx-auto"
							variants={{
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: 0.1,
									},
								},
							}}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
						>
							<Accordion type="single" collapsible className="w-full">
								{faqItems.map((faq, index) => (
									<motion.div key={index} variants={fadeIn} className="mb-2">
										<AccordionItem
											value={`item-${index}`}
											className="border border-gray-700 rounded-lg mb-4 overflow-hidden bg-gray-800/30 backdrop-blur-sm"
										>
											<AccordionTrigger className="px-6 py-4 text-left text-xl font-medium hover:bg-gray-800/50 transition-all data-[state=open]:bg-gray-800/50">
												{faq.question}
											</AccordionTrigger>
											<AccordionContent className="px-6 py-4 text-gray-300">
												<motion.div
													initial={{ opacity: 0, y: -10 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ duration: 0.3 }}
												>
													{faq.answer}
												</motion.div>
											</AccordionContent>
										</AccordionItem>
									</motion.div>
								))}
							</Accordion>
						</motion.div>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}
