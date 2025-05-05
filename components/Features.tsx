import { Clock, Shield, Zap, Gem } from "lucide-react";

const features = [
	{
		name: "เทคโนโลยีล้ำสมัย",
		description:
			"นวัตกรรมแบตเตอรี่และระบบขับเคลื่อนที่ทันสมัย ให้ประสิทธิภาพสูงสุดและเป็นมิตรกับสิ่งแวดล้อม",
		icon: Zap,
	},
	{
		name: "การรับประกันคุณภาพ",
		description:
			"รับประกันคุณภาพสูงสุดพร้อมบริการฉุกเฉิน 24 ชั่วโมง เพื่อความมั่นใจในทุกการเดินทาง",
		icon: Shield,
	},
	{
		name: "บริการหลังการขาย",
		description:
			"ทีมงานมืออาชีพพร้อมให้บริการหลังการขายที่รวดเร็วและมีประสิทธิภาพ ตลอดอายุการใช้งานรถยนต์",
		icon: Clock,
	},
	{
		name: "โปรโมชั่นพิเศษ",
		description:
			"รับข้อเสนอสุดพิเศษมากมาย ทั้งดอกเบี้ยพิเศษ แพ็คเกจประกันภัย และของแถมมูลค่าสูง พร้อมสิทธิพิเศษเฉพาะลูกค้า BYD Metromobile",
		icon: Gem,
	},
];

export default function Features() {
	return (
		<section className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-full space-y-16 py-24 md:py-32  border-t border-gray-700">
			<div className="mx-auto max-w-2xl lg:text-center">
				<h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient">
					BYD Metromobile
				</h2>
				<p className="mt-2 text-2xl font-semibold tracking-tight text-pretty text-gray-500 sm:text-5xl lg:text-balance">
					เราให้บริการที่ดีที่สุดสำหรับคุณ
				</p>
			</div>
			<div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
				{features.map((feature) => (
					<div
						key={feature.name}
						className="relative overflow-hidden rounded-lg border bg-background p-8"
					>
						<div className="flex items-center gap-4">
							<feature.icon className="h-8 w-8" />
							<h3 className="font-bold">{feature.name}</h3>
						</div>
						<p className="mt-2 text-muted-foreground">{feature.description}</p>
					</div>
				))}
			</div>
		</section>
	);
}
