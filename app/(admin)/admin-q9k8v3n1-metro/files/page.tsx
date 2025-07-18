"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	FileImage,
	Search,
	Filter,
	Grid,
	List,
	Upload,
	Trash2,
	Eye,
	Download,
	FolderOpen,
	AlertCircle,
	CheckCircle,
} from "lucide-react";
import {
	getFiles,
	deleteFileRecord,
	createFileRecord,
	uploadFileToStorage,
} from "@/actions/files";

interface FileItem {
	id: string;
	name: string;
	originalName: string;
	filePath: string;
	fileSize: number;
	fileType: string;
	category: string;
	url: string;
	uploadedAt: string;
	uploadedBy: string;
}

export default function FilesManager() {
	const [user, setUser] = useState<any>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [files, setFiles] = useState<FileItem[]>([]);
	const [uploading, setUploading] = useState(false);
	const [uploadError, setUploadError] = useState("");
	const [uploadSuccess, setUploadSuccess] = useState("");
	const [loading, setLoading] = useState(true);

	// Check auth and load files
	useEffect(() => {
		async function loadData() {
			const supabase = createClient();

			// Get user
			const {
				data: { user },
			} = await supabase.auth.getUser();
			setUser(user);

			if (user) {
				try {
					const filesData = await getFiles(selectedCategory);
					setFiles(
						filesData.map((file: any) => ({
							id: file.id,
							name: file.name,
							originalName: file.original_name,
							filePath: file.file_path,
							fileSize: file.file_size,
							fileType: file.file_type,
							category: file.category,
							url: file.file_path, // Use file path as URL for now
							uploadedAt: file.created_at,
							uploadedBy: file.uploaded_by,
						}))
					);
				} catch (error) {
					console.error("Error loading files:", error);
				}
			}

			setLoading(false);
		}

		loadData();
	}, [selectedCategory]);

	// Filter files based on search and category
	const filteredFiles = useMemo(() => {
		return files.filter((file: FileItem) => {
			const matchesSearch =
				file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				file.originalName.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory =
				selectedCategory === "all" || file.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [files, searchTerm, selectedCategory]);

	const stats = [
		{
			label: "ไฟล์ทั้งหมด",
			value: files.length,
			color: "text-blue-600",
		},
		{
			label: "ขนาดรวม",
			value: `${(
				files.reduce(
					(total: number, file: FileItem) => total + file.fileSize,
					0
				) /
				1024 /
				1024
			).toFixed(1)} MB`,
			color: "text-green-600",
		},
		{
			label: "รูปภาพรถยนต์",
			value: files.filter((f: FileItem) => f.category === "car-images").length,
			color: "text-purple-600",
		},
	];

	const categories = [
		{ value: "all", label: "ทั้งหมด" },
		{ value: "car-images", label: "รูปภาพรถยนต์" },
		{ value: "promotion-images", label: "รูปภาพโปรโมชั่น" },
		{ value: "general-files", label: "ไฟล์ทั่วไป" },
	];

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString("th-TH", {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	const handleFileUpload = useCallback(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			const uploadedFiles = event.target.files;
			if (!uploadedFiles || uploadedFiles.length === 0) return;

			setUploading(true);
			setUploadError("");
			setUploadSuccess("");

			try {
				for (const file of Array.from(uploadedFiles)) {
					// Determine bucket based on file type
					let bucket = "general-files";
					if (file.type.startsWith("image/")) {
						bucket = "car-images"; // Default to car images
					}

					// Generate unique filename
					const fileName = `${Date.now()}-${file.name}`;

					// Upload to storage
					const uploadResult = await uploadFileToStorage(
						file,
						bucket,
						fileName
					);

					// Create database record
					await createFileRecord({
						name: fileName,
						original_name: file.name,
						file_path: uploadResult.path,
						file_size: file.size,
						file_type: file.type,
						category: bucket,
						tags: [],
						uploaded_by: user?.email || "unknown",
					});
				}

				setUploadSuccess(`อัปโหลดไฟล์ ${uploadedFiles.length} ไฟล์สำเร็จ`);
				// Refresh file list
				const filesData = await getFiles(selectedCategory);
				setFiles(
					filesData.map((file: any) => ({
						id: file.id,
						name: file.name,
						originalName: file.original_name,
						filePath: file.file_path,
						fileSize: file.file_size,
						fileType: file.file_type,
						category: file.category,
						url: file.file_path,
						uploadedAt: file.created_at,
						uploadedBy: file.uploaded_by,
					}))
				);
			} catch (error: any) {
				setUploadError(error.message || "เกิดข้อผิดพลาดในการอัปโหลดไฟล์");
			} finally {
				setUploading(false);
			}
		},
		[selectedCategory, user]
	);

	const handleDeleteFile = async (file: FileItem) => {
		if (!confirm(`ต้องการลบไฟล์ "${file.originalName}" หรือไม่?`)) return;

		try {
			await deleteFileRecord(file.id);
			// Refresh file list
			const filesData = await getFiles(selectedCategory);
			setFiles(
				filesData.map((file: any) => ({
					id: file.id,
					name: file.name,
					originalName: file.original_name,
					filePath: file.file_path,
					fileSize: file.file_size,
					fileType: file.file_type,
					category: file.category,
					url: file.file_path,
					uploadedAt: file.created_at,
					uploadedBy: file.uploaded_by,
				}))
			);
			setUploadSuccess("ลบไฟล์สำเร็จ");
		} catch (error: any) {
			setUploadError(error.message || "เกิดข้อผิดพลาดในการลบไฟล์");
		}
	};

	const FileCard = ({ file }: { file: FileItem }) => (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			<Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm">
				<CardHeader className="p-0">
					<div className="relative h-48 overflow-hidden rounded-t-lg bg-slate-100">
						{file.fileType.startsWith("image/") ? (
							<Image
								src={file.url}
								alt={file.originalName}
								fill
								className="object-cover group-hover:scale-105 transition-transform duration-300"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							/>
						) : (
							<div className="h-full flex items-center justify-center">
								<FileImage className="h-16 w-16 text-slate-400" />
							</div>
						)}
						<div className="absolute top-2 right-2 flex gap-2">
							<Badge variant="secondary" className="bg-black/50 text-white">
								{formatFileSize(file.fileSize)}
							</Badge>
						</div>
					</div>
				</CardHeader>
				<CardContent className="p-4">
					<div className="space-y-3">
						<div>
							<h3
								className="font-semibold text-slate-900 truncate"
								title={file.originalName}
							>
								{file.originalName}
							</h3>
							<p className="text-xs text-slate-500 truncate">{file.name}</p>
						</div>

						<div className="flex items-center justify-between text-xs text-slate-500">
							<span>{file.fileType}</span>
							<span>{formatDate(file.uploadedAt)}</span>
						</div>

						<div className="flex gap-2 pt-2 border-t">
							<Button size="sm" variant="outline" className="flex-1">
								<Eye className="h-3 w-3 mr-1" />
								ดู
							</Button>
							<Button size="sm" variant="outline">
								<Download className="h-3 w-3" />
							</Button>
							{user && (
								<Button
									size="sm"
									variant="outline"
									className="text-red-600 hover:text-red-700"
									onClick={() => handleDeleteFile(file)}
								>
									<Trash2 className="h-3 w-3" />
								</Button>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="h-8 w-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
					<p className="text-slate-600">กำลังโหลดข้อมูล...</p>
				</div>
			</div>
		);
	}

	if (!user) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Card className="p-8">
					<CardContent className="text-center">
						<AlertCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
						<h3 className="text-lg font-semibold text-slate-900 mb-2">
							จำเป็นต้องเข้าสู่ระบบ
						</h3>
						<p className="text-slate-600">
							กรุณาเข้าสู่ระบบเพื่อเข้าถึงระบบจัดการไฟล์
						</p>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
			{/* Header */}
			<div className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80">
				<div className="flex h-16 items-center justify-between px-6">
					<div className="flex items-center gap-3">
						<FileImage className="h-6 w-6 text-purple-600" />
						<div>
							<h1 className="text-xl font-bold text-slate-900 dark:text-white">
								จัดการไฟล์และสื่อ
							</h1>
							<p className="text-sm text-slate-500 dark:text-slate-400">
								อัปโหลด จัดการ และจัดระเบียบไฟล์ต่างๆ
							</p>
						</div>
					</div>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-purple-600 hover:bg-purple-700">
								<Upload className="h-4 w-4 mr-2" />
								อัปโหลดไฟล์
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-md">
							<DialogHeader>
								<DialogTitle>อัปโหลดไฟล์ใหม่</DialogTitle>
							</DialogHeader>
							<div className="space-y-4">
								{uploadError && (
									<Alert className="bg-red-50 border-red-200">
										<AlertCircle className="h-4 w-4 text-red-600" />
										<AlertDescription className="text-red-800">
											{uploadError}
										</AlertDescription>
									</Alert>
								)}

								{uploadSuccess && (
									<Alert className="bg-green-50 border-green-200">
										<CheckCircle className="h-4 w-4 text-green-600" />
										<AlertDescription className="text-green-800">
											{uploadSuccess}
										</AlertDescription>
									</Alert>
								)}

								<div className="grid w-full max-w-sm items-center gap-1.5">
									<label htmlFor="file-upload" className="text-sm font-medium">
										เลือกไฟล์
									</label>
									<Input
										id="file-upload"
										type="file"
										multiple
										accept="image/*,.pdf,.doc,.docx"
										onChange={handleFileUpload}
										disabled={uploading}
										className="cursor-pointer"
									/>
									<p className="text-xs text-slate-500">
										รองรับ: รูปภาพ, PDF, Word (สูงสุด 10MB ต่อไฟล์)
									</p>
								</div>

								{uploading && (
									<div className="flex items-center gap-2 text-sm text-slate-600">
										<div className="h-4 w-4 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin" />
										กำลังอัปโหลด...
									</div>
								)}
							</div>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* Stats */}
			<div className="p-6 pb-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					{stats.map((stat, index) => (
						<Card key={index} className="bg-white/80 backdrop-blur-sm">
							<CardContent className="p-4">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-sm text-slate-600">{stat.label}</p>
										<p className={`text-2xl font-bold ${stat.color}`}>
											{stat.value}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col sm:flex-row gap-4 mb-6">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
						<Input
							placeholder="ค้นหาไฟล์..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-10 bg-white/80 backdrop-blur-sm"
						/>
					</div>
					<Select value={selectedCategory} onValueChange={setSelectedCategory}>
						<SelectTrigger className="w-full sm:w-48 bg-white/80 backdrop-blur-sm">
							<Filter className="h-4 w-4 mr-2" />
							<SelectValue placeholder="หมวดหมู่" />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.value} value={category.value}>
									{category.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<div className="flex gap-2">
						<Button
							variant={viewMode === "grid" ? "default" : "outline"}
							size="sm"
							onClick={() => setViewMode("grid")}
							className="bg-white/80 backdrop-blur-sm"
						>
							<Grid className="h-4 w-4" />
						</Button>
						<Button
							variant={viewMode === "list" ? "default" : "outline"}
							size="sm"
							onClick={() => setViewMode("list")}
							className="bg-white/80 backdrop-blur-sm"
						>
							<List className="h-4 w-4" />
						</Button>
					</div>
				</div>

				{/* Files Display */}
				<div className="space-y-4">
					{filteredFiles.length === 0 ? (
						<Card className="bg-white/80 backdrop-blur-sm">
							<CardContent className="p-8 text-center">
								<FolderOpen className="h-12 w-12 text-slate-400 mx-auto mb-4" />
								<h3 className="text-lg font-semibold text-slate-900 mb-2">
									ไม่พบไฟล์
								</h3>
								<p className="text-slate-600">
									ไม่พบไฟล์ที่ตรงกับการค้นหา หรือยังไม่มีไฟล์ในระบบ
								</p>
							</CardContent>
						</Card>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
							{filteredFiles.map((file) => (
								<FileCard key={file.id} file={file} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
