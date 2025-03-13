"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Filter, MoreHorizontal, List, Calendar, ImageIcon, ChevronDown, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

// Mock data for vehicles
const mockVehicles = [
  {
    id: 1,
    licensePlate: "HR BF-150",
    brand: "VW",
    model: "Polo Life",
    status: "Active",
    lastMileage: 12496,
    image: "/images/vehicles/vw-polo.jpg",
    rentals: ["M-00001", "M-00002"],
  },
  {
    id: 2,
    licensePlate: "M AN-1192",
    brand: "VW",
    model: "Passat Variant",
    status: "Repair",
    lastMileage: 25374,
    image: "/images/vehicles/vw-passat.jpg",
    rentals: [],
  },
  {
    id: 3,
    licensePlate: "B OI-1932",
    brand: "BMW",
    model: "2er Active Tourer",
    status: "Active",
    lastMileage: 2356,
    image: "/images/vehicles/bmw-2er.jpg",
    rentals: ["M-00003", "M-00008"],
  },
  {
    id: 4,
    licensePlate: "D AR-1795",
    brand: "BMW",
    model: "3er Touring M",
    status: "Active",
    lastMileage: 7893,
    image: "/images/vehicles/bmw-3er.jpg",
    rentals: ["M-00004"],
  },
  {
    id: 5,
    licensePlate: "MZ TR-005",
    brand: "BMW",
    model: "X2 M",
    status: "Active",
    lastMileage: 15736,
    image: "/images/vehicles/bmw-x2.jpg",
    rentals: [],
  },
]

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState(mockVehicles)
  const [searchTerm, setSearchTerm] = useState("")
  const [groupBy, setGroupBy] = useState("brand")
  const [viewMode, setViewMode] = useState("table")
  const { toast } = useToast()

  // Group vehicles by the selected property
  const groupedVehicles = vehicles.reduce((acc, vehicle) => {
    const key = vehicle[groupBy]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(vehicle)
    return acc
  }, {})

  // Filter vehicles based on search term
  const filteredGroups = Object.entries(groupedVehicles).filter(([group, vehicles]) => {
    return vehicles.some(
      (vehicle) =>
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Repair":
        return "bg-red-100 text-red-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-blue-100 text-blue-800"
    }
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-md shadow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              View all brands
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <ChevronDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Grouped by: {groupBy}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setGroupBy("brand")}>Brand</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("status")}>Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("model")}>Model</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              <ChevronDown className="mr-2 h-4 w-4" />
              Hide columns
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="table" onValueChange={setViewMode}>
              <TabsList className="h-9">
                <TabsTrigger value="table">
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="timeline">
                  <Calendar className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  <ImageIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Vehicle Data */}
      <div className="bg-white rounded-md shadow">
        {viewMode === "table" && (
          <div>
            {filteredGroups.map(([group, vehicles]) => (
              <div key={group} className="mb-4">
                <div className="bg-gray-100 p-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Badge
                      className={`${group === "BMW" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                    >
                      {group}
                    </Badge>
                    <span className="text-sm font-medium">Count {vehicles.length}</span>
                  </div>
                  <div className="text-sm">
                    Sum {vehicles.reduce((sum, vehicle) => sum + vehicle.lastMileage, 0).toLocaleString()}
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>License Plate</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Pictures</TableHead>
                      <TableHead>Model</TableHead>
                      <TableHead>Rentals</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Mileage</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle, index) => (
                      <TableRow key={vehicle.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{vehicle.licensePlate}</TableCell>
                        <TableCell>
                          <Badge
                            className={`${vehicle.brand === "BMW" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}
                          >
                            {vehicle.brand}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="relative h-12 w-20 rounded overflow-hidden">
                            <Image
                              src={vehicle.image || "/placeholder.svg?height=48&width=80"}
                              alt={vehicle.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell>{vehicle.model}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.rentals.map((rental) => (
                              <Badge key={rental} variant="outline" className="bg-blue-50">
                                {rental}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                        </TableCell>
                        <TableCell>{vehicle.lastMileage.toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast({ title: "View details" })}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Edit vehicle" })}>
                                Edit vehicle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Schedule maintenance" })}>
                                Schedule maintenance
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        )}

        {viewMode === "gallery" && (
          <div className="p-4">
            {filteredGroups.map(([group, vehicles]) => (
              <div key={group} className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{group}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="bg-white border rounded-md overflow-hidden">
                      <div className="relative h-40 w-full">
                        <Image
                          src={vehicle.image || "/placeholder.svg?height=160&width=320"}
                          alt={vehicle.model}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{vehicle.licensePlate}</h4>
                          <Badge className={getStatusColor(vehicle.status)}>{vehicle.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">{vehicle.model}</p>
                        <p className="text-sm mt-1">Mileage: {vehicle.lastMileage.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "timeline" && (
          <div className="p-4">
            <div className="text-center p-8">
              <h3 className="text-lg font-medium text-gray-500">Timeline view is available in the full version</h3>
              <p className="text-gray-500 mt-2">This view shows vehicle activities on a timeline</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-2 text-sm text-gray-500">
        <div>{vehicles.length} records</div>
        <div>Sum {vehicles.reduce((sum, vehicle) => sum + vehicle.lastMileage, 0).toLocaleString()}</div>
      </div>
    </div>
  )
}

