import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { defaultModels } from "@/data/Model";

export function ModelCarSlider() {
	return (
		<section className="py-16 bg-black text-white overflow-hidden">
			<div className="container mx-auto px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="mb-8 flex items-baseline gap-3"
				>
					<h2 className="text-3xl md:text-4xl font-bold">Models.</h2>
					<p className="text-xl text-gray-400">Build your dreams.</p>
				</motion.div>

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full"
				>
					<CarouselContent className="-ml-4">
						{defaultModels.map((model, index) => (
							<CarouselItem
								key={model.id}
								className="pl-4 md:basis-1/2 lg:basis-1/3"
							>
								<motion.div
									initial={{ opacity: 0, scale: 0.95 }}
									whileInView={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
								>
									<Link href={"#"} className="block relative group">
										<div className="relative aspect-[16/9] overflow-hidden rounded-lg">
											<motion.img
												src={model.imageUrlModel}
												alt={model.name}
												className="w-full h-full object-cover"
												whileHover={{ scale: 1.05 }}
												transition={{ duration: 0.3 }}
											/>
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
												<h3 className="text-xl md:text-2xl font-bold text-white">
													{model.name}
												</h3>
												<p className="text-white mt-2">
													เริ่มต้น {model.price.toLocaleString()} บาท
												</p>
											</div>
										</div>
									</Link>
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious className="hidden md:flex" />
					<CarouselNext className="hidden md:flex" />
				</Carousel>
			</div>
		</section>
	);
}
