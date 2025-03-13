"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Truck,
  Users,
  Calendar,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Fuel,
  Activity,
  PenToolIcon as Tool,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ProgressMetrics } from "@/components/dashboard/progress-metric"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    totalVehicles: 0,
    activeVehicles: 0,
    totalDrivers: 0,
    activeDrivers: 0,
    tripsToday: 0,
    tripsThisWeek: 0,
    maintenanceAlerts: 0,
    fuelEfficiency: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setDashboardData({
        totalVehicles: 48,
        activeVehicles: 32,
        totalDrivers: 56,
        activeDrivers: 42,
        tripsToday: 24,
        tripsThisWeek: 142,
        maintenanceAlerts: 5,
        fuelEfficiency: 8.2,
      })
      setIsLoading(false)
    }, 1000)

    // Uncomment to use real API
    // fetchDashboardData()
  }, [toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const statsCards = [
    {
      title: "Total Vehicles",
      value: dashboardData.totalVehicles,
      icon: Truck,
      subtitle: `${dashboardData.activeVehicles} active (${Math.round((dashboardData.activeVehicles / dashboardData.totalVehicles) * 100)}%)`,
    },
    {
      title: "Total Drivers",
      value: dashboardData.totalDrivers,
      icon: Users,
      subtitle: `${dashboardData.activeDrivers} active (${Math.round((dashboardData.activeDrivers / dashboardData.totalDrivers) * 100)}%)`,
    },
    {
      title: "Trips",
      value: dashboardData.tripsToday,
      icon: Calendar,
      subtitle: `${dashboardData.tripsThisWeek} this week`,
    },
    {
      title: "Maintenance Alerts",
      value: dashboardData.maintenanceAlerts,
      icon: AlertTriangle,
      subtitle: "Vehicles requiring attention",
    },
  ]

  const performanceMetrics = [
    {
      label: "Average Trip Distance",
      value: 450,
      target: 500,
      unit: " km",
    },
    {
      label: "Average Fuel Efficiency",
      value: 8.2,
      target: 10,
      unit: " km/L",
    },
    {
      label: "Vehicle Utilization Rate",
      value: 76,
      target: 85,
      unit: "%",
    },
    {
      label: "On-Time Delivery Rate",
      value: 94,
      target: 95,
      unit: "%",
    },
    {
      label: "Maintenance Compliance",
      value: 88,
      target: 100,
      unit: "%",
    },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      <StatsCards cards={statsCards} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                    <span className="font-medium">{dashboardData.activeVehicles}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                      <span>In Maintenance</span>
                    </div>
                    <span className="font-medium">{dashboardData.maintenanceAlerts}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <span>Inactive</span>
                    </div>
                    <span className="font-medium">
                      {dashboardData.totalVehicles - dashboardData.activeVehicles - dashboardData.maintenanceAlerts}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                    <span className="font-medium">{Math.round(dashboardData.activeDrivers * 0.7)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span>Available</span>
                    </div>
                    <span className="font-medium">{Math.round(dashboardData.activeDrivers * 0.3)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                      <span>Off Duty</span>
                    </div>
                    <span className="font-medium">{dashboardData.totalDrivers - dashboardData.activeDrivers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                      <span className="font-medium">{dashboardData.fuelEfficiency} km/L</span>
                      <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-muted-foreground" />
                      <span>Vehicle Utilization</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">76%</span>
                      <TrendingUp className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                      <span>Incident Rate</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">2.3%</span>
                      <TrendingDown className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest fleet activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                    <div
                      className={`rounded-full p-2 ${
                        i % 3 === 0
                          ? "bg-blue-100 text-blue-600"
                          : i % 3 === 1
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {i % 3 === 0 ? (
                        <Truck className="h-4 w-4" />
                      ) : i % 3 === 1 ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <Tool className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {i % 3 === 0
                          ? "Vehicle TR-" + i * 123 + " started trip"
                          : i % 3 === 1
                            ? "Driver John D. completed trip"
                            : "Maintenance scheduled for vehicle TR-" + i * 111}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(Date.now() - i * 3600000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <ProgressMetrics metrics={performanceMetrics} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and view reports</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Report generation tools will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

