import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { adminAuthMiddleware } from "@/lib/middleware/adminAuth";

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip middleware for static assets and API routes
	if (
		pathname.startsWith("/_next/") ||
		pathname.startsWith("/api/") ||
		pathname.includes(".")
	) {
		return NextResponse.next();
	}

	// Handle admin routes with complete separation from main site
	if (
		pathname.startsWith("/qza43n1-dashboard") ||
		pathname.startsWith("/(admin)")
	) {
		return adminAuthMiddleware(request);
	}

	// Block access to /admin path for security
	if (pathname.startsWith("/admin")) {
		return NextResponse.redirect(new URL("/404", request.url));
	}

	// Handle general app routes with redirects (main website)
	return handleGeneralRoutes(request);
}

async function handleGeneralRoutes(request: NextRequest) {
	// Update session for general routes
	const response = await updateSession(request);
	const { pathname } = request.nextUrl;

	// --- Start of preserved redirect logic ---
	const validRoutes = [
		"/models/byd-atto3",
		"/models/byd-dolphin",
		"/models/byd-seal",
		"/models/byd-sealion6dmi",
		"/models/byd-sealion7",
		"/models/byd-m6",
		"/models/byd-atto3/loan-calculator",
		"/models/byd-dolphin/loan-calculator",
		"/models/byd-seal/loan-calculator",
		"/models/byd-sealion6dmi/loan-calculator",
		"/models/byd-sealion7/loan-calculator",
		"/models/byd-m6/loan-calculator",
		"/models/compare",
	];

	if (validRoutes.includes(pathname)) {
		return response;
	}

	if (pathname.includes("calculator") || pathname.includes("loan")) {
		const modelMatch = pathname.match(
			/(atto3|dolphin|seal(?!ion)|sealion6|sealion7|m6)/i
		);

		if (modelMatch) {
			const model = modelMatch[1].toLowerCase();
			let slug;
			switch (model) {
				case "sealion6":
					slug = "byd-sealion6dmi";
					break;
				case "sealion7":
					slug = "byd-sealion7";
					break;
				case "seal":
					if (!pathname.includes("sealion")) {
						slug = "byd-seal";
					} else {
						return NextResponse.redirect(new URL("/models", request.url));
					}
					break;
				default:
					slug = `byd-${model}`;
			}
			const targetUrl = `/models/${slug}/loan-calculator`;
			if (pathname !== targetUrl) {
				return NextResponse.redirect(new URL(targetUrl, request.url));
			}
		}
		return NextResponse.redirect(new URL("/models", request.url));
	}

	if (pathname.includes("byd") && !pathname.startsWith("/models/byd-")) {
		const modelName = pathname.replace(/^\/byd[-_]?/, "").toLowerCase();
		const validModels = [
			"atto3",
			"dolphin",
			"seal",
			"sealion6dmi",
			"sealion7",
			"m6",
		];

		for (const model of validModels) {
			if (modelName.includes(model.replace("dmi", ""))) {
				const targetModel = model === "sealion6" ? "sealion6dmi" : model;
				return NextResponse.redirect(
					new URL(`/models/byd-${targetModel}`, request.url)
				);
			}
		}
	}

	if (pathname.includes("compare") || pathname.includes("comparison")) {
		return NextResponse.redirect(new URL("/models/compare", request.url));
	}

	if (pathname.startsWith("/api/v1/") || pathname.startsWith("/api/old/")) {
		return NextResponse.redirect(new URL("/api/test-drive", request.url));
	}

	if (pathname.match(/\.(html|htm|php|asp|jsp)$/)) {
		const cleanPath = pathname.replace(/\.(html|htm|php|asp|jsp)$/, "");
		return NextResponse.redirect(new URL(cleanPath || "/", request.url));
	}

	if (pathname.startsWith("/th/") || pathname.startsWith("/en/")) {
		const newPath = pathname.replace(/^\/(th|en)/, "") || "/";
		return NextResponse.redirect(new URL(newPath, request.url));
	}

	if (request.nextUrl.hostname.startsWith("www.")) {
		const newUrl = new URL(request.url);
		newUrl.hostname = newUrl.hostname.replace("www.", "");
		return NextResponse.redirect(newUrl);
	}

	if (pathname.includes("%E0%B8%")) {
		try {
			const decodedPath = decodeURIComponent(pathname);
			if (decodedPath.includes("dolphin") || decodedPath.includes("ดอลฟิน")) {
				return NextResponse.redirect(
					new URL("/models/byd-dolphin", request.url)
				);
			}
			if (decodedPath.includes("seal") || decodedPath.includes("ซีล")) {
				return NextResponse.redirect(new URL("/models/byd-seal", request.url));
			}
			if (decodedPath.includes("atto") || decodedPath.includes("แอตโต")) {
				return NextResponse.redirect(new URL("/models/byd-atto3", request.url));
			}
			if (decodedPath.includes("sealion") || decodedPath.includes("ซีไลออน")) {
				if (decodedPath.includes("6")) {
					return NextResponse.redirect(
						new URL("/models/byd-sealion6dmi", request.url)
					);
				}
				return NextResponse.redirect(
					new URL("/models/byd-sealion7", request.url)
				);
			}
			if (decodedPath.includes("byd") || decodedPath.includes("บีวายดี")) {
				return NextResponse.redirect(new URL("/we-are-byd", request.url));
			}
			if (
				decodedPath.includes("แบตเตอรี่") ||
				decodedPath.includes("battery")
			) {
				return NextResponse.redirect(new URL("/blog", request.url));
			}
			return NextResponse.redirect(new URL("/blog", request.url));
		} catch (error) {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	if (
		pathname.includes("?") ||
		pathname.includes("#") ||
		pathname.includes("&")
	) {
		const cleanPath = pathname.split(/[?&#]/)[0];
		if (cleanPath !== pathname && cleanPath) {
			return NextResponse.redirect(new URL(cleanPath, request.url));
		}
	}
	// --- End of preserved redirect logic ---

	// If no redirects matched, return the original response
	return response;
}

// Import required for admin auth check

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - and any other static assets (e.g., .svg, .png, .jpg)
		 */
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
