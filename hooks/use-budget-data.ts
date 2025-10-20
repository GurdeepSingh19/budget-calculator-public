"use client"

import { useState, useEffect } from "react"
import type { BudgetCategory, BudgetData } from "@/types/budget"

const DEFAULT_EXPENSE_CATEGORIES = [
  "Food",
  "Gifts",
  "Health/Medical",
  "Home",
  "Transportation",
  "Personal",
  "Pets",
  "Utilities",
  "Travel",
  "Debt",
  "Other",
]

const DEFAULT_INCOME_CATEGORIES = ["Paycheck", "Bonus", "Interest", "Other"]

export function useBudgetData(viewType: "monthly" | "weekly", currentPeriod: string) {
  const [budgetData, setBudgetData] = useState<BudgetData>({})

  // Load data from localStorage on mount and when period changes
  useEffect(() => {
    const stored = localStorage.getItem("budgetData")
    if (stored) {
      try {
        setBudgetData(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse budget data:", e)
      }
    }
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (Object.keys(budgetData).length > 0) {
      localStorage.setItem("budgetData", JSON.stringify(budgetData))
    }
  }, [budgetData])

  // Initialize period data if it doesn't exist
  useEffect(() => {
    if (!currentPeriod) return

    setBudgetData((prev) => {
      if (prev[currentPeriod]) return prev

      const newPeriodData = {
        income: [
          ...DEFAULT_INCOME_CATEGORIES.map((name, index) => ({
            id: `income-${index}`,
            name,
            planned: 0,
            actual: 0,
            isCustom: false,
          })),
          { id: "income-custom-1", name: "Custom 1", planned: 0, actual: 0, isCustom: true },
        ],
        expenses: [
          ...DEFAULT_EXPENSE_CATEGORIES.map((name, index) => ({
            id: `expense-${index}`,
            name,
            planned: 0,
            actual: 0,
            isCustom: false,
          })),
          { id: "expense-custom-1", name: "Custom 1", planned: 0, actual: 0, isCustom: true },
          { id: "expense-custom-2", name: "Custom 2", planned: 0, actual: 0, isCustom: true },
          { id: "expense-custom-3", name: "Custom 3", planned: 0, actual: 0, isCustom: true },
        ],
      }

      return {
        ...prev,
        [currentPeriod]: newPeriodData,
      }
    })
  }, [currentPeriod])

  const currentData = budgetData[currentPeriod] || { income: [], expenses: [] }

  const updateCategory = (id: string, field: "planned" | "actual", value: number) => {
    setBudgetData((prev) => {
      const periodData = prev[currentPeriod]
      if (!periodData) return prev

      const updateCategories = (categories: BudgetCategory[]) =>
        categories.map((cat) => (cat.id === id ? { ...cat, [field]: value } : cat))

      return {
        ...prev,
        [currentPeriod]: {
          income: updateCategories(periodData.income),
          expenses: updateCategories(periodData.expenses),
        },
      }
    })
  }

  const addCustomCategory = (type: "income" | "expense", name: string) => {
    setBudgetData((prev) => {
      const periodData = prev[currentPeriod]
      if (!periodData) return prev

      const categories = type === "income" ? periodData.income : periodData.expenses
      const newId = `${type}-custom-${Date.now()}`
      const newCategory: BudgetCategory = {
        id: newId,
        name,
        planned: 0,
        actual: 0,
        isCustom: true,
      }

      return {
        ...prev,
        [currentPeriod]: {
          ...periodData,
          [type === "income" ? "income" : "expenses"]: [...categories, newCategory],
        },
      }
    })
  }

  const removeCategory = (id: string) => {
    setBudgetData((prev) => {
      const periodData = prev[currentPeriod]
      if (!periodData) return prev

      return {
        ...prev,
        [currentPeriod]: {
          income: periodData.income.filter((cat) => cat.id !== id),
          expenses: periodData.expenses.filter((cat) => cat.id !== id),
        },
      }
    })
  }

  const getAllPeriodsData = () => budgetData

  return {
    incomeCategories: currentData.income,
    expenseCategories: currentData.expenses,
    updateCategory,
    addCustomCategory,
    removeCategory,
    getAllPeriodsData,
  }
}
