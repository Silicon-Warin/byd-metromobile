"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	CheckCircle,
	MessageCircle,
	Loader2,
	AlertCircle,
	Car,
	Calendar,
	MapPin,
	User,
	Phone,
	Mail,
} from "lucide-react";

interface FormData {
	name: string;
	phone: string;
	email: string;
	model: string;
	branch: string;
	preferredDate: string;
	preferredTime: string;
}

export default function LiffSubmitFormPage() {
	const [formData, setFormData] = useState<FormData | null>(null);
	const [liffReady, setLiffReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// ดึงข้อมูลฟอร์มจาก sessionStorage
		const savedData = sessionStorage.getItem("testDriveFormData");
		if (savedData) {
			try {
				setFormData(JSON.parse(savedData));
			} catch (error) {
				console.error("Error parsing saved form data:", error);
				setError("ไม่สามารถโหลดข้อมูลฟอร์มได้");
			}
		} else {
			setError("ไม่พบข้อมูลฟอร์ม กรุณากรอกฟอร์มใหม่");
		}

		// Initialize LIFF
		const initializeLiff = async () => {
			try {
				const liff = (await import("@line/liff")).default;
				await liff.init({ liffId: process.env.NEXT_PUBLIC_LIFF_ID! });
				setLiffReady(true);
			} catch (error) {
				console.error("LIFF initialization failed:", error);
				setError("ไม่สามารถเชื่อมต่อกับ LINE ได้");
			}
		};

		initializeLiff();
	}, []);

	const sendMessage = async () => {
		if (!formData || !liffReady) return;

		setLoading(true);
		setError(null);

		try {
			const liff = (await import("@line/liff")).default;

			// สร้าง Flex Message สำหรับข้อมูลทดลองขับ
			const flexMessage: any = {
				type: "flex" as const,
				altText: `🚗 คำขอทดลองขับ BYD ${formData.model}`,
				contents: {
					type: "bubble" as const,
					size: "giga" as const,
					header: {
						type: "box",
						layout: "vertical",
						contents: [
							{
								type: "box",
								layout: "horizontal",
								contents: [
									{
										type: "text",
										text: "🚗 BYD Metromobile",
										weight: "bold",
										color: "#1DB446",
										size: "lg",
									},
								],
							},
							{
								type: "text",
								text: "คำขอทดลองขับ",
								weight: "bold",
								size: "xl",
								color: "#333333",
								margin: "md",
							},
						],
						paddingAll: "20px",
						backgroundColor: "#F8F9FA",
						spacing: "md",
					},
					body: {
						type: "box",
						layout: "vertical",
						contents: [
							// ข้อมูลลูกค้า
							{
								type: "box",
								layout: "vertical",
								contents: [
									{
										type: "text",
										text: "👤 ข้อมูลลูกค้า",
										weight: "bold",
										size: "md",
										color: "#1DB446",
										margin: "none",
									},
									{
										type: "separator",
										margin: "sm",
									},
								],
								margin: "none",
							},
							{
								type: "box",
								layout: "vertical",
								contents: [
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "ชื่อ-นามสกุล:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.name,
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
												wrap: true,
											},
										],
									},
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "เบอร์โทร:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.phone,
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
											},
										],
										margin: "sm",
									},
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "อีเมล:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.email,
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
												wrap: true,
											},
										],
										margin: "sm",
									},
								],
								margin: "md",
							},
							// ข้อมูลการทดลองขับ
							{
								type: "box",
								layout: "vertical",
								contents: [
									{
										type: "text",
										text: "🚙 ข้อมูลการทดลองขับ",
										weight: "bold",
										size: "md",
										color: "#1DB446",
										margin: "xl",
									},
									{
										type: "separator",
										margin: "sm",
									},
								],
							},
							{
								type: "box",
								layout: "vertical",
								contents: [
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "รุ่นรถ:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.model,
												size: "sm",
												color: "#1DB446",
												weight: "bold",
												flex: 3,
											},
										],
									},
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "สาขา:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.branch,
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
											},
										],
										margin: "sm",
									},
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "วันที่ต้องการ:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.preferredDate,
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
											},
										],
										margin: "sm",
									},
									{
										type: "box",
										layout: "horizontal",
										contents: [
											{
												type: "text",
												text: "เวลาที่ต้องการ:",
												size: "sm",
												color: "#666666",
												flex: 2,
											},
											{
												type: "text",
												text: formData.preferredTime || "ไม่ระบุ",
												size: "sm",
												color: "#333333",
												weight: "bold",
												flex: 3,
											},
										],
										margin: "sm",
									},
								],
								margin: "md",
							},
						],
						spacing: "md",
						paddingAll: "20px",
					},
					footer: {
						type: "box",
						layout: "vertical",
						contents: [
							{
								type: "text",
								text: "✅ ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
								size: "xs",
								color: "#1DB446",
								align: "center",
								weight: "bold",
							},
							{
								type: "text",
								text: `📅 ส่งเมื่อ: ${new Date().toLocaleString("th-TH")}`,
								size: "xs",
								color: "#999999",
								align: "center",
								margin: "sm",
							},
						],
						paddingAll: "15px",
						backgroundColor: "#F8F9FA",
					},
				},
			};

			await liff.sendMessages([flexMessage]);
			setSent(true);

			// ลบข้อมูลจาก sessionStorage หลังส่งสำเร็จ
			sessionStorage.removeItem("testDriveFormData");
		} catch (error) {
			console.error("Error sending message:", error);
			setError("ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setLoading(false);
		}
	};

	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

	if (error) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-4">
				<Card className="w-full max-w-md">
					<CardContent className="text-center p-8">
						<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
						<h2 className="text-xl font-bold text-red-700 mb-2">
							เกิดข้อผิดพลาด
						</h2>
						<p className="text-red-600 mb-4">{error}</p>
						<Button
							onClick={() => (window.location.href = "/")}
							className="bg-red-500 hover:bg-red-600"
						>
							กลับสู่หน้าหลัก
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	if (sent) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
				<motion.div initial="hidden" animate="visible" variants={fadeInUp}>
					<Card className="w-full max-w-md">
						<CardContent className="text-center p-8">
							<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
							<h2 className="text-2xl font-bold text-green-700 mb-2">
								ส่งข้อมูลสำเร็จ!
							</h2>
							<p className="text-green-600 mb-4">
								ข้อมูลการจองทดลองขับของคุณถูกส่งแล้ว
							</p>
							<p className="text-sm text-gray-600 mb-6">
								ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง
							</p>
							<Button
								onClick={async () => {
									const liff = (await import("@line/liff")).default;
									liff.closeWindow();
								}}
								className="bg-green-500 hover:bg-green-600"
							>
								ปิดหน้าต่าง
							</Button>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
			<div className="max-w-2xl mx-auto py-8">
				<motion.div initial="hidden" animate="visible" variants={fadeInUp}>
					<Card className="shadow-xl">
						<CardHeader className="text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
							<div className="flex items-center justify-center gap-2 mb-2">
								<MessageCircle className="w-8 h-8" />
								<CardTitle className="text-2xl">ส่งข้อมูลทดลองขับ</CardTitle>
							</div>
							<p className="text-blue-100">
								ตรวจสอบข้อมูลและกดส่งเพื่อแจ้งทีมงาน
							</p>
						</CardHeader>

						<CardContent className="p-6">
							{formData ? (
								<div className="space-y-6">
									{/* Customer Info */}
									<div className="bg-gray-50 rounded-lg p-4">
										<h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
											<User className="w-5 h-5 text-blue-500" />
											ข้อมูลลูกค้า
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
											<div className="flex items-center gap-2">
												<User className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">ชื่อ:</span>
												<span className="font-medium">{formData.name}</span>
											</div>
											<div className="flex items-center gap-2">
												<Phone className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">เบอร์:</span>
												<span className="font-medium">{formData.phone}</span>
											</div>
											<div className="flex items-center gap-2 md:col-span-2">
												<Mail className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">อีเมล:</span>
												<span className="font-medium">{formData.email}</span>
											</div>
										</div>
									</div>

									{/* Test Drive Info */}
									<div className="bg-blue-50 rounded-lg p-4">
										<h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
											<Car className="w-5 h-5 text-blue-500" />
											ข้อมูลการทดลองขับ
										</h3>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
											<div className="flex items-center gap-2">
												<Car className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">รุ่น:</span>
												<span className="font-medium text-blue-600">
													{formData.model}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<MapPin className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">สาขา:</span>
												<span className="font-medium">{formData.branch}</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">วันที่:</span>
												<span className="font-medium">
													{formData.preferredDate}
												</span>
											</div>
											<div className="flex items-center gap-2">
												<Calendar className="w-4 h-4 text-gray-400" />
												<span className="text-gray-600">เวลา:</span>
												<span className="font-medium">
													{formData.preferredTime || "ไม่ระบุ"}
												</span>
											</div>
										</div>
									</div>

									{/* Send Button */}
									<Button
										onClick={sendMessage}
										disabled={loading || !liffReady}
										className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
									>
										{loading ? (
											<>
												<Loader2 className="w-5 h-5 mr-2 animate-spin" />
												กำลังส่ง...
											</>
										) : (
											<>
												<MessageCircle className="w-5 h-5 mr-2" />
												ส่งข้อมูลทดลองขับ
											</>
										)}
									</Button>

									<p className="text-xs text-gray-500 text-center">
										ข้อมูลจะถูกส่งไปยังทีมงาน BYD Metromobile เพื่อติดต่อกลับ
									</p>
								</div>
							) : (
								<div className="text-center py-8">
									<Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
									<p className="text-gray-600">กำลังโหลดข้อมูล...</p>
								</div>
							)}
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</div>
	);
}
