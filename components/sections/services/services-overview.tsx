"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Users, PenToolIcon as Tool, Map, Fuel, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

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
    borderColor: "border-blue-200",
    shadowColor: "shadow-blue-100",
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
    borderColor: "border-green-200",
    shadowColor: "shadow-green-100",
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
    borderColor: "border-yellow-200",
    shadowColor: "shadow-yellow-100",
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
    borderColor: "border-purple-200",
    shadowColor: "shadow-purple-100",
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
    borderColor: "border-red-200",
    shadowColor: "shadow-red-100",
  },
]

export function ServicesOverview() {
  // Function to handle smooth scrolling
  const scrollToService = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      // Smooth scroll to the element
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Our Comprehensive Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the full range of solutions we offer to optimize your fleet operations
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={cardVariants}
          >
            <Card
              className={`overflow-hidden bg-white border-2 ${service.borderColor} hover:shadow-xl ${service.shadowColor} transition-all duration-300 hover:-translate-y-1 h-full flex flex-col`}
            >
              <div className={`p-6 ${service.color} flex items-center justify-center rounded-b-3xl`}>
                <service.icon className="h-12 w-12" />
              </div>
              <CardHeader>
                <CardTitle className={`text-xl font-bold bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                  {service.title}
                </CardTitle>
                <p className="text-gray-600 mt-2">{service.description}</p>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-end">
                <div className="mb-4 space-y-1">
                  {service.features.slice(0, 2).map((feature, i) => (
                    <p key={i} className="text-sm text-gray-500 flex items-start">
                      <span className="inline-block mr-2 mt-1 h-1 w-1 rounded-full bg-gray-400"></span>
                      {feature}
                    </p>
                  ))}
                </div>
                <Button 
                  className={`w-full mt-2 bg-gradient-to-r ${service.gradient} text-white hover:shadow-md transition-all group flex items-center justify-center`}
                  onClick={scrollToService(service.id)}
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}