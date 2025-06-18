import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// --- **เพิ่มส่วนนี้เข้ามาเป็นอันดับแรกสุด** ---
	// 0. ยกเว้น Static Assets และ Next.js internal paths จาก Middleware
	//    matcher ใน config ควรจะจัดการแล้ว แต่เราเพิ่มตรงนี้เพื่อความมั่นใจอีกชั้น
	if (
		pathname.startsWith("/_next/static/") ||
		pathname.startsWith("/_next/image/") ||
		pathname.startsWith("/api/") ||
		pathname.includes(".") // ยกเว้นไฟล์ที่มีนามสกุล (เช่น .webp, .jpg, .css, .js)
	) {
		return NextResponse.next();
	}
	// --- สิ้นสุดการเพิ่ม ---

	// ตรวจสอบ URL patterns ที่ซับซ้อน

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
				return NextResponse.redirect(
					new URL(`/models/byd-${model}`, request.url)
				);
			}
		}
	}

	// 2. ถ้า path มี "calculator" หรือ "loan"
	if (pathname.includes("calculator") || pathname.includes("loan")) {
		const modelMatch = pathname.match(
			/(atto3|dolphin|seal|sealion6|sealion7|m6)/i
		);
		if (modelMatch) {
			const model = modelMatch[1].toLowerCase();
			const fullModel =
				model === "sealion6" ? "byd-sealion6dmi" : `byd-${model}`;
			return NextResponse.redirect(
				new URL(`/models/${fullModel}/loan-calculator`, request.url)
			);
		}
		return NextResponse.redirect(new URL("/models", request.url));
	}

	// 3. ถ้า path มี "compare" หรือ "comparison"
	if (pathname.includes("compare") || pathname.includes("comparison")) {
		return NextResponse.redirect(new URL("/models/compare", request.url));
	}

	// 4. ถ้า path เป็น API เก่า (จริงๆ ควรถูก exclude ด้วย matcher แล้ว)
	if (pathname.startsWith("/api/v1/") || pathname.startsWith("/api/old/")) {
		return NextResponse.redirect(new URL("/api/test-drive", request.url));
	}

	// 5. ถ้า path มี file extension เก่า (.html, .php, .asp)
	//    Rule นี้อาจจะซ้ำซ้อนกับ .includes(".") ที่เพิ่มไปในข้อ 0
	//    แต่ก็ไม่ได้เสียหายอะไรที่จะเก็บไว้ถ้าต้องการจัดการเฉพาะ extension เหล่านี้
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

	// 8. จัดการ URL encoded Thai characters (URL เก่าจาก Google/Facebook)
	if (pathname.includes("%E0%B8%")) {
		try {
			const decodedPath = decodeURIComponent(pathname);

			// ถ้าเป็นเนื้อหาเกี่ยวกับรถยนต์
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

			// ถ้าเป็นเนื้อหาเกี่ยวกับบริษัท BYD
			if (decodedPath.includes("byd") || decodedPath.includes("บีวายดี")) {
				return NextResponse.redirect(new URL("/we-are-byd", request.url));
			}

			// ถ้าเป็นเนื้อหาเกี่ยวกับแบตเตอรี่
			if (
				decodedPath.includes("แบตเตอรี่") ||
				decodedPath.includes("battery")
			) {
				return NextResponse.redirect(new URL("/blog", request.url));
			}

			// เนื้อหาทั่วไป
			return NextResponse.redirect(new URL("/blog", request.url));
		} catch (error) {
			// ถ้า decode ไม่ได้ ไปหน้าแรก
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	// 9. จัดการ paths ที่มี special characters หรือ symbols
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
