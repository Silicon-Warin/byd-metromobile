"use client";

import { useState, useRef, useEffect, createContext, useContext } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
	X,
	MessageCircle,
	ArrowRight,
	ChevronLeft,
	ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { defaultModels } from "@/data/carModel";
import { useOutsideClick } from "@/hooks/useOutsideClick";

// Create context for carousel
const CarouselContext = createContext({
	onCardClose: () => {},
	currentId: null,
});

export default function PromotionSection() {
	const carouselRef = useRef(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [currentId, setCurrentId] = useState(null);

	// Format price with commas
	const formatPrice = (price) => {
		return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	useEffect(() => {
		checkScrollability();
	}, []);

	const checkScrollability = () => {
		if (carouselRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const handleCardClose = (id) => {
		if (carouselRef.current) {
			const cardWidth = window.innerWidth < 768 ? 280 : 400; // Adjusted for square aspect
			const gap = window.innerWidth < 768 ? 16 : 24;
			const index = defaultModels.findIndex((model) => model.id === id);
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentId(id);
		}
	};

	return (
		<CarouselContext.Provider
			value={{ onCardClose: handleCardClose, currentId }}
		>
			<section className="py-16 md:py-24 relative">
				<div className="relative w-full overflow-visible">
					<div
						className="flex w-full overflow-x-auto overflow-y-hidden py-10 md:py-20"
						ref={carouselRef}
						onScroll={checkScrollability}
					>
						<div className="flex flex-row justify-start gap-6 pl-4">
							{defaultModels.map((vehicle, index) => (
								<VehicleCard
									key={vehicle.id}
									vehicle={vehicle}
									index={index}
									formatPrice={formatPrice}
								/>
							))}
						</div>
					</div>

					<div className="mr-10 flex justify-end gap-2">
						<button
							className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
							onClick={scrollLeft}
							disabled={!canScrollLeft}
						>
							<ChevronLeft className="h-6 w-6 text-gray-500" />
						</button>
						<button
							className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
							onClick={scrollRight}
							disabled={!canScrollRight}
						>
							<ChevronRight className="h-6 w-6 text-gray-500" />
						</button>
					</div>
				</div>
			</section>
		</CarouselContext.Provider>
	);
}

const VehicleCard = ({ vehicle, index, formatPrice }) => {
	const [open, setOpen] = useState(false);
	const containerRef = useRef(null);
	const { onCardClose } = useContext(CarouselContext);

	useEffect(() => {
		function onKeyDown(event) {
			if (event.key === "Escape") {
				handleClose();
			}
		}

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	useOutsideClick(containerRef, () => handleClose());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		onCardClose(vehicle.id);
	};

	return (
		<>
			<AnimatePresence>
				{open && (
					<div className="fixed inset-0 z-50 h-screen overflow-auto">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
						/>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							ref={containerRef}
							layoutId={`card-${vehicle.id}`}
							className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
						>
							<button
								className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
								onClick={handleClose}
							>
								<X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
							</button>

							<div className="flex items-center justify-between mb-4">
								<div className="relative aspect-square md:w-[600] md:h-[600px] mb-6 rounded-xl overflow-hidden">
									<Image
										src={vehicle.imageUrlPromo || "/placeholder.svg"}
										alt={vehicle.name}
										fill
										className="object-cover"
									/>
								</div>

								{/* <motion.p
								layoutId={`category-${vehicle.id}`}
								className="text-base font-medium text-emerald-600 dark:text-emerald-400"
							>
								BYD {vehicle.category || "Electric Vehicle"}
							</motion.p> */}
								<div className="flex flex-col items-center justify-center gap-2">
									<motion.p
										layoutId={`title-${vehicle.id}`}
										className="mt-4 text-2xl font-semibold text-neutral-700 md:text-4xl dark:text-white"
									>
										{vehicle.name}
									</motion.p>

									<p className="text-xl text-emerald-600 dark:text-emerald-400 font-medium mt-2">
										เริ่มต้น{formatPrice(vehicle.price)} บาท*
									</p>

									{/* <p className="mt-4 text-neutral-600 dark:text-neutral-300">
										{vehicle.description ||
											"รถยนต์ไฟฟ้าที่ผสมผสานเทคโนโลยีล้ำสมัยและการออกแบบที่โดดเด่น เพื่อประสบการณ์การขับขี่ที่เหนือระดับ"}
									</p> */}

									<div className="flex flex-col sm:flex-row gap-4 mt-8">
										<Button
											className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium"
											asChild
										>
											<Link
												href="https://line.me/R/ti/p/%40bydmetromobile"
												target="_blank"
												rel="noopener noreferrer"
											>
												<MessageCircle className="mr-2 h-4 w-4" />
												ติดต่อผ่าน LINE
											</Link>
										</Button>
										{/* <Button variant="outline" asChild>
									<Link href={`/models/${vehicle.slug}`}>
										ดูรายละเอียดเพิ่มเติม
										<ArrowRight className="ml-2 h-4 w-4" />
									</Link>
								</Button> */}
									</div>
								</div>
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			{/* Changed to square aspect ratio */}
			<motion.button
				layoutId={`card-${vehicle.id}`}
				onClick={handleOpen}
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						duration: 0.5,
						delay: 0.2 * index,
						ease: "easeOut",
					},
				}}
				className="relative z-10 flex aspect-square w-[336px] flex-col items-start justify-between overflow-hidden rounded-3xl bg-gray-100 md:w-[480px] dark:bg-neutral-900"
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
			>
				{/* Background image */}
				<Image
					src={vehicle.imageUrlPromo || "/placeholder.svg"}
					alt={vehicle.name}
					fill
					className="absolute inset-0 z-10 object-cover transition-transform duration-300"
				/>
			</motion.button>
		</>
	);
};
