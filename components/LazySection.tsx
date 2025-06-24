"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LazySectionProps {
	children: ReactNode;
	fallback?: ReactNode;
	rootMargin?: string;
	threshold?: number;
	className?: string;
	loadingClassName?: string;
}

export function LazySection({
	children,
	fallback,
	rootMargin = "100px",
	threshold = 0.1,
	className,
	loadingClassName,
}: LazySectionProps) {
	const [isInView, setIsInView] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsInView(true);
					// Once loaded, we don't need to observe anymore
					observer.unobserve(element);
				}
			},
			{
				rootMargin,
				threshold,
			}
		);

		observer.observe(element);

		return () => {
			observer.unobserve(element);
		};
	}, [rootMargin, threshold]);

	useEffect(() => {
		if (isInView && !hasLoaded) {
			// Small delay to prevent janky loading
			const timer = setTimeout(() => {
				setHasLoaded(true);
			}, 100);

			return () => clearTimeout(timer);
		}
	}, [isInView, hasLoaded]);

	const defaultFallback = (
		<div
			className={cn(
				"animate-pulse bg-gray-200 rounded-lg h-64",
				loadingClassName
			)}
		>
			<div className="flex items-center justify-center h-full">
				<div className="text-gray-500">Loading...</div>
			</div>
		</div>
	);

	return (
		<div ref={ref} className={cn("relative", className)}>
			{hasLoaded ? children : fallback || defaultFallback}
		</div>
	);
}
