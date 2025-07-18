import { createClient } from "@/lib/supabase/client";
import {
	CarModel,
	CarColor,
	CarVariant,
	CarFeature,
	hightlightSpec,
} from "@/data/carModel";

// Database model type (from Supabase)
export interface DbCarModel {
	id: number;
	name: string;
	slug: string;
	tagline?: string;
	description: string;
	price: number;
	image_url_promo: string;
	image_url_model: string;
	image_url_hero?: string;
	image_url_real?: string;
	image_url_data_left?: string;
	image_url_data_right?: string;
	image_width: number;
	image_height: number;
	features_title: string;
	special_feature?: string;
	special_feature_description?: string;
	special_feature_image?: string;
	specs?: any;
	colors?: any;
	variants?: any;
	features?: any;
	gallery?: any;
	tech_highlight?: any;
	tech_spec?: any;
	special_offers?: string[];
	created_at?: string;
	updated_at?: string;
}

// Convert database model to frontend CarModel interface
export function convertDbModelToCarModel(dbModel: DbCarModel): CarModel {
	return {
		id: dbModel.id,
		name: dbModel.name,
		slug: dbModel.slug,
		tagline: dbModel.tagline,
		description: dbModel.description,
		price: dbModel.price,
		imageUrlPromo: dbModel.image_url_promo,
		imageUrlModel: dbModel.image_url_model,
		imageUrlHero: dbModel.image_url_hero,
		imageUrlReal: dbModel.image_url_real,
		imageUrlDataLeft: dbModel.image_url_data_left,
		imageUrlDataRight: dbModel.image_url_data_right,
		imageWidth: dbModel.image_width,
		imageHeight: dbModel.image_height,
		featuresTitle: dbModel.features_title,
		specialFeature: dbModel.special_feature || "",
		specialFeatureDescription: dbModel.special_feature_description || "",
		specialFeatureImage: dbModel.special_feature_image || "",
		specs: dbModel.specs,
		colors: dbModel.colors as CarColor[],
		variants: dbModel.variants as CarVariant[],
		features: dbModel.features as CarFeature[],
		gallery: dbModel.gallery,
		techHighlight: dbModel.tech_highlight as hightlightSpec[],
		techSpec: dbModel.tech_spec,
		specialOffers: dbModel.special_offers || [],
	};
}

// Service class for car model operations
export class CarModelService {
	private supabase = createClient();

	// Get all car models
	async getAllModels(): Promise<CarModel[]> {
		try {
			const { data, error } = await this.supabase
				.from("car_models")
				.select("*")
				.order("updated_at", { ascending: false });

			if (error) {
				console.error("Error fetching car models:", error);
				throw new Error("Failed to fetch car models");
			}

			return data?.map(convertDbModelToCarModel) || [];
		} catch (error) {
			console.error("Service error fetching car models:", error);
			throw error;
		}
	}

	// Get car model by slug
	async getModelBySlug(slug: string): Promise<CarModel | null> {
		try {
			const { data, error } = await this.supabase
				.from("car_models")
				.select("*")
				.eq("slug", slug)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					// No rows found
					return null;
				}
				console.error("Error fetching car model by slug:", error);
				throw new Error("Failed to fetch car model");
			}

			return data ? convertDbModelToCarModel(data) : null;
		} catch (error) {
			console.error("Service error fetching car model by slug:", error);
			throw error;
		}
	}

	// Get car model by ID
	async getModelById(id: number): Promise<CarModel | null> {
		try {
			const { data, error } = await this.supabase
				.from("car_models")
				.select("*")
				.eq("id", id)
				.single();

			if (error) {
				if (error.code === "PGRST116") {
					// No rows found
					return null;
				}
				console.error("Error fetching car model by ID:", error);
				throw new Error("Failed to fetch car model");
			}

			return data ? convertDbModelToCarModel(data) : null;
		} catch (error) {
			console.error("Service error fetching car model by ID:", error);
			throw error;
		}
	}

	// Get featured models (you can customize the logic)
	async getFeaturedModels(limit: number = 3): Promise<CarModel[]> {
		try {
			const { data, error } = await this.supabase
				.from("car_models")
				.select("*")
				.order("updated_at", { ascending: false })
				.limit(limit);

			if (error) {
				console.error("Error fetching featured car models:", error);
				throw new Error("Failed to fetch featured car models");
			}

			return data?.map(convertDbModelToCarModel) || [];
		} catch (error) {
			console.error("Service error fetching featured car models:", error);
			throw error;
		}
	}

	// Search models by name or description
	async searchModels(query: string): Promise<CarModel[]> {
		try {
			const { data, error } = await this.supabase
				.from("car_models")
				.select("*")
				.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
				.order("updated_at", { ascending: false });

			if (error) {
				console.error("Error searching car models:", error);
				throw new Error("Failed to search car models");
			}

			return data?.map(convertDbModelToCarModel) || [];
		} catch (error) {
			console.error("Service error searching car models:", error);
			throw error;
		}
	}
}

// Create a singleton instance
export const carModelService = new CarModelService();

// Helper function to find model by slug (backwards compatibility)
export async function findModelBySlug(
	slug: string
): Promise<CarModel | undefined> {
	try {
		const model = await carModelService.getModelBySlug(slug);
		return model || undefined;
	} catch (error) {
		console.error("Error finding model by slug:", error);
		return undefined;
	}
}
