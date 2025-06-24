"use client";
import Image from "next/image";
import BranchMapButton from "@/components/BranchMapButton";
import LineOALinkButton from "../Line/line-button";

export default function ShowroomSectionMobile() {
	return (
		<section className="relative h-screen w-full overflow-hidden seamless-transition">
			<div className="top-shadow-showroom z-10 "></div>

			{/* Static Background Image for Mobile */}
			<div className="absolute inset-0">
				<Image
					src="/images/showroom/byd-showroom-mobile-1.webp"
					alt="โชว์รูม BYD Metromobile"
					fill
					className="object-cover w-full h-full"
					sizes="100vw"
					priority
					quality={90}
				/>
			</div>

			{/* Seamless gradient overlay that blends with models section */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-gray-900/50 to-gray-800/30 z-20" />

			{/* Additional blending overlay */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 z-20" />

			{/* Content Section */}
			<div className="relative w-full h-full flex items-center justify-center z-30">
				<div className="max-w-sm mx-auto h-[60%] flex flex-col justify-between text-center px-4">
					{/* Main Heading */}
					<div className="hero-entrance">
						<h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
							เยี่ยมชมโชว์รูม
							<br />
							<span className="text-gradient-metro-pulse bg-clip-text text-transparent">
								Metromobile
							</span>
						</h1>

						<p className="text-base text-gray-200 leading-relaxed">
							"สัมผัส BYD ทุกรุ่น พร้อมโชว์รูมที่ทันสมัย"
						</p>
					</div>

					{/* Showroom Stats */}
					<div className="flex items-center justify-center gap-6 fadeIn stagger-1">
						<div className="text-center">
							<div className="text-2xl font-bold text-white mb-1">5</div>
							<div className="text-gray-300 text-xs">สาขา</div>
						</div>
						<div className="text-center">
							<div className="text-lg font-bold text-white mb-1">
								8:00-17:30
							</div>
							<div className="text-gray-300 text-xs">เวลาทำการ</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-white mb-1">100%</div>
							<div className="text-gray-300 text-xs">บริการครบครัน</div>
						</div>
					</div>

					{/* CTA Buttons - ใช้ Style เดิมของเรา */}
					<div className="flex flex-col gap-3 fadeIn stagger-2">
						<BranchMapButton className="hover-lift" />
						<LineOALinkButton className="text-white hover-lift">
							นัดหมายเข้าชม
						</LineOALinkButton>
					</div>
				</div>
			</div>

			{/* Fade to next section */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
		</section>
	);
}
