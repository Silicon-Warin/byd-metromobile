import { NextRequest, NextResponse } from "next/server";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;

// Rate limiting: เก็บ IP addresses และเวลาที่ส่งล่าสุด
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 นาที
const MAX_REQUESTS_PER_WINDOW = 3; // สูงสุด 3 ครั้งต่อนาที

// Input validation และ sanitization
function validateAndSanitizeInput(data: any) {
	const { name, email, phone, subject, message } = data;

	// ตรวจสอบความยาวข้อความ
	if (name && name.length > 100) return { error: "ชื่อยาวเกินไป" };
	if (email && email.length > 100) return { error: "อีเมลยาวเกินไป" };
	if (phone && phone.length > 20) return { error: "เบอร์โทรยาวเกินไป" };
	if (subject && subject.length > 200) return { error: "หัวข้อยาวเกินไป" };
	if (message && message.length > 1000) return { error: "ข้อความยาวเกินไป" };

	// ตรวจสอบรูปแบบอีเมล
	if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		return { error: "รูปแบบอีเมลไม่ถูกต้อง" };
	}

	// ตรวจสอบรูปแบบเบอร์โทร
	if (phone && !/^[0-9+\-\s()]{8,20}$/.test(phone)) {
		return { error: "รูปแบบเบอร์โทรไม่ถูกต้อง" };
	}

	// ป้องกัน XSS โดยการลบ HTML tags
	const sanitize = (str: string) => str?.replace(/<[^>]*>/g, "").trim() || "";

	return {
		name: sanitize(name),
		email: sanitize(email),
		phone: sanitize(phone),
		subject: sanitize(subject),
		message: sanitize(message),
	};
}

function checkRateLimit(ip: string): boolean {
	const now = Date.now();
	const requests = rateLimitMap.get(ip) || [];

	// ลบ requests ที่เก่ากว่า window
	const validRequests = requests.filter(
		(time) => now - time < RATE_LIMIT_WINDOW
	);

	if (validRequests.length >= MAX_REQUESTS_PER_WINDOW) {
		return false; // เกิน rate limit
	}

	// เพิ่ม request ปัจจุบัน
	validRequests.push(now);
	rateLimitMap.set(ip, validRequests);

	return true;
}

async function sendToLineOA({ name, email, phone, subject, message }: any) {
	if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
		console.error("LINE env not set");
		return false;
	}

	// เพิ่ม timestamp
	const timestamp = new Date().toLocaleString("th-TH", {
		timeZone: "Asia/Bangkok",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
	});

	const flexMessage = {
		type: "flex",
		altText: "Contact Us Message",
		contents: {
			type: "bubble",
			header: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "📩 ข้อความจาก Contact Us",
						weight: "bold",
						size: "lg",
						color: "#1DB446",
					},
					{
						type: "text",
						text: `🕐 ${timestamp}`,
						size: "sm",
						color: "#666666",
					},
				],
				backgroundColor: "#f8f9fa",
			},
			body: {
				type: "box",
				layout: "vertical",
				contents: [
					{ type: "text", text: `👤 ชื่อ: ${name || "-"}` },
					{ type: "text", text: `📞 เบอร์: ${phone || "-"}` },
					{ type: "text", text: `📧 อีเมล: ${email || "-"}` },
					{ type: "text", text: `📝 หัวข้อ: ${subject || "-"}` },
					{ type: "text", text: `💬 ข้อความ: ${message || "-"}` },
				],
			},
		},
	};

	try {
		const res = await fetch("https://api.line.me/v2/bot/message/push", {
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

		if (!res.ok) {
			console.error("LINE API Error:", res.status, res.statusText);
			return false;
		}

		return true;
	} catch (error) {
		console.error("Error sending to LINE:", error);
		return false;
	}
}

export async function POST(req: NextRequest) {
	try {
		// ตรวจสอบ rate limit
		const ip =
			req.headers.get("x-forwarded-for") ||
			req.headers.get("x-real-ip") ||
			"unknown";
		if (!checkRateLimit(ip)) {
			return NextResponse.json(
				{ error: "ส่งข้อความบ่อยเกินไป กรุณารอสักครู่" },
				{ status: 429 }
			);
		}

		const body = await req.json();

		// ตรวจสอบว่ามีข้อมูลส่งมาหรือไม่
		if (!body || typeof body !== "object") {
			return NextResponse.json({ error: "ข้อมูลไม่ถูกต้อง" }, { status: 400 });
		}

		// Validate และ sanitize input
		const validationResult = validateAndSanitizeInput(body);
		if ("error" in validationResult) {
			return NextResponse.json(
				{ error: validationResult.error },
				{ status: 400 }
			);
		}

		const { name, email, phone, subject, message } = validationResult;

		// ตรวจสอบว่ามีข้อมูลที่จำเป็นหรือไม่
		if (!name && !email && !phone && !message) {
			return NextResponse.json(
				{ error: "กรุณากรอกข้อมูลอย่างน้อย 1 ช่อง" },
				{ status: 400 }
			);
		}

		const sent = await sendToLineOA({ name, email, phone, subject, message });
		if (!sent) {
			return NextResponse.json(
				{ error: "ส่งข้อความไม่สำเร็จ กรุณาลองใหม่" },
				{ status: 500 }
			);
		}

		return NextResponse.json({ success: true });
	} catch (e) {
		console.error("API Error:", e);
		return NextResponse.json(
			{ error: "เกิดข้อผิดพลาดของระบบ" },
			{ status: 500 }
		);
	}
}

export async function GET() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
