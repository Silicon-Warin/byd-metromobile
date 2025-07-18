import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url);
	const code = searchParams.get("code");
	const next = searchParams.get("next") ?? "/admin-q9k8v3n1-metro";

	if (code) {
		const supabase = await createClient();

		try {
			const { error } = await supabase.auth.exchangeCodeForSession(code);

			if (!error) {
				// Get user to verify authentication
				const {
					data: { user },
				} = await supabase.auth.getUser();

				if (user) {
					// Successful authentication, redirect to admin dashboard
					return NextResponse.redirect(`${origin}${next}`);
				}
			}

			console.error("Auth callback error:", error);
		} catch (authError) {
			console.error("Auth callback exception:", authError);
		}
	}

	// Authentication failed, redirect to login with error
	return NextResponse.redirect(
		`${origin}/admin-q9k8v3n1-metro/login?message=Authentication failed`
	);
}
