"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Car, Calendar, MapPin, Phone, User } from "lucide-react";
import { initializeLiff, sendMessageToLine } from "@/lib/liff";
import { toast } from "sonner";

interface TestDriveFormProps {
	children?: React.ReactNode;
	defaultModel?: string;
}

interface TestDriveFormData {
	name: string;
	phone: string;
	email: string;
	model: string;
	preferredDate: string;
	preferredTime: string;
	location: string;
	notes: string;
}

const carModels = [
	"BYD ATTO 3",
	"BYD DOLPHIN",
	"BYD SEAL",
	"BYD SEALION 7",
	"BYD SEALION 6 DM-i",
	"BYD M6",
];

const timeSlots = [
	"09:00-10:00",
	"10:00-11:00",
	"11:00-12:00",
	"13:00-14:00",
	"14:00-15:00",
	"15:00-16:00",
	"16:00-17:00",
];

const locations = [
	"ตลิ่งชัน",
	"พระราม 3",
	"อ่อนนุช",
	"รามอินทรา",
	"RCA-พระราม 9",
	"อื่นๆ (ระบุในหมายเหตุ)",
];

export default function TestDriveForm({
	children,
	defaultModel,
}: TestDriveFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState<TestDriveFormData>({
		name: "",
		phone: "",
		email: "",
		model: defaultModel || "",
		preferredDate: "",
		preferredTime: "",
		location: "",
		notes: "",
	});

	const handleInputChange = (field: keyof TestDriveFormData, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const buildFlexMessage = (data: TestDriveFormData) => {
		return {
			type: "flex" as const,
			altText: "คำขอทดลองขับ BYD ใหม่",
			contents: {
				type: "bubble",
				header: {
					type: "box",
					layout: "vertical",
					contents: [
						{
							type: "text",
							text: "🚗 คำขอทดลองขับ BYD",
							weight: "bold",
							size: "xl",
							color: "#1DB446",
						},
					],
					backgroundColor: "#f8f9fa",
				},
				body: {
					type: "box",
					layout: "vertical",
					contents: [
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "👤 ชื่อ-นามสกุล:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.name,
									size: "sm",
									color: "#333333",
									flex: 3,
									wrap: true,
								},
							],
							margin: "md",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "📞 เบอร์โทร:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.phone,
									size: "sm",
									color: "#333333",
									flex: 3,
								},
							],
							margin: "md",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "📧 อีเมล:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.email || "ไม่ระบุ",
									size: "sm",
									color: "#333333",
									flex: 3,
									wrap: true,
								},
							],
							margin: "md",
						},
						{
							type: "separator",
							margin: "lg",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "🚙 รุ่นที่สนใจ:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.model,
									size: "sm",
									color: "#1DB446",
									flex: 3,
									weight: "bold",
								},
							],
							margin: "lg",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "📅 วันที่ต้องการ:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.preferredDate,
									size: "sm",
									color: "#333333",
									flex: 3,
								},
							],
							margin: "md",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "⏰ เวลาที่ต้องการ:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.preferredTime || "ไม่ระบุ",
									size: "sm",
									color: "#333333",
									flex: 3,
								},
							],
							margin: "md",
						},
						{
							type: "box",
							layout: "baseline",
							contents: [
								{
									type: "text",
									text: "📍 สถานที่:",
									size: "sm",
									color: "#666666",
									flex: 2,
								},
								{
									type: "text",
									text: data.location || "ไม่ระบุ",
									size: "sm",
									color: "#333333",
									flex: 3,
									wrap: true,
								},
							],
							margin: "md",
						},
					],
				},
				footer: {
					type: "box",
					layout: "vertical",
					contents: [
						{
							type: "separator",
							margin: "md",
						},
						{
							type: "text",
							text: `📝 หมายเหตุ: ${data.notes || "ไม่มี"}`,
							size: "xs",
							color: "#666666",
							wrap: true,
							margin: "md",
						},
						{
							type: "text",
							text: `⏰ เวลาส่ง: ${new Date().toLocaleString("th-TH", {
								timeZone: "Asia/Bangkok",
							})}`,
							size: "xs",
							color: "#999999",
							margin: "sm",
						},
						{
							type: "text",
							text: "ส่งผ่าน: Website LIFF Form",
							size: "xs",
							color: "#999999",
						},
					],
				},
			},
		};
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const isInLineApp =
				typeof window !== "undefined" &&
				window.navigator.userAgent.includes("Line");

			const liffReady = await initializeLiff();

			if (isInLineApp && liffReady) {
				const flexMessage = buildFlexMessage(formData);
				const sent = await sendMessageToLine(flexMessage as any);

				if (sent) {
					toast.success("ส่งคำขอสำเร็จ!", {
						description: "ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
						duration: 4000,
					});

					// รีเซ็ตฟอร์ม
					setFormData({
						name: "",
						phone: "",
						email: "",
						model: defaultModel || "",
						preferredDate: "",
						preferredTime: "",
						location: "",
						notes: "",
					});

					setOpen(false);
					// Optionally save to DB
					await sendViaAPI(formData);
					return;
				}
			}

			// If not in LINE client, prompt user to open in LINE OA
			toast.error("กรุณาเปิดฟอร์มนี้ภายใน LINE เพื่อส่งคำขอ", {
				description: "คลิกปุ่มอีกครั้งหลังจากเปิดใน LINE OA",
				duration: 6000,
			});
		} catch (error) {
			console.error("Submit error:", error);
			toast.error("เกิดข้อผิดพลาด", {
				description: "กรุณาลองใหม่อีกครั้ง หรือติดต่อทีมงานโดยตรง",
				duration: 4000,
			});
		} finally {
			setLoading(false);
		}
	};

	const sendViaAPI = async (data: TestDriveFormData) => {
		const response = await fetch("/api/test-drive", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Failed to send via API");
		}

		const result = await response.json();

		toast.success("ส่งคำขอสำเร็จ!", {
			description: "ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
			duration: 4000,
		});

		// รีเซ็ตฟอร์ม
		setFormData({
			name: "",
			phone: "",
			email: "",
			model: defaultModel || "",
			preferredDate: "",
			preferredTime: "",
			location: "",
			notes: "",
		});

		setOpen(false);
		return result;
	};

	const isFormValid =
		formData.name && formData.phone && formData.model && formData.preferredDate;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{children || (
					<Button size="lg" className="rounded-full font-medium">
						<Car className="mr-2 h-4 w-4" />
						จองทดลองขับ
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				{/* เนื้อหา form เหมือนเดิม */}
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Car className="h-5 w-5 text-primary" />
						จองทดลองขับรถไฟฟ้า BYD
					</DialogTitle>
					<DialogDescription>
						กรอกข้อมูลเพื่อจองทดลองขับ ทีมงานจะติดต่อกลับเพื่อยืนยันการนัดหมาย
					</DialogDescription>
				</DialogHeader>

				{/* ส่วน form ที่เหลือเหมือนเดิม */}
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Personal Information */}
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name" className="flex items-center gap-2">
								<User className="h-4 w-4" />
								ชื่อ-นามสกุล *
							</Label>
							<Input
								id="name"
								placeholder="กรอกชื่อ-นามสกุล"
								value={formData.name}
								onChange={(e) => handleInputChange("name", e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="phone" className="flex items-center gap-2">
								<Phone className="h-4 w-4" />
								เบอร์โทรศัพท์ *
							</Label>
							<Input
								id="phone"
								type="tel"
								placeholder="กรอกเบอร์โทรศัพท์"
								value={formData.phone}
								onChange={(e) => handleInputChange("phone", e.target.value)}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="email">อีเมล</Label>
							<Input
								id="email"
								type="email"
								placeholder="กรอกอีเมล (ไม่บังคับ)"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
							/>
						</div>
					</div>

					{/* Car Selection */}
					<div className="space-y-2">
						<Label className="flex items-center gap-2">
							<Car className="h-4 w-4" />
							รุ่นรถที่สนใจ *
						</Label>
						<Select
							value={formData.model}
							onValueChange={(value) => handleInputChange("model", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="เลือกรุ่นรถ" />
							</SelectTrigger>
							<SelectContent>
								{carModels.map((model) => (
									<SelectItem key={model} value={model}>
										{model}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Date & Time */}
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label htmlFor="date" className="flex items-center gap-2">
								<Calendar className="h-4 w-4 text-primary" />
								วันที่ต้องการ *
							</Label>
							<Input
								id="date"
								type="date"
								value={formData.preferredDate}
								onChange={(e) =>
									handleInputChange("preferredDate", e.target.value)
								}
								min={new Date().toISOString().split("T")[0]}
								required
							/>
						</div>

						<div className="space-y-2">
							<Label>เวลาที่ต้องการ</Label>
							<Select
								value={formData.preferredTime}
								onValueChange={(value) =>
									handleInputChange("preferredTime", value)
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="เลือกเวลา" />
								</SelectTrigger>
								<SelectContent>
									{timeSlots.map((time) => (
										<SelectItem key={time} value={time}>
											{time}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					</div>

					{/* Location */}
					<div className="space-y-2">
						<Label className="flex items-center gap-2">
							<MapPin className="h-4 w-4" />
							สถานที่
						</Label>
						<Select
							value={formData.location}
							onValueChange={(value) => handleInputChange("location", value)}
						>
							<SelectTrigger>
								<SelectValue placeholder="เลือกสถานที่" />
							</SelectTrigger>
							<SelectContent>
								{locations.map((location) => (
									<SelectItem key={location} value={location}>
										{location}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{/* Notes */}
					<div className="space-y-2">
						<Label htmlFor="notes">หมายเหตุ</Label>
						<Textarea
							id="notes"
							placeholder="ข้อมูลเพิ่มเติม (ไม่บังคับ)"
							value={formData.notes}
							onChange={(e) => handleInputChange("notes", e.target.value)}
							rows={3}
						/>
					</div>

					{/* Submit Button */}
					<div className="flex gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							className="flex-1"
						>
							ยกเลิก
						</Button>
						<Button
							type="submit"
							disabled={!isFormValid || loading}
							className="flex-1"
						>
							{loading ? "กำลังส่ง..." : "ส่งคำขอ"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
