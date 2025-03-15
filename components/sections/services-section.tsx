"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const services = [
  {
    title: "COMMERCIAL FLEET",
    description:
      "Comprehensive fleet management solutions for commercial vehicles including trucks, vans, and delivery vehicles.",
    image: "/images/commercial-fleet.jpg",
    icon: Truck,
    details: [
      "Real-time GPS tracking and monitoring",
      "Maintenance scheduling and alerts",
      "Fuel consumption optimization",
      "Driver behavior monitoring",
      "Route optimization and planning",
      "Compliance management",
    ],
  },
  {
    title: "CORPORATE FLEET",
    description:
      "Professional management services for corporate car fleets, ensuring optimal performance and cost efficiency.",
    image: "/images/corporate-fleet.jpg",
    icon: Truck,
    details: [
      "Vehicle lifecycle management",
      "Cost analysis and reporting",
      "Policy compliance monitoring",
      "Driver assignment and management",
      "Preventive maintenance scheduling",
      "Fuel card management",
    ],
  },
  {
    title: "SPECIALIZED VEHICLES",
    description:
      "Expert management of specialized vehicle fleets including construction equipment and service vehicles.",
    image: "/images/specialized-fleet.jpg",
    icon: Truck,
    details: [
      "Equipment utilization tracking",
      "Specialized maintenance management",
      "Custom reporting solutions",
      "Asset lifecycle optimization",
      "Operator certification tracking",
      "Regulatory compliance management",
    ],
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState<number | null>(null)

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index)
  }

  return (
    <section className="relative -mt-32 pb-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border border-gray-300">
                {/* Added border-b to the image container */}
                <div className="relative h-48 overflow-hidden border-b border-gray-300">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl">{service.title}</h3>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <service.icon className="h-5 w-5 text-blue-600" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-between"
                    onClick={() => toggleService(index)}
                  >
                    <span>{activeService === index ? "SHOW LESS" : "LEARN MORE"}</span>
                    {activeService === index ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>

                  <AnimatePresence>
                    {activeService === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-2">
                          <h4 className="font-semibold text-blue-700">Our Services Include:</h4>
                          <ul className="space-y-2 list-disc pl-5 text-gray-600">
                            {service.details.map((detail, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: i * 0.1 }}
                              >
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
