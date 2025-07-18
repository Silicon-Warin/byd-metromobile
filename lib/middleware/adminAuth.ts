import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Admin Authentication Middleware
 * Handles authentication specifically for admin routes
 * Completely separated from main website authentication
 */
export async function adminAuthMiddleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Create Supabase client for admin auth
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: any) {
					// Don't set cookies in middleware for read-only operations
				},
				remove(name: string, options: any) {
					// Don't remove cookies in middleware for read-only operations
				},
			},
		}
	);

	// Get user authentication status
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	// Admin paths configuration
	const adminBasePath = "/qza43n1-dashboard";
	const loginPath = `${adminBasePath}/login`;
	const callbackPath = `${adminBasePath}/auth/callback`;
	const signoutPath = `${adminBasePath}/auth/signout`;

	// Allow access to login, auth callback, and signout without authentication
	const publicAdminPaths = [loginPath, callbackPath, signoutPath];
	if (publicAdminPaths.includes(pathname)) {
		// If user is already logged in and trying to access login, redirect to dashboard
		if (user && pathname === loginPath) {
			return NextResponse.redirect(new URL(adminBasePath, request.url));
		}
		return NextResponse.next();
	}

	// Block access to /admin path for security (no redirect)
	if (pathname.startsWith("/admin")) {
		return NextResponse.redirect(new URL("/404", request.url));
	}

	// Check if accessing admin area
	if (pathname.startsWith(adminBasePath)) {
		// If not authenticated, redirect to login
		if (!user || error) {
			const loginUrl = new URL(loginPath, request.url);
			loginUrl.searchParams.set("redirect", pathname);
			return NextResponse.redirect(loginUrl);
		}

		// Optional: Add additional admin role checks here
		// For example, check if user has admin role in database
		// const { data: profile } = await supabase
		//   .from('profiles')
		//   .select('role')
		//   .eq('id', user.id)
		//   .single();
		//
		// if (profile?.role !== 'admin') {
		//   return NextResponse.redirect(new URL('/unauthorized', request.url));
		// }

		// User is authenticated, allow access to admin area
		return NextResponse.next();
	}

	// Default: allow access
	return NextResponse.next();
}

/**
 * Check if user has admin privileges
 * This can be expanded to check database roles
 */
export async function checkAdminRole(
	supabase: any,
	userId: string
): Promise<boolean> {
	try {
		// For now, we'll allow any authenticated user to access admin
		// In production, you might want to check a specific table for admin roles

		// Example implementation:
		// const { data, error } = await supabase
		//   .from('user_roles')
		//   .select('role')
		//   .eq('user_id', userId)
		//   .eq('role', 'admin')
		//   .single();

		// return !error && data;

		return true; // For development - allow all authenticated users
	} catch (error) {
		console.error("Error checking admin role:", error);
		return false;
	}
}
