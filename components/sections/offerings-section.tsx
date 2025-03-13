import { Truck, PenToolIcon as Tool, Users, Fuel } from "lucide-react"

const offerings = [
  {
    title: "Fleet Tracking & Monitoring",
    description:
      "Real-time GPS tracking and monitoring for your entire fleet. Know where your vehicles are at all times and monitor driver behavior.",
    icon: Truck,
    gradient: "from-blue-100 to-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Maintenance Management",
    description:
      "Proactive maintenance scheduling and tracking to prevent costly breakdowns. Keep your vehicles in optimal condition.",
    icon: Tool,
    gradient: "from-purple-100 to-purple-50",
    iconColor: "text-purple-600",
  },
  {
    title: "Driver Management",
    description:
      "Complete driver management solutions including performance monitoring, license tracking, and compliance management.",
    icon: Users,
    gradient: "from-green-100 to-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Fuel Management",
    description: "Comprehensive fuel consumption tracking and optimization. Reduce fuel costs with detailed analytics.",
    icon: Fuel,
    gradient: "from-amber-100 to-amber-50",
    iconColor: "text-amber-600",
  },
]

export function OfferingsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            What we Offer
          </h2>
          <p className="text-gray-600">TAILORED FLEET MANAGEMENT SERVICES</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className={`flex gap-6 p-6 rounded-lg shadow-sm bg-gradient-to-br ${offering.gradient} hover:shadow-md transition-shadow duration-300`}
            >
              <div className="flex-shrink-0">
                <offering.icon className={`h-12 w-12 ${offering.iconColor}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{offering.title}</h3>
                <p className="text-gray-600">{offering.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

