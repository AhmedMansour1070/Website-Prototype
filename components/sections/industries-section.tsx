import Image from "next/image"
import { Package, Building, Coffee, ShoppingBag, Users } from "lucide-react"

const industries = [
  { name: "Logistics & Distribution", icon: Package },
  { name: "Construction", icon: Building },
  { name: "Food & Beverage Delivery", icon: Coffee },
  { name: "Retail & E-commerce", icon: ShoppingBag },
  { name: "Passenger Transport", icon: Users },
]

export function IndustriesSection() {
  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">INDUSTRY SECTORS COVERAGE</h2>
            <p className="text-gray-600 mb-8">
              We provide specialized fleet management solutions across various industries, ensuring optimal performance
              and efficiency for every type of fleet operation.
            </p>
            <div className="space-y-4">
              {industries.map((industry, index) => (
                <div key={index} className="flex items-center gap-4">
                  <industry.icon className="h-8 w-8 text-yellow-500" />
                  <span className="text-lg">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[400px]">
            <Image
              src="/images/fleet-management.jpg"
              alt="Industry Coverage"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

