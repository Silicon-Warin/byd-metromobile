import { Clock, Wrench, Phone } from "lucide-react";

export default function ServiceInfoCards() {
	return (
		<div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 sm:p-6 lg:p-8 shadow-2xl">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
				{/* Operating Hours */}
				<div className="flex items-start space-x-3 sm:space-x-4">
					<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
						<Clock className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
					</div>
					<div>
						<h4 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">
							เวลาทำการ
						</h4>
						<p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
							จันทร์ - อาทิตย์
							<br />
							08:30 - 17:30 น.
						</p>
					</div>
				</div>
				{/* Services */}
				<div className="flex items-start space-x-3 sm:space-x-4">
					<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
						<Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
					</div>
					<div>
						<h4 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">
							บริการ
						</h4>
						<p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
							ทดลองขับ • คำปรึกษา
							<br />
							บริการหลังการขาย
						</p>
					</div>
				</div>
				{/* Contact */}
				<div className="flex items-start space-x-3 sm:space-x-4 sm:col-span-2 lg:col-span-1">
					<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center">
						<Phone className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
					</div>
					<div>
						<h4 className="font-bold text-white text-sm sm:text-base mb-1 sm:mb-2">
							ติดต่อ
						</h4>
						<p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
							02-291-8889
							<br />5 สาขาทั่วกรุงเทพฯ
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
