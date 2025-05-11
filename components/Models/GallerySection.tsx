// components/models/GallerySection.tsx
"use client";

import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CarModel } from "@/data/carModel";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaCarouselType } from "embla-carousel";

const TWEEN_FACTOR = 0.2;

interface GallerySectionProps {
	carModel: CarModel;
	highlights: any[];
}

interface ParallaxProps {
	children: React.ReactNode;
	index: number;
}

const ParallaxImage: React.FC<ParallaxProps> = ({ children, index }) => {
	return (
		<div className="embla__slide">
			<div className="embla__parallax">
				<div
					className="embla__parallax__layer"
					style={{ transform: `translateX(0)` }}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export function GallerySection({ carModel }: GallerySectionProps) {
	const [exteriorViewportRef, exteriorEmblaApi] = useEmblaCarousel({
		loop: true,
		align: "center",
		containScroll: "trimSnaps",
	});
	const [interiorViewportRef, interiorEmblaApi] = useEmblaCarousel({
		loop: true,
		align: "center",
		containScroll: "trimSnaps",
	});
	const tweenFactor = useRef(0);
	const tweenNodes = useRef<HTMLElement[]>([]);

	const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
		tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
		});
	}, []);

	const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
		tweenFactor.current = TWEEN_FACTOR * emblaApi.slideNodes().length;
	}, []);

	const tweenParallax = useCallback((emblaApi: EmblaCarouselType) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach((slideIndex) => {
				if (!slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
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
				const tweenNode = tweenNodes.current[slideIndex];
				if (tweenNode) {
					tweenNode.style.transform = `translateX(${translate}%)`;
				}
			});
		});
	}, []);
	useEffect(() => {
		const setupEmbla = (emblaApi: EmblaCarouselType | undefined) => {
			if (!emblaApi) return;

			setTweenNodes(emblaApi);
			setTweenFactor(emblaApi);
			tweenParallax(emblaApi);

			emblaApi
				.on("reInit", setTweenNodes)
				.on("reInit", setTweenFactor)
				.on("reInit", tweenParallax)
				.on("scroll", tweenParallax);

			return () => {
				emblaApi
					.off("reInit", setTweenNodes)
					.off("reInit", setTweenFactor)
					.off("reInit", tweenParallax)
					.off("scroll", tweenParallax);
			};
		};

		const cleanupExterior = setupEmbla(exteriorEmblaApi);
		const cleanupInterior = setupEmbla(interiorEmblaApi);

		return () => {
			cleanupExterior?.();
			cleanupInterior?.();
		};
	}, [
		exteriorEmblaApi,
		interiorEmblaApi,
		setTweenNodes,
		setTweenFactor,
		tweenParallax,
	]);

	return (
		<section className="bg-gradient-to-b from-background to-card">
			<style jsx global>{`
				.embla__viewport {
					overflow: visible;
				}
				.embla__container {
					backface-visibility: hidden;
					display: flex;
					touch-action: pan-y;
				}
				.embla__slide {
					flex: 0 0 60%;
					min-width: 0;
					position: relative;
					margin-right: 24px;
				}
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
					</TabsList>{" "}
					<TabsContent value="exterior">
						<div className="embla" ref={exteriorViewportRef}>
							<div className="embla__container">
								<ParallaxImage index={0}>
									{" "}
									<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
										<Image
											src={carModel.imageUrlReal || "/placeholder.svg"}
											alt={`${carModel.name} Main Exterior View`}
											fill
											className="object-cover"
											priority
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6" />
									</div>
								</ParallaxImage>

								{carModel.gallery?.exterior?.map((image, index) => (
									<ParallaxImage key={index} index={index + 1}>
										<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
											<Image
												src={image}
												alt={`${carModel.name} Exterior View ${index + 1}`}
												fill
												className="object-cover"
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6" />
										</div>
									</ParallaxImage>
								))}
							</div>
						</div>
					</TabsContent>
					<TabsContent value="interior">
						<div className="embla" ref={interiorViewportRef}>
							<div className="embla__container">
								{carModel.gallery?.interior?.map((image, index) => {
									const src = typeof image === "string" ? image : image;

									return (
										<ParallaxImage key={index} index={index}>
											{" "}
											<div className="relative aspect-[16/9] w-full h-auto min-h-[230px]">
												<Image
													src={src}
													alt={`${carModel.name} Interior View ${index + 1}`}
													fill
													className="object-cover"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6" />
											</div>
										</ParallaxImage>
									);
								})}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
