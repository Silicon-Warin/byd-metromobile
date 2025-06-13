import { Battery, Shield, Zap, Award } from "lucide-react";

const features = [
	{
		icon: Battery,
		title: "แบตเตอรี่ Blade",
		description: "เทคโนโลยีแบตเตอรี่ขั้นสูงที่ปลอดภัยและทนทาน",
	},
	{
		icon: Shield,
		title: "ความปลอดภัยสูง",
		description: "ระบบความปลอดภัยครบครันตามมาตรฐานสากล",
	},
	{
		icon: Zap,
		title: "ชาร์จเร็ว",
		description: "ชาร์จได้เร็วและใช้งานได้ไกลในการเดินทาง",
	},
	{
		icon: Award,
		title: "รับประกันยาวนาน",
		description: "รับประกันแบตเตอรี่นาน 8 ปี หรือ 160,000 กิโลเมตร",
	},
];

export default function Features() {
	return (
		<section className="section-spacing">
			<div className="page-container">
				<div className="text-center mb-12 animate-on-scroll">
					<h2 className="text-3xl md:text-4xl font-bold mb-4">
						จุดเด่นของ BYD
					</h2>
					<p className="text-muted-foreground max-w-2xl mx-auto">
						สัมผัสเทคโนโลยีที่ล้ำสมัยและคุณภาพระดับโลกของรถยนต์ไฟฟ้า BYD
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
					{features.map((feature, index) => {
						const animationClass = `animate-on-scroll${
							index > 0 ? "-delay-" + Math.min(index, 2) : ""
						}`;
						return (
							<div
								key={feature.title}
								className={`group relative p-6 rounded-2xl border border-white/10 bg-secondary/50 backdrop-blur-sm hover:border-white/20 hover:bg-secondary/70 transition-all duration-300 hover:-translate-y-1 ${animationClass}`}
							>
								{/* Glowing background effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								<div className="relative z-10">
									<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
										<feature.icon className="h-6 w-6 text-primary" />
									</div>
									<h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
										{feature.title}
									</h3>
									<p className="text-muted-foreground group-hover:text-white/90 transition-colors duration-300">
										{feature.description}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
