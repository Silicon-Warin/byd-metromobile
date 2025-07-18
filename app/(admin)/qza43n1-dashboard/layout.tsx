import { createClient } from "@/lib/supabase/server";
import { ReactNode } from "react";
import Link from "next/link";
import {
	Car,
	Tag,
	FileImage,
	BarChart3,
	Settings,
	LogOut,
	Home,
} from "lucide-react";

// Modern Sidebar Component
const Sidebar = ({ userEmail }: { userEmail?: string }) => (
	<div className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
		{/* Header */}
		<div className="p-6 border-b border-gray-200 dark:border-gray-700">
			<div className="flex items-center gap-3">
				<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
					<Car className="h-6 w-6 text-white" />
				</div>
				<div>
					<h2 className="text-lg font-bold text-gray-900 dark:text-white">
						BYD Metro
					</h2>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Admin Panel
					</p>
				</div>
			</div>
		</div>

		{/* Navigation */}
		<nav className="flex-1 p-4 space-y-2">
			<Link
				href="/admin-q9k8v3n1-metro"
				className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<Home className="h-5 w-5" />
				Dashboard
			</Link>
			<Link
				href="/admin-q9k8v3n1-metro/models"
				className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<Car className="h-5 w-5" />
				รุ่นรถยนต์
			</Link>
			<Link
				href="/admin-q9k8v3n1-metro/promotions"
				className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<Tag className="h-5 w-5" />
				โปรโมชั่น
			</Link>
			<Link
				href="/admin-q9k8v3n1-metro/files"
				className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<FileImage className="h-5 w-5" />
				จัดการไฟล์
			</Link>
			<Link
				href="/admin-q9k8v3n1-metro/analytics"
				className="flex items-center gap-3 px-3 py-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			>
				<BarChart3 className="h-5 w-5" />
				Analytics
			</Link>
		</nav>

		{/* User Info & Logout */}
		<div className="p-4 border-t border-gray-200 dark:border-gray-700">
			{userEmail && (
				<div className="mb-3 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						เข้าสู่ระบบในนาม:
					</p>
					<p className="text-sm font-medium text-gray-900 dark:text-white truncate">
						{userEmail}
					</p>
				</div>
			)}
			<form action="/admin-q9k8v3n1-metro/auth/signout" method="post">
				<button
					type="submit"
					className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
				>
					<LogOut className="h-5 w-5" />
					ออกจากระบบ
				</button>
			</form>
		</div>
	</div>
);

// Header Component
const Header = () => (
	<header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
		<div className="flex items-center gap-4">
			<h1 className="text-xl font-semibold text-gray-900 dark:text-white">
				Admin Dashboard
			</h1>
		</div>
		<div className="flex items-center gap-4">
			<Link
				href="/"
				target="_blank"
				rel="noopener noreferrer"
				className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
			>
				ดูเว็บไซต์หลัก
			</Link>
		</div>
	</header>
);

export default async function AdminLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Note: Authentication is now handled in middleware
	// This layout only gets rendered for authenticated users
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="flex h-screen bg-gray-50 dark:bg-gray-900">
			<Sidebar userEmail={user?.email} />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 overflow-auto">
					<div className="container mx-auto p-6 max-w-7xl">{children}</div>
				</main>
			</div>
		</div>
	);
}
