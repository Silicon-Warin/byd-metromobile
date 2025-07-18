import { createClient } from "@/lib/supabase/server";
import { format } from "date-fns";
import { handleDeleteModel } from "@/actions/models";
import Link from "next/link";
import {
	Trash2,
	Edit3,
	Plus,
	Search,
	Car,
	Calendar,
	DollarSign,
} from "lucide-react";

type CarModel = {
	id: string;
	name: string;
	slug: string;
	price: number | null;
	updated_at: string;
	image_urls?: string[];
	description?: string;
};

async function ModelsPage() {
	const supabase = await createClient();
	// Explicitly tell Supabase the expected return type
	const { data: models, error } = await supabase
		.from("car_models")
		.select("id, name, slug, price, updated_at, image_urls, description")
		.order("updated_at", { ascending: false })
		.returns<CarModel[]>();

	if (error) {
		console.error("Error fetching car models:", error);
		// TODO: Create a proper error component
		return (
			<div className="flex items-center justify-center min-h-[400px]">
				<div className="text-center">
					<Car className="h-12 w-12 text-red-500 mx-auto mb-4" />
					<h3 className="text-lg font-semibold text-red-600 mb-2">
						เกิดข้อผิดพลาด
					</h3>
					<p className="text-red-500">
						ไม่สามารถโหลดข้อมูลรถยนต์ได้ กรุณาลองใหม่อีกครั้ง
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			{/* Header Section */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
						<Car className="h-8 w-8 text-blue-600" />
						จัดการรุ่นรถยนต์
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						เพิ่ม แก้ไข และจัดการข้อมูลรุ่นรถยนต์ BYD ทั้งหมด
					</p>
				</div>
				<Link
					href="/admin-q9k8v3n1-metro/models/create"
					className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg hover:shadow-xl"
				>
					<Plus className="h-5 w-5" />
					เพิ่มรุ่นรถใหม่
				</Link>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								รุ่นรถทั้งหมด
							</p>
							<p className="text-3xl font-bold text-blue-600">
								{models?.length || 0}
							</p>
						</div>
						<Car className="h-8 w-8 text-blue-600" />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								ราคาเฉลี่ย
							</p>
							<p className="text-3xl font-bold text-green-600">
								฿
								{models && models.length > 0
									? Math.round(
											models
												.filter((m) => m.price)
												.reduce((acc, m) => acc + (m.price || 0), 0) /
												models.filter((m) => m.price).length
									  ).toLocaleString()
									: 0}
							</p>
						</div>
						<DollarSign className="h-8 w-8 text-green-600" />
					</div>
				</div>
				<div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
								อัพเดทล่าสุด
							</p>
							<p className="text-sm font-semibold text-purple-600">
								{models && models.length > 0
									? format(new Date(models[0].updated_at), "dd MMM yyyy")
									: "ไม่มีข้อมูล"}
							</p>
						</div>
						<Calendar className="h-8 w-8 text-purple-600" />
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
							placeholder="ค้นหารุ่นรถ..."
							className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						/>
					</div>
					<select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
						<option value="">ทุกประเภท</option>
						<option value="suv">SUV</option>
						<option value="sedan">Sedan</option>
						<option value="hatchback">Hatchback</option>
						<option value="mpv">MPV</option>
					</select>
				</div>
			</div>

			{/* Models Table */}
			<div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
				{models && models.length > 0 ? (
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										รุ่นรถ
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										ราคา
									</th>
									<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										อัพเดทล่าสุด
									</th>
									<th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
										การจัดการ
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								{models.map((model) => (
									<tr
										key={model.id}
										className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
									>
										<td className="px-6 py-6">
											<div className="flex items-center space-x-4">
												{model.image_urls && model.image_urls[0] && (
													<img
														src={model.image_urls[0]}
														alt={model.name}
														className="h-12 w-12 rounded-lg object-cover bg-gray-100"
													/>
												)}
												<div>
													<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
														{model.name}
													</h3>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														{model.slug}
													</p>
													{model.description && (
														<p className="text-xs text-gray-400 dark:text-gray-500 mt-1 max-w-xs truncate">
															{model.description}
														</p>
													)}
												</div>
											</div>
										</td>
										<td className="px-6 py-6">
											<div className="text-lg font-bold text-green-600">
												{model.price
													? `฿${model.price.toLocaleString()}`
													: "ไม่ระบุราคา"}
											</div>
										</td>
										<td className="px-6 py-6">
											<div className="text-sm text-gray-900 dark:text-white">
												{format(new Date(model.updated_at), "dd MMM yyyy")}
											</div>
											<div className="text-xs text-gray-500 dark:text-gray-400">
												{format(new Date(model.updated_at), "HH:mm น.")}
											</div>
										</td>
										<td className="px-6 py-6">
											<div className="flex items-center justify-end space-x-3">
												<Link
													href={`/admin-q9k8v3n1-metro/models/${model.id}/edit`}
													className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
												>
													<Edit3 className="h-4 w-4" />
													แก้ไข
												</Link>
												<form action={handleDeleteModel} className="inline">
													<input type="hidden" name="id" value={model.id} />
													<button
														type="submit"
														onClick={(e) => {
															if (
																!confirm(
																	`ต้องการลบรุ่นรถ "${model.name}" หรือไม่?`
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
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div className="text-center py-16">
						<Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							ยังไม่มีรุ่นรถในระบบ
						</h3>
						<p className="text-gray-500 dark:text-gray-400 mb-6">
							เริ่มต้นสร้างรุ่นรถคันแรกของคุณเลยตอนนี้
						</p>
						<Link
							href="/admin-q9k8v3n1-metro/models/create"
							className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
						>
							<Plus className="h-5 w-5" />
							เพิ่มรุ่นรถใหม่
						</Link>
					</div>
				)}
			</div>
		</div>
	);
}

export default ModelsPage;
