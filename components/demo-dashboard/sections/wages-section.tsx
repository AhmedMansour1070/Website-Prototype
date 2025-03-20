"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LineChart } from "@/components/demo-dashboard/charts/line-chart"
import type { ChartDataPoint } from "@/types/fleet-management"

interface WagesSectionProps {
  driverWage: number
  buddyWage: number
  driverData: ChartDataPoint[]
  buddyData: ChartDataPoint[]
}

export function WagesSection({ driverWage, buddyWage, driverData, buddyData }: WagesSectionProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-2">Wage's</h3>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Driver</span>
            <span className="font-medium">฿{driverWage.toLocaleString()}</span>
          </div>
          <div className="h-24">
            <LineChart data={driverData} color="#f59e0b" />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Buddy</span>
            <span className="font-medium">฿{buddyWage.toLocaleString()}</span>
          </div>
          <div className="h-24">
            <LineChart data={buddyData} color="#3b82f6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

