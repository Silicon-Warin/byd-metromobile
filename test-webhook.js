// Test script for LINE webhook verification
const https = require("https");

const testWebhookVerification = async () => {
	console.log("🧪 Testing LINE Webhook Verification...");

	const options = {
		hostname: "localhost",
		port: 3000,
		path: "/api/line/webhook",
		method: "GET",
		headers: {
			"User-Agent": "LINE-Platform/1.0",
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let data = "";

			console.log(`Status Code: ${res.statusCode}`);
			console.log(`Headers:`, res.headers);

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				console.log(`Response Body:`, data);
				if (res.statusCode === 200) {
					console.log("✅ Webhook verification successful!");
					resolve(true);
				} else {
					console.log("❌ Webhook verification failed");
					resolve(false);
				}
			});
		});

		req.on("error", (error) => {
			console.error("❌ Request failed:", error.message);
			reject(error);
		});

		req.end();
	});
};

// Test webhook POST with mock LINE signature
const testWebhookPost = async () => {
	console.log("\n🧪 Testing LINE Webhook POST...");

	const body = JSON.stringify({
		events: [
			{
				type: "message",
				message: {
					type: "text",
					text: "สวัสดี",
				},
				source: {
					userId: "test-user-id",
				},
			},
		],
	});

	// Generate mock signature (this will fail verification, but tests the endpoint)
	const crypto = require("crypto");
	const signature = crypto
		.createHmac("sha256", process.env.LINE_CHANNEL_SECRET || "test-secret")
		.update(body)
		.digest("base64");

	const options = {
		hostname: "localhost",
		port: 3000,
		path: "/api/line/webhook",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-line-signature": signature,
			"User-Agent": "LINE-Platform/1.0",
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			let data = "";

			console.log(`Status Code: ${res.statusCode}`);

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				console.log(`Response Body:`, data);
				resolve(res.statusCode);
			});
		});

		req.on("error", (error) => {
			console.error("❌ Request failed:", error.message);
			reject(error);
		});

		req.write(body);
		req.end();
	});
};

// Run tests
const runTests = async () => {
	try {
		await testWebhookVerification();
		await testWebhookPost();
	} catch (error) {
		console.error("Test failed:", error);
	}
};

if (require.main === module) {
	runTests();
}

module.exports = { testWebhookVerification, testWebhookPost };
