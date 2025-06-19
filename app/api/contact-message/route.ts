import { NextRequest, NextResponse } from "next/server";

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID;

async function sendToLineOA({ name, email, phone, subject, message }: any) {
	if (!LINE_CHANNEL_ACCESS_TOKEN || !LINE_ADMIN_USER_ID) {
		console.error("LINE env not set");
		return false;
	}
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
	return res.ok;
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, phone, subject, message } = body;
		const sent = await sendToLineOA({ name, email, phone, subject, message });
		if (!sent) {
			return NextResponse.json(
				{ error: "ส่งไป LINE OA ไม่สำเร็จ" },
				{ status: 500 }
			);
		}
		return NextResponse.json({ success: true });
	} catch (e) {
		return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 });
	}
}

export async function GET() {
	return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
