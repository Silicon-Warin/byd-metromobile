"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
	src: string;
	alt: string;
	width?: number;
	height?: number;
	fill?: boolean;
	priority?: boolean;
	className?: string;
	wrapperClassName?: string;
	sizes?: string;
	quality?: number;
	placeholder?: "blur" | "empty";
	blurDataURL?: string;
	loading?: "eager" | "lazy";
	fetchPriority?: "high" | "low" | "auto";
	onLoad?: () => void;
}

export function OptimizedImage({
	src,
	alt,
	width,
	height,
	fill = false,
	priority = false,
	className,
	wrapperClassName,
	sizes = "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, 75vw",
	quality = 75,
	placeholder = "blur",
	blurDataURL,
	loading = "lazy",
	fetchPriority = "auto",
	onLoad,
}: OptimizedImageProps) {
	const [isLoaded, setIsLoaded] = useState(false);

	const handleLoad = () => {
		setIsLoaded(true);
		onLoad?.();
	};

	// Default blur placeholder
	const defaultBlurDataURL =
		"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=";

	if (fill) {
		return (
			<>
				<Image
					src={src}
					alt={alt}
					fill
					priority={priority}
					sizes={sizes}
					quality={quality}
					placeholder={placeholder}
					blurDataURL={blurDataURL || defaultBlurDataURL}
					loading={priority ? "eager" : loading}
					fetchPriority={fetchPriority}
					onLoad={handleLoad}
					className={cn(
						"transition-opacity duration-300",
						isLoaded ? "opacity-100" : "opacity-0",
						className
					)}
				/>

				{/* Loading indicator for fill images */}
				{!isLoaded && (
					<div className="absolute inset-0 bg-gray-800/50 animate-pulse flex items-center justify-center">
						<div className="text-white text-sm">กำลังโหลด...</div>
					</div>
				)}
			</>
		);
	}

	// Non-fill images
	return (
		<div className={cn("relative inline-block", wrapperClassName)}>
			<Image
				src={src}
				alt={alt}
				width={width}
				height={height}
				priority={priority}
				sizes={sizes}
				quality={quality}
				placeholder={placeholder}
				blurDataURL={blurDataURL || defaultBlurDataURL}
				loading={priority ? "eager" : loading}
				fetchPriority={fetchPriority}
				onLoad={handleLoad}
				className={cn(
					"transition-opacity duration-300",
					isLoaded ? "opacity-100" : "opacity-0",
					className
				)}
			/>

			{/* Loading indicator for regular images */}
			{!isLoaded && (
				<div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
					<div className="text-gray-500 text-sm">Loading...</div>
				</div>
			)}
		</div>
	);
}
