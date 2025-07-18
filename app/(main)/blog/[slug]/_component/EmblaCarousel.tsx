import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./EmblaCarouselThumbsButton";
import Image from "next/image";
import "./embla.css";

type PropType = {
	imagesSrc: string[];
	options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
	const { imagesSrc, options } = props;
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();

		emblaMainApi.on("select", onSelect).on("reInit", onSelect);
	}, [emblaMainApi, onSelect]);

	return (
		<div className="embla">
			{/* Main Carousel */}
			<div className="embla__viewport" ref={emblaMainRef}>
				<div className="embla__container">
					{imagesSrc.map((imageSrc, index) => (
						<div className="embla__slide" key={index}>
							<div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
								<Image
									src={imageSrc}
									alt={`Slide ${index + 1}`}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 800px"
									priority={index === 0}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Thumbnails - แสดงเฉพาะเมื่อมีรูปมากกว่า 1 รูป */}
			{imagesSrc.length > 1 && (
				<div className="embla-thumbs">
					<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
						<div className="embla-thumbs__container">
							{imagesSrc.map((imageSrc, index) => (
								<Thumb
									key={index}
									onClick={() => onThumbClick(index)}
									selected={index === selectedIndex}
									index={index}
									imageSrc={imageSrc} // ส่งรูปไปด้วย!!
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmblaCarousel;
