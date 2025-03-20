"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { Checkbox } from "@/components/ui/checkbox"

export function AddVehicleForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Vehicle added",
        description: "The vehicle has been added successfully.",
        duration: 3000,
      })

      if (onSuccess) {
        onSuccess()
      }
    }, 1500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Vehicle</CardTitle>
        <CardDescription>Enter vehicle details to add it to your fleet</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Basic Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="vehicle-code">Vehicle Code</Label>
                <Input id="vehicle-code" placeholder="TR-1001" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-plate">License Plate</Label>
                <Input id="license-plate" placeholder="ABC-1234" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brand">Brand/Manufacturer</Label>
                <Input id="brand" placeholder="Volvo" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input id="model" placeholder="FH16" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input id="year" type="number" min="1900" max="2099" placeholder="2023" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN</Label>
                <Input id="vin" placeholder="1HGBH41JXMN109186" required />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Technical Specifications</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="engine-type">Engine Type</Label>
                <Input id="engine-type" placeholder="Diesel D13TC" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="horsepower">Horsepower</Label>
                <Input id="horsepower" type="number" min="0" placeholder="500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transmission">Transmission Type</Label>
                <Select defaultValue="automatic">
                  <SelectTrigger id="transmission">
                    <SelectValue placeholder="Select transmission type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="automatic">Automatic</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="semi-automatic">Semi-Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel-type">Fuel Type</Label>
                <Select defaultValue="diesel">
                  <SelectTrigger id="fuel-type">
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="gasoline">Gasoline</SelectItem>
                    <SelectItem value="electric">Electric</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="cng">CNG</SelectItem>
                    <SelectItem value="lpg">LPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel-capacity">Fuel Tank Capacity (L)</Label>
                <Input id="fuel-capacity" type="number" min="0" placeholder="600" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fuel-efficiency">Fuel Efficiency (km/L)</Label>
                <Input id="fuel-efficiency" type="number" min="0" step="0.1" placeholder="3.5" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Capacity & Dimensions</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="load-capacity">Load Capacity (kg)</Label>
                <Input id="load-capacity" type="number" min="0" placeholder="25000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="axles">Number of Axles</Label>
                <Input id="axles" type="number" min="2" max="10" placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Length (m)</Label>
                <Input id="length" type="number" min="0" step="0.01" placeholder="16.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Width (m)</Label>
                <Input id="width" type="number" min="0" step="0.01" placeholder="2.5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (m)</Label>
                <Input id="height" type="number" min="0" step="0.01" placeholder="4.0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Empty Weight (kg)</Label>
                <Input id="weight" type="number" min="0" placeholder="9000" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Assignment & Status</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="garage">Assigned Garage</Label>
                <Select defaultValue="main">
                  <SelectTrigger id="garage">
                    <SelectValue placeholder="Select garage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Depot</SelectItem>
                    <SelectItem value="north">North Depot</SelectItem>
                    <SelectItem value="south">South Depot</SelectItem>
                    <SelectItem value="east">East Depot</SelectItem>
                    <SelectItem value="west">West Depot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">In Maintenance</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-date">Purchase Date</Label>
                <Input id="purchase-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-price">Purchase Price</Label>
                <Input id="purchase-price" type="number" min="0" placeholder="150000" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Additional Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <textarea
                  id="notes"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any additional information about this vehicle"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="gps-tracking" defaultChecked />
                <Label htmlFor="gps-tracking">GPS Tracking Enabled</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dash-cam" defaultChecked />
                <Label htmlFor="dash-cam">Dash Camera Installed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="telematics" />
                <Label htmlFor="telematics">Telematics System Installed</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding Vehicle..." : "Add Vehicle"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

