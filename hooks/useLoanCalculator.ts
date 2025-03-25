"use client"

import { useState } from "react"

export function useLoanCalculator(selectedVariant: any) {
  const [selectedDownPayment, setSelectedDownPayment] = useState<number>(20) // Default 20%
  const [selectedTerm, setSelectedTerm] = useState<number>(60) // Default 60 months

  const handleDownPaymentChange = (percentage: number) => {
    setSelectedDownPayment(percentage)
  }

  const handleTermChange = (months: number) => {
    setSelectedTerm(months)
  }

  const getDownPaymentOption = () => {
    if (!selectedVariant) return null
    return selectedVariant.downPaymentOptions.find((option: any) => option.percentage === selectedDownPayment)
  }

  const getMonthlyPayment = () => {
    const downPaymentOption = getDownPaymentOption()
    if (!downPaymentOption) return null

    return downPaymentOption.monthlyPayments.find((payment: any) => payment.months === selectedTerm)
  }

  return {
    selectedDownPayment,
    selectedTerm,
    handleDownPaymentChange,
    handleTermChange,
    getDownPaymentOption,
    getMonthlyPayment,
  }
}