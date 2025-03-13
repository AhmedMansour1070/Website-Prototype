"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Truck, Users, PenToolIcon as Tool, Map, Fuel } from "lucide-react"
import { motion } from "framer-motion"

const services = [
  {
    icon: Truck,
    title: "Fleet Management",
    description: "Comprehensive vehicle tracking and management system",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Driver Management",
    description: "Complete driver monitoring and compliance solution",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Tool,
    title: "Maintenance Management",
    description: "Proactive maintenance management to prevent costly breakdowns",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Map,
    title: "Trip Analytics",
    description: "Detailed trip data analysis for route optimization",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Fuel,
    title: "Fuel Management",
    description: "Comprehensive fuel usage tracking and optimization",
    color: "bg-red-100",
    iconColor: "text-red-600",
  },
]

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6 h-full flex flex-col">
            <div className={`w-12 h-12 rounded-lg ${service.color} flex items-center justify-center mb-4`}>
              <service.icon className={`h-6 w-6 ${service.iconColor}`} />
            </div>
            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
            <Button variant="outline" className="w-full">
              Learn More
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

