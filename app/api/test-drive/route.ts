import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// TODO: Uncomment when Prisma is working properly
// const prisma = new PrismaClient();

interface TestDriveFormData {
	name: string;
	phone: string;
	email: string;
	model: string;
	preferredDate: string;
	preferredTime: string;
	location: string;
	notes: string;
}

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

function validateFormData(data: any): TestDriveFormData | null {
	// Basic validation
	if (
		!data.name ||
		typeof data.name !== "string" ||
		data.name.trim().length < 2
	) {
		return null;
	}

	if (
		!data.phone ||
		typeof data.phone !== "string" ||
		!/^[0-9\-\+\(\)\s]{8,15}$/.test(data.phone.trim())
	) {
		return null;
	}

	if (!data.model || typeof data.model !== "string") {
		return null;
	}

	if (!data.preferredDate || typeof data.preferredDate !== "string") {
		return null;
	}

	// Sanitize and validate email if provided
	if (
		data.email &&
		(typeof data.email !== "string" ||
			!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
	) {
		return null;
	}

	return {
		name: data.name.trim(),
		phone: data.phone.trim(),
		email: data.email?.trim() || "",
		model: data.model.trim(),
		preferredDate: data.preferredDate.trim(),
		preferredTime: data.preferredTime?.trim() || "",
		location: data.location?.trim() || "",
		notes: data.notes?.trim() || "",
	};
}

async function sendToLineMessaging(
	formData: TestDriveFormData
): Promise<boolean> {
	const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
	const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;

	if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
		console.error(
			"LINE_CHANNEL_ACCESS_TOKEN or LINE_ADMIN_USER_ID not configured"
		);
		return false;
	}

	// Create a rich message with Flex Message format
	const flexMessage = {
		type: "flex",
		altText: "คำขอทดลองขับ BYD ใหม่",
		contents: {
			type: "bubble",
			header: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "🚗 คำขอทดลองขับ BYD",
						weight: "bold",
						size: "xl",
						color: "#1DB446",
					},
				],
				backgroundColor: "#f8f9fa",
			},
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "👤 ชื่อ-นามสกุล:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.name,
								size: "sm",
								color: "#333333",
								flex: 3,
								wrap: true,
							},
						],
						margin: "md",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "📞 เบอร์โทร:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.phone,
								size: "sm",
								color: "#333333",
								flex: 3,
							},
						],
						margin: "md",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "📧 อีเมล:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.email || "ไม่ระบุ",
								size: "sm",
								color: "#333333",
								flex: 3,
								wrap: true,
							},
						],
						margin: "md",
					},
					{
						type: "separator",
						margin: "lg",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "🚙 รุ่นที่สนใจ:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.model,
								size: "sm",
								color: "#1DB446",
								flex: 3,
								weight: "bold",
							},
						],
						margin: "lg",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "📅 วันที่ต้องการ:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.preferredDate,
								size: "sm",
								color: "#333333",
								flex: 3,
							},
						],
						margin: "md",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "⏰ เวลาที่ต้องการ:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.preferredTime || "ไม่ระบุ",
								size: "sm",
								color: "#333333",
								flex: 3,
							},
						],
						margin: "md",
					},
					{
						type: "box",
						layout: "baseline",
						contents: [
							{
								type: "text",
								text: "📍 สถานที่:",
								size: "sm",
								color: "#666666",
								flex: 2,
							},
							{
								type: "text",
								text: formData.location || "ไม่ระบุ",
								size: "sm",
								color: "#333333",
								flex: 3,
								wrap: true,
							},
						],
						margin: "md",
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "separator",
						margin: "md",
					},
					{
						type: "text",
						text: `📝 หมายเหตุ: ${formData.notes || "ไม่มี"}`,
						size: "xs",
						color: "#666666",
						wrap: true,
						margin: "md",
					},
					{
						type: "text",
						text: `⏰ เวลาส่ง: ${new Date().toLocaleString("th-TH", {
							timeZone: "Asia/Bangkok",
						})}`,
						size: "xs",
						color: "#999999",
						margin: "sm",
					},
					{
						type: "text",
						text: "ส่งผ่าน: Website Form API",
						size: "xs",
						color: "#999999",
					},
				],
			},
		},
	};

	try {
		const response = await fetch("https://api.line.me/v2/bot/message/push", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: LINE_ADMIN_USER_ID,
				messages: [flexMessage],
			}),
		});

		if (!response.ok) {
			console.error(
				"LINE Messaging API error:",
				response.status,
				await response.text()
			);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Failed to send LINE message:", error);
		return false;
	}
}

async function saveToDatabase(
	formData: TestDriveFormData,
	request: NextRequest
): Promise<boolean> {
	try {
		const forwarded = request.headers.get("x-forwarded-for");
		const realIp = request.headers.get("x-real-ip");
		const ipAddress = forwarded?.split(",")[0] || realIp || "unknown";
		const userAgent = request.headers.get("user-agent") || "unknown"; // TODO: Save to database using Prisma when model is working
		/*
		await prisma.testDriveRequest.create({
			data: {
				name: formData.name,
				phone: formData.phone,
				email: formData.email || null,
				model: formData.model,
				preferredDate: formData.preferredDate,
				preferredTime: formData.preferredTime || null,
				location: formData.location || null,
				notes: formData.notes || null,
				source: "website",
				ipAddress,
				userAgent,
			},
		});
		*/

		// For now, log the data
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
}

export async function POST(request: NextRequest) {
	try {
		// Get client IP for rate limiting
		const forwarded = request.headers.get("x-forwarded-for");
		const realIp = request.headers.get("x-real-ip");
		const ip = forwarded?.split(",")[0] || realIp || "unknown";

		// Check rate limit
		if (!checkRateLimit(ip)) {
			return NextResponse.json(
				{ error: "Rate limit exceeded. Please try again later." },
				{ status: 429 }
			);
		}

		// Parse and validate request body
		const body = await request.json();
		const validatedData = validateFormData(body);

		if (!validatedData) {
			return NextResponse.json(
				{ error: "Invalid form data provided." },
				{ status: 400 }
			);
		} // Save to database
		const savedToDb = await saveToDatabase(validatedData, request);

		// Send LINE message
		const sentToLine = await sendToLineMessaging(validatedData);

		if (!savedToDb && !sentToLine) {
			return NextResponse.json(
				{ error: "Failed to process request. Please try again." },
				{ status: 500 }
			);
		}

		// Success response
		return NextResponse.json({
			success: true,
			message: "Test drive request submitted successfully.",
			data: {
				name: validatedData.name,
				model: validatedData.model,
				preferredDate: validatedData.preferredDate,
				savedToDatabase: savedToDb,
				sentToLine: sentToLine,
			},
		});
	} catch (error) {
		console.error("Test drive API error:", error);
		return NextResponse.json(
			{ error: "Internal server error. Please try again later." },
			{ status: 500 }
		);
	}
}

// Handle unsupported methods
export async function GET() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
