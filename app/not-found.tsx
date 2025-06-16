'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Analytics404 } from "@/lib/analytics404";

// Smart URL mapping สำหรับลิ้งเก่า
const urlRedirects: Record<string, string> = {
	// รถยนต์
	'/cars': '/models',
	'/vehicles': '/models',
	'/car': '/models',
	'/model': '/models',
	'/models/atto3': '/models/byd-atto3',
	'/models/dolphin': '/models/byd-dolphin',
	'/models/seal': '/models/byd-seal',
	'/models/sealion6': '/models/byd-sealion6dmi',
	'/models/sealion7': '/models/byd-sealion7',
	'/models/m6': '/models/byd-m6',
	
	// บริการ
	'/services': '/service',
	'/test-drive': '/contact-us',
	'/testdrive': '/contact-us',
	'/booking': '/contact-us',
	'/appointment': '/contact-us',
	'/form-test-drive': '/contact-us',
	
	// โปรโมชั่น
	'/promotion': '/promotions',
	'/promo': '/promotions',
	'/offers': '/promotions',
	'/deals': '/promotions',
	
	// ติดต่อ
	'/contact': '/contact-us',
	
	// เกี่ยวกับเรา
	'/about': '/we-are-byd',
	'/about-us': '/we-are-byd',
	'/company': '/we-are-byd',
	'/about-metromobile': '/we-are-byd',
	
	// บล็อก/ข่าว
	'/news': '/blog',
	'/articles': '/blog',
	'/blog/2': '/blog',
	
	// หน้าแรก
	'/home': '/',
	'/index': '/',
	'/main': '/',
		// URLs จาก Analytics
	'/thank-you': '/contact-us',
	'/spec-byd-seal-u-dm-i': '/models/byd-sealion7',
	'/summary-of-2023-vehicle-registration-byd': '/we-are-byd',
	'/tires-ev-car-2': '/blog',
};

