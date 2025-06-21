import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// 0. ยกเว้น Static Assets และ Next.js internal paths
	if (
		pathname.startsWith("/_next/static/") ||
		pathname.startsWith("/_next/image/") ||
		pathname.startsWith("/api/") ||
		pathname.includes(".") // ยกเว้นไฟล์ที่มีนามสกุล
	) {
		return NextResponse.next();
	}

	// **FIX 1: เพิ่มการตรวจสอบ exact routes ก่อน**
	// ถ้าเป็น route ที่ถูกต้องแล้ว ให้ผ่านไปเลย
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
		return NextResponse.next();
	}

	// **FIX 2: แก้ไข logic สำหรับ calculator/loan ให้ตรงกับ [slug] structure**
	if (pathname.includes("calculator") || pathname.includes("loan")) {
		// แยกการจับคำที่ชัดเจนขึ้น
		const modelMatch = pathname.match(
			/(atto3|dolphin|seal(?!ion)|sealion6|sealion7|m6)/i
		);

		if (modelMatch) {
			const model = modelMatch[1].toLowerCase();

			// **FIX 3: แก้ไขการ map model name ให้ตรงกับ [slug]**
			let slug;
			switch (model) {
				case "sealion6":
					slug = "byd-sealion6dmi";
					break;
				case "sealion7":
					slug = "byd-sealion7";
					break;
				case "seal":
					// ตรวจสอบให้แน่ใจว่าไม่ใช่ sealion
					if (!pathname.includes("sealion")) {
						slug = "byd-seal";
					} else {
						// ถ้าเป็น sealion แต่ไม่มีเลข ให้ไปหน้า models
						return NextResponse.redirect(new URL("/models", request.url));
					}
					break;
				default:
					slug = `byd-${model}`;
			}

			// **FIX 4: ใช้ [slug] structure**
			const targetUrl = `/models/${slug}/loan-calculator`;

			// ถ้า URL ปัจจุบันไม่ตรงกับ target แล้วค่อย redirect
			if (pathname !== targetUrl) {
				return NextResponse.redirect(new URL(targetUrl, request.url));
			}
		}

		// ถ้าไม่เจอ model ให้ไปหน้า models
		return NextResponse.redirect(new URL("/models", request.url));
	}

	// 1. ถ้า path มี "byd" แต่ไม่ถูกต้อง
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

	// 3. ถ้า path มี "compare" หรือ "comparison"
	if (pathname.includes("compare") || pathname.includes("comparison")) {
		return NextResponse.redirect(new URL("/models/compare", request.url));
	}

	// 4. ถ้า path เป็น API เก่า
	if (pathname.startsWith("/api/v1/") || pathname.startsWith("/api/old/")) {
		return NextResponse.redirect(new URL("/api/test-drive", request.url));
	}

	// 5. ถ้า path มี file extension เก่า
	if (pathname.match(/\.(html|htm|php|asp|jsp)$/)) {
		const cleanPath = pathname.replace(/\.(html|htm|php|asp|jsp)$/, "");
		return NextResponse.redirect(new URL(cleanPath || "/", request.url));
	}

	// 6. ถ้า path มี language code เก่า
	if (pathname.startsWith("/th/") || pathname.startsWith("/en/")) {
		const newPath = pathname.replace(/^\/(th|en)/, "") || "/";
		return NextResponse.redirect(new URL(newPath, request.url));
	}

	// 7. ถ้า path มี www subdomain
	if (request.nextUrl.hostname.startsWith("www.")) {
		const newUrl = new URL(request.url);
		newUrl.hostname = newUrl.hostname.replace("www.", "");
		return NextResponse.redirect(newUrl);
	}

	// 8. จัดการ URL encoded Thai characters
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

	// 9. จัดการ paths ที่มี special characters
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

	return NextResponse.next();
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - Images in public/images/ (explicitly exclude for safety, though .includes('.') should cover)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|images/).*)", // เพิ่ม |images/ เข้าไปใน matcher ด้วยเผื่อกรณีพิเศษ
	],
};
