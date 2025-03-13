import {
	Carousel,
	CarouselContent,
	CarouselIndicators,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { CarModel } from "@/types/Model";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

interface ModelCarsCarouselProps {
	models: CarModel[];
}

export const ModelCarsCarousel = ({ models }: ModelCarsCarouselProps) => {
	const [selectedModel, setSelectedModel] = useState<CarModel | null>(null);
	const [modalOpen, setModalOpen] = useState(false);

	const openModal = (model: CarModel) => {
		setSelectedModel(model);
		setModalOpen(true);
	};

	return (
		<>
			<Carousel
				opts={{
					align: "start",
					loop: true,
				}}
				className="w-full max-w-7xl mx-auto px-4 relative"
			>
				<CarouselContent className="-ml-6 space-x-[20px]">
					{models.map((model) => (
						<CarouselItem
							key={model.id}
							className="pl-4 md:pl-6 flex-[0_0_45%]"
						>
							<div className="bg-card-foreground rounded-lg overflow-hidden shadow-xl">
								<div className="relative h-64 md:h-80 lg:h-96">
									<Image
										src={model.imageUrl}
										alt={model.name}
										fill
										className="object-contain"
										priority
									/>
								</div>
								<div className="p-4 flex flex-col sm:flex-row gap-2">
									<Link
										href="https://line.me/R/ti/p/@429xjvpr"
										className="flex-1 py-2 bg-green-500 text-white text-center rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
									>
										จองรถ (Line Official)
									</Link>
									<button
										onClick={() => openModal(model)}
										className="flex-1 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 transition-colors"
									>
										โปรโมชั่น
									</button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>

				<div className="mt-6 flex items-center justify-between px-8">
					{/* Previous arrow */}
					<CarouselPrevious className="flex bg-black/50 text-white p-2 rounded-full hover:bg-black" />

					{/* Center container for indicators */}
					<div className="flex-1 flex justify-center">
						<CarouselIndicators total={models.length} />
					</div>

					{/* Next arrow */}
					<CarouselNext className="flex bg-black/50 text-white p-2 rounded-full hover:bg-black" />
				</div>
			</Carousel>

			{selectedModel && (
				<Dialog open={modalOpen} onOpenChange={setModalOpen}>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>{selectedModel.name}</DialogTitle>
							{selectedModel.tagline && (
								<DialogDescription>{selectedModel.tagline}</DialogDescription>
							)}
						</DialogHeader>
						<div className="space-y-4">
							{selectedModel.badges && selectedModel.badges.length > 0 && (
								<div className="flex flex-wrap gap-2">
									{selectedModel.badges.map((badge, index) => (
										<span
											key={index}
											className={`inline-block px-2 py-1 text-xs font-medium rounded ${
												badge === "New"
													? "bg-blue-600 text-white"
													: "bg-gray-200 text-gray-800"
											}`}
										>
											{badge}
										</span>
									))}
								</div>
							)}

							{selectedModel.description && (
								<p className="text-gray-600">{selectedModel.description}</p>
							)}

							{selectedModel.specifications && (
								<div className="space-y-2 pt-4 border-t border-gray-200">
									<h4 className="font-medium">รายละเอียดรถยนต์</h4>
									{Object.entries(selectedModel.specifications).map(
										([key, value]) => (
											<div key={key} className="flex justify-between text-sm">
												<span className="text-gray-600">{key}</span>
												<span className="font-medium">{value}</span>
											</div>
										)
									)}
								</div>
							)}

							<div className="pt-4 flex justify-end gap-2">
								<Link
									href={selectedModel.configuratorUrl || "#"}
									className="inline-flex items-center justify-center px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
								>
									สั่งจองรถยนต์
								</Link>
								{selectedModel.learnMoreUrl && (
									<Link
										href={selectedModel.learnMoreUrl}
										className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50"
									>
										รายละเอียดเพิ่มเติม
									</Link>
								)}
							</div>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};
