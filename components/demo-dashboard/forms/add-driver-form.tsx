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

export function AddDriverForm({ onSuccess }: { onSuccess?: () => void }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Driver added",
        description: "The driver has been added successfully.",
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
        <CardTitle>Add New Driver</CardTitle>
        <CardDescription>Enter driver details to add them to your fleet</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth</Label>
                <Input id="dob" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St, City, State, ZIP" />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">License Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input id="license-number" placeholder="DL12345678" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-type">License Type</Label>
                <Select defaultValue="cdl-a">
                  <SelectTrigger id="license-type">
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdl-a">CDL Class A</SelectItem>
                    <SelectItem value="cdl-b">CDL Class B</SelectItem>
                    <SelectItem value="cdl-c">CDL Class C</SelectItem>
                    <SelectItem value="non-cdl">Non-CDL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-expiry">License Expiry Date</Label>
                <Input id="license-expiry" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-state">Issuing State/Country</Label>
                <Input id="license-state" placeholder="California" required />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Employment Details</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="hire-date">Hire Date</Label>
                <Input id="hire-date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employee-id">Employee ID</Label>
                <Input id="employee-id" placeholder="EMP-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input id="experience" type="number" min="0" placeholder="5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Employment Status</Label>
                <Select defaultValue="full-time">
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="probation">Probation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Additional Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="medical-info">Medical Information</Label>
                <textarea
                  id="medical-info"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Any relevant medical information"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergency-contact">Emergency Contact</Label>
                <Input
                  id="emergency-contact"
                  placeholder="Name: John Doe, Relation: Spouse, Phone: +1 (555) 987-6543"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="hazmat" />
                <Label htmlFor="hazmat">Hazardous Materials Endorsement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tanker" />
                <Label htmlFor="tanker">Tanker Endorsement</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="passenger" />
                <Label htmlFor="passenger">Passenger Endorsement</Label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adding Driver..." : "Add Driver"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

