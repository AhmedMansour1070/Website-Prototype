"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Fuel, Activity, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface PerformanceMetricsSectionProps {
  fuelEfficiency: number
  vehicleUtilization: number
  incidentRate: number
}

export function PerformanceMetricsSection({
  fuelEfficiency,
  vehicleUtilization,
  incidentRate,
}: PerformanceMetricsSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Key performance indicators</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Fuel className="h-4 w-4 text-muted-foreground" />
              <span>Avg. Fuel Efficiency</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{fuelEfficiency} km/L</span>
              <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span>Vehicle Utilization</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{vehicleUtilization}%</span>
              <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span>Incident Rate</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium">{incidentRate}%</span>
              <TrendingDown className="ml-2 h-4 w-4 text-green-500" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

