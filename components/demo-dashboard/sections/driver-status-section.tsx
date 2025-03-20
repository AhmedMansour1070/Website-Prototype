"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface DriverStatusSectionProps {
  onDutyDrivers: number
  availableDrivers: number
  offDutyDrivers: number
}

export function DriverStatusSection({ onDutyDrivers, availableDrivers, offDutyDrivers }: DriverStatusSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Status</CardTitle>
        <CardDescription>Current status of your drivers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span>On Duty</span>
            </div>
            <span className="font-medium">{onDutyDrivers}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span>Available</span>
            </div>
            <span className="font-medium">{availableDrivers}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              <span>Off Duty</span>
            </div>
            <span className="font-medium">{offDutyDrivers}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

