"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "lucide-react"

interface PeriodSelectorProps {
  viewType: "monthly" | "weekly"
  currentPeriod: string
  onPeriodChange: (period: string) => void
  onViewTypeChange: (type: "monthly" | "weekly") => void
}

export function PeriodSelector({ viewType, currentPeriod, onPeriodChange, onViewTypeChange }: PeriodSelectorProps) {
  const generateMonthOptions = () => {
    const options = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
      const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
      const label = date.toLocaleDateString("en-US", { year: "numeric", month: "long" })
      options.push({ value, label })
    }
    return options
  }

  const generateWeekOptions = () => {
    const options = []
    const now = new Date()
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000)
      const weekNumber = getWeekNumber(date)
      const value = `${date.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`
      const label = `Week ${weekNumber}, ${date.getFullYear()}`
      options.push({ value, label })
    }
    return options
  }

  const getWeekNumber = (date: Date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  }

  const options = viewType === "monthly" ? generateMonthOptions() : generateWeekOptions()

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <Tabs value={viewType} onValueChange={(v) => onViewTypeChange(v as "monthly" | "weekly")}>
        <TabsList>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>

      <Select value={currentPeriod} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-[200px]">
          <Calendar className="h-4 w-4 mr-2" />
          <SelectValue placeholder="Select period" />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