export default function NotFound() {
	const [currentPath, setCurrentPath] = useState('');
	const [suggestedUrl, setSuggestedUrl] = useState('');
	const [countdown, setCountdown] = useState(10);
	const [autoRedirect, setAutoRedirect] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// ได้ path ปัจจุบัน
		const path = window.location.pathname;
		setCurrentPath(path);

		// หา URL ที่แนะนำ
		const suggested = findSuggestedUrl(path);
		setSuggestedUrl(suggested);

		// บันทึกใน Analytics
		const analytics = Analytics404.getInstance();
		analytics.track404(path, suggested, false);

		// ถ้าเจอ URL ที่แนะนำ เปิด auto redirect
		if (suggested && suggested !== '/') {
			setAutoRedirect(true);
		}
	}, []);

	useEffect(() => {
		if (autoRedirect && countdown > 0) {
			const timer = setTimeout(() => {
				setCountdown(countdown - 1);
			}, 1000);
			return () => clearTimeout(timer);
		} else if (autoRedirect && countdown === 0) {
			// บันทึกว่ามีการ redirect
			const analytics = Analytics404.getInstance();
			analytics.track404(currentPath, suggestedUrl, true);
			router.push(suggestedUrl);
		}
	}, [countdown, autoRedirect, suggestedUrl, currentPath, router]);
	const findSuggestedUrl = (path: string): string => {
		// ตรวจ exact match ก่อน
		if (urlRedirects[path]) {
			return urlRedirects[path];
		}

		// จัดการ URL encoded Thai characters
		try {
			const decodedPath = decodeURIComponent(path);
			
			// ตรวจสอบเนื้อหาที่เกี่ยวกับรถยนต์
			if (decodedPath.includes('dolphin') || decodedPath.includes('ดอลฟิน')) {
				return '/models/byd-dolphin';
			}
			if (decodedPath.includes('seal') || decodedPath.includes('ซีล')) {
				if (decodedPath.includes('6') || decodedPath.includes('หก')) {
					return '/models/byd-sealion6dmi';
				}
				if (decodedPath.includes('7') || decodedPath.includes('เจ็ด')) {
					return '/models/byd-sealion7';
				}
				return '/models/byd-seal';
			}
			if (decodedPath.includes('atto') || decodedPath.includes('แอตโต')) {
				return '/models/byd-atto3';
			}
			if (decodedPath.includes('sealion') || decodedPath.includes('ซีไลออน')) {
				if (decodedPath.includes('6')) return '/models/byd-sealion6dmi';
				return '/models/byd-sealion7';
			}
			if (decodedPath.includes('m6') || decodedPath.includes('เอ็มหก')) {
				return '/models/byd-m6';
			}
			
			// ตรวจสอบเนื้อหาที่เกี่ยวกับบริษัท
			if (decodedPath.includes('byd') || decodedPath.includes('บีวายดี') || 
			    decodedPath.includes('บริษัท') || decodedPath.includes('เกี่ยวกับ')) {
				return '/we-are-byd';
			}
			
			// ตรวจสอบเนื้อหาเกี่ยวกับแบตเตอรี่หรือเทคโนโลยี
			if (decodedPath.includes('แบตเตอรี่') || decodedPath.includes('battery') ||
			    decodedPath.includes('blade') || decodedPath.includes('เทคโนโลยี')) {
				return '/blog';
			}
			
			// ตรวจสอบเนื้อหาเกี่ยวกับการทดลองขับ
			if (decodedPath.includes('ทดลองขับ') || decodedPath.includes('test') ||
			    decodedPath.includes('ทดสอบ') || decodedPath.includes('drive')) {
				return '/contact-us';
			}
			
			// ตรวจสอบเนื้อหาเกี่ยวกับราคาหรือผ่อน
			if (decodedPath.includes('ราคา') || decodedPath.includes('price') ||
			    decodedPath.includes('ผ่อน') || decodedPath.includes('loan') ||
			    decodedPath.includes('calculator')) {
				return '/models';
			}
			
		} catch (error) {
			// ถ้า decode ไม่ได้ ไปต่อ
		}

		// ตรวจ partial match
		for (const [oldPath, newPath] of Object.entries(urlRedirects)) {
			if (path.includes(oldPath) || oldPath.includes(path.slice(0, -1))) {
				return newPath;
			}
		}

		// ตรวจ path patterns
		if (path.includes('/model') || path.includes('/car')) {
			return '/models';
		}
		if (path.includes('/service') || path.includes('/support')) {
			return '/service';
		}
		if (path.includes('/blog') || path.includes('/news') || path.includes('/article')) {
			return '/blog';
		}
		if (path.includes('/promo') || path.includes('/offer') || path.includes('/deal')) {
			return '/promotions';
		}
		if (path.includes('/contact') || path.includes('/form')) {
			return '/contact-us';
		}
		if (path.includes('/about') || path.includes('/company')) {
			return '/we-are-byd';
		}

		// default fallback
		return '/';
	};

	const handleCancelRedirect = () => {
		setAutoRedirect(false);
		setCountdown(0);
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900">
			<div className="text-center text-white max-w-2xl mx-auto px-6">
				
				{/* Error Icon */}
				<div className="mb-8">
					<div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
						<span className="text-4xl">🚫</span>
					</div>
				</div>

				{/* Main Message */}
				<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
					404 - ไม่พบหน้าที่ต้องการ
				</h1>
				
				<p className="text-xl text-gray-300 mb-8">
					ขออภัย ไม่พบหน้าหรือข้อมูลที่คุณร้องขอ
				</p>

				{/* Current Path Info */}
				{currentPath && (
					<div className="bg-gray-800/50 backdrop-blur rounded-lg p-4 mb-6 border border-gray-600">
						<p className="text-gray-400 text-sm">URL ที่ขอ:</p>
						<p className="text-cyan-400 font-mono break-all">{currentPath}</p>
					</div>
				)}

				{/* Auto Redirect Section */}
				{autoRedirect && suggestedUrl && (
					<div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur rounded-lg p-6 mb-6 border border-green-400/30">
						<h3 className="text-xl font-bold text-green-400 mb-2">
							🔄 เจอหน้าที่คล้ายกัน!
						</h3>
						<p className="text-gray-300 mb-4">
							กำลังนำคุณไปยัง: <span className="text-cyan-400 font-bold">{suggestedUrl}</span>
						</p>
						<div className="flex items-center justify-center gap-4">
							<div className="text-2xl font-bold text-yellow-400">
								{countdown}
							</div>
							<Button 
								onClick={handleCancelRedirect}
								variant="outline"
								className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
							>
								ยกเลิก
							</Button>
							<Link href={suggestedUrl}>
								<Button className="bg-green-500 hover:bg-green-600 text-white">
									ไปเลย
								</Button>
							</Link>
						</div>
					</div>
				)}

				{/* Quick Links */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
					<Link href="/models">
						<Button 
							variant="outline" 
							className="w-full border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
						>
							🚗 รถยนต์ BYD
						</Button>
					</Link>
					<Link href="/promotions">
						<Button 
							variant="outline" 
							className="w-full border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
						>
							🎉 โปรโมชั่น
						</Button>
					</Link>
					<Link href="/contact-us">
						<Button 
							variant="outline" 
							className="w-full border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300"
						>
							📞 ติดต่อเรา
						</Button>
					</Link>
				</div>

				{/* Home Button */}
				<Link href="/">
					<Button 
						size="lg"
						className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
					>
						🏠 กลับสู่หน้าแรก
					</Button>
				</Link>

				{/* Help Text */}
				<p className="text-gray-400 text-sm mt-8">
					หากปัญหายังคงเกิดขึ้น กรุณาติดต่อทีมงานที่ 
					<a href="mailto:bydmetromobile@gmail.com" className="text-cyan-400 hover:underline ml-1">
						bydmetromobile@gmail.com
					</a>
				</p>
			</div>
		</div>
	);
}
