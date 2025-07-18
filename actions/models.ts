"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ModelFormData = {
	name: string;
	slug: string;
	tagline?: string;
	description: string;
	price: number;
	imageUrlPromo: string;
	imageUrlModel: string;
	imageUrlHero?: string;
	imageUrlReal?: string;
	imageUrlDataLeft?: string;
	imageUrlDataRight?: string;
	imageWidth: number;
	imageHeight: number;
	featuresTitle: string;
	specialFeature?: string;
	specialFeatureDescription?: string;
	specialFeatureImage?: string;

	// JSON fields
	specs?: {
		acceleration: string;
		range: string;
		drivetrain?: string;
		motor: string;
		battery?: string;
		charging?: string;
		annotate?: string;
	};
	colors?: Array<{
		name: string;
		code: string;
		image: string;
		gradient?: string;
		shadow?: string;
		border?: string;
	}>;
	variants?: Array<{
		id: string;
		name: string;
		price: number;
		range: string;
		power?: string;
		acceleration?: string;
		accelerationData?: {
			value: string;
			unit: string;
			description: string;
		};
		loanTiers?: Array<{
			downPaymentPercentage: number;
			terms: Array<{
				months: number;
				interestRate: number;
			}>;
		}>;
		techSpec?: Record<string, any>;
	}>;
	features?: Array<{
		title: string;
		description: string;
		image: string;
	}>;
	gallery?: {
		exterior?: string[];
		interior?: string[];
	};
	techHighlight?: Array<{
		title: string;
		description: string;
		image: string;
	}>;
	techSpec?: Record<string, any>;
	specialOffers?: string[];
};

export async function createModel(formData: FormData) {
	const supabase = await createClient();

	// Map form data to database column names
	const dbData = {
		name: formData.get("name") as string,
		slug: formData.get("slug") as string,
		tagline: (formData.get("tagline") as string) || undefined,
		description: formData.get("description") as string,
		price: parseInt(formData.get("price") as string),
		image_url_promo: formData.get("imageUrlPromo") as string,
		image_url_model: formData.get("imageUrlModel") as string,
		image_url_hero: (formData.get("imageUrlHero") as string) || undefined,
		image_url_real: (formData.get("imageUrlReal") as string) || undefined,
		image_url_data_left:
			(formData.get("imageUrlDataLeft") as string) || undefined,
		image_url_data_right:
			(formData.get("imageUrlDataRight") as string) || undefined,
		image_width: parseInt(formData.get("imageWidth") as string),
		image_height: parseInt(formData.get("imageHeight") as string),
		features_title: formData.get("featuresTitle") as string,
		special_feature: (formData.get("specialFeature") as string) || undefined,
		special_feature_description:
			(formData.get("specialFeatureDescription") as string) || undefined,
		special_feature_image:
			(formData.get("specialFeatureImage") as string) || undefined,

		// Parse JSON fields
		specs: JSON.parse((formData.get("specs") as string) || "null"),
		colors: JSON.parse((formData.get("colors") as string) || "null"),
		variants: JSON.parse((formData.get("variants") as string) || "null"),
		features: JSON.parse((formData.get("features") as string) || "null"),
		gallery: JSON.parse((formData.get("gallery") as string) || "null"),
		tech_highlight: JSON.parse(
			(formData.get("techHighlight") as string) || "null"
		),
		tech_spec: JSON.parse((formData.get("techSpec") as string) || "null"),
		special_offers: JSON.parse(
			(formData.get("specialOffers") as string) || "[]"
		),
	};

	const { error } = await supabase.from("car_models").insert([dbData]);

	if (error) {
		console.error("Error creating model:", error);
		throw new Error("Failed to create model");
	}

	revalidatePath("/admin-q9k8v3n1-metro/models");
	redirect("/admin-q9k8v3n1-metro/models");
}

export async function updateModel(id: string, formData: FormData) {
	const supabase = await createClient();

	// Map form data to database column names
	const dbData = {
		name: formData.get("name") as string,
		slug: formData.get("slug") as string,
		tagline: (formData.get("tagline") as string) || undefined,
		description: formData.get("description") as string,
		price: parseInt(formData.get("price") as string),
		image_url_promo: formData.get("imageUrlPromo") as string,
		image_url_model: formData.get("imageUrlModel") as string,
		image_url_hero: (formData.get("imageUrlHero") as string) || undefined,
		image_url_real: (formData.get("imageUrlReal") as string) || undefined,
		image_url_data_left:
			(formData.get("imageUrlDataLeft") as string) || undefined,
		image_url_data_right:
			(formData.get("imageUrlDataRight") as string) || undefined,
		image_width: parseInt(formData.get("imageWidth") as string) || undefined,
		image_height: parseInt(formData.get("imageHeight") as string) || undefined,
		features_title: formData.get("featuresTitle") as string,
		special_feature: (formData.get("specialFeature") as string) || undefined,
		special_feature_description:
			(formData.get("specialFeatureDescription") as string) || undefined,
		special_feature_image:
			(formData.get("specialFeatureImage") as string) || undefined,
		specs: JSON.parse((formData.get("specs") as string) || "null"),
		colors: JSON.parse((formData.get("colors") as string) || "null"),
		variants: JSON.parse((formData.get("variants") as string) || "null"),
		features: JSON.parse((formData.get("features") as string) || "null"),
		gallery: JSON.parse((formData.get("gallery") as string) || "null"),
		tech_highlight: JSON.parse(
			(formData.get("techHighlight") as string) || "null"
		),
		tech_spec: JSON.parse((formData.get("techSpec") as string) || "null"),
		special_offers: JSON.parse(
			(formData.get("specialOffers") as string) || "[]"
		),
	};

	const { error } = await supabase
		.from("car_models")
		.update(dbData)
		.eq("id", id);

	if (error) {
		console.error("Error updating model:", error);
		throw new Error("Failed to update model");
	}

	revalidatePath("/admin-q9k8v3n1-metro/models");
	redirect("/admin-q9k8v3n1-metro/models");
}

export async function deleteModel(id: string) {
	const supabase = await createClient();

	const { error } = await supabase.from("car_models").delete().eq("id", id);

	if (error) {
		console.error("Error deleting model:", error);
		throw new Error("Failed to delete model");
	}

	revalidatePath("/admin-q9k8v3n1-metro/models");
}

export async function getModel(id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("car_models")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching model:", error);
		throw new Error("Failed to fetch model");
	}

	return data;
}

export async function getModels() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("car_models")
		.select("*")
		.order("updated_at", { ascending: false });

	if (error) {
		console.error("Error fetching models:", error);
		throw new Error("Failed to fetch models");
	}

	return data || [];
}

// Form action wrapper for deletion
export async function handleDeleteModel(formData: FormData) {
	const id = formData.get("id") as string;
	await deleteModel(id);
}
