"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"
import type { BudgetCategory } from "@/types/budget"

interface BudgetChartsProps {
  incomeCategories: BudgetCategory[]
  expenseCategories: BudgetCategory[]
  viewType: "monthly" | "weekly"
}

export function BudgetCharts({ incomeCategories, expenseCategories, viewType }: BudgetChartsProps) {
  // Prepare data for planned vs actual comparison
  const comparisonData = [
    ...incomeCategories.map((cat) => ({
      name: cat.name,
      planned: cat.planned,
      actual: cat.actual,
      type: "Income",
    })),
    ...expenseCategories.map((cat) => ({
      name: cat.name,
      planned: cat.planned,
      actual: cat.actual,
      type: "Expense",
    })),
  ].filter((item) => item.planned > 0 || item.actual > 0)

  // Prepare savings trend data (mock data for demonstration)
  const savingsTrendData = Array.from({ length: viewType === "monthly" ? 12 : 52 }, (_, i) => {
    const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.actual, 0)
    const totalExpense = expenseCategories.reduce((sum, cat) => sum + cat.actual, 0)
    const savings = totalIncome - totalExpense

    return {
      period: viewType === "monthly" ? `Month ${i + 1}` : `Week ${i + 1}`,
      savings: savings + (Math.random() - 0.5) * savings * 0.3,
      income: totalIncome + (Math.random() - 0.5) * totalIncome * 0.2,
      expenses: totalExpense + (Math.random() - 0.5) * totalExpense * 0.2,
    }
  }).slice(0, viewType === "monthly" ? 6 : 12)

  const chartColors = {
    planned: "#6366f1", // Indigo
    actual: "#10b981", // Emerald
    savings: "#8b5cf6", // Violet
    income: "#06b6d4", // Cyan
    expenses: "#f59e0b", // Amber
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Planned vs Actual</CardTitle>
          <CardDescription>Compare your planned budget with actual spending</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="planned" fill={chartColors.planned} name="Planned" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" fill={chartColors.actual} name="Actual" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Trend</CardTitle>
          <CardDescription>
            Track your financial flow ({viewType === "monthly" ? "last 6 months" : "last 12 weeks"})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsTrendData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.3} />
              <XAxis dataKey="period" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="savings"
                stroke={chartColors.savings}
                strokeWidth={3}
                name="Net Savings"
                dot={{ fill: chartColors.savings, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke={chartColors.income}
                strokeWidth={3}
                name="Income"
                dot={{ fill: chartColors.income, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                stroke={chartColors.expenses}
                strokeWidth={3}
                name="Expenses"
                dot={{ fill: chartColors.expenses, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
