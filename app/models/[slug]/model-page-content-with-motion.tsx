// ตัวอย่างการใช้ Motion.dev components
import {
	FadeInView,
	ParallaxSection,
	RevealText,
} from "@/components/Models/motion-components";
import Image from "next/image";

interface CarModel {
	featuresTitle?: string;
}

interface ModelPageContentWithMotionProps {
	carModel?: CarModel;
}

const ModelPageContentWithMotion = ({
	carModel,
}: ModelPageContentWithMotionProps) => {
	return (
		<>
			{/* ในส่วนของ section ต่างๆ */}
			<section id="showcase" className="py-20">
				<div className="container mx-auto px-4">
					<FadeInView>
						<h2 className="text-4xl font-bold mb-12 text-start">
							{carModel?.featuresTitle || "คุณสมบัติเด่น"}
						</h2>
					</FadeInView>

					{/* Swiper content */}
				</div>
			</section>

			{/* สำหรับ section ที่มีภาพและข้อความ */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<ParallaxSection speed={0.3}>
							<div className="relative h-[400px] rounded-xl overflow-hidden">
								<Image
									src="/images/cell-to-body.png"
									alt="Advanced Cell-to-Body Technology"
									fill
									className="object-cover"
									sizes="100%"
								/>
							</div>
						</ParallaxSection>
						<div>
							<RevealText
								text="Advanced Cell-to-Body Technology."
								delay={0.2}
							/>
							<FadeInView delay={0.4}>
								<p className="text-gray-300 mb-6">
									BYD SEAL is the first vehicle to implement the Cell-to-Body
									(CTB) technology, which fully integrates the BYD Blade Battery
									into the entire vehicle structure and enhances the vehicle's
									safety.
								</p>
							</FadeInView>
							{/* Button */}
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ModelPageContentWithMotion;
