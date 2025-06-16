// utils/analytics.ts - สำหรับติดตาม 404 errors

export interface Error404Data {
	timestamp: string;
	path: string;
	referrer: string;
	userAgent: string;
	suggestedUrl?: string;
	wasRedirected: boolean;
}

export class Analytics404 {
	private static instance: Analytics404;
	private errors: Error404Data[] = [];

	static getInstance(): Analytics404 {
		if (!Analytics404.instance) {
			Analytics404.instance = new Analytics404();
		}
		return Analytics404.instance;
	}

	// บันทึก 404 error
	track404(
		path: string,
		suggestedUrl?: string,
		wasRedirected: boolean = false
	) {
		if (typeof window === "undefined") return; // Server-side check

		const error404: Error404Data = {
			timestamp: new Date().toISOString(),
			path,
			referrer: document.referrer || "direct",
			userAgent: navigator.userAgent,
			suggestedUrl,
			wasRedirected,
		};

		this.errors.push(error404);

		// เก็บใน localStorage สำหรับดูข้อมูล
		try {
			const stored = JSON.parse(localStorage.getItem("byd_404_errors") || "[]");
			stored.push(error404);

			// เก็บแค่ 50 รายการล่าสุด
			if (stored.length > 50) {
				stored.splice(0, stored.length - 50);
			}

			localStorage.setItem("byd_404_errors", JSON.stringify(stored));
		} catch (e) {
			console.warn("ไม่สามารถบันทึกข้อมูล 404 ได้:", e);
		}

		// ส่งไป Google Analytics หรือ tracking service อื่น (ถ้ามี)
		this.sendToAnalytics(error404);
	}

	private sendToAnalytics(data: Error404Data) {
		// Google Analytics 4
		if (typeof window !== "undefined" && (window as any).gtag) {
			(window as any).gtag("event", "page_not_found", {
				page_path: data.path,
				suggested_url: data.suggestedUrl,
				was_redirected: data.wasRedirected,
				custom_parameter_1: data.referrer,
			});
		}

		// คุณสามารถเพิ่ม tracking services อื่นได้ที่นี่
		console.log("404 Tracked:", data);
	}

	// ดูสถิติ 404 errors
	getStats() {
		if (typeof window === "undefined") return { total: 0, recent: [] };

		try {
			const stored = JSON.parse(localStorage.getItem("byd_404_errors") || "[]");
			return {
				total: stored.length,
				recent: stored.slice(-10).reverse(), // 10 รายการล่าสุด
				mostCommon: this.getMostCommonErrors(stored),
			};
		} catch (e) {
			return { total: 0, recent: [], mostCommon: [] };
		}
	}

	private getMostCommonErrors(errors: Error404Data[]) {
		const pathCounts: Record<string, number> = {};
		errors.forEach((error) => {
			pathCounts[error.path] = (pathCounts[error.path] || 0) + 1;
		});

		return Object.entries(pathCounts)
			.sort(([, a], [, b]) => b - a)
			.slice(0, 5)
			.map(([path, count]) => ({ path, count }));
	}

	// ล้างข้อมูล 404 (สำหรับ admin)
	clear404Data() {
		if (typeof window !== "undefined") {
			localStorage.removeItem("byd_404_errors");
			this.errors = [];
		}
	}
}
