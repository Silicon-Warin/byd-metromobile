import React, { useState, useEffect, useCallback } from "react";
import { CarModel } from "@/data/Model";
import { Button } from "./button";
import Image from "next/image";
import { toast } from "sonner";
import { InquiryForm } from "@/components/InquiryForm";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import LineLoginButton from "@/components/LineLoginButton";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";
import { NextResponse } from "next/server";
import { LineProfile } from "@/types/line";

interface ModelCardProps {
	model: CarModel;
}

export function ModelPromoCard({ model }: ModelCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [lineProfile, setLineProfile] = useState<LineProfile | undefined>(
		undefined
	);
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isLoggedInWithLine, setIsLoggedInWithLine] = useState(false);

	// Handle LINE login callback
	const handleLineLoginCallback = useCallback(
		async (code: string) => {
			try {
				setIsLoading(true);

				// แลกเปลี่ยน code เป็น access token
				const tokenResponse = await axios.post(
					"/api/line-login",
					{
						code,
						redirectUri: `https://www.bydmetromobile.com/promotions`,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (!tokenResponse.data.success) {
					throw new Error("ไม่สามารถเข้าสู่ระบบได้");
				}

				const lineProfile = tokenResponse.data.profile;

				// ตรวจสอบ lineProfile และดำเนินการต่อ
				if (!lineProfile || !lineProfile.userId) {
					throw new Error("ข้อมูลโปรไฟล์ LINE ไม่ถูกต้อง");
				}

				// เก็บข้อมูลใน client-side cookie
				setCookie("line_user_id", lineProfile.userId, {
					maxAge: 60 * 60 * 24 * 30, // 30 วัน
				});

				if (lineProfile.displayName) {
					setCookie("line_display_name", lineProfile.displayName, {
						maxAge: 60 * 60 * 24 * 30,
					});
				}

				if (lineProfile.pictureUrl) {
					setCookie("line_picture_url", lineProfile.pictureUrl, {
						maxAge: 60 * 60 * 24 * 30,
					});
				}

				// อัปเดตสถานะการล็อกอิน
				setIsLoggedInWithLine(true);
				setLineProfile(lineProfile);

				// ส่งข้อความต้อนรับด้วย API /api/send-line-message
				const messageData = {
					modelName: model.name,
					modelId: model.id,
					price: model.price,
					customer: { name: lineProfile.displayName },
					interest: { comments: "สนใจรถรุ่นนี้ผ่านหน้าโปรโมชั่น" },
				};

				await fetch("/api/send-line-message", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(messageData),
				});

				// เปิดฟอร์มหลังจากล็อกอินสำเร็จ
				setOpen(true);
				toast.success("เข้าสู่ระบบสำเร็จ");
			} catch (error) {
				console.error("LINE Login Error:", error);
				toast.error("ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ กรุณาลองใหม่อีกครั้ง");
			} finally {
				setIsLoading(false);
				router.replace(window.location.pathname);
			}
		},
		[model, router]
	);

	// ตรวจสอบการล็อกอินเมื่อโหลด component และเมื่อกดปุ่ม
	useEffect(() => {
		// ตรวจสอบสถานะล็อกอินทุกครั้ง
		checkLoginStatus();

		// ตรวจสอบ code และ state ใน URL
		const code = searchParams.get("code");
		const state = searchParams.get("state");

		// Retrieve stored model ID
		const storedModelId = localStorage.getItem("selectedModelId");

		if (code && state && storedModelId) {
			// Clear stored model ID
			localStorage.removeItem("selectedModelId");

			// Only process if this component's model matches the stored ID
			if (storedModelId === model.id.toString()) {
				handleLineLoginCallback(code);
			}
		}
	}, [searchParams, model.id, handleLineLoginCallback]);

	// เพิ่มฟังก์ชันตรวจสอบสถานะล็อกอิน
	const checkLoginStatus = () => {
		const lineUserId = getCookie("line_user_id");
		if (lineUserId) {
			console.log("ตรวจพบการล็อกอิน:", lineUserId);
			setIsLoggedInWithLine(true);

			// สร้าง lineProfile จาก cookies
			const displayName = getCookie("line_display_name");
			const pictureUrl = getCookie("line_picture_url");

			if (displayName) {
				setLineProfile({
					userId: lineUserId.toString(),
					displayName: displayName.toString(),
					pictureUrl: pictureUrl ? pictureUrl.toString() : undefined,
				});
			}

			// ถ้าหากมีการกลับมาหลังจากการล็อกอิน (มีการเก็บ modelId ไว้)
			const storedModelId = localStorage.getItem("selectedModelId");
			if (storedModelId === model.id.toString()) {
				// ลบ selectedModelId จาก localStorage
				localStorage.removeItem("selectedModelId");
				// เปิดหน้าฟอร์มทันที
				setOpen(true);
			}
			return true;
		}

		console.log("ไม่พบการล็อกอิน");
		setIsLoggedInWithLine(false);
		return false;
	};

	// Handle inquiry with LINE login
	const handleInquiryWithLine = () => {
		try {
			setIsLoading(true);

			// Generate state for security
			const state = Math.random().toString(36).substring(2, 15);

			// กำหนดค่า channel ID ตรงๆ แทนการใช้ environment variable
			const lineLoginChannelId = "2007079049"; // LINE Login Channel ID

			// Generate LINE login URL
			const redirectUri = `https://www.bydmetromobile.com/promotions`;
			const loginUrl = new URL("https://access.line.me/oauth2/v2.1/authorize");
			loginUrl.searchParams.append("response_type", "code");
			loginUrl.searchParams.append("client_id", lineLoginChannelId);
			loginUrl.searchParams.append("redirect_uri", redirectUri);
			loginUrl.searchParams.append("state", state);
			loginUrl.searchParams.append("scope", "profile openid email");

			// Store model ID in localStorage to retrieve after redirect
			localStorage.setItem("selectedModelId", model.id.toString());

			// Redirect to LINE login
			window.location.href = loginUrl.toString();
		} catch (error) {
			console.error("LINE Login Error:", error);
			toast.error("ไม่สามารถเข้าสู่ระบบด้วย LINE ได้ กรุณาลองใหม่อีกครั้ง");
			setIsLoading(false);
		}
	};

	// แก้ไขปุ่ม "สนใจสั่งจอง" ให้ตรวจสอบสถานะล็อกอินก่อน
	const handleOrderButtonClick = () => {
		// ตรวจสอบสถานะล็อกอินล่าสุดก่อนทุกครั้ง
		if (checkLoginStatus()) {
			// ถ้าล็อกอินแล้ว เปิดฟอร์มได้เลย
			setOpen(true);
		} else {
			// ถ้ายังไม่ได้ล็อกอิน ให้ไปล็อกอินก่อน
			handleInquiryWithLine();
		}
	};

	// ฟังก์ชันสำหรับจัดการเมื่อล็อกอินสำเร็จผ่าน LineLoginButton
	const handleLoginSuccess = (profile: LineProfile) => {
		setLineProfile(profile);
		setIsLoggedInWithLine(true);

		// ส่งข้อความต้อนรับด้วย API /api/send-line-message
		const messageData = {
			modelName: model.name,
			modelId: model.id,
			price: model.price,
			customer: { name: profile.displayName },
			interest: { comments: "สนใจรถรุ่นนี้ผ่านหน้าโปรโมชั่น" },
		};

		fetch("/api/send-line-message", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(messageData),
		})
			.then(() => {
				// เปิดฟอร์มหลังจากล็อกอินสำเร็จ
				setOpen(true);
				toast.success("เข้าสู่ระบบสำเร็จ");
			})
			.catch((error) => {
				console.error("Send LINE message error:", error);
			});
	};

	return (
		<>
			<div className="relative group h-full flex flex-col w-full rounded-lg overflow-hidden shadow-lg">
				<div className="relative flex-grow w-full h-full transition duration-300 bg-gradient-to-b from-gray-800 to-gray-900">
					<Image
						src={model.imageUrlPromo}
						alt={model.name}
						width={model.imageWidth}
						height={model.imageHeight}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						priority
					/>

					{/* Gradient Overlay */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

					{/* Model Info Container */}
					<div className="absolute top-0 left-0 right-0 p-4 z-10">
						<h3 className="text-xl md:text-2xl font-bold text-white">
							{model.name}
						</h3>
						<p className="text-sm text-gray-200 mt-1">
							ราคาเริ่มต้น {model.price.toLocaleString()} บาท
						</p>
					</div>

					{/* Bottom Section: Order Now Button */}
					<div className="absolute bottom-0 left-0 right-0 p-4 z-10">
						{isLoggedInWithLine ? (
							<Button onClick={handleOrderButtonClick} className="w-full">
								สนใจสั่งจอง
							</Button>
						) : (
							<Button
								onClick={handleOrderButtonClick}
								className="w-full bg-[#06C755] hover:bg-[#06C755]/90"
							>
								สนใจสั่งจอง
							</Button>
						)}
					</div>
				</div>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent className="max-w-lg">
					<DialogHeader>
						<DialogTitle>สนใจสั่งจอง {model.name}</DialogTitle>
					</DialogHeader>
					<InquiryForm model={model} lineProfile={lineProfile} />
				</DialogContent>
			</Dialog>
		</>
	);
}
