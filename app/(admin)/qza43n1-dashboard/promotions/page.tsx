import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import {
	handleDeletePromotion,
	handleStatusChange,
} from "@/actions/promotions";
import Link from "next/link";
import {
	Trash2,
	Edit3,
	Plus,
	Search,
	Tag,
	Clock,
	CheckCircle,
	XCircle,
} from "lucide-react";
import Image from "next/image";

type Promotion = {
	id: string;
	title: string;
	status: "active" | "upcoming" | "expired" | null;
	end_date: string | null;
	start_date: string | null;
	image_url?: string;
	description?: string;
	discount?: number;
	updated_at: string;
};

const statusColors: { [key: string]: { bg: string; text: string; icon: any } } =
	{
		active: {
			bg: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
			text: "ใช้งานอยู่",
			icon: CheckCircle,
		},
		upcoming: {
			bg: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
			text: "เตรียมเปิด",
			icon: Clock,
		},
		expired: {
			bg: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
			text: "หมดอายุ",
			icon: XCircle,
		},
		default: {
			bg: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
			text: "ไม่ระบุ",
			icon: Clock,
		},
	};

async function PromotionsPage() {
	const supabase = await createClient();
	const { data: promotions, error } = await supabase
		.from("promotions")
		.select(
			"id, title, status, end_date, start_date, image_url, description, discount, updated_at"
		)
		.order("updated_at", { ascending: false })
		.returns<Promotion[]>();

	if (error) {
		console.error("Error fetching promotions:", error);
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<Tag className="h-12 w-12 text-red-500 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-red-600 mb-2">
						เกิดข้อผิดพลาด
					</h3>
					<p className="text-red-500">
						ไม่สามารถโหลดข้อมูลโปรโมชั่นได้ กรุณาลองใหม่อีกครั้ง
					</p>
				</div>
			</div>
		);
	}

	// Calculate stats
	const activePromotions =
		promotions?.filter((p) => p.status === "active").length || 0;
	const upcomingPromotions =
		promotions?.filter((p) => p.status === "upcoming").length || 0;
	const expiredPromotions =
		promotions?.filter((p) => p.status === "expired").length || 0;

	return (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
						<Tag className="h-8 w-8 text-purple-600" />
						จัดการโปรโมชั่น
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						เพิ่ม แก้ไข และจัดการโปรโมชั่นทั้งหมดของ BYD Metro
					</p>
				</div>
				<Link
					href="/admin-q9k8v3n1-metro/promotions/create"
					className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-lg hover:shadow-xl"
				>
					<Plus className="h-5 w-5" />
					เพิ่มโปรโมชั่นใหม่
				</Link>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								โปรโมชั่นทั้งหมด
							</p>
							<p className="text-3xl font-bold text-purple-600">
								{promotions?.length || 0}
							</p>
						</div>
						<Tag className="h-8 w-8 text-purple-600" />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								ใช้งานอยู่
							</p>
							<p className="text-3xl font-bold text-green-600">
								{activePromotions}
							</p>
						</div>
						<CheckCircle className="h-8 w-8 text-green-600" />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								เตรียมเปิด
							</p>
							<p className="text-3xl font-bold text-blue-600">
								{upcomingPromotions}
							</p>
						</div>
						<Clock className="h-8 w-8 text-blue-600" />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								หมดอายุ
							</p>
							<p className="text-3xl font-bold text-red-600">
								{expiredPromotions}
							</p>
						</div>
						<XCircle className="h-8 w-8 text-red-600" />
					</div>
				</div>
			</div>

			{/* Search and Filters */}
			<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
						<input
							type="text"
							placeholder="ค้นหาโปรโมชั่น..."
							className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
						<option value="">ทุกสถานะ</option>
						<option value="active">ใช้งานอยู่</option>
						<option value="upcoming">เตรียมเปิด</option>
						<option value="expired">หมดอายุ</option>
					</select>
				</div>
			</div>

			{/* Promotions Table */}
			<div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
				{promotions && promotions.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										โปรโมชั่น
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										สถานะ
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										ระยะเวลา
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										ส่วนลด
									</th>
									<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										การจัดการ
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								{promotions.map((promo) => {
									const statusInfo = statusColors[promo.status || "default"];
									const StatusIcon = statusInfo.icon;

									return (
										<tr
											key={promo.id}
											className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
										>
											<td className="px-6 py-6">
												<div className="flex items-center space-x-4">
													{promo.image_url && (
														<Image
															src={promo.image_url}
															alt={promo.title}
															className="h-12 w-12 rounded-lg object-cover bg-gray-100"
														/>
													)}
													<div>
														<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
															{promo.title}
														</h3>
														{promo.description && (
															<p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
																{promo.description}
															</p>
														)}
													</div>
												</div>
											</td>
											<td className="px-6 py-6">
												<div className="flex items-center gap-2">
													<form action={handleStatusChange} className="inline">
														<input type="hidden" name="id" value={promo.id} />
														<select
															name="status"
															defaultValue={promo.status || ""}
															onChange={(e) => {
																const form = e.target.closest(
																	"form"
																) as HTMLFormElement;
																form.requestSubmit();
															}}
															className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-0 ${statusInfo.bg}`}
														>
															<option value="active">ใช้งานอยู่</option>
															<option value="upcoming">เตรียมเปิด</option>
															<option value="expired">หมดอายุ</option>
														</select>
													</form>
												</div>
											</td>
											<td className="px-6 py-6">
												<div className="text-sm">
													{promo.start_date && (
														<div className="text-gray-900 dark:text-white">
															เริ่ม:{" "}
															{format(
																new Date(promo.start_date),
																"dd MMM yyyy"
															)}
														</div>
													)}
													{promo.end_date && (
														<div className="text-gray-500 dark:text-gray-400">
															สิ้นสุด:{" "}
															{format(new Date(promo.end_date), "dd MMM yyyy")}
														</div>
													)}
													{!promo.start_date && !promo.end_date && (
														<span className="text-gray-400">ไม่ระบุ</span>
													)}
												</div>
											</td>
											<td className="px-6 py-6">
												<div className="text-lg font-bold text-orange-600">
													{promo.discount ? `${promo.discount}%` : "ไม่ระบุ"}
												</div>
											</td>
											<td className="px-6 py-6">
												<div className="flex items-center justify-end space-x-3">
													<Link
														href={`/admin-q9k8v3n1-metro/promotions/${promo.id}/edit`}
														className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-900/50 rounded-lg transition-colors"
													>
														<Edit3 className="h-4 w-4" />
														แก้ไข
													</Link>
													<form
														action={handleDeletePromotion}
														className="inline"
													>
														<input type="hidden" name="id" value={promo.id} />
														<button
															type="submit"
															onClick={(e) => {
																if (
																	!confirm(
																		`ต้องการลบโปรโมชั่น "${promo.title}" หรือไม่?`
																	)
																) {
																	e.preventDefault();
																}
															}}
															className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg transition-colors"
														>
															<Trash2 className="h-4 w-4" />
															ลบ
														</button>
													</form>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				) : (
					<div className="text-center py-16">
						<Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							ยังไม่มีโปรโมชั่นในระบบ
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mb-6">
							เริ่มต้นสร้างโปรโมชั่นแรกของคุณเลยตอนนี้
						</p>
						<Link
							href="/admin-q9k8v3n1-metro/promotions/create"
							className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
						>
							<Plus className="h-5 w-5" />
							เพิ่มโปรโมชั่นใหม่
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default PromotionsPage;
