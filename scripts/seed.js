const { execSync } = require("child_process");

console.log("🌱 Starting database seeding process...");

try {
	// Run the TypeScript seed file using tsx
	execSync("npx tsx prisma/seed.ts", { stdio: "inherit" });
	console.log("✅ Seeding completed successfully!");
} catch (error) {
	console.error("❌ Seeding failed:", error.message);
	process.exit(1);
}
