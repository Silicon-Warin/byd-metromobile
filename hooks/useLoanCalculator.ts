"use client"

import { useState, useEffect } from "react"

interface DownPaymentOption {
  percentage: number
  amount: number
  monthlyPayments: {
    months: number
    amount: number
    interestRate: string
  }[]
}

interface CarVariant {
  id: string
  name: string
  price: number
  downPaymentOptions?: DownPaymentOption[]
}

export function useLoanCalculator(selectedVariant: CarVariant | null) {
  const [selectedDownPayment, setSelectedDownPayment] = useState<number>(20) // Default to 20%
  const [selectedTerm, setSelectedTerm] = useState<number>(48) // Default to 48 months

  // Set default down payment when variant changes
  useEffect(() => {
    if (selectedVariant?.downPaymentOptions?.length) {
      setSelectedDownPayment(selectedVariant.downPaymentOptions[0].percentage)
    }
  }, [selectedVariant])

  // Set default term when down payment changes
  useEffect(() => {
    const downPaymentOption = getDownPaymentOption()
    if (downPaymentOption?.monthlyPayments?.length) {
      setSelectedTerm(downPaymentOption.monthlyPayments[0].months)
    }
  }, [selectedDownPayment])

  const handleDownPaymentChange = (percentage: number) => {
    setSelectedDownPayment(percentage)
  }

  const handleTermChange = (months: number) => {
    setSelectedTerm(months)
  }

  const getDownPaymentOption = (): DownPaymentOption | null => {
    if (!selectedVariant?.downPaymentOptions) {
      // If no down payment options are available, create a default one
      const defaultPrice = selectedVariant?.price || 1000000
      const defaultPercentage = 20
      const defaultAmount = (defaultPrice * defaultPercentage) / 100

      return {
        percentage: defaultPercentage,
        amount: defaultAmount,
        monthlyPayments: [
          {
            months: 48,
            amount: (defaultPrice - defaultAmount) / 48,
            interestRate: "2.99%",
          },
          {
            months: 60,
            amount: (defaultPrice - defaultAmount) / 60,
            interestRate: "3.49%",
          },
          {
            months: 72,
            amount: (defaultPrice - defaultAmount) / 72,
            interestRate: "3.99%",
          },
          {
            months: 84,
            amount: (defaultPrice - defaultAmount) / 84,
            interestRate: "4.49%",
          },
        ],
      }
    }

    return (
      selectedVariant.downPaymentOptions.find((option) => option.percentage === selectedDownPayment) ||
      selectedVariant.downPaymentOptions[0]
    )
  }

  const getMonthlyPayment = () => {
    const downPaymentOption = getDownPaymentOption()
    if (!downPaymentOption?.monthlyPayments) return null

    return (
      downPaymentOption.monthlyPayments.find((payment) => payment.months === selectedTerm) ||
      downPaymentOption.monthlyPayments[0]
    )
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

