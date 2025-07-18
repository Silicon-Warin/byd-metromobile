"use server";

import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return redirect(
			"/admin-q9k8v3n1-metro/login?message=กรุณากรอกอีเมลและรหัสผ่าน"
		);
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		console.error("Login error:", error);

		// Provide more specific error messages
		let errorMessage = "ไม่สามารถเข้าสู่ระบบได้";

		if (error.message.includes("Invalid login credentials")) {
			errorMessage = "อีเมลหรือรหัสผ่านไม่ถูกต้อง";
		} else if (error.message.includes("Email not confirmed")) {
			errorMessage = "กรุณายืนยันอีเมลก่อนเข้าสู่ระบบ";
		} else if (error.message.includes("Too many requests")) {
			errorMessage = "พยายามเข้าสู่ระบบบ่อยเกินไป กรุณารอสักครู่";
		}

		return redirect(
			`/admin-q9k8v3n1-metro/login?message=${encodeURIComponent(errorMessage)}`
		);
	}

	return redirect("/admin-q9k8v3n1-metro");
}

export async function signup(formData: FormData) {
	const origin = (await headers()).get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;

	if (!email || !password) {
		return redirect(
			"/admin-q9k8v3n1-metro/login?message=กรุณากรอกอีเมลและรหัสผ่าน"
		);
	}

	const supabase = await createClient();

	const { error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/admin-q9k8v3n1-metro/auth/callback`,
		},
	});

	if (error) {
		console.error("Signup error:", error);

		let errorMessage = "ไม่สามารถสร้างบัญชีได้";

		if (error.message.includes("User already registered")) {
			errorMessage = "อีเมลนี้ถูกใช้งานแล้ว";
		} else if (error.message.includes("Password")) {
			errorMessage = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
		}

		return redirect(
			`/admin-q9k8v3n1-metro/login?message=${encodeURIComponent(errorMessage)}`
		);
	}

	return redirect(
		"/admin-q9k8v3n1-metro/login?message=กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี"
	);
}
