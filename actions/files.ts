"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FileFormData = {
	name: string;
	original_name: string;
	file_path: string;
	file_size: number;
	file_type: string;
	category: string;
	tags: string[];
	uploaded_by: string;
};

export async function createFileRecord(fileData: FileFormData) {
	const supabase = await createClient();

	const { error } = await supabase.from("files").insert([fileData]);

	if (error) {
		console.error("Error creating file record:", error);
		throw new Error("Failed to create file record");
	}

	revalidatePath("/admin-q9k8v3n1-metro/files");
}

export async function updateFileRecord(id: string, formData: FormData) {
	const supabase = await createClient();

	const fileData: Partial<FileFormData> = {
		name: formData.get("name") as string,
		category: formData.get("category") as string,
		tags: JSON.parse((formData.get("tags") as string) || "[]"),
	};

	const { error } = await supabase.from("files").update(fileData).eq("id", id);

	if (error) {
		console.error("Error updating file record:", error);
		throw new Error("Failed to update file record");
	}

	revalidatePath("/admin-q9k8v3n1-metro/files");
}

export async function deleteFileRecord(id: string) {
	const supabase = await createClient();

	// First get file info to delete from storage
	const { data: fileData, error: fetchError } = await supabase
		.from("files")
		.select("file_path, category")
		.eq("id", id)
		.single();

	if (fetchError) {
		console.error("Error fetching file data:", fetchError);
		throw new Error("Failed to fetch file data");
	}

	// Delete from storage
	const { error: storageError } = await supabase.storage
		.from(fileData.category)
		.remove([fileData.file_path]);

	if (storageError) {
		console.error("Error deleting file from storage:", storageError);
		// Continue to delete record even if storage deletion fails
	}

	// Delete record from database
	const { error } = await supabase.from("files").delete().eq("id", id);

	if (error) {
		console.error("Error deleting file record:", error);
		throw new Error("Failed to delete file record");
	}

	revalidatePath("/admin-q9k8v3n1-metro/files");
}

export async function getFile(id: string) {
	const supabase = await createClient();

	const { data, error } = await supabase
		.from("files")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error("Error fetching file:", error);
		throw new Error("Failed to fetch file");
	}

	return data;
}

export async function getFiles(category?: string) {
	const supabase = await createClient();

	let query = supabase
		.from("files")
		.select("*")
		.order("created_at", { ascending: false });

	if (category && category !== "all") {
		query = query.eq("category", category);
	}

	const { data, error } = await query;

	if (error) {
		console.error("Error fetching files:", error);
		throw new Error("Failed to fetch files");
	}

	return data || [];
}

export async function uploadFileToStorage(
	file: File,
	bucket: string,
	fileName: string
) {
	const supabase = await createClient();

	const { data, error } = await supabase.storage
		.from(bucket)
		.upload(fileName, file);

	if (error) {
		console.error("Error uploading file:", error);
		throw new Error("Failed to upload file");
	}

	// Get public URL
	const { data: urlData } = supabase.storage
		.from(bucket)
		.getPublicUrl(fileName);

	return {
		path: data.path,
		fullPath: data.fullPath,
		publicUrl: urlData.publicUrl,
	};
}

export async function getFileCategories() {
	const supabase = await createClient();

	const { data, error } = await supabase.from("files").select("category");

	if (error) {
		console.error("Error fetching categories:", error);
		return [];
	}

	// Get unique categories
	const uniqueCategories = Array.from(
		new Set(
			data?.map((item: { category: string }) => item.category).filter(Boolean)
		)
	);

	return uniqueCategories || [];
}
