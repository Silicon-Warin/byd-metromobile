"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type PromotionFormData = {
	title: string;
	subtitle?: string;
	description: string;
	image_url: string;
	start_date: string;
	end_date: string;
	status: "active" | "upcoming" | "expired";
	discount?: number;
	models: string[];
};

export async function createPromotion(formData: FormData) {
	const supabase = await createClient();

	const promotionData: PromotionFormData = {
		title: formData.get("title") as string,
		subtitle: (formData.get("subtitle") as string) || undefined,
		description: formData.get("description") as string,
		image_url: formData.get("image_url") as string,
		start_date: formData.get("start_date") as string,
		end_date: formData.get("end_date") as string,
		status: formData.get("status") as "active" | "upcoming" | "expired",
		discount: formData.get("discount")
			? parseFloat(formData.get("discount") as string)
			: undefined,
		models: JSON.parse((formData.get("models") as string) || "[]"),
	};

	const { error } = await supabase.from("promotions").insert([promotionData]);

	if (error) {
		console.error("Error creating promotion:", error);
		throw new Error("Failed to create promotion");
	}

	revalidatePath("/admin-q9k8v3n1-metro/promotions");
	redirect("/admin-q9k8v3n1-metro/promotions");
}

export async function updatePromotion(id: string, formData: FormData) {
	const supabase = await createClient();

	const promotionData: Partial<PromotionFormData> = {
		title: formData.get("title") as string,
		subtitle: (formData.get("subtitle") as string) || undefined,
		description: formData.get("description") as string,
		image_url: formData.get("image_url") as string,
		start_date: formData.get("start_date") as string,
		end_date: formData.get("end_date") as string,
		status: formData.get("status") as "active" | "upcoming" | "expired",
		discount: formData.get("discount")
			? parseFloat(formData.get("discount") as string)
			: undefined,
		models: JSON.parse((formData.get("models") as string) || "[]"),
	};

	const { error } = await supabase
		.from("promotions")
		.update(promotionData)
		.eq("id", id);

	if (error) {
		console.error("Error updating promotion:", error);
		throw new Error("Failed to update promotion");
	}

	revalidatePath("/admin-q9k8v3n1-metro/promotions");
	redirect("/admin-q9k8v3n1-metro/promotions");
}

export async function deletePromotion(id: string) {
	const supabase = await createClient();

	const { error } = await supabase.from("promotions").delete().eq("id", id);

	if (error) {
		console.error("Error deleting promotion:", error);
		throw new Error("Failed to delete promotion");
	}

	revalidatePath("/admin-q9k8v3n1-metro/promotions");
}

export async function getPromotion(id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("promotions")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching promotion:", error);
		throw new Error("Failed to fetch promotion");
	}

	return data;
}

export async function getPromotions() {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("promotions")
		.select("*")
		.order("updated_at", { ascending: false });

	if (error) {
		console.error("Error fetching promotions:", error);
		throw new Error("Failed to fetch promotions");
	}

	return data || [];
}

export async function updatePromotionStatus(
	id: string,
	status: "active" | "upcoming" | "expired"
) {
	const supabase = await createClient();

	const { error } = await supabase
		.from("promotions")
		.update({ status })
		.eq("id", id);

	if (error) {
		console.error("Error updating promotion status:", error);
		throw new Error("Failed to update promotion status");
	}

	revalidatePath("/admin-q9k8v3n1-metro/promotions");
}

// Form action wrapper for status change
export async function handleStatusChange(formData: FormData) {
	const id = formData.get("id") as string;
	const status = formData.get("status") as "active" | "upcoming" | "expired";
	await updatePromotionStatus(id, status);
}

// Form action wrapper for deletion
export async function handleDeletePromotion(formData: FormData) {
	const id = formData.get("id") as string;
	await deletePromotion(id);
}
