"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, TrendingUp, TrendingDown, Fuel, Activity, Truck, Users } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function PerformancePage() {
  const [timeRange, setTimeRange] = useState("month")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Performance Analytics</h1>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download report</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fuel Efficiency</CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2 km/L</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+5.2% from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Utilization</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+3.1% from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Driver Performance</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2.4% from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incident Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3%</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingDown className="mr-1 h-3 w-3" />
              <span>-1.5% from previous {timeRange}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="costs">Costs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Key metrics over time</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[400px] w-full">
                  <Image
                    src="/images/performance-chart.jpg"
                    alt="Performance Chart"
                    fill
                    className="object-cover rounded-b-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fuel Consumption</CardTitle>
                <CardDescription>By vehicle type</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/images/fuel-chart.jpg"
                    alt="Fuel Consumption Chart"
                    fill
                    className="object-cover rounded-b-lg"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Maintenance Costs</CardTitle>
                <CardDescription>By vehicle age</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative h-[300px] w-full">
                  <Image
                    src="/images/maintenance-chart.jpg"
                    alt="Maintenance Costs Chart"
                    fill
                    className="object-cover rounded-b-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
              <CardDescription>Detailed breakdown of fleet performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Average Trip Distance</h4>
                    <span className="text-sm font-medium">450 km</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[65%] rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 500 km</span>
                    <span>65% of target</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Average Fuel Efficiency</h4>
                    <span className="text-sm font-medium">8.2 km/L</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[82%] rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 10 km/L</span>
                    <span>82% of target</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Vehicle Utilization Rate</h4>
                    <span className="text-sm font-medium">76%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[76%] rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 85%</span>
                    <span>76% of target</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">On-Time Delivery Rate</h4>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[94%] rounded-full bg-green-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 95%</span>
                    <span>94% of target</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Maintenance Compliance</h4>
                    <span className="text-sm font-medium">88%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[88%] rounded-full bg-blue-600"></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Target: 100%</span>
                    <span>88% of target</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vehicles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Performance</CardTitle>
              <CardDescription>Detailed analytics by vehicle</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="/images/vehicle-performance.jpg"
                  alt="Vehicle Performance Chart"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Driver Performance</CardTitle>
              <CardDescription>Detailed analytics by driver</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="/images/driver-performance.jpg"
                  alt="Driver Performance Chart"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="costs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cost Analysis</CardTitle>
              <CardDescription>Breakdown of operational costs</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px] flex items-center justify-center">
              <div className="relative h-full w-full">
                <Image
                  src="/images/cost-analysis.jpg"
                  alt="Cost Analysis Chart"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

