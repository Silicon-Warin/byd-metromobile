import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const supabase = await createClient();

	try {
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("Sign out error:", error);
		}
	} catch (signOutError) {
		console.error("Sign out exception:", signOutError);
	}

	// Always redirect to login page after signout attempt
	const { origin } = new URL(request.url);
	return NextResponse.redirect(
		`${origin}/admin-q9k8v3n1-metro/login?message=Signed out successfully`
	);
}
