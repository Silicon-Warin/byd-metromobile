#!/usr/bin/env node

/**
 * Production Test Script for LINE TestDrive API
 * Tests the actual production API endpoint
 */

const https = require("https");

const PRODUCTION_URL = "bydmetromobile.com";
const TEST_DATA = {
	name: "Test User - Production",
	phone: "0812345678",
	email: "test@example.com",
	model: "BYD ATTO 3",
	preferredDate: "2025-05-27",
	preferredTime: "10:00",
	location: "Bangkok",
	notes: "Production API test message",
};

async function testProductionAPI() {
	console.log(
		"🚀 Testing Production API: https://bydmetromobile.com/api/test-drive"
	);
	console.log("📝 Test data:", JSON.stringify(TEST_DATA, null, 2));

	const postData = JSON.stringify(TEST_DATA);

	const options = {
		hostname: PRODUCTION_URL,
		port: 443,
		path: "/api/test-drive",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Content-Length": Buffer.byteLength(postData),
			"User-Agent": "BYD-TestScript/1.0",
		},
	};

	return new Promise((resolve, reject) => {
		const req = https.request(options, (res) => {
			console.log(`📊 Status Code: ${res.statusCode}`);
			console.log(`📋 Headers:`, res.headers);

			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				console.log("📨 Response Body:");
				try {
					const jsonResponse = JSON.parse(data);
					console.log(JSON.stringify(jsonResponse, null, 2));

					if (res.statusCode === 200) {
						console.log("✅ API Test Successful!");
						if (jsonResponse.data && jsonResponse.data.sentToLine) {
							console.log("✅ Message sent to LINE successfully!");
						} else {
							console.log("⚠️  API worked but LINE message may have failed");
						}
					} else {
						console.log("❌ API Test Failed - Status:", res.statusCode);
					}
				} catch (error) {
					console.log("Raw response:", data);
					console.log("❌ Invalid JSON response");
				}
				resolve();
			});
		});

		req.on("error", (error) => {
			console.error("❌ Request failed:", error.message);
			reject(error);
		});

		req.on("timeout", () => {
			console.error("❌ Request timed out");
			req.destroy();
			reject(new Error("Timeout"));
		});

		// Set timeout
		req.setTimeout(30000);

		// Send the request
		req.write(postData);
		req.end();
	});
}

async function checkEnvironmentVariables() {
	console.log("\n🔧 Checking Environment Variables...");

	// Note: We can't access Vercel environment variables from local script
	// But we can check if the API endpoint responds correctly

	const requiredEnvVars = [
		"LINE_CHANNEL_ACCESS_TOKEN",
		"LINE_ADMIN_USER_ID",
		"LINE_CHANNEL_SECRET",
	];

	console.log("📝 Required variables for LINE integration:");
	requiredEnvVars.forEach((envVar) => {
		console.log(`   - ${envVar}`);
	});

	console.log(
		"\n⚠️  Note: Environment variables are checked on the server side"
	);
	console.log("    If API returns errors, check Vercel dashboard for env vars");
}

async function main() {
	console.log("🧪 BYD Metromobile - Production API Test");
	console.log("==================================================");

	try {
		await checkEnvironmentVariables();
		await testProductionAPI();

		console.log("\n📋 Next Steps if test fails:");
		console.log("1. Check Vercel dashboard for environment variables");
		console.log("2. Verify LINE Channel Access Token is correct");
		console.log("3. Check LINE Admin User ID is valid");
		console.log("4. Review Vercel function logs for detailed errors");
		console.log("5. Test LINE webhook endpoint separately");
	} catch (error) {
		console.error("\n❌ Test failed:", error.message);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}

module.exports = { testProductionAPI };
