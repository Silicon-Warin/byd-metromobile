// scripts/seedCarModels.ts
import { createClient } from "@supabase/supabase-js";
import { defaultModels } from "../data/carModel";

// ใช้ ENV ของ Supabase
const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function seedCarModels() {
	for (const model of defaultModels) {
		// Map field ให้ตรงกับ schema DB
		const {
			id, // ไม่ต้องส่ง id ให้ DB generate เอง
			name,
			slug,
			description,
			price,
			imageUrlModel,
			imageUrlHero,
			imageUrlPromo,
			specs,
			colors,
			variants,
			features,
			gallery,
			techHighlight,
			specialOffers,
		} = model;

		// Insert
		const { error } = await supabase.from("car_models").insert([
			{
				name,
				slug: slug || name.toLowerCase().replace(/ /g, "-"),
				description,
				price,
				image_url_model: imageUrlModel,
				image_url_hero: imageUrlHero,
				image_url_promo: imageUrlPromo,
				specs,
				colors,
				variants,
				features,
				gallery,
				tech_highlight: techHighlight,
				special_offers: specialOffers,
			},
		]);

		if (error) {
			console.error("❌ Error inserting model:", name, error);
		} else {
			console.log("✅ Seeded:", name);
		}
	}
}

seedCarModels().then(() => {
	console.log("🎉 Seeding complete!");
	process.exit(0);
});
