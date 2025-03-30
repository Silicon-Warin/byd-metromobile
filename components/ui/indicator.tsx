import React from "react";
import { cn } from "@/lib/utils";

interface IndicatorProps {
	slideCount: number;
	currentSlide: number;
	setCurrentSlide: (index: number) => void;
	handleInteraction?: () => void;
	className?: string;
	indicatorClassName?: string;
	activeIndicatorClassName?: string;
	inactiveIndicatorClassName?: string;
}

export const Indicator = ({
	slideCount,
	currentSlide,
	setCurrentSlide,
	handleInteraction = () => {},
	className = "absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10",
	indicatorClassName = "",
	activeIndicatorClassName = "bg-white w-8",
	inactiveIndicatorClassName = "bg-white/50",
}: IndicatorProps) => {
	return (
		<div className={cn(className)}>
			{Array.from({ length: slideCount }).map((_, idx) => (
				<button
					key={idx}
					onClick={() => {
						setCurrentSlide(idx);
						handleInteraction();
					}}
					className={cn(
						"w-3 h-3 rounded-full transition-all",
						indicatorClassName,
						currentSlide === idx
							? activeIndicatorClassName
							: inactiveIndicatorClassName
					)}
					aria-label={`ไปที่สไลด์ ${idx + 1}`}
				/>
			))}
		</div>
	);
};
