"use client";

import { useState, useEffect, useMemo } from "react";
import type { CarVariant, LoanTier } from "@/data/carModel";

// สูตรคำนวณค่างวด (PMT formula)
function calculateMonthlyPayment(
	price: number,
	downPaymentPercentage: number,
	interestRate: number,
	termMonths: number
) {
	if (termMonths === 0) return 0;
	const principal = price * (1 - downPaymentPercentage / 100);
	const monthlyInterestRate = interestRate / 100 / 12;

	if (monthlyInterestRate === 0) {
		return principal / termMonths;
	}

	const payment =
		(principal *
			(monthlyInterestRate * Math.pow(1 + monthlyInterestRate, termMonths))) /
		(Math.pow(1 + monthlyInterestRate, termMonths) - 1);

	return payment;
}

export function useLoanCalculator(selectedVariant: CarVariant | null) {
	const [selectedDownPayment, setSelectedDownPayment] = useState<number>(0);
	const [selectedTerm, setSelectedTerm] = useState<number>(0);

	// ตั้งค่าเริ่มต้นเมื่อ variant เปลี่ยน
	useEffect(() => {
		if (selectedVariant?.loanTiers && selectedVariant.loanTiers.length > 0) {
			const defaultTier = selectedVariant.loanTiers[0];
			setSelectedDownPayment(defaultTier.downPaymentPercentage);
			if (defaultTier.terms.length > 0) {
				setSelectedTerm(defaultTier.terms[0].months);
			}
		} else {
			setSelectedDownPayment(0);
			setSelectedTerm(0);
		}
	}, [selectedVariant]);

	const handleDownPaymentChange = (percentage: number) => {
		setSelectedDownPayment(percentage);
		// เมื่อเงินดาวน์เปลี่ยน ให้ตั้งค่างวดเริ่มต้นใหม่
		const newTier = selectedVariant?.loanTiers?.find(
			(t) => t.downPaymentPercentage === percentage
		);
		if (newTier?.terms && newTier.terms.length > 0) {
			setSelectedTerm(newTier.terms[0].months);
		}
	};

	const handleTermChange = (months: number) => {
		setSelectedTerm(months);
	};

	const currentTier = useMemo(
		() =>
			selectedVariant?.loanTiers?.find(
				(tier) => tier.downPaymentPercentage === selectedDownPayment
			) || null,
		[selectedVariant, selectedDownPayment]
	);

	const downPaymentDetails = useMemo(() => {
		if (!selectedVariant || !currentTier) return null;

		const amount =
			(selectedVariant.price * currentTier.downPaymentPercentage) / 100;

		return {
			downPaymentPercentage: currentTier.downPaymentPercentage,
			amount: amount,
			terms: currentTier.terms,
		};
	}, [selectedVariant, currentTier]);

	const monthlyPaymentDetails = useMemo(() => {
		if (!selectedVariant || !downPaymentDetails) return null;

		const termInfo = downPaymentDetails.terms.find(
			(t) => t.months === selectedTerm
		);
		if (!termInfo) return null;

		const monthlyAmount = calculateMonthlyPayment(
			selectedVariant.price,
			downPaymentDetails.downPaymentPercentage,
			termInfo.interestRate,
			termInfo.months
		);

		return {
			months: termInfo.months,
			amount: monthlyAmount,
			interestRate: termInfo.interestRate,
		};
	}, [selectedVariant, downPaymentDetails, selectedTerm]);

	return {
		selectedDownPayment,
		selectedTerm,
		handleDownPaymentChange,
		handleTermChange,
		getDownPaymentOption: () => downPaymentDetails, // เปลี่ยนชื่อให้สอดคล้อง
		getMonthlyPayment: () => monthlyPaymentDetails, // เปลี่ยนชื่อให้สอดคล้อง
	};
}
