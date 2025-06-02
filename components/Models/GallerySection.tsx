// components/models/GallerySection.tsx
"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
	type CarouselApi,
} from "@/components/ui/carousel";
import type { CarModel } from "@/data/carModel";
import type { EmblaCarouselType } from "embla-carousel";

const TWEEN_FACTOR = 0.2;

interface GallerySectionProps {
	carModel: CarModel;
	highlights: any[];
}

interface ParallaxImageProps {
	children: React.ReactNode;
	index: number;
}

const ParallaxImage: React.FC<ParallaxImageProps> = ({ children, index }) => {
	return (
		<div className="embla__parallax">
			<div
				className="embla__parallax__layer"
				style={{ transform: `translateX(0)` }}
			>
				{children}
			</div>
		</div>
	);
};

export function GallerySection({ carModel }: GallerySectionProps) {
	// Carousel APIs for both exterior and interior
	const [exteriorApi, setExteriorApi] = React.useState<CarouselApi>();
	const [interiorApi, setInteriorApi] = React.useState<CarouselApi>();

	// Parallax effect refs
	const tweenFactor = useRef(0);
	const exteriorTweenNodes = useRef<HTMLElement[]>([]);
	const interiorTweenNodes = useRef<HTMLElement[]>([]);

	// Setup parallax nodes for carousel
	const setTweenNodes = useCallback(
		(
			api: CarouselApi,
			tweenNodesRef: React.MutableRefObject<HTMLElement[]>
		): void => {
			if (!api) return;

			const emblaApi = api as EmblaCarouselType;
			tweenNodesRef.current = emblaApi
				.slideNodes()
				.map((slideNode: HTMLElement) => {
					return slideNode.querySelector(
						".embla__parallax__layer"
					) as HTMLElement;
				});
		},
		[]
	);

	const setTweenFactor = useCallback((api: CarouselApi): void => {
		if (!api) return;

		const emblaApi = api as EmblaCarouselType;
		tweenFactor.current = TWEEN_FACTOR * emblaApi.slideNodes().length;
	}, []);

	// Parallax animation function
	const tweenParallax = useCallback(
		(
			api: CarouselApi,
			tweenNodesRef: React.MutableRefObject<HTMLElement[]>
		): void => {
			if (!api) return;

			const emblaApi = api as EmblaCarouselType;
			const engine = emblaApi.internalEngine();
			const scrollProgress = emblaApi.scrollProgress();
			const slidesInView = emblaApi.slidesInView();

			emblaApi
				.scrollSnapList()
				.forEach((scrollSnap: number, snapIndex: number) => {
					let diffToTarget = scrollSnap - scrollProgress;
					const slidesInSnap = engine.slideRegistry[snapIndex];

					slidesInSnap.forEach((slideIndex: number) => {
						if (!slidesInView.includes(slideIndex)) return;

						if (engine.options.loop) {
							engine.slideLooper.loopPoints.forEach((loopItem: any) => {
								const target = loopItem.target();

								if (slideIndex === loopItem.index && target !== 0) {
									const sign = Math.sign(target);

									if (sign === -1) {
										diffToTarget = scrollSnap - (1 + scrollProgress);
									}
									if (sign === 1) {
										diffToTarget = scrollSnap + (1 - scrollProgress);
									}
								}
							});
						}

						const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
						const tweenNode = tweenNodesRef.current[slideIndex];
						if (tweenNode) {
							tweenNode.style.transform = `translateX(${translate}%)`;
						}
					});
				});
		},
		[]
	);

	// Setup parallax effects for exterior carousel
	useEffect(() => {
		if (!exteriorApi) return;

		const setupParallax = () => {
			setTweenNodes(exteriorApi, exteriorTweenNodes);
			setTweenFactor(exteriorApi);
			tweenParallax(exteriorApi, exteriorTweenNodes);
		};

		const handleScroll = () => tweenParallax(exteriorApi, exteriorTweenNodes);

		setupParallax();

		exteriorApi.on("reInit", setupParallax).on("scroll", handleScroll);

		return () => {
			exteriorApi.off("reInit", setupParallax).off("scroll", handleScroll);
		};
	}, [exteriorApi, setTweenNodes, setTweenFactor, tweenParallax]);

	// Setup parallax effects for interior carousel
	useEffect(() => {
		if (!interiorApi) return;

		const setupParallax = () => {
			setTweenNodes(interiorApi, interiorTweenNodes);
			setTweenFactor(interiorApi);
			tweenParallax(interiorApi, interiorTweenNodes);
		};

		const handleScroll = () => tweenParallax(interiorApi, interiorTweenNodes);

		setupParallax();

		interiorApi.on("reInit", setupParallax).on("scroll", handleScroll);

		return () => {
			interiorApi.off("reInit", setupParallax).off("scroll", handleScroll);
		};
	}, [interiorApi, setTweenNodes, setTweenFactor, tweenParallax]);

	return (
		<section className="bg-gradient-to-b from-background to-card">
			{/* Parallax CSS Styles */}
			<style jsx global>{`
				.embla__parallax {
					height: 100%;
					overflow: hidden;
				}
				.embla__parallax__layer {
					position: relative;
					height: 100%;
					width: 100%;
				}
			`}</style>

			<div className="container mx-auto px-4">
				<h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">
					{carModel.name} Gallery
				</h2>

				<Tabs defaultValue="exterior" className="w-full">
					<TabsList className="grid w-full max-w-[400px] mx-auto grid-cols-2 mb-8">
						<TabsTrigger value="exterior">ภายนอก</TabsTrigger>
						<TabsTrigger value="interior">ภายใน</TabsTrigger>
					</TabsList>

					{/* Exterior Gallery */}
					<TabsContent value="exterior">
						<Carousel
							setApi={setExteriorApi}
							opts={{
								loop: true,
								align: "center",
								containScroll: "trimSnaps",
							}}
							className="w-full"
						>
							<CarouselContent className="-ml-6">
								{/* Main exterior image */}
								<CarouselItem className="pl-6 basis-[60%]">
									<ParallaxImage index={0}>
										<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
											<Image
												src={carModel.imageUrlReal || "/placeholder.svg"}
												alt={`${carModel.name} Main Exterior View`}
												fill
												className="object-cover rounded-lg"
												priority
												sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
												quality={85}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 rounded-lg" />
										</div>
									</ParallaxImage>
								</CarouselItem>

								{/* Additional exterior images */}
								{carModel.gallery?.exterior?.map((image, index) => (
									<CarouselItem key={index} className="pl-6 basis-[60%]">
										<ParallaxImage index={index + 1}>
											<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
												<Image
													src={image}
													alt={`${carModel.name} Exterior View ${index + 1}`}
													fill
													className="object-cover rounded-lg"
													loading="lazy"
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
													quality={85}
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 rounded-lg" />
											</div>
										</ParallaxImage>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-4" />
							<CarouselNext className="right-4" />
						</Carousel>
					</TabsContent>

					{/* Interior Gallery */}
					<TabsContent value="interior">
						<Carousel
							setApi={setInteriorApi}
							opts={{
								loop: true,
								align: "center",
								containScroll: "trimSnaps",
							}}
							className="w-full"
						>
							<CarouselContent className="-ml-6">
								{carModel.gallery?.interior?.map((image, index) => {
									const src = typeof image === "string" ? image : image;

									return (
										<CarouselItem key={index} className="pl-6 basis-[60%]">
											<ParallaxImage index={index}>
												<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
													<Image
														src={src}
														alt={`${carModel.name} Interior View ${index + 1}`}
														fill
														className="object-cover rounded-lg"
														loading="lazy"
														sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
														quality={85}
													/>
													<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 rounded-lg" />
												</div>
											</ParallaxImage>
										</CarouselItem>
									);
								})}
							</CarouselContent>
							<CarouselPrevious className="left-4" />
							<CarouselNext className="right-4" />
						</Carousel>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
