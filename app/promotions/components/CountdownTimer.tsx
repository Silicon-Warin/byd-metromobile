"use client";

import { useState, useEffect } from "react";

export function CountdownTimer() {
	const [timeLeft, setTimeLeft] = useState({
		days: 3,
		hours: 12,
		minutes: 30,
		seconds: 0,
	});

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				let { days, hours, minutes, seconds } = prev;

				if (seconds > 0) {
					seconds -= 1;
				} else {
					seconds = 59;
					if (minutes > 0) {
						minutes -= 1;
					} else {
						minutes = 59;
						if (hours > 0) {
							hours -= 1;
							if (days > 0) {
								days -= 1;
							} else {
								// Reset or handle end of countdown
								clearInterval(timer);
							}
						}
					}
				}

				return { days, hours, minutes, seconds };
			});
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex justify-center gap-4 md:gap-6 text-center">
			{[
				{ label: "วัน", value: timeLeft.days },
				{ label: "ชั่วโมง", value: timeLeft.hours },
				{ label: "นาที", value: timeLeft.minutes },
				{ label: "วินาที", value: timeLeft.seconds },
			].map((item, index) => (
				<div key={index} className="flex flex-col items-center">
					<div className="bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-lg w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mb-2">
						<span className="text-2xl md:text-3xl font-bold text-white">
							{item.value.toString().padStart(2, "0")}
						</span>
					</div>
					<span className="text-xs md:text-sm text-gray-400">{item.label}</span>
				</div>
			))}
		</div>
	);
}
