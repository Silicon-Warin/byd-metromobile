import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface CarModelDB {
	id: string;
	name: string;
	slug: string;
	description: string;
	price: number;
	image_url_model: string;
	image_url_hero: string;
	image_url_promo: string;
	specs: any;
	colors: any;
	variants: any;
	features: any;
	gallery: any;
	special_offers: string[];
	created_at: string;
	updated_at: string;
}

export interface PromotionDB {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	image_url: string;
	start_date: string;
	end_date: string;
	status: "active" | "upcoming" | "expired";
	discount: string;
	models: string[];
	created_at: string;
	updated_at: string;
}

export interface FileDB {
	id: string;
	name: string;
	original_name: string;
	file_path: string;
	file_size: number;
	file_type: string;
	category: string;
	tags: string[];
	uploaded_by: string;
	created_at: string;
	updated_at: string;
}

// Auth types
export interface UserProfile {
	id: string;
	email: string;
	full_name: string;
	avatar_url: string;
	role: "admin" | "editor" | "viewer";
	created_at: string;
}

// Storage buckets
export const STORAGE_BUCKETS = {
	CAR_IMAGES: "car-images",
	PROMOTION_IMAGES: "promotion-images",
	GENERAL_FILES: "general-files",
} as const;

// Helper functions
export const uploadFile = async (bucket: string, file: File, path?: string) => {
	const fileName = `${Date.now()}-${file.name}`;
	const filePath = path ? `${path}/${fileName}` : fileName;

	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(filePath, file);

	if (error) throw error;
	return data;
};

export const deleteFile = async (bucket: string, path: string) => {
	const { error } = await supabase.storage.from(bucket).remove([path]);

	if (error) throw error;
};

export const getPublicUrl = (bucket: string, path: string) => {
	const { data } = supabase.storage.from(bucket).getPublicUrl(path);

	return data.publicUrl;
};
