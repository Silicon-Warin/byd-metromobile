/**
 * React 19 Feature Showcase Hook
 * Demonstrates the new ref cleanup pattern and optimizations
 */

import { useCallback } from "react";

// React 19 ref callback pattern with cleanup
export function useRefWithCleanup<T extends HTMLElement = HTMLElement>(
	setupCallback: (element: T) => (() => void) | void
) {
	return useCallback(
		(element: T | null) => {
			if (!element) return;
			return setupCallback(element);
		},
		[setupCallback]
	);
}

// Event listener setup with React 19 cleanup pattern
export function useEventListener<K extends keyof WindowEventMap>(
	eventType: K,
	handler: (event: WindowEventMap[K]) => void,
	target: Window | Document = window
) {
	return useCallback(
		(element: HTMLElement | null) => {
			if (!element || typeof window === "undefined") return;

			const eventHandler = handler as EventListener;
			target.addEventListener(eventType, eventHandler);

			// React 19 feature: return cleanup function
			return () => {
				target.removeEventListener(eventType, eventHandler);
			};
		},
		[eventType, handler, target]
	);
}

// Outside click detection with React 19 pattern
export function useOutsideClickRef(callback: (event: Event) => void) {
	return useCallback(
		(element: HTMLElement | null) => {
			if (!element) return;

			const handleOutsideClick = (event: Event) => {
				if (!element.contains(event.target as Node)) {
					callback(event);
				}
			};

			document.addEventListener("mousedown", handleOutsideClick);
			document.addEventListener("touchstart", handleOutsideClick);

			// React 19 cleanup
			return () => {
				document.removeEventListener("mousedown", handleOutsideClick);
				document.removeEventListener("touchstart", handleOutsideClick);
			};
		},
		[callback]
	);
}

// Intersection Observer with React 19 cleanup
export function useIntersectionObserverRef(
	callback: IntersectionObserverCallback,
	options?: IntersectionObserverInit
) {
	return useCallback(
		(element: HTMLElement | null) => {
			if (!element || typeof window === "undefined") return;

			const observer = new IntersectionObserver(callback, options);
			observer.observe(element);

			// React 19 cleanup
			return () => {
				observer.unobserve(element);
				observer.disconnect();
			};
		},
		[callback, options]
	);
}

// Scroll listener with React 19 pattern
export function useScrollListenerRef(callback: (scrollY: number) => void) {
	return useCallback(
		(element: HTMLElement | null) => {
			if (!element || typeof window === "undefined") return;

			const handleScroll = () => callback(window.scrollY);
			window.addEventListener("scroll", handleScroll, { passive: true });

			// React 19 cleanup
			return () => {
				window.removeEventListener("scroll", handleScroll);
			};
		},
		[callback]
	);
}

// React Compiler preparation: Pure function helpers
export const createStableCallback = <T extends (...args: any[]) => any>(
	fn: T
): T => {
	// This pattern helps React Compiler identify stable functions
	return fn;
};

// Animation frame with React 19 cleanup
export function useAnimationFrameRef(callback: (time: number) => void) {
	return useCallback(
		(element: HTMLElement | null) => {
			if (!element || typeof window === "undefined") return;

			let animationId: number;
			const animate = (time: number) => {
				callback(time);
				animationId = requestAnimationFrame(animate);
			};

			animationId = requestAnimationFrame(animate);

			// React 19 cleanup
			return () => {
				if (animationId) {
					cancelAnimationFrame(animationId);
				}
			};
		},
		[callback]
	);
}
