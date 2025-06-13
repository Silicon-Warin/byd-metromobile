"use client";

import { useEffect } from "react";

export default function ScrollAnimations() {
	useEffect(() => {
		// Check if browser supports CSS animation-timeline
		const supportsAnimationTimeline = CSS.supports(
			"animation-timeline",
			"view()"
		);

		if (!supportsAnimationTimeline) {
			// Fallback: Use Intersection Observer
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add("in-view");
						}
					});
				},
				{
					threshold: 0.1,
					rootMargin: "0px 0px -50px 0px",
				}
			);

			// Observe all scroll animation elements
			const elements = document.querySelectorAll(
				[
					".animate-on-scroll",
					".animate-on-scroll-delay-1",
					".animate-on-scroll-delay-2",
					".animate-on-scroll-slide-left",
					".animate-on-scroll-scale",
				].join(",")
			);

			elements.forEach((el) => observer.observe(el));

			return () => {
				elements.forEach((el) => observer.unobserve(el));
			};
		}
	}, []);

	return null;
}

// Hook สำหรับใช้ใน component อื่นๆ
export function useScrollAnimation(className = "animate-on-scroll") {
	return className;
}
