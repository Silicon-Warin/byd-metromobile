import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import TestDriveButton from "../TestDriveButton";
import { HeroBanner } from "@/components/Homepage/HeroBanner";

export default function HeroSection() {
	return (
		<section className="relative w-full overflow-hidden min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
			{/* ---------- Desktop (md+) ---------- */}
			<div className="hidden md:block">
				<div className="container mx-auto px-4 py-20 relative z-10">
					<div className="max-w-7xl mx-auto">
						{/* Top Content */}
						<div className="text-center space-y-8 pt-8 pb-4">
							{/* Main Heading */}
							<div className="space-y-6 hero-entrance">
								<h1 className="text-4xl lg:text-5xl font-bold leading-tight">
									<span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
										BYD
									</span>
									<span className="mx-2" />{" "}
									{/* เพิ่มเว้นวรรคระหว่าง BYD กับ Metromobile ค่ะ */}
									<span className="bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
										Metromobile
									</span>
								</h1>

								<p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
									ขับเคลื่อนอนาคตกับรถยนต์ไฟฟ้า BYD ที่ล้ำสมัย
									พร้อมบริการทดลองขับ โปรโมชั่นพิเศษ
									และศูนย์บริการมาตรฐานทั่วกรุงเทพ
								</p>
							</div>

							{/* CTA Buttons */}
							<div className="flex flex-col sm:flex-row gap-6 pt-8 justify-center fadeIn stagger-2">
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
									<span className="flex items-center">จองทดลองขับ</span>
								</TestDriveButton>
							</div>
						</div>

						{/* Banner */}
						<div className="relative px-8 lg:px-16">
							<div className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm">
								<HeroBanner />
							</div>
						</div>
					</div>
				</div>
				{/* Fade to next section */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 z-20"></div>
			</div>

			{/* ---------- Mobile (< md) ---------- */}
			<div className="md:hidden relative w-full h-screen flex flex-col justify-end overflow-hidden">
				<HeroBanner />

				{/* ส่วนเนื้อหา Hero สำหรับ Mobile ปรับเป็นภาษาไทยและใช้ gradient เหมือน Desktop ค่ะ */}
				<div className="relative z-20 px-4 pb-16 mb-16">
					{/* Top Label */}
					<div className="text-[0.7rem] font-semibold uppercase tracking-widest text-white border-l-2 border-blue-500 pl-2.5 leading-4 mb-3 fadeIn stagger-1">
						Official dealer of BYD Thailand
					</div>

					{/* Heading */}
					<h1 className="text-[2.2rem] font-bold leading-tight mb-4 hero-entrance">
						<span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
							BYD
						</span>
						<span className="bg-gradient-to-r from-blue-500 to-cyan-300 bg-clip-text text-transparent">
							Metromobile
						</span>
					</h1>

					<p className="text-white font-medium mb-6 leading-relaxed fadeIn stagger-2">
						ขับเคลื่อนอนาคตกับรถยนต์ไฟฟ้า BYD ที่ล้ำสมัย พร้อมบริการทดลองขับ
						โปรโมชั่นพิเศษ
					</p>

					{/* CTA */}
					<div className="flex flex-col gap-3 fadeIn stagger-3">
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
				{/* Fade to next section - Reduced height (h-16) */}
				<div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-gray-900 z-20"></div>
			</div>
		</section>
	);
}
