"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { CarModel } from "@/types/models";
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

export function InquiryForm({ model }: { model: CarModel }) {
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: {},
	} = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		try {
			setIsLoading(true);
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
			toast.success(
				"ขอบคุณสำหรับความสนใจ เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด"
			);
		} catch (error) {
			toast.error("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
					className="w-full p-2 border rounded"
				>
					<option value="">เลือกสี</option>
					<option value="white">ขาว</option>
					<option value="black">ดำ</option>
					<option value="gray">เทา</option>
				</select>
				<textarea
					{...register("interest.comments")}
					placeholder="หมายเหตุเพิ่มเติม"
					className="w-full p-2 border rounded"
				/>
			</div>

			<Button type="submit" disabled={isLoading}>
				{isLoading ? "กำลังส่งข้อมูล..." : "ส่งข้อมูล"}
			</Button>
		</form>
	);
}
