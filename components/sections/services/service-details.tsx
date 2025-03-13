"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronDown, ChevronUp, Truck, Users, PenToolIcon as Tool, Map, Fuel } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { AuthModal } from "@/components/auth-modal"

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

export function ServiceDetails() {
  const [activeService, setActiveService] = useState<string | null>(null)

  const toggleService = (id: string) => {
    setActiveService(activeService === id ? null : id)
  }

  return (
    <div className="space-y-8">
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-12 ${index % 2 === 0 ? "bg-gradient-to-r from-gray-50 to-blue-50" : "bg-white"} rounded-lg scroll-mt-20`}
        >
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className={`order-2 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <div
                  className={`inline-flex items-center space-x-2 ${service.color} rounded-full px-3 py-1 text-sm mb-4`}
                >
                  <service.icon className="h-4 w-4" />
                  <span>Service</span>
                </div>
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6">{service.description}</p>

                <Button
                  variant="outline"
                  className="mb-4 flex items-center gap-2"
                  onClick={() => toggleService(service.id)}
                >
                  {activeService === service.id ? "Show Less" : "Show Details"}
                  {activeService === service.id ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>

                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden mb-6"
                    >
                      <div className="space-y-3">
                        {service.features.map((feature, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.1 }}
                            className="flex items-start"
                          >
                            <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                            <span>{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AuthModal triggerText="Get Started" defaultTab="register" />
              </div>
              <div className={`order-1 ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20`}></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

