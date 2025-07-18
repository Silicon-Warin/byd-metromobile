import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
	Car,
	Tag,
	FileImage,
	BarChart3,
	Users,
	Plus,
	TrendingUp,
	Activity,
	Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
	// Check authentication
	const supabase = await createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	if (!user || error) {
		redirect("/admin-q9k8v3n1-metro/login");
	}

	// Get basic stats (you can expand this later with real data)
	const stats = [
		{
			title: "รุ่นรถยนต์",
			value: "6",
			icon: Car,
			color: "text-blue-600",
			bgColor: "bg-blue-50 dark:bg-blue-900/20",
			href: "/admin-q9k8v3n1-metro/models",
		},
		{
			title: "โปรโมชั่น",
			value: "3",
			icon: Tag,
			color: "text-green-600",
			bgColor: "bg-green-50 dark:bg-green-900/20",
			href: "/admin-q9k8v3n1-metro/promotions",
		},
		{
			title: "ไฟล์และสื่อ",
			value: "24",
			icon: FileImage,
			color: "text-purple-600",
			bgColor: "bg-purple-50 dark:bg-purple-900/20",
			href: "/admin-q9k8v3n1-metro/files",
		},
		{
			title: "Page Views",
			value: "1,234",
			icon: Activity,
			color: "text-orange-600",
			bgColor: "bg-orange-50 dark:bg-orange-900/20",
			href: "/admin-q9k8v3n1-metro/analytics",
		},
	];

	const quickActions = [
		{
			title: "เพิ่มรุ่นรถใหม่",
			description: "เพิ่มรุ่นรถยนต์ใหม่ในระบบ",
			icon: Car,
			href: "/admin-q9k8v3n1-metro/models/create",
			color: "bg-blue-600 hover:bg-blue-700",
		},
		{
			title: "สร้างโปรโมชั่น",
			description: "สร้างโปรโมชั่นใหม่",
			icon: Tag,
			href: "/admin-q9k8v3n1-metro/promotions/create",
			color: "bg-green-600 hover:bg-green-700",
		},
		{
			title: "อัปโหลดไฟล์",
			description: "จัดการไฟล์และสื่อ",
			icon: FileImage,
			href: "/admin-q9k8v3n1-metro/files",
			color: "bg-purple-600 hover:bg-purple-700",
		},
	];

	const recentActivity = [
		{
			action: "สร้างโปรโมชั่นใหม่",
			item: "Superman Campaign 2024",
			time: "2 ชั่วโมงที่แล้ว",
			type: "create",
		},
		{
			action: "แก้ไขรุ่นรถ",
			item: "BYD SEAL",
			time: "5 ชั่วโมงที่แล้ว",
			type: "update",
		},
		{
			action: "อัปโหลดไฟล์",
			item: "model-gallery.jpg",
			time: "1 วันที่แล้ว",
			type: "upload",
		},
	];

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white">
						ยินดีต้อนรับ, {user.email?.split("@")[0]}!
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						ระบบจัดการเนื้อหา BYD Metromobile
					</p>
				</div>
				<div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
					<Clock className="h-4 w-4" />
					เข้าสู่ระบบล่าสุด: {new Date().toLocaleDateString("th-TH")}
				</div>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{stats.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<Link
							key={index}
							href={stat.href}
							className="block transition-transform hover:scale-105"
						>
							<Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
												{stat.title}
											</p>
											<p className={`text-2xl font-bold ${stat.color}`}>
												{stat.value}
											</p>
										</div>
										<div className={`p-3 rounded-lg ${stat.bgColor}`}>
											<Icon className={`h-6 w-6 ${stat.color}`} />
										</div>
									</div>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<Card className="bg-white/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Plus className="h-5 w-5 text-blue-600" />
							การดำเนินการด่วน
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{quickActions.map((action, index) => {
							const Icon = action.icon;
							return (
								<Link
									key={index}
									href={action.href}
									className={`flex items-center gap-4 p-4 rounded-lg text-white transition-colors ${action.color}`}
								>
									<Icon className="h-6 w-6" />
									<div>
										<h3 className="font-semibold">{action.title}</h3>
										<p className="text-sm opacity-90">{action.description}</p>
									</div>
								</Link>
							);
						})}
					</CardContent>
				</Card>

				{/* Recent Activity */}
				<Card className="bg-white/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Activity className="h-5 w-5 text-green-600" />
							กิจกรรมล่าสุด
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{recentActivity.map((activity, index) => (
							<div
								key={index}
								className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
							>
								<div
									className={`w-3 h-3 rounded-full ${
										activity.type === "create"
											? "bg-green-500"
											: activity.type === "update"
											? "bg-blue-500"
											: "bg-purple-500"
									}`}
								/>
								<div className="flex-1">
									<p className="text-sm font-medium text-gray-900 dark:text-white">
										{activity.action}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										{activity.item}
									</p>
								</div>
								<p className="text-xs text-gray-500">{activity.time}</p>
							</div>
						))}
					</CardContent>
				</Card>
			</div>

			{/* System Status */}
			<Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
				<CardContent className="p-6">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								สถานะระบบ
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								ระบบทำงานปกติ - อัปเดตล่าสุด:{" "}
								{new Date().toLocaleString("th-TH")}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
							<span className="text-sm font-medium text-green-600 dark:text-green-400">
								ออนไลน์
							</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Footer Info */}
			<div className="text-center text-gray-500 dark:text-gray-400 text-sm">
				<p>BYD Metromobile Admin Panel v1.0</p>
				<p>สำหรับปัญหาการใช้งาน โปรดติดต่อทีม IT</p>
			</div>
		</div>
	);
}
