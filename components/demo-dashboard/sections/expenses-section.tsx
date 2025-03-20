"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart } from "@/components/demo-dashboard/charts/bar-chart"
import type { ChartDataPoint } from "@/types/fleet-management"

interface ExpensesSectionProps {
  data: ChartDataPoint[]
}

export function ExpensesSection({ data }: ExpensesSectionProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-4">Expenses by Month</h3>
        <div className="h-48">
          <BarChart data={data} />
        </div>
      </CardContent>
    </Card>
  )
}

