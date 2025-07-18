"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { CarModel } from "@/data/carModel";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CustomerInfo {
	name?: string;
	phone?: string;
	email?: string;
	preferredContact?: "phone" | "email" | "line";
	preferredTime?: string;
}

interface FormData {
	customer: CustomerInfo;
}

// Update the props interface to include lineProfile
interface InquiryFormProps {
	model: CarModel;
}

export function InquiryForm({ model }: InquiryFormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

	const {
		register,
		handleSubmit,

		formState: { errors },
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		try {
			setIsLoading(true);
			setErrorMessage(null);
			setIsSubmitSuccess(false);

			// ตรวจสอบข้อมูลพื้นฐานที่จำเป็น
			if (!data.customer?.name || !data.customer?.phone) {
				setErrorMessage("กรุณากรอกชื่อและเบอร์โทรศัพท์");
				return;
			}

			console.log("Submitting form data:", {
				...data,
				modelId: model.id,
				modelName: model.name,
			});

			// ส่งข้อมูลไปยังเซิร์ฟเวอร์ (แก้ endpoint ให้ส่งไป /api/test-drive เพื่อให้ส่ง LINE OA สำเร็จ)
			const response = await fetch("/api/test-drive", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					modelId: model.id,
					modelName: model.name,
					price: model.price,
				}),
			});

			const result = await response.json();

			if (!response.ok) {
				console.error("Form submission error:", result);
				throw new Error(result.error || "ไม่สามารถส่งข้อมูลได้");
			}

			setIsSubmitSuccess(true);
			toast.success(
				"ขอบคุณสำหรับความสนใจ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด"
			);
		} catch (error) {
			console.error("Form submission error:", error);
			const errorMsg =
				error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองใหม่";
			setErrorMessage(errorMsg);
			toast.error(errorMsg);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			{isSubmitSuccess ? (
				<div className="space-y-4">
					<div className="bg-green-50 p-4 rounded-lg border border-green-200">
						<h3 className="font-medium text-green-800 mb-2">
							ขอบคุณสำหรับความสนใจ
						</h3>
						<p className="text-sm text-green-700 mb-4">
							เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด
						</p>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					{/* แสดงข้อความ error */}
					{errorMessage && (
						<div className="bg-red-100 text-red-800 p-3 rounded-md text-sm">
							{errorMessage}
						</div>
					)}

					{/* ข้อมูลลูกค้า */}
					<div className="space-y-2">
						<Input
							{...register("customer.name", { required: "กรุณากรอกชื่อ" })}
							placeholder="ชื่อ-นามสกุล *"
							className={errors.customer?.name ? "border-red-500" : ""}
						/>
						<Input
							{...register("customer.phone", {
								required: "กรุณากรอกเบอร์โทรศัพท์",
							})}
							placeholder="เบอร์โทรศัพท์ *"
							type="tel"
							className={errors.customer?.phone ? "border-red-500" : ""}
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
						</select>
					</div>

					<Button type="submit" disabled={isLoading}>
						{isLoading ? "กำลังส่งข้อมูล..." : "ส่งข้อมูล"}
					</Button>
				</form>
			)}
		</>
	);
}
