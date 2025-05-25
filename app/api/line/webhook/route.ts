import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// LINE Webhook signature verification
function verifySignature(
	body: string,
	signature: string,
	channelSecret: string
): boolean {
	const hash = crypto
		.createHmac("sha256", channelSecret)
		.update(body)
		.digest("base64");

	return hash === signature;
}

export async function POST(request: NextRequest) {
	try {
		console.log("📨 Received LINE webhook request");
		
		const channelSecret = process.env.LINE_CHANNEL_SECRET;
		const signature = request.headers.get("x-line-signature");

		if (!channelSecret || channelSecret === "your_actual_channel_secret_here") {
			console.error("❌ LINE_CHANNEL_SECRET not properly configured");
			console.error("Please set LINE_CHANNEL_SECRET in your .env file with the actual secret from LINE Developers Console");
			return NextResponse.json(
				{ error: "Server configuration error: Missing LINE_CHANNEL_SECRET" },
				{ status: 500 }
			);
		}

		if (!signature) {
			console.error("❌ Missing LINE signature header");
			return NextResponse.json({ error: "Missing signature" }, { status: 400 });
		}

		const body = await request.text();
		console.log("📝 Request body length:", body.length);

		// Verify the signature
		if (!verifySignature(body, signature, channelSecret)) {
			console.error("❌ Invalid LINE signature");
			console.error("Expected signature format: x-line-signature header");
			console.error("Make sure LINE_CHANNEL_SECRET is correct");
			return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
		}

		console.log("✅ Signature verification passed");
		const events = JSON.parse(body).events;

		for (const event of events) {
			console.log("Received LINE event:", event);

			// Handle different event types
			switch (event.type) {
				case "message":
					await handleMessage(event);
					break;
				case "follow":
					await handleFollow(event);
					break;
				case "unfollow":
					await handleUnfollow(event);
					break;
				default:
					console.log("Unhandled event type:", event.type);
			}
		}

		return NextResponse.json({ status: "ok" });
	} catch (error) {
		console.error("Webhook error:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

async function handleMessage(event: any) {
	const userId = event.source.userId;
	const messageText = event.message.text;

	console.log(`Message from ${userId}: ${messageText}`);

	// Auto-reply logic
	if (messageText && messageText.toLowerCase().includes("ทดลองขับ")) {
		await sendAutoReply(
			userId,
			"สวัสดีครับ! สำหรับการทดลองขับ BYD กรุณากรอกข้อมูลผ่านเว็บไซต์ของเรา หรือติดต่อสาขาโชว์รูมใกล้บ้านคุณได้เลยครับ 🚗"
		);
	} else if (
		messageText &&
		(messageText.includes("สวัสดี") || messageText.includes("hello"))
	) {
		await sendAutoReply(
			userId,
			"สวัสดีครับ! ยินดีต้อนรับสู่ BYD Metromobile 🎉 มีอะไรให้ช่วยเหลือไหมครับ?"
		);
	}
}

async function handleFollow(event: any) {
	const userId = event.source.userId;
	console.log(`New follower: ${userId}`);

	// Welcome message
	const welcomeMessage = {
		type: "flex",
		altText: "ยินดีต้อนรับสู่ BYD Metromobile!",
		contents: {
			type: "bubble",
			header: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "text",
						text: "🎉 ยินดีต้อนรับ!",
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
						type: "text",
						text: "ขอบคุณที่เพิ่ม BYD Metromobile เป็นเพื่อน!",
						wrap: true,
						margin: "md",
					},
					{
						type: "text",
						text: "🚗 ทดลองขับรถยนต์ไฟฟ้า BYD\n📱 ติดตามข่าวสารและโปรโมชั่น\n🔧 บริการหลังการขาย",
						wrap: true,
						margin: "lg",
						size: "sm",
						color: "#666666",
					},
				],
			},
			footer: {
				type: "box",
				layout: "vertical",
				contents: [
					{
						type: "button",
						action: {
							type: "uri",
							label: "เยี่ยมชมเว็บไซต์",
							uri: "https://bydmetromobile.com",
						},
						style: "primary",
						color: "#1DB446",
					},
				],
			},
		},
	};

	await sendLineMessage(userId, welcomeMessage);
}

async function handleUnfollow(event: any) {
	const userId = event.source.userId;
	console.log(`User unfollowed: ${userId}`);
}

async function sendAutoReply(userId: string, text: string) {
	const message = {
		type: "text",
		text: text,
	};

	await sendLineMessage(userId, message);
}

async function sendLineMessage(userId: string, message: any) {
	const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

	if (!LINE_CHANNEL_ACCESS_TOKEN) {
		console.error("LINE_CHANNEL_ACCESS_TOKEN not configured");
		return false;
	}

	try {
		const response = await fetch("https://api.line.me/v2/bot/message/push", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: userId,
				messages: [message],
			}),
		});

		if (!response.ok) {
			console.error(
				"Failed to send LINE message:",
				response.status,
				await response.text()
			);
			return false;
		}

		console.log("✅ LINE message sent successfully");
		return true;
	} catch (error) {
		console.error("Error sending LINE message:", error);
		return false;
	}
}

// Handle LINE webhook verification (GET request)
export async function GET() {
	console.log("🔍 LINE Platform webhook verification request received");
	
	// Check if LINE_CHANNEL_SECRET is configured
	const channelSecret = process.env.LINE_CHANNEL_SECRET;
	if (!channelSecret || channelSecret === "your_actual_channel_secret_here") {
		console.warn("⚠️  LINE_CHANNEL_SECRET not properly configured, but returning 200 for verification");
	} else {
		console.log("✅ LINE_CHANNEL_SECRET is configured");
	}
	
	// LINE Platform sends GET request to verify webhook URL
	// We need to return 200 OK for verification to pass
	return NextResponse.json(
		{ 
			message: "Webhook verification successful",
			timestamp: new Date().toISOString(),
			status: "ready"
		},
		{ status: 200 }
	);
}
