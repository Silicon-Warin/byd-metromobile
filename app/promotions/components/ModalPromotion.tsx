import { motion } from "framer-motion";
import { X } from "lucide-react";	
import LineOALinkButton from "@/components/Line/line-button";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { carModels } from "./PromotionSection";

// Type for car model (reuse from PromotionSection if exported)
type CarModel = (typeof carModels)[number];

// Props type for ModalPromotion
interface ModalPromotionProps {
	selectedCar: CarModel | null;
	setSelectedCar: (car: CarModel | null) => void;
}

// Helper function for price formatting
const formatPrice = (price: string) => {
	return price.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ModalPromotion = ({
	selectedCar,
	setSelectedCar,
}: ModalPromotionProps) => {
	return (
		<AnimatePresence>
			{selectedCar && (
				<motion.div
					className="fixed inset-0 z-50 flex items-center justify-center p-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div
						className="absolute inset-0 bg-black/80 backdrop-blur-sm"
						onClick={() => setSelectedCar(null)}
					/>

					<motion.div
						className="relative bg-gradient-to-br from-slate-800 to-blue-900 rounded-3xl p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setSelectedCar(null)}
							className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
						>
							<X className="w-5 h-5" />
						</button>

						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							<div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl">
								<Image
									src={selectedCar.image}
									alt={`BYD ${selectedCar.name}`}
									fill
									className="object-contain"
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>

							<div className="space-y-6">
								<div>
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
										BYD {selectedCar.name}
									</h3>
									<p className="text-lg text-blue-300">
										{selectedCar.subtitle}
									</p>
								</div>

								<div className="space-y-3">
									{selectedCar.variants.map((variant: any, idx: number) => (
										<div
											key={idx}
											className="p-4 rounded-lg bg-white/5 border border-white/10"
										>
											<div className="flex justify-between items-center">
												<span className="text-white font-medium">
													{variant.name}
												</span>
												<span className="text-yellow-400 font-bold">
													{formatPrice(variant.price)} บาท*
												</span>
											</div>
										</div>
									))}
								</div>

								<div className="p-4 rounded-lg bg-red-600/20 border border-red-500/30">
									<p className="text-white">
										<span className="inline-block bg-red-600 text-white px-2 py-1 rounded text-xs font-bold mr-2">
											รับฟรี!
										</span>
										{selectedCar.promotion}
									</p>
								</div>

								<div className="space-y-3">
									<LineOALinkButton className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-bold py-6 rounded-full">
										ติดต่อผ่าน LINE
									</LineOALinkButton>

									<p className="text-xs text-gray-300 text-center">
										ตั้งแต่วันที่ 1 มิ.ย. 68 – 31 ก.ค. 68
										*เงื่อนไขเป็นไปตามที่บริษัทฯ กำหนด
									</p>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ModalPromotion;
