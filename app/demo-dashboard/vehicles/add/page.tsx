"use client"
import { useRouter } from "next/navigation"
import { AddVehicleForm } from "@/components/demo-dashboard/forms/add-vehicle-form"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"

export default function AddVehiclePage() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl  text-black font-bold">Add New Vehicle</h1>
        <DemoBadge />
      </div>

      <AddVehicleForm
        onSuccess={() => {
          router.push("/demo-dashboard/vehicles")
        }}
      />
    </div>
  )
}

