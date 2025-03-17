const requiredEnvVars = [
	"LINE_CHANNEL_ACCESS_TOKEN",
	"LINE_USER_ID",
	"NEXT_PUBLIC_API_URL",
];

function verifyEnv() {
	const missing = requiredEnvVars.filter((key) => !process.env[key]);

	if (missing.length > 0) {
		console.error(
			`Missing required environment variables: ${missing.join(", ")}`
		);
		process.exit(1);
	}

	console.log("Environment validation passed");
}

verifyEnv();
