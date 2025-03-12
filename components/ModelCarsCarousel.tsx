import {
	Carousel,
	CarouselContent,
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
				className="w-full max-w-7xl mx-auto px-4"
			>
				<CarouselContent className="-ml-4 md:-ml-6">
					{models.map((model) => (
						<CarouselItem
							key={model.id}
							className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2"
						>
							<div className="bg-white rounded-lg overflow-hidden shadow-xl">
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
										href="https://line.me/official"
										className="flex-1 py-2 bg-green-500 text-white text-center rounded-md hover:bg-green-600 transition-colors flex items-center justify-center"
									>
										<svg
											className="w-5 h-5 mr-2"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.433.596-.065.021-.133.031-.199.031-.195 0-.382-.094-.499-.258l-2.443-3.323v2.954c0 .348-.282.63-.63.63-.345 0-.63-.282-.63-.63V8.108c0-.27.174-.51.435-.595.064-.022.13-.032.199-.032.194 0 .382.094.497.258l2.443 3.323V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.771zm-5.741-4.771c0 .346-.282.628-.631.628h-1.759v1.125h1.759c.349 0 .631.285.631.63 0 .345-.282.63-.631.63h-1.759v1.125h1.759c.349 0 .631.285.631.63 0 .345-.282.629-.631.629H5.976c-.35 0-.631-.284-.631-.629V8.108c0-.345.28-.63.631-.63h2.362c.349 0 .63.285.63.63zm-4.673.977a.636.636 0 00-.631-.634.642.642 0 00-.643.64l.003 3.78c0 .172.069.336.192.457.12.119.284.185.456.182a.636.636 0 00.624-.635V9.085zM12 2C6.478 2 2 5.977 2 10.86c0 4.342 3.721 7.985 8.755 8.653.34.068.802.211.92.484.104.254.068.649.033.905l-.146.907c-.041.254-.195 1.019.867.556.906-.368 5.073-3.249 6.844-5.443 1.355-1.649 2.005-3.354 1.994-5.063-.026-4.883-4.455-8.859-9.267-8.859" />
										</svg>
										จองรถ (Line Official)
									</Link>
									<button
										onClick={() => openModal(model)}
										className="flex-1 py-2 bg-red-600 text-white text-center rounded-md hover:bg-red-700 transition-colors"
									>
										โปรโมชั่น
									</button>
								</div>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className="flex justify-center gap-2 mt-8">
					<CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 md:absolute md:-left-16 md:top-1/2 md:-translate-y-1/2" />
					<CarouselNext className="relative inset-0 translate-x-0 translate-y-0 md:absolute md:-right-16 md:top-1/2 md:-translate-y-1/2" />
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
													? "bg-red-600 text-white"
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
