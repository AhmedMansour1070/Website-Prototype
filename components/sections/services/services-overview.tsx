"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Users, PenToolIcon as Tool, Map, Fuel } from "lucide-react"

const services = [
  {
    id: "fleet-management",
    title: "Fleet Management",
    description: "Comprehensive vehicle tracking and management system",
    icon: Truck,
    image: "/images/fleet-management.jpg",
    features: [
      "Real-time vehicle tracking and location monitoring",
      "Vehicle utilization and performance analytics",
      "Comprehensive vehicle history and documentation",
      "Automated vehicle assignment and scheduling",
      "Custom vehicle grouping and categorization",
      "Vehicle acquisition and disposal management",
    ],
    color: "bg-blue-100 text-blue-600",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    id: "driver-management",
    title: "Driver Management",
    description: "Complete driver monitoring and compliance solution",
    icon: Users,
    image: "/images/driver-management.jpg",
    features: [
      "Driver performance monitoring and scoring",
      "License and certification tracking with expiration alerts",
      "Hours of service compliance and reporting",
      "Driver training and qualification management",
      "Incident and violation tracking",
      "Driver assignment and scheduling",
    ],
    color: "bg-green-100 text-green-600",
    gradient: "from-green-500 to-teal-500",
  },
  {
    id: "maintenance-tracking",
    title: "Maintenance Tracking",
    description: "Proactive maintenance management to prevent costly breakdowns",
    icon: Tool,
    image: "/images/maintenance-tracking.jpg",
    features: [
      "Scheduled maintenance reminders and alerts",
      "Maintenance history and documentation",
      "Service provider management",
      "Parts inventory tracking",
      "Maintenance cost analysis",
      "Warranty tracking and management",
    ],
    color: "bg-yellow-100 text-yellow-600",
    gradient: "from-yellow-500 to-amber-500",
  },
  {
    id: "trip-analytics",
    title: "Trip Analytics",
    description: "Detailed trip data analysis for route optimization",
    icon: Map,
    image: "/images/trip-analytics.jpg",
    features: [
      "Route planning and optimization",
      "Trip history and reporting",
      "Fuel consumption analysis by trip",
      "Driver behavior analysis during trips",
      "Geofencing and location-based alerts",
      "Customer delivery time tracking",
    ],
    color: "bg-purple-100 text-purple-600",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    id: "fuel-management",
    title: "Fuel Management",
    description: "Comprehensive fuel usage tracking and optimization",
    icon: Fuel,
    image: "/images/fuel-management.jpg",
    features: [
      "Fuel consumption tracking and reporting",
      "Fuel card integration and management",
      "Fuel theft and fraud detection",
      "Fuel economy analysis by vehicle and driver",
      "Fuel cost forecasting",
      "Alternative fuel tracking and analysis",
    ],
    color: "bg-red-100 text-red-600",
    gradient: "from-red-500 to-pink-500",
  },
]

export function ServicesOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {services.map((service, index) => (
        <Card
          key={service.id}
          className="overflow-hidden bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-all duration-300"
        >
          <div className={`p-4 ${service.color} flex items-center justify-center`}>
            <service.icon className="h-8 w-8" />
          </div>
          <CardHeader>
            <CardTitle>{service.title}</CardTitle>
            <p className="text-gray-600 mt-2">{service.description}</p>
          </CardHeader>
          <CardContent>
            <a href={`#${service.id}`}>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </a>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

