import Link from "next/link";
import { Shield, Home, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
			<div className="max-w-md w-full space-y-8 p-8">
				<div className="text-center">
					<div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30">
						<Shield className="h-10 w-10 text-red-600 dark:text-red-400" />
					</div>
					<h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
						ไม่มีสิทธิ์เข้าถึง
					</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						คุณไม่มีสิทธิ์เข้าถึงระบบจัดการ Admin Panel
					</p>
					<p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
						กรุณาติดต่อผู้ดูแลระบบเพื่อขอสิทธิ์การเข้าถึง
					</p>
				</div>

				<div className="space-y-4">
					<Link
						href="/"
						className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
					>
						<Home className="h-4 w-4 mr-2" />
						กลับไปหน้าหลัก
					</Link>

					<form
						action="/admin-q9k8v3n1-metro/auth/signout"
						method="post"
						className="w-full"
					>
						<button
							type="submit"
							className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
						>
							<LogOut className="h-4 w-4 mr-2" />
							ออกจากระบบ
						</button>
					</form>
				</div>

				<div className="text-center">
					<p className="text-xs text-gray-500 dark:text-gray-400">
						หากคุณคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อ IT Support
					</p>
				</div>
			</div>
		</div>
	);
}
