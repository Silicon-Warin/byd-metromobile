// components/models/GallerySection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CarModelWithRelations } from "../../app/models/[slug]/modelPageContent";
import type { CarFeature } from "@prisma/client";

interface GallerySectionProps {
	carModel: CarModelWithRelations;
	highlights: CarFeature[];
}

export function GallerySection({ carModel, highlights }: GallerySectionProps) {
	return (
		<section className="py-20 bg-gradient-to-b from-background to-card">
			<div className="container mx-auto px-4">
				<h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
					{carModel.model} Gallery
				</h2>

				<Tabs defaultValue="exterior" className="w-full">
					<TabsList className="grid w-full max-w-[400px] mx-auto grid-cols-2">
						<TabsTrigger value="exterior">Exterior</TabsTrigger>
						<TabsTrigger value="interior">Interior</TabsTrigger>
					</TabsList>
					<TabsContent value="exterior">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Main Image */}
							<motion.div
								className="md:col-span-2 md:h-[50vh] h-[40vh] rounded-xl overflow-hidden relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
							>
								<Image
									src={
										carModel.imageUrlReal?.replace("/cars/", "/models/") ||
										"/placeholder.svg"
									}
									alt={`${carModel.model} Exterior View`}
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
									<div>
										<h3 className="text-2xl font-bold text-white mb-2">
											มุมมองภายนอก
										</h3>
									</div>
								</div>
							</motion.div>

							{/* Thumbnail Images */}
							{highlights.slice(0, 4).map((highlight, index) => (
								<motion.div
									key={index}
									className="h-64 rounded-xl overflow-hidden relative group cursor-pointer"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
									whileHover={{ scale: 1.02 }}
								>
									<Image
										src={highlight.image || "/placeholder.svg"}
										alt={highlight.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
										<h4 className="text-lg font-medium text-white">
											{highlight.title}
										</h4>
									</div>
								</motion.div>
							))}
						</div>
					</TabsContent>
					<TabsContent value="interior">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Main Image */}
							<motion.div
								className="md:col-span-2 md:h-[50vh] h-[40vh] rounded-xl overflow-hidden relative"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
							>
								<Image
									src={
										carModel.imageUrlReal?.replace("/cars/", "/models/") ||
										"/placeholder.svg"
									}
									alt={`${carModel.model} Interior View`}
									fill
									className="object-cover"
									priority
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
									<div>
										<h3 className="text-2xl font-bold text-white mb-2">
											มุมมองภายใน
										</h3>
									</div>
								</div>
							</motion.div>

							{/* Thumbnail Images */}
							{highlights.slice(0, 4).map((highlight, index) => (
								<motion.div
									key={index}
									className="h-64 rounded-xl overflow-hidden relative group cursor-pointer"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.6, delay: 0.1 * index }}
									whileHover={{ scale: 1.02 }}
								>
									<Image
										src={highlight.image || "/placeholder.svg"}
										alt={highlight.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
										<h4 className="text-lg font-medium text-white">
											{highlight.title}
										</h4>
									</div>
								</motion.div>
							))}
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
