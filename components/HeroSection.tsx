import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import TestDriveButton from "./TestDriveButton";
import { HeroBanner } from "@/components/HeroBanner";

export default function HeroSection() {
	return (
		<section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
			{/* ---------- Desktop (md+) ---------- */}
			<div className="hidden md:block">
				<div className="container mx-auto px-4 py-20 relative z-10">
					<div className="max-w-7xl mx-auto">
						{/* Top Content */}
						<div className="text-center space-y-8 pt-8 pb-4">
							{/* Main Heading */}
							<div className="space-y-6">
								<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
									<span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
										BYD
									</span>{" "}
									<span className="bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
										Metromobile
									</span>
								</h1>

								<p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
									ขับเคลื่อนอนาคตกับรถยนต์ไฟฟ้า BYD ที่ล้ำสมัย
									พร้อมบริการทดลองขับ โปรโมชั่นพิเศษ
									และศูนย์บริการมาตรฐานทั่วไทย
								</p>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center">
								<Button
									size="lg"
									className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500 transition-all duration-300 group px-8 py-6 text-lg"
								>
									<Play className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
									ดูโปรโมชั่น
								</Button>

								<TestDriveButton
									size="lg"
									className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-8 py-6 text-lg"
								>
									<span className="flex items-center">
										จองทดลองขับ
										<Calendar className="ml-3 h-6 w-6" />
									</span>
								</TestDriveButton>
							</div>
						</div>

						{/* Banner */}
						<div className="relative px-8 lg:px-16">
							<div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm transform transition-transform duration-700 ease-out">
								<Suspense
									fallback={
										<div className="w-full h-full bg-slate-800 animate-pulse rounded-3xl" />
									}
								>
									<HeroBanner />
								</Suspense>
							</div>

							{/* Floating glow effects */}
							<div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
							<div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
							<div className="absolute top-1/2 -right-12 w-24 h-24 bg-cyan-500/15 rounded-full blur-xl animate-pulse delay-2000" />
						</div>
					</div>
				</div>
			</div>

			{/* ---------- Mobile (< md) ---------- */}
			<div className="md:hidden relative w-full h-screen flex flex-col justify-end overflow-hidden">
				<HeroBanner />
				{/* ส่วนเนื้อหา Hero สำหรับ Mobile ปรับเป็นภาษาไทยและใช้ gradient เหมือน Desktop ค่ะ */}
				<div className="relative z-20 px-4 pb-16 mb-16 ">
					{/* Top Label */}
					<div className="text-[0.7rem] font-semibold uppercase tracking-widest text-white border-l-2 border-blue-500 pl-2.5 leading-4 mb-3">
						Official dealer of BYD Thailand
					</div>

					{/* Heading */}
					<h1 className="text-[2.2rem] font-bold leading-tight mb-4">
						<span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
							BYD
						</span>{" "}
						<span className="bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
							Metromobile
						</span>
					</h1>

					<p className="text-white font-medium mb-6 leading-relaxed">
						ขับเคลื่อนอนาคตกับรถยนต์ไฟฟ้า BYD ที่ล้ำสมัย พร้อมบริการทดลองขับ
						โปรโมชั่นพิเศษ
					</p>

					{/* CTA */}
					<div className="flex flex-col gap-3">
						<Button
							size="lg"
							className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-slate-500 transition-all duration-300 group px-6 py-4 text-base"
						>
							<Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
							ดูโปรโมชั่น
						</Button>

						<TestDriveButton
							size="lg"
							className="bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 transition-all duration-300 px-6 py-4 text-base"
						>
							<span className="flex items-center">
								จองทดลองขับ
								<Calendar className="ml-2 h-5 w-5" />
							</span>
						</TestDriveButton>
					</div>
				</div>
			</div>
		</section>
	);
}
