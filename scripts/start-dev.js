#!/usr/bin/env node

const { spawn } = require("child_process");

console.log("🚀 Starting BYD Metro development server...");
console.log("📍 Server will be available at: http://localhost:3000");
console.log("🔧 Admin Panel: http://localhost:3000/admin-q9k8v3n1-metro");
console.log("");

// Start the Next.js development server
const dev = spawn("npm", ["run", "dev"], {
	stdio: "inherit",
	shell: true,
});

dev.on("error", (error) => {
	console.error("❌ Failed to start development server:", error);
});

dev.on("close", (code) => {
	console.log(`Development server exited with code ${code}`);
});

// Handle process termination
process.on("SIGINT", () => {
	console.log("\n👋 Shutting down development server...");
	dev.kill("SIGINT");
	process.exit(0);
});

process.on("SIGTERM", () => {
	dev.kill("SIGTERM");
	process.exit(0);
});
