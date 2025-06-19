"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { onCLS, onFCP, onINP, onLCP, onTTFB, Metric } from "web-vitals";

// Define the gtag function on the window object
declare global {
	interface Window {
		gtag: (type: "event", name: string, params: { [key: string]: any }) => void;
	}
}

function sendToGoogleAnalytics(metric: Metric) {
	// Assumes gtag is available on the window
	if (typeof window.gtag === "function") {
		window.gtag("event", metric.name, {
			// Built-in params:
			value: metric.delta, // Use `delta` so the value can be summed.
			// Custom params:
			metric_id: metric.id, // Needed to aggregate events.
			metric_value: metric.value, // Optional
			metric_delta: metric.delta, // Optional
			event_category: "Web Vitals",
			event_label: metric.id, // id unique to current page load
			non_interaction: true, // avoids affecting bounce rate.
		});
	}
}

export function WebVitalReporter() {
	const pathname = usePathname();

	useEffect(() => {
		// This will only run once per page load per metric
		onCLS(sendToGoogleAnalytics);
		onINP(sendToGoogleAnalytics);
		onLCP(sendToGoogleAnalytics);
		onFCP(sendToGoogleAnalytics);
		onTTFB(sendToGoogleAnalytics);
	}, [pathname]); // Rerun on route change

	return null; // This component doesn't render anything
}
