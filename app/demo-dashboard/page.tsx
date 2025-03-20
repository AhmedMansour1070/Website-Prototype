"use client"

import { useState, useEffect } from "react"
import { Truck, Users, Calendar, AlertTriangle, TrendingUp, Zap, DollarSign, Package, Map, BarChart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { MetricCard } from "@/components/demo-dashboard/metric-card"
import { ExpensesSection } from "@/components/demo-dashboard/sections/expenses-section"
import { WagesSection } from "@/components/demo-dashboard/sections/wages-section"
import { IncomeSection } from "@/components/demo-dashboard/sections/income-section"
import { TripMetricsSection } from "@/components/demo-dashboard/sections/trip-metrics-section"
import { TripsSection } from "@/components/demo-dashboard/sections/trips-section"
import { CargoSection } from "@/components/demo-dashboard/sections/cargo-section"
import { VehicleStatusSection } from "@/components/demo-dashboard/sections/vehicle-status-section"
import { DriverStatusSection } from "@/components/demo-dashboard/sections/driver-status-section"
import { PerformanceMetricsSection } from "@/components/demo-dashboard/sections/performance-metrics-section"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"
import { dashboardData, chartData } from "@/components/demo-dashboard/mock-data"

export default function DemoDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  // Calculate derived data
  const onDutyDrivers = Math.round(dashboardData.activeDrivers * 0.7)
  const availableDrivers = Math.round(dashboardData.activeDrivers * 0.3)
  const offDutyDrivers = dashboardData.totalDrivers - dashboardData.activeDrivers
  const inactiveVehicles = dashboardData.totalVehicles - dashboardData.activeVehicles - dashboardData.maintenanceAlerts

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl text-white font-bold flex items-center">
            <BarChart className="mr-2 h-8 w-8" /> 
            Logistics Dashboard
          </h1>
          <DemoBadge />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Overall Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500 flex items-center p-4">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">฿{(dashboardData.totalExpenses * 1.4).toLocaleString()}</p>
              <p className="text-xs text-green-600">+{dashboardData.expensesPercentage}% from last month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-red-500 flex items-center p-4">
            <div className="rounded-full bg-red-100 p-3 mr-4">
              <TrendingUp className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-slate-800">฿{dashboardData.totalExpenses.toLocaleString()}</p>
              <p className="text-xs text-red-600">+{dashboardData.expensesPercentage}% from last month</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-blue-500 flex items-center p-4">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Completed Trips</p>
              <p className="text-2xl font-bold text-slate-800">{dashboardData.tripsThisWeek}</p>
              <p className="text-xs text-blue-600">+{Math.round(dashboardData.tripsThisWeek/dashboardData.tripsToday)}% this week</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-yellow-500 flex items-center p-4">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <Map className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Distance</p>
              <p className="text-2xl font-bold text-slate-800">{dashboardData.totalDistance.toLocaleString()} km</p>
              <p className="text-xs text-yellow-600">Across all trips this month</p>
            </div>
          </div>
        </div>

        {/* Operational Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5 text-teal-600" /> 
            Operational Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Fleet Status</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-teal-600 mr-2" />
                    <p className="text-sm font-medium text-slate-600">Vehicles</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{dashboardData.totalVehicles}</p>
                  <div className="text-xs text-slate-500 mt-1">
                    <span className="text-green-600 font-medium">{dashboardData.activeVehicles} active</span> • 
                    <span className="text-yellow-600 font-medium"> {dashboardData.maintenanceAlerts} maintenance</span> • 
                    <span className="text-slate-600"> {inactiveVehicles} inactive</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-indigo-600 mr-2" />
                    <p className="text-sm font-medium text-slate-600">Drivers</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{dashboardData.totalDrivers}</p>
                  <div className="text-xs text-slate-500 mt-1">
                    <span className="text-green-600 font-medium">{onDutyDrivers} on duty</span> • 
                    <span className="text-blue-600 font-medium"> {availableDrivers} available</span> • 
                    <span className="text-slate-600"> {offDutyDrivers} off duty</span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <VehicleStatusSection
                  activeVehicles={dashboardData.activeVehicles}
                  maintenanceVehicles={dashboardData.maintenanceAlerts}
                  inactiveVehicles={inactiveVehicles}
                />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Trip Distribution</h3>
              <div className="mb-3 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-600">One-way Trips</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{dashboardData.oneWayTrips}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {Math.round((dashboardData.oneWayTrips / (dashboardData.oneWayTrips + dashboardData.returnTrips)) * 100)}% of total trips
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-600">Return Trips</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{dashboardData.returnTrips}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {Math.round((dashboardData.returnTrips / (dashboardData.oneWayTrips + dashboardData.returnTrips)) * 100)}% of total trips
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <TripsSection data={chartData.tripsData} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Performance Metrics</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Fuel Efficiency</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{dashboardData.fuelEfficiency.toFixed(1)} km/L</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-700 font-bold">{Math.round(dashboardData.fuelEfficiency / 10 * 100)}%</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Vehicle Utilization</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{dashboardData.vehicleUtilization}%</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-700 font-bold">{dashboardData.vehicleUtilization}%</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Incident Rate</p>
                    <p className="text-lg font-bold text-slate-800 mt-1">{dashboardData.incidentRate}%</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-yellow-700 font-bold">{dashboardData.incidentRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Analytics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-teal-600" /> 
            Financial Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Monthly Expenses</h3>
              <ExpensesSection data={chartData.monthlyExpenses} />
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Driver & Buddy Wages</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-600">Driver Wage</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">฿{dashboardData.driverWage.toLocaleString()}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-600">Buddy Wage</p>
                  <p className="text-xl font-bold text-slate-800 mt-1">฿{dashboardData.buddyWage.toLocaleString()}</p>
                </div>
              </div>
              <WagesSection
                driverWage={dashboardData.driverWage}
                buddyWage={dashboardData.buddyWage}
                driverData={chartData.wagesData}
                buddyData={chartData.buddyWagesData}
              />
            </div>
            
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Income Analysis</h3>
              <IncomeSection 
                driverData={chartData.driverIncomeData} 
                buddyData={chartData.buddyIncomeData}
              />
            </div>
          </div>
        </div>

        {/* Cargo Analysis */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
            <Package className="mr-2 h-5 w-5 text-teal-600" /> 
            Cargo Analysis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h3 className="text-slate-600 font-medium mb-3 text-sm uppercase">Cargo Distribution</h3>
              <CargoSection data={chartData.cargoTypes} />
            </div>
            
            <div className="bg-slate-800 p-4 rounded-xl shadow-md">
              <h3 className="text-slate-200 font-medium mb-3 text-sm uppercase">Trip Metrics</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-200">Total Distance</p>
                  <p className="text-xl font-bold text-white mt-1">{dashboardData.totalDistance.toLocaleString()} km</p>
                </div>
                <div className="bg-slate-700 p-3 rounded-lg">
                  <p className="text-sm font-medium text-slate-200">Total Trips</p>
                  <p className="text-xl font-bold text-white mt-1">{dashboardData.oneWayTrips + dashboardData.returnTrips}</p>
                </div>
              </div>
              <TripMetricsSection
                totalDistance={dashboardData.totalDistance}
                returnTrips={dashboardData.returnTrips}
                oneWayTrips={dashboardData.oneWayTrips}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}