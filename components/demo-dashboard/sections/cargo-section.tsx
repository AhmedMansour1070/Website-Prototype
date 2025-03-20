"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ProgressBar } from "@/components/demo-dashboard/charts/progress-bar"
import type { CargoTypeData } from "@/types/fleet-management"

interface CargoSectionProps {
  data: CargoTypeData[]
}

export function CargoSection({ data }: CargoSectionProps) {
  const colors = ["#3b82f6", "#ef4444", "#f59e0b", "#10b981"]

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-4">Cargo Types</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={item.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{item.name}</span>
                <span>{item.value}</span>
              </div>
              <ProgressBar value={item.value} max={100} color={colors[index % colors.length]} height="h-4" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

