import React, { useState } from "react";
import { Phone, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const BYDPhoneCard = () => {
	const [isExpanded, setIsExpanded] = useState(false);

	// Data from the dealership schema

	const branches = [
		{
			name: "BYD Metromobile สาขาพระราม 3",
			telephone: "02-291-8889",
		},
		{
			name: "BYD Metromobile สาขาตลิ่งชัน",
			telephone: "02-448-3999",
		},
		{
			name: "BYD Metromobile สาขาอ่อนนุช",
			telephone: "080-416-1888",
		},
		{
			name: "BYD Metromobile สาขารามอินทรา กม.9",
			telephone: "081-665-6888",
		},
	];

	const toggleExpand = () => {
		setIsExpanded(!isExpanded);
	};

	// Extract branch name without the "BYD Metromobile สาขา" prefix
	const getShortBranchName = (fullName: string) => {
		return fullName.replace("BYD Metromobile สาขา", "");
	};

	return (
		<Card className="bg-card/50 backdrop-blur-sm border border-border/50">
			<CardContent className="p-6 flex flex-col items-center text-center">
				<section className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
					<Phone className="h-6 w-6 text-primary" />
				</section>
				<h3 className="text-xl font-bold mb-2">โทรศัพท์</h3>

				{/* Current branch */}
				<div className="mb-2">
					<p className="font-medium">{getShortBranchName(branches[0].name)}</p>
					<p className="text-muted-foreground">{branches[0].telephone}</p>
				</div>

				{/* Expandable section */}
				{isExpanded && (
					<div className="w-full mt-2 pt-2 border-t border-border/50">
						{branches.slice(1).map((branch, index) => (
							<div key={index} className="mb-2 last:mb-0">
								<p className="font-medium">{getShortBranchName(branch.name)}</p>
								<p className="text-muted-foreground">{branch.telephone}</p>
							</div>
						))}
					</div>
				)}

				{/* Toggle button */}
				<button
					onClick={toggleExpand}
					className="flex items-center justify-center mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
				>
					{isExpanded ? (
						<>
							<span>แสดงน้อยลง</span>
							<ChevronUp className="ml-1 h-4 w-4" />
						</>
					) : (
						<>
							<span>ดูสาขาอื่น</span>
							<ChevronDown className="ml-1 h-4 w-4" />
						</>
					)}
				</button>
			</CardContent>
		</Card>
	);
};

export default BYDPhoneCard;
