"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit2, Check, X } from "lucide-react"
import type { BudgetCategory } from "@/types/budget"

interface BudgetTableProps {
  categories: BudgetCategory[]
  type: "income" | "expense"
  onUpdate: (id: string, field: "planned" | "actual", value: number) => void
  onAdd: (type: "income" | "expense", name: string) => void
  onRemove: (id: string) => void
}

export function BudgetTable({ categories, type, onUpdate, onAdd, onRemove }: BudgetTableProps) {
  const [newCategoryName, setNewCategoryName] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState("")

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      onAdd(type, newCategoryName.trim())
      setNewCategoryName("")
    }
  }

  const handleEdit = (category: BudgetCategory) => {
    setEditingId(category.id)
    setEditingName(category.name)
  }

  const handleSaveEdit = (id: string) => {
    // In a real app, you'd have an update name function
    setEditingId(null)
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditingName("")
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 font-semibold text-sm">Category</th>
              <th className="text-right py-3 px-2 font-semibold text-sm">Planned</th>
              <th className="text-right py-3 px-2 font-semibold text-sm">Actual</th>
              <th className="text-right py-3 px-2 font-semibold text-sm">Difference</th>
              <th className="text-right py-3 px-2 font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => {
              const difference = category.actual - category.planned
              const isEditing = editingId === category.id

              return (
                <tr key={category.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-2">
                    {isEditing ? (
                      <div className="flex items-center gap-2">
                        <Input value={editingName} onChange={(e) => setEditingName(e.target.value)} className="h-8" />
                        <Button size="sm" variant="ghost" onClick={() => handleSaveEdit(category.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <span className="font-medium">{category.name}</span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Input
                      type="number"
                      value={category.planned}
                      onChange={(e) => onUpdate(category.id, "planned", Number.parseFloat(e.target.value) || 0)}
                      className="w-28 ml-auto text-right"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="py-3 px-2 text-right">
                    <Input
                      type="number"
                      value={category.actual}
                      onChange={(e) => onUpdate(category.id, "actual", Number.parseFloat(e.target.value) || 0)}
                      className="w-28 ml-auto text-right"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td
                    className={`py-3 px-2 text-right font-semibold ${
                      difference > 0 ? "text-accent" : difference < 0 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    ${Math.abs(difference).toFixed(2)}
                    {difference !== 0 && <span className="text-xs ml-1">{difference > 0 ? "↑" : "↓"}</span>}
                  </td>
                  <td className="py-3 px-2 text-right">
                    <div className="flex justify-end gap-1">
                      {category.isCustom && (
                        <>
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => onRemove(category.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border font-bold">
              <td className="py-3 px-2">Total</td>
              <td className="py-3 px-2 text-right">
                ${categories.reduce((sum, cat) => sum + cat.planned, 0).toFixed(2)}
              </td>
              <td className="py-3 px-2 text-right">
                ${categories.reduce((sum, cat) => sum + cat.actual, 0).toFixed(2)}
              </td>
              <td className="py-3 px-2 text-right">
                $
                {Math.abs(
                  categories.reduce((sum, cat) => sum + cat.actual, 0) -
                    categories.reduce((sum, cat) => sum + cat.planned, 0),
                ).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex gap-2 pt-4 border-t border-border">
        <Input
          placeholder="Add custom category..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <Button onClick={handleAdd} className="gap-2">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  )
}
