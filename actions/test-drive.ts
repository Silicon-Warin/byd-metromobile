"use server";

import { revalidatePath } from "next/cache";
import {
	testDriveSchema,
	type TestDriveFormData,
} from "@/schema/testDriveSchema";

// Rate limiting storage (in production, use Redis or database)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // 5 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const userRequests = requestCounts.get(ip);

	if (!userRequests) {
		requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return true;
	}

	if (now > userRequests.resetTime) {
		requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
		return true;
	}

	if (userRequests.count >= RATE_LIMIT) {
		return false;
	}

	userRequests.count++;
	return true;
}

async function sendToGoogleAppsScript(
	formData: TestDriveFormData
): Promise<boolean> {
	const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

	if (!GOOGLE_APPS_SCRIPT_URL) {
		console.error("Google Apps Script URL not configured");
		return false;
	}

	try {
		const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error("Google Apps Script error:", errorData);
			return false;
		}

		const result = await response.json();
		return result.success === true;
	} catch (error) {
		console.error("Google Apps Script request failed:", error);
		return false;
	}
}

/* async function saveToDatabase(formData: TestDriveFormData): Promise<boolean> {
	try {
		// TODO: Save to database using Prisma when model is working
		console.log("✅ Test Drive Request logged:", {
			name: formData.name,
			model: formData.model,
			timestamp: new Date().toISOString(),
		});
		return true;
	} catch (error) {
		console.error("Database save error:", error);
		return false;
	}
} */

export async function submitTestDrive(
	prevState: { message: string; success: boolean } | null,
	formData: FormData
): Promise<{ message: string; success: boolean }> {
	try {
		// Rate limiting check (using a simple IP simulation)
		const clientIp = "unknown"; // In production, get from headers
		if (!checkRateLimit(clientIp)) {
			return {
				success: false,
				message: "คุณส่งคำขอมากเกินไป กรุณารอ 1 ชั่วโมงแล้วลองใหม่",
			};
		}

		const phone = ((formData.get("phone") as string) || "").replace(/\D/g, "");
		// Parse and validate form data
		const rawData = {
			name: formData.get("name") as string,
			phone: phone, // <-- ใช้เบอร์โทรที่ทำความสะอาดแล้ว
			email: formData.get("email") as string,
			model: formData.get("model") as string,
			preferredDate: formData.get("preferredDate") as string,
			preferredTime: formData.get("preferredTime") as string,
			location: formData.get("location") as string,
			notes: formData.get("notes") as string,
		};

		// Validate with Zod schema
		const validatedData = testDriveSchema.parse(rawData);

		// Send to Google Apps Script
		const googleScriptSuccess = await sendToGoogleAppsScript(validatedData);

		if (!googleScriptSuccess) {
			return {
				success: false,
				message: "ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
			};
		}

		/* 		// Save to database (optional)
		await saveToDatabase(validatedData); */

		// Revalidate cache
		revalidatePath("/");

		return {
			success: true,
			message: "ส่งคำขอสำเร็จ! ทีมงานจะติดต่อกลับภายใน 24 ชั่วโมง",
		};
	} catch (error) {
		console.error("Test drive submission error:", error);

		if (error instanceof Error) {
			return {
				success: false,
				message: error.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
			};
		}

		return {
			success: false,
			message: "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ กรุณาลองใหม่อีกครั้ง",
		};
	}
}
