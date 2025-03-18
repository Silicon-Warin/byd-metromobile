"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next";

import { CarModel } from "@/types/models";
import { LineProfile } from "@/types/line";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import LineLoginButton from "./LineLoginButton";

interface CustomerInfo {
	name?: string;
	phone?: string;
	email?: string;
	preferredContact?: "phone" | "email" | "line";
	preferredTime?: string;
}

interface InterestInfo {
	testDrive?: boolean;
	financing?: boolean;
	tradeIn?: boolean;
	color?: string;
	urgency?: "immediate" | "within_month" | "no_rush";
	comments?: string;
}

interface FormData {
	customer: CustomerInfo;
	interest: InterestInfo;
}

// Update the props interface to include lineProfile
interface InquiryFormProps {
	model: CarModel;
	lineProfile?: LineProfile;
}

export function InquiryForm({ model }: InquiryFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedInWithLine, setIsLoggedInWithLine] = useState(false);
	const [showLineLoginPrompt, setShowLineLoginPrompt] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		formState: {},
	} = useForm<FormData>();

	// ตรวจสอบการล็อกอินด้วย Line เมื่อโหลดคอมโพเนนต์
	useEffect(() => {
		const lineUserId = getCookie("line_user_id");
		const lineDisplayName = getCookie("line_display_name");

		if (lineUserId) {
			setIsLoggedInWithLine(true);

			// ถ้ามีชื่อจาก Line ให้ตั้งค่าชื่อในฟอร์ม
			if (lineDisplayName) {
				setValue("customer.name", lineDisplayName as string);
			}
		}
	}, [setValue]);

	const onSubmit = async (data: FormData) => {
		try {
			setIsLoading(true);

			// ส่งข้อมูลไปยังเซิร์ฟเวอร์
			const response = await fetch("/api/inquiries", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					modelId: model.id,
					modelName: model.name,
					price: model.price,
					specs: model.specifications,
				}),
			});

			if (!response.ok) throw new Error();

			// ถ้าล็อกอินด้วย Line ให้ส่งข้อความไปยัง Line ด้วย
			if (isLoggedInWithLine) {
				await sendLineMessage(data, model);
			}

			toast.success(
				"ขอบคุณสำหรับความสนใจ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด"
			);
		} catch (error) {
			toast.error("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setIsLoading(false);
		}
	};

	// ฟังก์ชันส่งข้อความไปยัง Line
	const sendLineMessage = async (data: FormData, model: CarModel) => {
		try {
			await fetch("/api/send-line-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...data,
					modelId: model.id,
					modelName: model.name,
					price: model.price,
				}),
			});
		} catch (error) {
			console.error("Send Line message error:", error);
		}
	};

	// ฟังก์ชัน handler สำหรับการล็อกอินด้วย Line สำเร็จ
	const handleLineLoginSuccess = (profile: LineProfile) => {
		setIsLoggedInWithLine(true);
		setShowLineLoginPrompt(false);

		if (profile.displayName) {
			setValue("customer.name", profile.displayName);
		}

		toast.success("เข้าสู่ระบบด้วย LINE สำเร็จ");
	};

	// ฟังก์ชัน handler สำหรับการกดส่งฟอร์มเมื่อยังไม่ได้ล็อกอิน
	const handleFormSubmitWithLineCheck = (e: React.FormEvent) => {
		// ถ้ายังไม่ได้ล็อกอิน LINE ให้แสดงข้อความแนะนำให้ล็อกอิน
		if (!isLoggedInWithLine) {
			e.preventDefault();
			setShowLineLoginPrompt(true);
			return;
		}

		// ถ้าล็อกอินแล้ว ให้ดำเนินการส่งฟอร์มตามปกติ
		handleSubmit(onSubmit)(e);
	};

	return (
		<form onSubmit={handleFormSubmitWithLineCheck} className="space-y-4">
			{/* แสดงปุ่ม LINE Login เมื่อยังไม่ได้ล็อกอินและเมื่อต้องการให้ล็อกอิน */}
			{showLineLoginPrompt && !isLoggedInWithLine && (
				<div className="bg-gray-100 p-4 rounded-lg mb-4">
					<p className="text-sm mb-2">
						เชื่อมต่อบัญชี LINE เพื่อความสะดวกในการติดต่อ
					</p>
					<LineLoginButton onLoginSuccess={handleLineLoginSuccess} />
				</div>
			)}

			{/* ไอคอนแสดงสถานะการเชื่อมต่อกับ LINE */}
			{isLoggedInWithLine && (
				<div className="bg-[#06C755]/10 p-2 rounded-lg mb-2 flex items-center gap-2">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="#06C755">
						<path d="M19.952 12.994c0-4.667-4.678-8.461-10.422-8.461-5.743 0-10.42 3.794-10.42 8.461 0 4.18 3.703 7.683 8.708 8.349.34.073.803.224.92.514.11.265.07.683.035.951 0 0-.123.741-.15.9-.45.213-.21.836.723.456.932-.38 5.034-2.964 6.866-5.075 1.267-1.39 1.88-2.8 1.88-4.234z" />
					</svg>
					<span className="text-xs">เชื่อมต่อกับ LINE แล้ว</span>
				</div>
			)}

			{/* ข้อมูลลูกค้า */}
			<div className="space-y-2">
				<Input {...register("customer.name")} placeholder="ชื่อ-นามสกุล" />
				<Input
					{...register("customer.phone")}
					placeholder="เบอร์โทรศัพท์"
					type="tel"
				/>
				<Input
					{...register("customer.email")}
					placeholder="อีเมล"
					type="email"
				/>
				<select
					{...register("customer.preferredContact")}
					className="w-full p-2 border rounded"
				>
					<option value="phone">โทรศัพท์</option>
					<option value="email">อีเมล</option>
					<option value="line">LINE</option>
				</select>
			</div>

			{/* ข้อมูลความสนใจ */}
			<div className="space-y-2">
				<label className="flex items-center gap-2">
					<input type="checkbox" {...register("interest.testDrive")} />
					สนใจทดลองขับ
				</label>
				<label className="flex items-center gap-2">
					<input type="checkbox" {...register("interest.financing")} />
					สนใจสอบถามไฟแนนซ์
				</label>
				<label className="flex items-center gap-2">
					<input type="checkbox" {...register("interest.tradeIn")} />
					สนใจเทิร์นรถ
				</label>
				<select
					{...register("interest.color")}
					className="w-full p-2 border rounded text-accent-foreground"
				>
					<option value="" className="text-gray-900">
						เลือกสี
					</option>
					<option value="white" className="text-gray-900">
						ขาว
					</option>
					<option value="black" className="text-gray-900">
						ดำ
					</option>
					<option value="gray" className="text-gray-900">
						เทา
					</option>
				</select>
				<textarea
					{...register("interest.comments")}
					placeholder="หมายเหตุเพิ่มเติม"
					className="w-full p-2 border rounded"
				/>
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading
					? "กำลังส่งข้อมูล..."
					: isLoggedInWithLine
					? "ส่งข้อมูล"
					: "ส่งข้อมูลและเชื่อมต่อ LINE"}
			</Button>
		</form>
	);
}
