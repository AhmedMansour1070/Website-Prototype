"use client"

import { Card, CardContent } from "@/components/ui/card"
import { LineChart } from "@/components/demo-dashboard/charts/line-chart"
import type { ChartDataPoint } from "@/types/fleet-management"

interface TripsSectionProps {
  data: ChartDataPoint[]
}

export function TripsSection({ data }: TripsSectionProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium mb-4">Trips by Month</h3>
        <div className="h-48">
          <LineChart data={data} color="#10b981" showDots showValues />
        </div>
      </CardContent>
    </Card>
  )
}

