"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
	BarChart3,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	Eye,
	Users,
	Globe,
	Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Analytics404 } from "@/lib/analytics404";

interface Error404Stats {
	total: number;
	recent: any[];
	mostCommon: { path: string; count: number }[];
}

export default function AnalyticsPage() {
	const [error404Stats, setError404Stats] = useState<Error404Stats>({
		total: 0,
		recent: [],
		mostCommon: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const analytics = Analytics404.getInstance();
		const stats = analytics.getStats();
		setError404Stats({
			total: stats.total || 0,
			recent: stats.recent || [],
			mostCommon: stats.mostCommon || [],
		});
		setLoading(false);
	}, []);

	const clearErrorData = () => {
		if (confirm("ต้องการล้างข้อมูล 404 errors ทั้งหมดหรือไม่?")) {
			const analytics = Analytics404.getInstance();
			analytics.clear404Data();
			setError404Stats({ total: 0, recent: [], mostCommon: [] });
		}
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

	const statsCards = [
		{
			title: "404 Errors ทั้งหมด",
			value: error404Stats.total,
			icon: AlertTriangle,
			color: "text-red-600",
			bgColor: "bg-red-50 dark:bg-red-900/20",
		},
		{
			title: "Errors วันนี้",
			value: error404Stats.recent.filter((error) => {
				const today = new Date().toDateString();
				return new Date(error.timestamp).toDateString() === today;
			}).length,
			icon: TrendingUp,
			color: "text-orange-600",
			bgColor: "bg-orange-50 dark:bg-orange-900/20",
		},
		{
			title: "Page ที่มี Error มากสุด",
			value: error404Stats.mostCommon[0]?.count || 0,
			subtitle: error404Stats.mostCommon[0]?.path || "ไม่มีข้อมูล",
			icon: TrendingDown,
			color: "text-purple-600",
			bgColor: "bg-purple-50 dark:bg-purple-900/20",
		},
		{
			title: "ข้อมูลล่าสุด",
			value: error404Stats.recent.length > 0 ? "เมื่อสักครู่" : "ไม่มีข้อมูล",
			subtitle: error404Stats.recent[0]
				? formatDate(error404Stats.recent[0].timestamp)
				: "",
			icon: Clock,
			color: "text-blue-600",
			bgColor: "bg-blue-50 dark:bg-blue-900/20",
		},
	];

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="h-8 w-8 border-2 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
					<p className="text-slate-600">กำลังโหลดข้อมูล Analytics...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<div>
					<h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
						<BarChart3 className="h-8 w-8 text-purple-600" />
						Analytics Dashboard
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mt-2">
						ตรวจสอบสถิติการใช้งานและ 404 errors ของเว็บไซต์
					</p>
				</div>
				<button
					onClick={clearErrorData}
					className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
				>
					ล้างข้อมูล 404
				</button>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{statsCards.map((stat, index) => {
					const Icon = stat.icon;
					return (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
						>
							<Card className="bg-white/80 backdrop-blur-sm">
								<CardContent className="p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-gray-600 dark:text-gray-400">
												{stat.title}
											</p>
											<p className={`text-2xl font-bold ${stat.color}`}>
												{stat.value}
											</p>
											{stat.subtitle && (
												<p className="text-xs text-gray-500 mt-1 truncate max-w-[150px]">
													{stat.subtitle}
												</p>
											)}
										</div>
										<div className={`p-3 rounded-lg ${stat.bgColor}`}>
											<Icon className={`h-6 w-6 ${stat.color}`} />
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					);
				})}
			</div>

			{/* Most Common 404 Errors */}
			<Card className="bg-white/80 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<AlertTriangle className="h-5 w-5 text-red-600" />
						404 Errors ที่เกิดขึ้นบ่อยที่สุด
					</CardTitle>
				</CardHeader>
				<CardContent>
					{error404Stats.mostCommon.length > 0 ? (
						<div className="space-y-3">
							{error404Stats.mostCommon.map((error, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
								>
									<div>
										<p className="font-mono text-sm text-gray-900 dark:text-white">
											{error.path}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
											{error.count} ครั้ง
										</span>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-500">ไม่มีข้อมูล 404 errors</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Recent 404 Errors */}
			<Card className="bg-white/80 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="h-5 w-5 text-blue-600" />
						404 Errors ล่าสุด
					</CardTitle>
				</CardHeader>
				<CardContent>
					{error404Stats.recent.length > 0 ? (
						<div className="space-y-3">
							{error404Stats.recent.map((error, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
								>
									<div className="flex-1">
										<p className="font-mono text-sm text-gray-900 dark:text-white">
											{error.path}
										</p>
										<p className="text-xs text-gray-500 mt-1">
											Referrer: {error.referrer || "Direct"}
										</p>
									</div>
									<div className="text-right">
										<p className="text-sm text-gray-600">
											{formatDate(error.timestamp)}
										</p>
										{error.suggestedUrl && (
											<p className="text-xs text-green-600">
												Redirected: {error.suggestedUrl}
											</p>
										)}
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8">
							<Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
							<p className="text-gray-500">ไม่มีข้อมูล 404 errors ล่าสุด</p>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Quick Actions */}
			<Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
				<CardContent className="p-6">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
						เครื่องมือ Analytics
					</h3>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
							<Globe className="h-6 w-6 text-blue-600 mb-2" />
							<p className="font-medium text-gray-900 dark:text-white">
								Google Analytics
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								ดูสถิติเว็บไซต์
							</p>
						</button>
						<button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
							<Users className="h-6 w-6 text-green-600 mb-2" />
							<p className="font-medium text-gray-900 dark:text-white">
								User Behavior
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								วิเคราะห์พฤติกรรม
							</p>
						</button>
						<button className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow text-left">
							<Eye className="h-6 w-6 text-purple-600 mb-2" />
							<p className="font-medium text-gray-900 dark:text-white">
								Page Views
							</p>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								สถิติการเข้าชม
							</p>
						</button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
