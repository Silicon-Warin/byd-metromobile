#!/usr/bin/env node

/**
 * Direct LINE API Test Script
 * Tests LINE Messaging API directly to isolate the issue
 */

const https = require("https");

// Load secrets from environment variables to avoid hard-coding sensitive values.
// Ensure you set LINE_CHANNEL_ACCESS_TOKEN and LINE_ADMIN_USER_ID in your shell or in a .env file.
// Never commit actual secret values to the repository.

const LINE_CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || "";
const LINE_ADMIN_USER_ID = process.env.LINE_ADMIN_USER_ID || "";

async function testLineAPI() {
	console.log("🧪 Testing LINE Messaging API Directly");
	console.log("==================================================");

	if (
		!LINE_CHANNEL_ACCESS_TOKEN ||
		LINE_CHANNEL_ACCESS_TOKEN.includes("your_token_here")
	) {
		console.error("❌ LINE_CHANNEL_ACCESS_TOKEN not properly configured");
		return false;
	}

	if (!LINE_ADMIN_USER_ID || LINE_ADMIN_USER_ID.includes("your_user_id_here")) {
		console.error("❌ LINE_ADMIN_USER_ID not properly configured");
		return false;
	}

	const message = {
		to: LINE_ADMIN_USER_ID,
		messages: [
			{
				type: "text",
				text: `🧪 Direct API Test\n\nTime: ${new Date().toLocaleString(
					"th-TH"
				)}\nSource: Direct LINE API Test Script`,
			},
		],
	};

	const postData = JSON.stringify(message);

	const options = {
		hostname: "api.line.me",
		port: 443,
		path: "/v2/bot/message/push",
		method: "POST",
		headers: {
			Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(postData),
		},
	};

	return new Promise((resolve, reject) => {
		console.log("📤 Sending message to LINE API...");
		console.log("📋 User ID:", LINE_ADMIN_USER_ID);
		console.log(
			"🔑 Token (first 20 chars):",
			LINE_CHANNEL_ACCESS_TOKEN.substring(0, 20) + "..."
		);

		const req = https.request(options, (res) => {
			console.log(`📊 Status Code: ${res.statusCode}`);
			console.log(`📋 Headers:`, res.headers);

			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				if (res.statusCode === 200) {
					console.log("✅ LINE API Test Successful!");
					console.log("📨 Message should appear in your LINE chat");
					resolve(true);
				} else {
					console.log("❌ LINE API Test Failed");
					console.log("📨 Response:", data);

					try {
						const errorResponse = JSON.parse(data);
						console.log(
							"🔍 Error Details:",
							JSON.stringify(errorResponse, null, 2)
						);

						if (errorResponse.message) {
							console.log("💡 Error Message:", errorResponse.message);
						}
					} catch (e) {
						console.log("Raw error response:", data);
					}
					resolve(false);
				}
			});
		});

		req.on("error", (error) => {
			console.error("❌ Request failed:", error.message);
			reject(error);
		});

		req.setTimeout(30000);

		req.write(postData);
		req.end();
	});
}

async function validateUserID() {
	console.log("\n🔍 Validating LINE User ID format...");

	const userIdPattern = /^U[a-f0-9]{32}$/;

	if (userIdPattern.test(LINE_ADMIN_USER_ID)) {
		console.log("✅ User ID format is valid");
	} else {
		console.log("❌ User ID format is invalid");
		console.log("Expected format: U + 32 hex characters");
		console.log("Example: Ua1b2c3d4e5f6789abcdef0123456789a");
		return false;
	}

	return true;
}

async function main() {
	console.log("🚀 BYD Metromobile - Direct LINE API Test");
	console.log("==========================================\n");

	try {
		const validUserID = await validateUserID();
		if (!validUserID) {
			console.log("\n📋 To get your correct User ID:");
			console.log("1. Send any message to your LINE Official Account");
			console.log("2. Check the webhook logs in Vercel");
			console.log("3. Look for event.source.userId in the logs");
			return;
		}

		const success = await testLineAPI();

		if (success) {
			console.log("\n✅ SUCCESS: LINE API is working correctly!");
			console.log(
				"💡 If TestDrive form still fails, check Vercel environment variables"
			);
		} else {
			console.log("\n❌ FAILED: LINE API test failed");
			console.log("💡 Check your LINE Channel settings and tokens");
		}

		console.log("\n📋 Troubleshooting checklist:");
		console.log("□ Verify Channel Access Token in LINE Developers Console");
		console.log("□ Ensure Messaging API is enabled for your channel");
		console.log("□ Check that the admin user has added your LINE OA as friend");
		console.log("□ Verify environment variables in Vercel dashboard");
		console.log("□ Check Vercel function logs for detailed error messages");
	} catch (error) {
		console.error("\n❌ Test failed with error:", error.message);
	}
}

if (require.main === module) {
	main();
}

module.exports = { testLineAPI };
