"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, DollarSign, PiggyBank } from "lucide-react"
import { BudgetTable } from "./budget-table"
import { BudgetCharts } from "./budget-charts"
import { PeriodSelector } from "./period-selector"
import { useBudgetData } from "@/hooks/use-budget-data"
import { exportToExcel } from "@/lib/excel-export"
import { useToast } from "@/hooks/use-toast"

export function BudgetCalculator() {
  const [viewType, setViewType] = useState<"monthly" | "weekly">("monthly")
  const [currentPeriod, setCurrentPeriod] = useState<string>("")
  const { toast } = useToast()

  const { incomeCategories, expenseCategories, updateCategory, addCustomCategory, removeCategory, getAllPeriodsData } =
    useBudgetData(viewType, currentPeriod)

  useEffect(() => {
    // Set initial period
    const now = new Date()
    if (viewType === "monthly") {
      setCurrentPeriod(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`)
    } else {
      const weekNumber = getWeekNumber(now)
      setCurrentPeriod(`${now.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`)
    }
  }, [viewType])

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  const totalIncomePlanned = incomeCategories.reduce((sum, cat) => sum + cat.planned, 0)
  const totalIncomeActual = incomeCategories.reduce((sum, cat) => sum + cat.actual, 0)
  const totalExpensePlanned = expenseCategories.reduce((sum, cat) => sum + cat.planned, 0)
  const totalExpenseActual = expenseCategories.reduce((sum, cat) => sum + cat.actual, 0)

  const netSavingsPlanned = totalIncomePlanned - totalExpensePlanned
  const netSavingsActual = totalIncomeActual - totalExpenseActual

  const handleExport = () => {
    const allData = getAllPeriodsData()
    exportToExcel(allData, viewType)
    toast({
      title: "Export Successful",
      description: "Your budget data has been exported to Excel.",
    })
  }

  return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-balance mb-2 text-foreground">Budget Calculator</h1>
              <p className="text-muted-foreground text-lg">Track your income, expenses, and savings with clarity</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <PeriodSelector
          viewType={viewType}
          currentPeriod={currentPeriod}
          onPeriodChange={setCurrentPeriod}
          onViewTypeChange={setViewType}
        />

        <Button onClick={handleExport} className="gap-2">
          <Download className="h-4 w-4" />
          Export to Excel
        </Button>
              </div>
      </div>

              
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">${totalIncomeActual.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Planned: ${totalIncomePlanned.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">${totalExpenseActual.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Planned: ${totalExpensePlanned.toFixed(2)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netSavingsActual >= 0 ? "text-accent" : "text-destructive"}`}>
              ${netSavingsActual.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Planned: ${netSavingsPlanned.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>


      <div className="grid gap-6 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_600px]">
        {/* Left column: Income and Expense tables */}
        <div className="space-y-6">
          <Tabs defaultValue="income" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="income" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income Categories</CardTitle>
                  <CardDescription>
                    Track your income sources for {viewType === "monthly" ? "this month" : "this week"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetTable
                    categories={incomeCategories}
                    type="income"
                    onUpdate={updateCategory}
                    onAdd={addCustomCategory}
                    onRemove={removeCategory}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Categories</CardTitle>
                  <CardDescription>
                    Track your expenses for {viewType === "monthly" ? "this month" : "this week"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <BudgetTable
                    categories={expenseCategories}
                    type="expense"
                    onUpdate={updateCategory}
                    onAdd={addCustomCategory}
                    onRemove={removeCategory}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right column: Charts always visible */}
        <div className="lg:sticky lg:top-6 lg:self-start">
          <BudgetCharts incomeCategories={incomeCategories} expenseCategories={expenseCategories} viewType={viewType} />
        </div>
      </div>
    </div>
  )
}
