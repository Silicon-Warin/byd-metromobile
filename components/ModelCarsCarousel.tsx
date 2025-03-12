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

interface ModelCarsCarouselProps {
	models: CarModel[];
}

export const ModelCarsCarousel = ({ models }: ModelCarsCarouselProps) => (
	<Carousel
		opts={{
			align: "start",
			loop: true,
		}}
		className="w-full max-w-6xl mx-auto"
	>
		<CarouselContent>
			{models.map((model) => (
				<CarouselItem key={model.id} className="md:basis-1/2 lg:basis-1/3">
					<div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg overflow-hidden shadow-lg">
						<div className="relative h-48">
							<Image
								src={model.imageUrl}
								alt={model.name}
								fill
								className="object-cover opacity-90"
							/>
							<div className="absolute inset-0 p-6 text-white">
								<div>
									<h3 className="text-2xl font-bold mb-1">{model.name}</h3>
									{model.tagline && <p className="mb-2">{model.tagline}</p>}
									<div className="space-x-2 mb-4">
										{model.badges?.map((badge, index) => (
											<span
												key={index}
												className={`inline-block px-2 py-1 text-xs rounded ${
													badge === "New"
														? "bg-red-600 text-white"
														: "bg-gray-700 text-gray-300"
												}`}
											>
												{badge}
											</span>
										))}
									</div>
									{model.specifications && (
										<div className="space-y-2 mb-4 text-sm">
											{Object.entries(model.specifications).map(
												([key, value]) => (
													<div key={key} className="flex justify-between">
														<span className="text-gray-300">{key}</span>
														<span className="font-medium text-white">
															{value}
														</span>
													</div>
												)
											)}
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="p-6 bg-white">
							<p className="text-gray-600 mb-4">{model.description}</p>
							<div className="pt-4 border-t">
								<span className="block text-xl font-bold mb-3 text-gray-900">
									เริ่มต้น {model.price.toLocaleString()} บาท
								</span>
								<Link
									href={model.configuratorUrl || "#"}
									className="block w-full py-3 bg-black text-white text-center rounded-md hover:bg-gray-800 transition-colors"
								>
									สั่งจองรถยนต์
								</Link>
							</div>
						</div>
					</div>
				</CarouselItem>
			))}
		</CarouselContent>
		<CarouselPrevious className="hidden md:flex -left-12" />
		<CarouselNext className="hidden md:flex -right-12" />
	</Carousel>
);
