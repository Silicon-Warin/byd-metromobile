import { createClient } from "@supabase/supabase-js";
import { defaultModels, CarModel } from "../data/carModel";

// Load environment variables from .env.local if available
try {
	const fs = require("fs");
	const path = require("path");
	const envLocalPath = path.join(process.cwd(), ".env.local");

	if (fs.existsSync(envLocalPath)) {
		const envContent = fs.readFileSync(envLocalPath, "utf8");
		envContent.split("\n").forEach((line: string) => {
			const [key, value] = line.split("=");
			if (key && value) {
				process.env[key.trim()] = value.trim();
			}
		});
	}
} catch (error) {
	console.log(
		"Could not load .env.local, using existing environment variables"
	);
}

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL?.replace(/"/g, "") || "";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY?.replace(/"/g, "") || "";

if (!supabaseUrl || !supabaseAnonKey) {
	console.error("Missing Supabase environment variables");
	process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to convert CarModel to database format
function convertCarModelToDbFormat(model: CarModel) {
	return {
		name: model.name,
		slug: model.slug || model.name.toLowerCase().replace(/\s+/g, "-"),
		tagline: model.tagline,
		description: model.description,
		price: model.price,
		image_url_promo: model.imageUrlPromo,
		image_url_model: model.imageUrlModel,
		image_url_hero: model.imageUrlHero,
		image_url_real: model.imageUrlReal,
		image_url_data_left: model.imageUrlDataLeft,
		image_url_data_right: model.imageUrlDataRight,
		image_width: model.imageWidth,
		image_height: model.imageHeight,
		features_title: model.featuresTitle,
		special_feature: model.specialFeature,
		special_feature_description: model.specialFeatureDescription,
		special_feature_image: model.specialFeatureImage,
		specs: model.specs,
		colors: model.colors,
		variants: model.variants,
		features: model.features,
		gallery: model.gallery,
		tech_highlight: model.techHighlight,
		tech_spec: model.techSpec,
		special_offers: model.specialOffers || [],
	};
}

async function main() {
	console.log("🌱 Starting seed process...");

	try {
		// First, clear existing data
		console.log("🗑️  Clearing existing car models...");
		const { error: deleteError } = await supabase
			.from("car_models")
			.delete()
			.neq("id", 0); // Delete all records

		if (deleteError) {
			console.error("Error clearing existing data:", deleteError);
		}

		// Convert and insert each model
		console.log(`📝 Converting ${defaultModels.length} car models...`);

		for (const model of defaultModels) {
			const dbModel = convertCarModelToDbFormat(model);

			try {
				const { data: createdModel, error } = await supabase
					.from("car_models")
					.insert([dbModel])
					.select()
					.single();

				if (error) {
					console.error(`❌ Error creating model ${model.name}:`, error);
				} else {
					console.log(
						`✅ Created model: ${createdModel.name} (ID: ${createdModel.id})`
					);
				}
			} catch (error) {
				console.error(`❌ Error creating model ${model.name}:`, error);
			}
		}

		console.log("🎉 Seed process completed successfully!");

		// Show summary
		const { count, error: countError } = await supabase
			.from("car_models")
			.select("id", { count: "exact", head: true });

		if (!countError) {
			console.log(`📊 Total models in database: ${count}`);
		}
	} catch (error) {
		console.error("💥 Seed process failed:", error);
		throw error;
	}
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
