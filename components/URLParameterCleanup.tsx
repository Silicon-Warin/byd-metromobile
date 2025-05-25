"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Component to clean URL parameters that shouldn't be indexed
 * Removes tracking parameters and redirects to clean URL
 */
export function URLParameterCleanup() {
	const router = useRouter();

	useEffect(() => {
		// List of parameters to remove for SEO purposes
		const parametersToRemove = [
			"utm_source",
			"utm_medium",
			"utm_campaign",
			"utm_content",
			"utm_term",
			"fbclid",
			"gclid",
			"dvhwgj",
			"l18487344_html",
		];

		const url = new URL(window.location.href);
		let hasParametersToRemove = false;

		// Check if any parameters need to be removed
		parametersToRemove.forEach((param) => {
			if (url.searchParams.has(param)) {
				url.searchParams.delete(param);
				hasParametersToRemove = true;
			}
		});

		// Also handle malformed parameters like "dvhwgj/l18487344_html"
		url.searchParams.forEach((value, key) => {
			if (
				key.includes("/") ||
				key.includes("_html") ||
				/^[a-z]{6}$/.test(key)
			) {
				url.searchParams.delete(key);
				hasParametersToRemove = true;
			}
		});

		// If we removed parameters, redirect to clean URL
		if (hasParametersToRemove) {
			const cleanUrl =
				url.pathname +
				(url.searchParams.toString() ? "?" + url.searchParams.toString() : "");

			// Use replace to avoid adding to browser history
			router.replace(cleanUrl);
		}
	}, [router]);

	return null; // This component doesn't render anything
}

export default URLParameterCleanup;
