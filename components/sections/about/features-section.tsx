import { Building, Users, Truck, Clock, Award, Globe } from "lucide-react"

const features = [
  {
    icon: Building,
    title: "Comprehensive Solution",
    description: "All-in-one platform for vehicle, driver, and maintenance management",
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "User-Friendly Interface",
    description: "Intuitive design that requires minimal training",
    gradient: "from-green-100 to-green-50",
    iconColor: "text-green-600",
  },
  {
    icon: Truck,
    title: "Real-Time Tracking",
    description: "Monitor your fleet's performance and location in real-time",
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-600",
  },
  {
    icon: Clock,
    title: "Proactive Maintenance",
    description: "Schedule and track maintenance to prevent costly breakdowns",
    gradient: "from-amber-100 to-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: Award,
    title: "Industry Expertise",
    description: "Built by experts with decades of fleet management experience",
    gradient: "from-indigo-100 to-indigo-50",
    iconColor: "text-indigo-600",
  },
  {
    icon: Globe,
    title: "Global Support",
    description: "24/7 customer support to assist you whenever you need help",
    gradient: "from-red-100 to-red-50",
    iconColor: "text-red-600",
  },
]

export function FeaturesSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mt-12 mb-6 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
        Why Choose Us
      </h2>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-br ${feature.gradient} hover:shadow-md transition-all duration-300`}
          >
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

