"use client";

import { useState } from "react";
import { createModel } from "@/actions/models";
import Link from "next/link";
import {
	Car,
	ArrowLeft,
	Save,
	Plus,
	Trash2,
	Upload,
	DollarSign,
	Hash,
	FileText,
	Image,
	Palette,
	Settings,
	Star,
	Gift,
} from "lucide-react";

export default function CreateModelPage() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [colors, setColors] = useState([{ name: "", code: "", image: "" }]);
	const [variants, setVariants] = useState([
		{ name: "", price: 0, range: "", power: "" },
	]);
	const [features, setFeatures] = useState([
		{ title: "", description: "", image: "" },
	]);
	const [specialOffers, setSpecialOffers] = useState([""]);
	const [specs, setSpecs] = useState({
		acceleration: "",
		range: "",
		drivetrain: "",
		motor: "",
		battery: "",
		charging: "",
		annotate: "",
	});

	const addColor = () =>
		setColors([...colors, { name: "", code: "", image: "" }]);
	const removeColor = (index: number) =>
		setColors(colors.filter((_, i) => i !== index));

	const addVariant = () =>
		setVariants([...variants, { name: "", price: 0, range: "", power: "" }]);
	const removeVariant = (index: number) =>
		setVariants(variants.filter((_, i) => i !== index));

	const addFeature = () =>
		setFeatures([...features, { title: "", description: "", image: "" }]);
	const removeFeature = (index: number) =>
		setFeatures(features.filter((_, i) => i !== index));

	const addSpecialOffer = () => setSpecialOffers([...specialOffers, ""]);
	const removeSpecialOffer = (index: number) =>
		setSpecialOffers(specialOffers.filter((_, i) => i !== index));

	async function handleSubmit(formData: FormData) {
		try {
			setIsSubmitting(true);

			// Add complex data as JSON strings
			formData.append(
				"colors",
				JSON.stringify(colors.filter((c) => c.name && c.code))
			);
			formData.append(
				"variants",
				JSON.stringify(variants.filter((v) => v.name))
			);
			formData.append(
				"features",
				JSON.stringify(features.filter((f) => f.title))
			);
			formData.append(
				"specialOffers",
				JSON.stringify(specialOffers.filter((offer) => offer.trim()))
			);
			formData.append("specs", JSON.stringify(specs));
			formData.append(
				"gallery",
				JSON.stringify({ exterior: [], interior: [] })
			);
			formData.append("techHighlight", JSON.stringify([]));
			formData.append("techSpec", JSON.stringify({}));

			await createModel(formData);
		} catch (error) {
			console.error("Error creating model:", error);
			alert("เกิดข้อผิดพลาดในการสร้างรุ่นรถ กรุณาลองใหม่อีกครั้ง");
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
						href="/admin-q9k8v3n1-metro/models"
						className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
					>
						<ArrowLeft className="h-5 w-5" />
					</Link>
					<div>
						<h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
							<Car className="h-8 w-8 text-blue-600" />
							เพิ่มรุ่นรถใหม่
						</h1>
						<p className="text-gray-600 dark:text-gray-300 mt-1">
							กรอกข้อมูลรุ่นรถยนต์ใหม่ของ BYD Metro
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
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ชื่อรุ่นรถ *
							</label>
							<input
								type="text"
								name="name"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น BYD SEALION 7"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Slug *
							</label>
							<input
								type="text"
								name="slug"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น byd-sealion7"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Tagline
							</label>
							<input
								type="text"
								name="tagline"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="คำขวัญสำหรับรุ่นรถ"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								คำอธิบาย *
							</label>
							<textarea
								name="description"
								required
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="คำอธิบายรุ่นรถ..."
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ราคา (บาท) *
							</label>
							<div className="relative">
								<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									type="number"
									name="price"
									required
									min="0"
									className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="999900"
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								หัวข้อคุณสมบัติ *
							</label>
							<input
								type="text"
								name="featuresTitle"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น ที่สุดแห่งสมรรถนะ"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ความกว้างรูปภาพ *
							</label>
							<input
								type="number"
								name="imageWidth"
								required
								min="1"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="1200"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ความสูงรูปภาพ *
							</label>
							<input
								type="number"
								name="imageHeight"
								required
								min="1"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="800"
							/>
						</div>
					</div>
				</div>

				{/* Special Feature Section */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Star className="h-5 w-5 text-blue-600" />
						คุณสมบัติพิเศษ
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								หัวข้อคุณสมบัติพิเศษ
							</label>
							<input
								type="text"
								name="specialFeature"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น INFOTAINMENT & LIFESTYLE"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพคุณสมบัติพิเศษ
							</label>
							<input
								type="text"
								name="specialFeatureImage"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพ"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								คำอธิบายคุณสมบัติพิเศษ
							</label>
							<textarea
								name="specialFeatureDescription"
								rows={3}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="คำอธิบายรายละเอียดคุณสมบัติพิเศษ..."
							/>
						</div>
					</div>
				</div>

				{/* Image URLs */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Image className="h-5 w-5 text-green-600" />
						รูปภาพรถยนต์
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพโปรโมชั่น *
							</label>
							<input
								type="text"
								name="imageUrlPromo"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพโปรโมชั่น"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพโมเดล *
							</label>
							<input
								type="text"
								name="imageUrlModel"
								required
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพโมเดล"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพหลัก (Hero)
							</label>
							<input
								type="text"
								name="imageUrlHero"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพหลัก"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพจริง
							</label>
							<input
								type="text"
								name="imageUrlReal"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพจริง"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพข้อมูลซ้าย
							</label>
							<input
								type="text"
								name="imageUrlDataLeft"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพข้อมูลซ้าย"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								รูปภาพข้อมูลขวา
							</label>
							<input
								type="text"
								name="imageUrlDataRight"
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="URL รูปภาพข้อมูลขวา"
							/>
						</div>
					</div>
				</div>

				{/* Specifications */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Settings className="h-5 w-5 text-indigo-600" />
						ข้อมูลจำเพาะ (Specifications)
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								การเร่ง 0-100 กม./ชม.
							</label>
							<input
								type="text"
								value={specs.acceleration}
								onChange={(e) =>
									setSpecs({ ...specs, acceleration: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น 5.4 วินาที"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ระยะทางการขับขี่
							</label>
							<input
								type="text"
								value={specs.range}
								onChange={(e) => setSpecs({ ...specs, range: e.target.value })}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น 542 กิโลเมตร"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								ระบบขับเคลื่อน
							</label>
							<input
								type="text"
								value={specs.drivetrain}
								onChange={(e) =>
									setSpecs({ ...specs, drivetrain: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น AWD Performance"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								มอเตอร์
							</label>
							<input
								type="text"
								value={specs.motor}
								onChange={(e) => setSpecs({ ...specs, motor: e.target.value })}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น มอเตอร์ 380 กิโลวัตต์"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								แบตเตอรี่
							</label>
							<input
								type="text"
								value={specs.battery}
								onChange={(e) =>
									setSpecs({ ...specs, battery: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น 87 กิโลวัตต์-ชั่วโมง"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								การชาร์จ
							</label>
							<input
								type="text"
								value={specs.charging}
								onChange={(e) =>
									setSpecs({ ...specs, charging: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="เช่น AC type 2 / DC CCS 2 (150 กิโลวัตต์)"
							/>
						</div>
						<div className="md:col-span-2">
							<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								หมายเหตุ
							</label>
							<input
								type="text"
								value={specs.annotate}
								onChange={(e) =>
									setSpecs({ ...specs, annotate: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								placeholder="หมายเหตุเพิ่มเติม..."
							/>
						</div>
					</div>
				</div>

				{/* Colors */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Palette className="h-5 w-5 text-purple-600" />
						สีรถยนต์
					</h2>
					<div className="space-y-4">
						{colors.map((color, index) => (
							<div
								key={index}
								className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
							>
								<input
									type="text"
									placeholder="ชื่อสี"
									value={color.name}
									onChange={(e) => {
										const newColors = [...colors];
										newColors[index].name = e.target.value;
										setColors(newColors);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<input
									type="text"
									placeholder="รหัสสี (เช่น #FF0000)"
									value={color.code}
									onChange={(e) => {
										const newColors = [...colors];
										newColors[index].code = e.target.value;
										setColors(newColors);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="URL รูปภาพสี"
										value={color.image}
										onChange={(e) => {
											const newColors = [...colors];
											newColors[index].image = e.target.value;
											setColors(newColors);
										}}
										className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									/>
									{colors.length > 1 && (
										<button
											type="button"
											onClick={() => removeColor(index)}
											className="px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
										>
											<Trash2 className="h-5 w-5" />
										</button>
									)}
								</div>
							</div>
						))}
						<button
							type="button"
							onClick={addColor}
							className="flex items-center gap-2 px-4 py-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
						>
							<Plus className="h-4 w-4" />
							เพิ่มสี
						</button>
					</div>
				</div>

				{/* Variants */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Settings className="h-5 w-5 text-orange-600" />
						รุ่นย่อย (Variants)
					</h2>
					<div className="space-y-4">
						{variants.map((variant, index) => (
							<div
								key={index}
								className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
							>
								<input
									type="text"
									placeholder="ชื่อรุ่นย่อย"
									value={variant.name}
									onChange={(e) => {
										const newVariants = [...variants];
										newVariants[index].name = e.target.value;
										setVariants(newVariants);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<input
									type="number"
									placeholder="ราคา"
									value={variant.price}
									onChange={(e) => {
										const newVariants = [...variants];
										newVariants[index].price = parseFloat(e.target.value);
										setVariants(newVariants);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<input
									type="text"
									placeholder="ระยะทาง (เช่น 500 km)"
									value={variant.range}
									onChange={(e) => {
										const newVariants = [...variants];
										newVariants[index].range = e.target.value;
										setVariants(newVariants);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="กำลัง (เช่น 150kW)"
										value={variant.power}
										onChange={(e) => {
											const newVariants = [...variants];
											newVariants[index].power = e.target.value;
											setVariants(newVariants);
										}}
										className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									/>
									{variants.length > 1 && (
										<button
											type="button"
											onClick={() => removeVariant(index)}
											className="px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
										>
											<Trash2 className="h-5 w-5" />
										</button>
									)}
								</div>
							</div>
						))}
						<button
							type="button"
							onClick={addVariant}
							className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/30 rounded-lg transition-colors"
						>
							<Plus className="h-4 w-4" />
							เพิ่มรุ่นย่อย
						</button>
					</div>
				</div>

				{/* Features */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Star className="h-5 w-5 text-yellow-600" />
						คุณสมบัติเด่น
					</h2>
					<div className="space-y-4">
						{features.map((feature, index) => (
							<div
								key={index}
								className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg"
							>
								<input
									type="text"
									placeholder="ชื่อคุณสมบัติ"
									value={feature.title}
									onChange={(e) => {
										const newFeatures = [...features];
										newFeatures[index].title = e.target.value;
										setFeatures(newFeatures);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<input
									type="text"
									placeholder="คำอธิบาย"
									value={feature.description}
									onChange={(e) => {
										const newFeatures = [...features];
										newFeatures[index].description = e.target.value;
										setFeatures(newFeatures);
									}}
									className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
								<div className="flex gap-2">
									<input
										type="text"
										placeholder="URL รูปภาพ"
										value={feature.image}
										onChange={(e) => {
											const newFeatures = [...features];
											newFeatures[index].image = e.target.value;
											setFeatures(newFeatures);
										}}
										className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									/>
									{features.length > 1 && (
										<button
											type="button"
											onClick={() => removeFeature(index)}
											className="px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
										>
											<Trash2 className="h-5 w-5" />
										</button>
									)}
								</div>
							</div>
						))}
						<button
							type="button"
							onClick={addFeature}
							className="flex items-center gap-2 px-4 py-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
						>
							<Plus className="h-4 w-4" />
							เพิ่มคุณสมบัติ
						</button>
					</div>
				</div>

				{/* Special Offers */}
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
						<Gift className="h-5 w-5 text-pink-600" />
						ข้อเสนอพิเศษ
					</h2>
					<div className="space-y-4">
						{specialOffers.map((offer, index) => (
							<div key={index} className="flex gap-3">
								<input
									type="text"
									value={offer}
									onChange={(e) => {
										const newOffers = [...specialOffers];
										newOffers[index] = e.target.value;
										setSpecialOffers(newOffers);
									}}
									className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
									placeholder="ข้อเสนอพิเศษ..."
								/>
								{specialOffers.length > 1 && (
									<button
										type="button"
										onClick={() => removeSpecialOffer(index)}
										className="px-3 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
									>
										<Trash2 className="h-5 w-5" />
									</button>
								)}
							</div>
						))}
						<button
							type="button"
							onClick={addSpecialOffer}
							className="flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-pink-50 dark:hover:bg-pink-900/30 rounded-lg transition-colors"
						>
							<Plus className="h-4 w-4" />
							เพิ่มข้อเสนอ
						</button>
					</div>
				</div>

				{/* Submit Button */}
				<div className="flex justify-end gap-4">
					<Link
						href="/admin-q9k8v3n1-metro/models"
						className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
					>
						ยกเลิก
					</Link>
					<button
						type="submit"
						disabled={isSubmitting}
						className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<Save className="h-5 w-5" />
						{isSubmitting ? "กำลังบันทึก..." : "บันทึกรุ่นรถ"}
					</button>
				</div>
			</form>
		</div>
	);
}
