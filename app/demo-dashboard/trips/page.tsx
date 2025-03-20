"use client"

import { useState, useEffect, JSX } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
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
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"
import { mockTrips } from "@/components/demo-dashboard/mock-data"

interface Trip {
  id: number
  driverName: string
  truckCode: string
  loadType: string
  startLocation: string
  endLocation: string
  startTime: string
  status: string
  distance: number
  avgSpeed: number
  fuelConsumption: number | null
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>(mockTrips)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const filteredTrips = trips.filter(
    (trip) =>
      trip.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.truckCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.loadType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.endLocation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Explicitly annotate the parameter type as string
  const getStatusBadge = (status: string): JSX.Element => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-emerald-900/20 text-emerald-400 hover:bg-emerald-900/30 border-emerald-800">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-indigo-900/20 text-indigo-400 hover:bg-indigo-900/30 border-indigo-800">
            <Clock className="mr-1 h-3 w-3" /> In Progress
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-amber-900/20 text-amber-400 hover:bg-amber-900/30 border-amber-800">
            <Calendar className="mr-1 h-3 w-3" /> Scheduled
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-rose-900/20 text-rose-400 hover:bg-rose-900/30 border-rose-800">
            <AlertTriangle className="mr-1 h-3 w-3" /> Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Annotate parameter as string (or null if that is possible)
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400"></div>
      </div>
    )
  }

  // Filter out trips with null or undefined fuelConsumption
  const tripsWithFuel = trips.filter((t) => t.fuelConsumption != null)

  return (
    <div className="space-y-6 bg-gradient-to-b from-gray-900 to-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-indigo-300 font-bold">Trips Dashboard</h1>
        <DemoBadge />
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-indigo-400" />
          <Input
            type="search"
            placeholder="Search trips..."
            className="pl-8 bg-gray-800 border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="border-gray-700 text-indigo-400 hover:bg-gray-700">
          <Filter className="h-4 w-4" />
          <span className="sr-only">Filter</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-indigo-950 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-indigo-300">Total Trips</CardTitle>
            <Calendar className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-200">{trips.length}</div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-emerald-950 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-300">Completed Trips</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-200">
              {trips.filter((t) => t.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-amber-950 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-300">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-200">
              {trips.filter((t) => t.status === "in_progress").length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gradient-to-br from-gray-800 to-violet-950 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-violet-300">Total Distance</CardTitle>
            <MapPin className="h-4 w-4 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-violet-200">
              {trips.reduce((sum, trip) => sum + trip.distance, 0).toFixed(1)} km
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-sky-950 rounded-t-lg border-b border-gray-700">
            <CardTitle className="text-sky-300">Trip Map</CardTitle>
            <CardDescription className="text-sky-500">Current active trips</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[300px] w-full">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Trip Map"
                fill
                className="object-cover rounded-b-lg opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-center justify-center rounded-b-lg">
                <Button className="bg-gray-800 text-sky-400 hover:bg-gray-700 border border-gray-700">
                  View Full Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-indigo-950 rounded-t-lg border-b border-gray-700">
            <CardTitle className="text-indigo-300">Trip Statistics</CardTitle>
            <CardDescription className="text-indigo-500">Performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-indigo-400">Average Trip Distance</span>
                  <span className="font-medium text-indigo-200">
                    {(trips.reduce((sum, trip) => sum + trip.distance, 0) / trips.length).toFixed(1)} km
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                  <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-indigo-800 to-indigo-500"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-teal-400">Average Fuel Consumption</span>
                  <span className="font-medium text-teal-200">
                    {tripsWithFuel.length > 0
                      ? (
                          tripsWithFuel.reduce((sum, trip) => sum + (trip.fuelConsumption as number), 0) /
                          tripsWithFuel.length
                        ).toFixed(1)
                      : "N/A"}{" "}
                    L
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                  <div className="h-full w-[58%] rounded-full bg-gradient-to-r from-teal-800 to-teal-500"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sky-400">Average Speed</span>
                  <span className="font-medium text-sky-200">
                    {(trips.reduce((sum, trip) => sum + trip.avgSpeed, 0) / trips.length).toFixed(1)} km/h
                  </span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                  <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-sky-800 to-sky-500"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-emerald-400">On-Time Completion Rate</span>
                  <span className="font-medium text-emerald-200">94%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-gray-700">
                  <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-emerald-800 to-emerald-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-gray-700 bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-indigo-950 rounded-t-lg border-b border-gray-700">
          <CardTitle className="text-indigo-300">Trip Management</CardTitle>
          <CardDescription className="text-indigo-500">View and manage all trips</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-800">
              <TableRow className="hover:bg-gray-700 border-b border-gray-700">
                <TableHead className="text-indigo-300">ID</TableHead>
                <TableHead className="text-indigo-300">Route</TableHead>
                <TableHead className="text-indigo-300">Driver</TableHead>
                <TableHead className="text-indigo-300">Vehicle</TableHead>
                <TableHead className="text-indigo-300">Load Type</TableHead>
                <TableHead className="text-indigo-300">Start Time</TableHead>
                <TableHead className="text-indigo-300">Status</TableHead>
                <TableHead className="text-right text-indigo-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrips.length === 0 ? (
                <TableRow className="border-none">
                  <TableCell colSpan={8} className="text-center py-10 text-gray-400">
                    No trips found
                  </TableCell>
                </TableRow>
              ) : (
                filteredTrips.map((trip, index) => (
                  <TableRow key={trip.id} className={`${index % 2 === 0 ? "bg-gray-800" : "bg-gray-750"} hover:bg-gray-700 border-none`}>
                    <TableCell className="font-medium text-indigo-300">#{trip.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-violet-400 mr-1" />
                        <span className="text-gray-300">
                          {trip.startLocation} → {trip.endLocation}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-sky-400 mr-1" />
                        <span className="text-gray-300">{trip.driverName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Truck className="h-4 w-4 text-emerald-400 mr-1" />
                        <span className="text-gray-300">{trip.truckCode}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">{trip.loadType}</TableCell>
                    <TableCell className="text-gray-300">{formatDate(trip.startTime)}</TableCell>
                    <TableCell>{getStatusBadge(trip.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-indigo-400 hover:text-indigo-300 hover:bg-gray-700">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-gray-700 bg-gray-800">
                          <DropdownMenuLabel className="text-indigo-300">Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => toast({ title: "View Details" })} className="text-gray-300 focus:bg-gray-700 focus:text-indigo-300">
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: "Edit Trip" })} className="text-gray-300 focus:bg-gray-700 focus:text-indigo-300">
                            Edit Trip
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem onClick={() => toast({ title: "Track Location" })} className="text-gray-300 focus:bg-gray-700 focus:text-indigo-300">
                            Track Location
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toast({ title: "View Documents" })} className="text-gray-300 focus:bg-gray-700 focus:text-indigo-300">
                            View Documents
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem onClick={() => toast({ title: "Cancel Trip" })} className="text-rose-400 focus:bg-gray-700 focus:text-rose-300">
                            Cancel Trip
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
