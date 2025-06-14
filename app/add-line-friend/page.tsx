"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, MessageCircle, Smartphone, UserPlus } from "lucide-react";
import Link from "next/link";

interface FormData {
	name: string;
	phone: string;
	email: string;
	model: string;
	branch: string;
	preferredDate: string;
	preferredTime: string;
}

export default function AddLineFriendPage() {
	const [formData, setFormData] = useState<FormData | null>(null);

	useEffect(() => {
		// ดึงข้อมูลฟอร์มจาก sessionStorage
		const savedData = sessionStorage.getItem("testDriveFormData");
		if (savedData) {
			try {
				setFormData(JSON.parse(savedData));
			} catch (error) {
				console.error("Error parsing saved form data:", error);
			}
		}
	}, []);

	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
			{/* Background Effects */}
			<div className="absolute inset-0 overflow-hidden">
				<div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
				<div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10 container mx-auto px-4 py-16">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
					className="max-w-4xl mx-auto"
				>
					{/* Header */}
					<motion.div variants={fadeInUp} className="text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-6">
							<CheckCircle className="w-12 h-12 text-green-400" />
							<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
								ข้อมูลของคุณถูกบันทึกแล้ว!
							</h1>
						</div>
						<p className="text-xl text-gray-300 max-w-2xl mx-auto">
							เพื่อให้เราติดต่อกลับและส่งข้อมูลโปรโมชั่นล่าสุด กรุณาเพิ่มเพื่อน
							LINE Official Account ของเรา
						</p>
					</motion.div>

					{/* Form Data Display */}
					{formData && (
						<motion.div variants={fadeInUp} className="mb-12">
							<Card className="bg-white/5 backdrop-blur-sm border-white/10">
								<CardHeader>
									<CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
										<Smartphone className="w-6 h-6" />
										ข้อมูลการจองทดลองขับของคุณ
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid md:grid-cols-2 gap-4">
										<div className="space-y-2">
											<p className="text-gray-400">ชื่อ-นามสกุล</p>
											<p className="text-white font-medium">{formData.name}</p>
										</div>
										<div className="space-y-2">
											<p className="text-gray-400">เบอร์โทรศัพท์</p>
											<p className="text-white font-medium">{formData.phone}</p>
										</div>
										<div className="space-y-2">
											<p className="text-gray-400">อีเมล</p>
											<p className="text-white font-medium">{formData.email}</p>
										</div>
										<div className="space-y-2">
											<p className="text-gray-400">รุ่นรถที่สนใจ</p>
											<p className="text-white font-medium">{formData.model}</p>
										</div>
										<div className="space-y-2">
											<p className="text-gray-400">สาขาที่ต้องการ</p>
											<p className="text-white font-medium">
												{formData.branch}
											</p>
										</div>
										<div className="space-y-2">
											<p className="text-gray-400">วันที่ต้องการ</p>
											<p className="text-white font-medium">
												{formData.preferredDate}
											</p>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					)}

					{/* Steps */}
					<motion.div variants={fadeInUp} className="mb-12">
						<h2 className="text-2xl font-bold text-center mb-8">
							ขั้นตอนต่อไป
						</h2>
						<div className="grid md:grid-cols-3 gap-6">
							{[
								{
									step: "1",
									title: "เพิ่มเพื่อน LINE OA",
									description: "กดปุ่มด้านล่างเพื่อเพิ่มเพื่อน BYD Metromobile",
									icon: <UserPlus className="w-8 h-8" />,
								},
								{
									step: "2",
									title: "ส่งข้อมูลผ่าน LINE",
									description: "ระบบจะเปิดหน้าส่งข้อมูลการจองของคุณ",
									icon: <MessageCircle className="w-8 h-8" />,
								},
								{
									step: "3",
									title: "รอการติดต่อกลับ",
									description: "ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
									icon: <CheckCircle className="w-8 h-8" />,
								},
							].map((item, index) => (
								<Card
									key={index}
									className="bg-white/5 backdrop-blur-sm border-white/10 text-center"
								>
									<CardContent className="p-6">
										<div className="flex flex-col items-center space-y-4">
											<div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
												{item.step}
											</div>
											<div className="text-blue-400">{item.icon}</div>
											<h3 className="text-lg font-semibold text-white">
												{item.title}
											</h3>
											<p className="text-gray-400 text-sm">
												{item.description}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</motion.div>

					{/* LINE Add Friend Button */}
					<motion.div variants={fadeInUp} className="text-center">
						<div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 mb-8">
							<h3 className="text-2xl font-bold mb-4">
								เพิ่มเพื่อน BYD Metromobile
							</h3>
							<p className="text-gray-300 mb-6">
								เพิ่มเพื่อน LINE Official Account
								เพื่อรับข้อมูลโปรโมชั่นและติดตามสถานะการจองของคุณ
							</p>

							<Button
								asChild
								size="lg"
								className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
							>
								<Link
									href="https://line.me/R/ti/p/@bydmetromobile"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-3"
								>
									<MessageCircle className="w-6 h-6" />
									เพิ่มเพื่อน @bydmetromobile
								</Link>
							</Button>
						</div>

						{/* Alternative Options */}
						<div className="text-center space-y-4">
							<p className="text-gray-400">หรือ</p>
							<Button
								asChild
								variant="outline"
								size="lg"
								className="border-white/20 text-white hover:bg-white/10"
							>
								<Link href="/">กลับสู่หน้าหลัก</Link>
							</Button>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}
