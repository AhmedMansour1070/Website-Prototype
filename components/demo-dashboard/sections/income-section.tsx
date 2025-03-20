"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ProgressBar } from "@/components/demo-dashboard/charts/progress-bar"
import type { DriverIncomeData } from "@/types/fleet-management"

interface IncomeSectionProps {
  driverData: DriverIncomeData[]
  buddyData: DriverIncomeData[]
}

export function IncomeSection({ driverData, buddyData }: IncomeSectionProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-4">Driver & Buddy Income</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs text-gray-500 mb-2">Driver</h4>
            <div className="space-y-2">
              {driverData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <ProgressBar value={item.value} max={1000} color="#3b82f6" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs text-gray-500 mb-2">Buddy</h4>
            <div className="space-y-2">
              {buddyData.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{item.name}</span>
                    <span>{item.value}</span>
                  </div>
                  <ProgressBar value={item.value} max={1000} color="#f59e0b" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

