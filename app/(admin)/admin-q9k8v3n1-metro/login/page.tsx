"use client";

import { login } from "../../../actions/actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Car, LogIn, Mail, Lock, AlertCircle, CheckCircle } from "lucide-react";

function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
	const message = searchParams.get("message");

	async function handleSubmit(formData: FormData) {
		setIsLoading(true);
		try {
			await login(formData);
		} catch (error) {
			console.error("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	}

	const getMessageStyle = (message: string) => {
		if (message.includes("success") || message.includes("signed out")) {
			return "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300";
		}
		return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300";
	};

	const getMessageIcon = (message: string) => {
		if (message.includes("success") || message.includes("signed out")) {
			return <CheckCircle className="h-4 w-4" />;
		}
		return <AlertCircle className="h-4 w-4" />;
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
			<div className="w-full max-w-md">
				{/* Background Card */}
				<div className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-8">
					{/* Header */}
					<div className="text-center mb-8">
						<div className="flex justify-center mb-4">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
								<Car className="h-8 w-8 text-white" />
							</div>
						</div>
						<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
							BYD Metro Admin
						</h1>
						<p className="text-gray-600 dark:text-gray-400">
							เข้าสู่ระบบจัดการข้อมูล
						</p>
					</div>

					{/* Message Alert */}
					{message && (
						<div
							className={`mb-6 p-4 rounded-lg border flex items-center gap-3 ${getMessageStyle(
								message
							)}`}
						>
							{getMessageIcon(message)}
							<p className="text-sm font-medium">{message}</p>
						</div>
					)}

					{/* Login Form */}
					<form action={handleSubmit} className="space-y-6">
						{/* Email Field */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								อีเมล
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									id="email"
									name="email"
									type="email"
									required
									disabled={isLoading}
									className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									placeholder="กรอกอีเมลของคุณ"
								/>
							</div>
						</div>

						{/* Password Field */}
						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
							>
								รหัสผ่าน
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
								<input
									id="password"
									name="password"
									type="password"
									required
									disabled={isLoading}
									className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
									placeholder="กรอกรหัสผ่านของคุณ"
								/>
							</div>
						</div>

						{/* Submit Button */}
						<button
							type="submit"
							disabled={isLoading}
							className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200 transform hover:scale-[1.02] disabled:hover:scale-100"
						>
							{isLoading ? (
								<>
									<div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
									กำลังเข้าสู่ระบบ...
								</>
							) : (
								<>
									<LogIn className="h-5 w-5" />
									เข้าสู่ระบบ
								</>
							)}
						</button>
					</form>

					{/* Footer */}
					<div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
						<p className="text-center text-sm text-gray-500 dark:text-gray-400">
							© 2024 BYD Metromobile Thailand
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<div className="flex items-center justify-center min-h-screen">
					<div className="text-center">
						<div className="h-8 w-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
						<p className="text-gray-600">กำลังโหลด...</p>
					</div>
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
}
