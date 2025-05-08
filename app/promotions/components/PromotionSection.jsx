"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { defaultModels } from "@/data/carModel";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ReactDOM from "react-dom";
import "swiper/css";
import "swiper/css/free-mode";

export default function PromotionSection() {
	const [swiper, setSwiper] = useState(null);
	const [selectedVehicle, setSelectedVehicle] = useState(null);
	const modalRef = useRef(null);

	// Format price with commas
	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	// จัดการคลิกนอก modal
	useEffect(() => {
		if (selectedVehicle) {
			document.body.style.overflow = "hidden";

			const handleOutsideClick = (event) => {
				if (modalRef.current && !modalRef.current.contains(event.target)) {
					setSelectedVehicle(null);
				}
			};

			const handleEsc = (event) => {
				if (event.key === "Escape") {
					setSelectedVehicle(null);
				}
			};

			document.addEventListener("mousedown", handleOutsideClick);
			document.addEventListener("touchstart", handleOutsideClick);
			window.addEventListener("keydown", handleEsc);

			return () => {
				document.removeEventListener("mousedown", handleOutsideClick);
				document.removeEventListener("touchstart", handleOutsideClick);
				window.removeEventListener("keydown", handleEsc);
				document.body.style.overflow = "auto";
			};
		} else {
			document.body.style.overflow = "auto";
		}
	}, [selectedVehicle]);

	return (
		<>
			<section className="relative w-[90%] md:w-[80%] lg:w-[70%] mx-auto h-full">
				<div className="swiper-container-wrapper overflow-visible">
					<Swiper
						modules={[FreeMode]}
						freeMode={{
							enabled: true,
							sticky: false,
							momentumRatio: 0.5,
						}}
						spaceBetween={24}
						slidesPerView={1.4}
						centeredSlides={false}
						breakpoints={{
							0: { slidesPerView: 1.1, spaceBetween: 16 },
							480: { slidesPerView: 1.3, spaceBetween: 20 },
							640: { slidesPerView: 1.4, spaceBetween: 20 },
							768: { slidesPerView: 1.5, spaceBetween: 24 },
							1024: { slidesPerView: 2.2, spaceBetween: 24 },
						}}
						watchOverflow={true}
						loopAdditionalSlides={1}
						onSwiper={(swiperInstance) => setSwiper(swiperInstance)}
						className="!overflow-visible pl-3"
						edgeSwipeDetection="prevent"
					>
						{defaultModels.map((vehicle, index) => (
							<SwiperSlide
								key={vehicle.id}
								className="pt-4 pb-10 overflow-visible"
							>
								<VehicleCard
									vehicle={vehicle}
									index={index}
									onClick={() => setSelectedVehicle(vehicle)}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className="mr-10 flex justify-end gap-2">
					<button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						onClick={() => swiper && swiper.slidePrev()}
					>
						<ChevronLeft className="h-6 w-6 text-gray-500" />
					</button>
					<button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						onClick={() => swiper && swiper.slideNext()}
					>
						<ChevronRight className="h-6 w-6 text-gray-500" />
					</button>
				</div>
			</section>

			{/* ย้าย Modal ออกมาอยู่นอก Swiper โดยใช้ createPortal */}
			{typeof window !== "undefined" &&
				ReactDOM.createPortal(
					<AnimatePresence>
						{selectedVehicle && (
							<div className="fixed inset-0 z-[9999] h-screen w-screen overflow-auto">
								{/* พื้นหลัง Overlay */}
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.3 }}
									className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
									onClick={() => setSelectedVehicle(null)}
								/>

								{/* Modal Content */}
								<motion.div
									ref={modalRef}
									initial={{ opacity: 0, scale: 0.9, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.9, y: 20 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
									className="fixed left-1/2 top-1/2 z-[10000] h-fit w-[90%] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-6 font-sans md:p-8 dark:bg-neutral-900"
									onClick={(e) => e.stopPropagation()}
								>
									<button
										className="absolute top-4 right-4 z-[10001] flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white"
										onClick={() => setSelectedVehicle(null)}
									>
										<X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
									</button>

									<div className="flex flex-col md:flex-row md:items-start md:gap-10">
										<div className="flex-shrink-0 md:w-3/5">
											<div className="relative w-full aspect-video md:aspect-square md:h-auto overflow-hidden rounded-xl">
												<Image
													src={
														selectedVehicle.imageUrlPromo || "/placeholder.svg"
													}
													alt={selectedVehicle.name}
													fill
													className="object-contain"
													priority
												/>
											</div>
										</div>

										<div className="flex flex-col items-center md:items-start text-center md:text-left md:w-2/5 md:pt-6">
											<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 dark:text-white">
												BYD {selectedVehicle.name}
											</h2>

											<p className="text-xl text-emerald-600 dark:text-emerald-400 font-medium mt-4">
												เริ่มต้น{formatPrice(selectedVehicle.price)} บาท*
											</p>

											<p className="text-sm text-gray-600 dark:text-gray-300 mt-4 max-w-sm">
												รถยนต์ไฟฟ้าคุณภาพสูง ประหยัดพลังงาน
												เป็นมิตรกับสิ่งแวดล้อม
												ด้วยเทคโนโลยีล้ำสมัยที่ให้การขับขี่เหนือระดับ
											</p>

											<div className="w-full max-w-xs mx-auto md:mx-0 mt-8">
												<Button
													className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-6"
													asChild
												>
													<Link
														href="https://line.me/R/ti/p/%40bydmetromobile"
														target="_blank"
														rel="noopener noreferrer"
													>
														<MessageCircle className="mr-2 h-5 w-5" />
														ติดต่อผ่าน LINE
													</Link>
												</Button>

												<p className="text-xs text-gray-500 mt-3 text-center md:text-left">
													*ราคาอาจเปลี่ยนแปลงได้
													กรุณาติดต่อทีมขายเพื่อรับข้อเสนอล่าสุด
												</p>
											</div>
										</div>
									</div>
								</motion.div>
							</div>
						)}
					</AnimatePresence>,
					document.body
				)}
		</>
	);
}

// แยก VehicleCard ให้เรียบง่ายขึ้น
const VehicleCard = ({ vehicle, index, onClick }) => {
	return (
		<motion.button
			onClick={onClick}
			initial={{ opacity: 0, y: 20 }}
			animate={{
				opacity: 1,
				y: 0,
				transition: { duration: 0.5, delay: 0.1 * index },
			}}
			className="relative z-10 flex aspect-square w-full flex-col items-start justify-between overflow-hidden rounded-3xl bg-gray-100 dark:bg-neutral-900"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<Image
				src={vehicle.imageUrlPromo || "/placeholder.svg"}
				alt={vehicle.name}
				fill
				className="absolute inset-0 z-10 object-cover transition-transform duration-300"
			/>
		</motion.button>
	);
};
