import { ServiceDetails } from "@/components/sections/services/service-details"

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive fleet management solutions designed to optimize your operations, reduce costs, and improve
          efficiency.
        </p>
      </div>
      <ServiceDetails />
    </div>
  )
}

