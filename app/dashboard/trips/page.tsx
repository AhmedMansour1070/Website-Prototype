"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  MapPin,
  Truck,
  User,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

// Mock data for trips
const mockTrips = [
  {
    id: 1,
    distance: 450.5,
    loadType: "General Cargo",
    loadCapacity: 15000,
    driverId: 1,
    driverName: "John Doe",
    truckId: 1,
    truckCode: "TR-1001",
    startTime: "2023-12-01T08:00:00",
    endTime: "2023-12-01T16:30:00",
    status: "completed",
    startLocation: "Chicago, IL",
    endLocation: "Indianapolis, IN",
    fuelConsumption: 52.3,
    avgSpeed: 65.2,
  },
  {
    id: 2,
    distance: 780.2,
    loadType: "Refrigerated Goods",
    loadCapacity: 12000,
    driverId: 2,
    driverName: "Jane Smith",
    truckId: 2,
    truckCode: "TR-1002",
    startTime: "2023-12-02T07:30:00",
    endTime: null,
    status: "in_progress",
    startLocation: "Dallas, TX",
    endLocation: "Memphis, TN",
    fuelConsumption: null,
    avgSpeed: 68.7,
  },
  {
    id: 3,
    distance: 320.8,
    loadType: "Construction Materials",
    loadCapacity: 18000,
    driverId: 3,
    driverName: "Michael Johnson",
    truckId: 3,
    truckCode: "TR-1003",
    startTime: "2023-12-03T09:15:00",
    endTime: "2023-12-03T14:45:00",
    status: "completed",
    startLocation: "Denver, CO",
    endLocation: "Salt Lake City, UT",
    fuelConsumption: 38.5,
    avgSpeed: 62.3,
  },
  {
    id: 4,
    distance: 550.0,
    loadType: "Electronics",
    loadCapacity: 8000,
    driverId: 4,
    driverName: "Sarah Williams",
    truckId: 5,
    truckCode: "TR-1005",
    startTime: "2023-12-04T06:00:00",
    endTime: null,
    status: "in_progress",
    startLocation: "Seattle, WA",
    endLocation: "Portland, OR",
    fuelConsumption: null,
    avgSpeed: 60.8,
  },
  {
    id: 5,
    distance: 420.5,
    loadType: "Automotive Parts",
    loadCapacity: 10000,
    driverId: 6,
    driverName: "Emily Davis",
    truckId: 7,
    truckCode: "TR-1007",
    startTime: "2023-12-05T10:30:00",
    endTime: "2023-12-05T18:15:00",
    status: "completed",
    startLocation: "Detroit, MI",
    endLocation: "Cleveland, OH",
    fuelConsumption: 48.2,
    avgSpeed: 64.5,
  },
  {
    id: 6,
    distance: 680.3,
    loadType: "Food Products",
    loadCapacity: 14000,
    driverId: 8,
    driverName: "Jennifer Martinez",
    truckId: 1,
    truckCode: "TR-1001",
    startTime: "2023-12-06T08:45:00",
    endTime: "2023-12-06T19:30:00",
    status: "completed",
    startLocation: "Miami, FL",
    endLocation: "Atlanta, GA",
    fuelConsumption: 75.6,
    avgSpeed: 67.1,
  },
  {
    id: 7,
    distance: 290.7,
    loadType: "Furniture",
    loadCapacity: 9000,
    driverId: 1,
    driverName: "John Doe",
    truckId: 3,
    truckCode: "TR-1003",
    startTime: "2023-12-07T11:00:00",
    endTime: null,
    status: "in_progress",
    startLocation: "Phoenix, AZ",
    endLocation: "Las Vegas, NV",
    fuelConsumption: null,
    avgSpeed: 71.2,
  },
  {
    id: 8,
    distance: 510.4,
    loadType: "Chemicals",
    loadCapacity: 16000,
    driverId: 2,
    driverName: "Jane Smith",
    truckId: 2,
    truckCode: "TR-1002",
    startTime: "2023-12-08T07:00:00",
    endTime: "2023-12-08T16:00:00",
    status: "completed",
    startLocation: "Houston, TX",
    endLocation: "New Orleans, LA",
    fuelConsumption: 61.8,
    avgSpeed: 63.9,
  },
]

export default function TripsPage() {
  const [trips, setTrips] = useState(mockTrips)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredTrips = trips.filter(
    (trip) =>
      trip.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.truckCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.loadType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Calendar className="mr-1 h-3 w-3" /> Scheduled
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Trips</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Schedule Trip
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search trips..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trips</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trips.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Trips</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trips.filter((t) => t.status === "completed").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trips.filter((t) => t.status === "in_progress").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trips.reduce((sum, trip) => sum + trip.distance, 0).toFixed(1)} km
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Trip Map</CardTitle>
            <CardDescription>Current active trips</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[300px] w-full">
              <Image src="/images/trip-map.jpg" alt="Trip Map" fill className="object-cover rounded-b-lg" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-b-lg">
                <Button variant="outline" className="bg-white">
                  View Full Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trip Statistics</CardTitle>
            <CardDescription>Performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Trip Distance</span>
                  <span className="font-medium">
                    {(trips.reduce((sum, trip) => sum + trip.distance, 0) / trips.length).toFixed(1)} km
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-full w-[65%] rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Fuel Consumption</span>
                  <span className="font-medium">
                    {(
                      trips.filter((t) => t.fuelConsumption).reduce((sum, trip) => sum + trip.fuelConsumption, 0) /
                      trips.filter((t) => t.fuelConsumption).length
                    ).toFixed(1)}{" "}
                    L
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-full w-[58%] rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Average Speed</span>
                  <span className="font-medium">
                    {(trips.reduce((sum, trip) => sum + trip.avgSpeed, 0) / trips.length).toFixed(1)} km/h
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-full w-[72%] rounded-full bg-blue-600"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">On-Time Completion Rate</span>
                  <span className="font-medium">94%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-full w-[94%] rounded-full bg-green-600"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trip Management</CardTitle>
          <CardDescription>View and manage all trips</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Driver</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Load Type</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrips.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No trips found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTrips.map((trip) => (
                    <TableRow key={trip.id}>
                      <TableCell className="font-medium">#{trip.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>
                            {trip.startLocation} → {trip.endLocation}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>{trip.driverName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 text-muted-foreground mr-1" />
                          <span>{trip.truckCode}</span>
                        </div>
                      </TableCell>
                      <TableCell>{trip.loadType}</TableCell>
                      <TableCell>{formatDate(trip.startTime)}</TableCell>
                      <TableCell>{getStatusBadge(trip.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Trip</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Track Location</DropdownMenuItem>
                            <DropdownMenuItem>View Documents</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Cancel Trip</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

