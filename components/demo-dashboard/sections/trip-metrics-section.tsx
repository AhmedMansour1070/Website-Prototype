"use client"

import { Card, CardContent } from "@/components/ui/card"
import { MapPin, RotateCcw, ArrowRight } from "lucide-react"

interface TripMetricsSectionProps {
  totalDistance: number
  returnTrips: number
  oneWayTrips: number
}

export function TripMetricsSection({ totalDistance, returnTrips, oneWayTrips }: TripMetricsSectionProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-1 bg-amber-50">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <MapPin className="h-8 w-8 text-amber-500 mb-2" />
          <h3 className="text-sm text-gray-500 font-medium">Total Distance</h3>
          <p className="text-2xl text-gray-500 font-bold">{totalDistance}</p>
          <p className="text-xs text-gray-500">km</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 bg-red-50">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <RotateCcw className="h-8 w-8 text-red-500 mb-2" />
          <h3 className="text-sm text-gray-500 font-medium">Return</h3>
          <p className="text-2xl text-gray-500 font-bold">{returnTrips}</p>
          <p className="text-xs text-gray-500">Trips</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 bg-green-50">
        <CardContent className="p-4 flex flex-col items-center justify-center">
          <ArrowRight className="h-8 w-8 text-green-500 mb-2" />
          <h3 className="text-sm text-gray-500 font-medium">One-Way</h3>
          <p className="text-2xl  text-gray-500 font-bold">{oneWayTrips}</p>
          <p className="text-xs text-gray-500">Trips</p>
        </CardContent>
      </Card>
    </div>
  )
}

