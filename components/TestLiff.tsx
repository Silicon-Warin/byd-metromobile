"use client";

import React, { useEffect, useState } from "react";
import { useLiff } from "@/context/liffProvider";

const TestLiff = () => {
	const { liff, liffError } = useLiff();
	const [profile, setProfile] = useState<any>(null);

	useEffect(() => {
		if (!liff) return;

		// ตรวจสอบว่าเข้าสู่ระบบหรือยัง
		if (!liff.isLoggedIn()) {
			liff.login();
		} else {
			// ดึงข้อมูลโปรไฟล์ผู้ใช้
			liff
				.getProfile()
				.then((profile) => {
					setProfile(profile);
				})
				.catch((err) => {
					console.error("Error fetching profile:", err);
				});
		}
	}, [liff]);

	if (liffError) {
		return <p>Error: {liffError}</p>;
	}

	return (
		<div>
			<h1>LIFF Test Page</h1>
			{profile ? (
				<div>
					<p>Display Name: {profile.displayName}</p>
					<img src={profile.pictureUrl} alt="Profile" width={100} />
				</div>
			) : (
				<p>Loading profile...</p>
			)}
		</div>
	);
};

export default TestLiff;
