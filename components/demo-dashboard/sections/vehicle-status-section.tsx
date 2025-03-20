"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface VehicleStatusSectionProps {
  activeVehicles: number
  maintenanceVehicles: number
  inactiveVehicles: number
}

export function VehicleStatusSection({
  activeVehicles,
  maintenanceVehicles,
  inactiveVehicles,
}: VehicleStatusSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Status</CardTitle>
        <CardDescription>Current status of your fleet</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>Active</span>
            </div>
            <span className="font-medium">{activeVehicles}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span>In Maintenance</span>
            </div>
            <span className="font-medium">{maintenanceVehicles}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <span>Inactive</span>
            </div>
            <span className="font-medium">{inactiveVehicles}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

