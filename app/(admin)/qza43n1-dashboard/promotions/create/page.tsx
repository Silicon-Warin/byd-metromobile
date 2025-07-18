"use client";

import { useState } from "react";
import { createPromotion } from "@/actions/promotions";
import Link from "next/link";
import {
	Tag,
	ArrowLeft,
	Save,
	Plus,
	Trash2,
	Calendar,
	Percent,
	FileText,
	Image,
	Target,
	Clock,
} from "lucide-react";

export default function CreatePromotionPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [models, setModels] = useState([""]);

	const addModel = () => setModels([...models, ""]);
	const removeModel = (index: number) =>
		setModels(models.filter((_, i) => i !== index));

	async function handleSubmit(formData: FormData) {
		try {
			setIsSubmitting(true);

			// Add models as JSON string
			formData.append(
				"models",
				JSON.stringify(models.filter((model) => model.trim()))
			);

			await createPromotion(formData);
		} catch (error) {
			console.error("Error creating promotion:", error);
			alert("เกิดข้อผิดพลาดในการสร้างโปรโมชั่น กรุณาลองใหม่อีกครั้ง");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<div className="max-w-4xl mx-auto space-y-8">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Link
						href="/admin-q9k8v3n1-metro/promotions"
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
							<Tag className="h-8 w-8 text-purple-600" />
							เพิ่มโปรโมชั่นใหม่
						</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							สร้างโปรโมชั่นใหม่สำหรับ BYD Metro
						</p>
					</div>
				</div>
			</div>

			{/* Form */}
			<form action={handleSubmit} className="space-y-8">
				{/* Basic Information */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<FileText className="h-5 w-5 text-blue-600" />
						ข้อมูลพื้นฐาน
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ชื่อโปรโมชั่น *
							</label>
							<input
								type="text"
								name="title"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น Superman Campaign 2024"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								คำบรรยายย่อ
							</label>
							<input
								type="text"
								name="subtitle"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="คำบรรยายสั้น ๆ"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								คำอธิบาย *
							</label>
							<textarea
								name="description"
								required
								rows={4}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="รายละเอียดโปรโมชั่น..."
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								URL รูปภาพโปรโมชั่น *
							</label>
							<div className="relative">
								<Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="url"
									name="image_url"
									required
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="https://example.com/image.jpg"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Dates and Status */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Calendar className="h-5 w-5 text-green-600" />
						ระยะเวลาและสถานะ
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								วันที่เริ่มต้น *
							</label>
							<input
								type="date"
								name="start_date"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								วันที่สิ้นสุด *
							</label>
							<input
								type="date"
								name="end_date"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								สถานะ *
							</label>
							<select
								name="status"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
							>
								<option value="">เลือกสถานะ</option>
								<option value="upcoming">เตรียมเปิด</option>
								<option value="active">ใช้งานอยู่</option>
								<option value="expired">หมดอายุ</option>
							</select>
						</div>
					</div>
				</div>

				{/* Discount */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Percent className="h-5 w-5 text-orange-600" />
						ส่วนลด
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								เปอร์เซ็นต์ส่วนลด
							</label>
							<div className="relative">
								<Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="number"
									name="discount"
									min="0"
									max="100"
									step="0.1"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="เช่น 15.5"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Target Models */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Target className="h-5 w-5 text-red-600" />
						รุ่นรถที่ใช้โปรโมชั่น
					</h2>
					<div className="space-y-4">
						{models.map((model, index) => (
							<div key={index} className="flex gap-3">
								<select
									value={model}
									onChange={(e) => {
										const newModels = [...models];
										newModels[index] = e.target.value;
										setModels(newModels);
									}}
									className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								>
									<option value="">เลือกรุ่นรถ</option>
									<option value="byd-sealion7">BYD SEALION 7</option>
									<option value="byd-m6">BYD M6</option>
									<option value="byd-sealion6dmi">BYD SEALION 6 DM-i</option>
									<option value="byd-seal">BYD SEAL</option>
									<option value="byd-atto3">BYD ATTO 3</option>
									<option value="byd-dolphin">BYD DOLPHIN</option>
								</select>
								{models.length > 1 && (
									<button
										type="button"
										onClick={() => removeModel(index)}
										className="px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
									>
										<Trash2 className="h-5 w-5" />
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={addModel}
							className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
						>
							<Plus className="h-4 w-4" />
							เพิ่มรุ่นรถ
						</button>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end gap-4">
					<Link
						href="/admin-q9k8v3n1-metro/promotions"
						className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					>
						ยกเลิก
					</Link>
					<button
						type="submit"
						disabled={isSubmitting}
						className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Save className="h-5 w-5" />
						{isSubmitting ? "กำลังบันทึก..." : "บันทึกโปรโมชั่น"}
					</button>
				</div>
			</form>
		</div>
	);
}
