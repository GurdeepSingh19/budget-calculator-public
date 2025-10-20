import type { BudgetData } from "@/types/budget"

export function exportToExcel(data: BudgetData, viewType: "monthly" | "weekly") {
  // Create CSV content
  let csvContent = "Period,Type,Category,Planned,Actual,Difference\n"

  Object.entries(data).forEach(([period, periodData]) => {
    // Add income data
    periodData.income.forEach((category) => {
      const difference = category.actual - category.planned
      csvContent += `${period},Income,${category.name},${category.planned},${category.actual},${difference}\n`
    })

    // Add expense data
    periodData.expenses.forEach((category) => {
      const difference = category.actual - category.planned
      csvContent += `${period},Expense,${category.name},${category.planned},${category.actual},${difference}\n`
    })

    // Add totals
    const totalIncome = periodData.income.reduce((sum, cat) => sum + cat.actual, 0)
    const totalExpenses = periodData.expenses.reduce((sum, cat) => sum + cat.actual, 0)
    const netSavings = totalIncome - totalExpenses

    csvContent += `${period},Summary,Total Income,${periodData.income.reduce((sum, cat) => sum + cat.planned, 0)},${totalIncome},\n`
    csvContent += `${period},Summary,Total Expenses,${periodData.expenses.reduce((sum, cat) => sum + cat.planned, 0)},${totalExpenses},\n`
    csvContent += `${period},Summary,Net Savings,,,${netSavings}\n`
    csvContent += "\n"
  })

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
  const link = document.createElement("a")
  const url = URL.createObjectURL(blob)

  link.setAttribute("href", url)
  link.setAttribute("download", `budget-${viewType}-${new Date().toISOString().split("T")[0]}.csv`)
  link.style.visibility = "hidden"

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
