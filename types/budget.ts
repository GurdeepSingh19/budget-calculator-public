export interface BudgetCategory {
  id: string
  name: string
  planned: number
  actual: number
  isCustom: boolean
}

export interface PeriodData {
  income: BudgetCategory[]
  expenses: BudgetCategory[]
}

export interface BudgetData {
  [period: string]: PeriodData
}
