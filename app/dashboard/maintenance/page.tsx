"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Truck,
  PenToolIcon as Tool,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wrench,
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
import { Progress } from "@/components/ui/progress"

// Mock data for maintenance
const mockMaintenance = [
  {
    id: 1,
    truckId: 1,
    truckCode: "TR-1001",
    truckModel: "Volvo FH16",
    lastMaintenanceDate: "2023-10-15",
    nextMaintenanceDate: "2024-01-15",
    type: "Regular Service",
    cost: 1200.5,
    status: "completed",
    notes: "Oil change, filter replacement, brake inspection",
    garage: "Main Depot",
  },
  {
    id: 2,
    truckId: 2,
    truckCode: "TR-1002",
    truckModel: "Mercedes-Benz Actros",
    lastMaintenanceDate: "2023-11-05",
    nextMaintenanceDate: "2023-12-05",
    type: "Tire Replacement",
    cost: 2500.0,
    status: "scheduled",
    notes: "Replace all tires, wheel alignment",
    garage: "North Depot",
  },
  {
    id: 3,
    truckId: 3,
    truckCode: "TR-1003",
    truckModel: "Scania R500",
    lastMaintenanceDate: "2023-09-20",
    nextMaintenanceDate: "2024-01-20",
    type: "Engine Overhaul",
    cost: 5000.0,
    status: "in_progress",
    notes: "Complete engine inspection and repair",
    garage: "Main Depot",
  },
  {
    id: 4,
    truckId: 4,
    truckCode: "TR-1004",
    truckModel: "MAN TGX",
    lastMaintenanceDate: "2023-08-10",
    nextMaintenanceDate: "2023-12-10",
    type: "Electrical System",
    cost: 800.75,
    status: "scheduled",
    notes: "Check and repair electrical systems",
    garage: "South Depot",
  },
  {
    id: 5,
    truckId: 5,
    truckCode: "TR-1005",
    truckModel: "DAF XF",
    lastMaintenanceDate: "2023-10-25",
    nextMaintenanceDate: "2024-01-25",
    type: "Regular Service",
    cost: 1100.0,
    status: "completed",
    notes: "Oil change, filter replacement, general inspection",
    garage: "East Depot",
  },
  {
    id: 6,
    truckId: 6,
    truckCode: "TR-1006",
    truckModel: "Iveco Stralis",
    lastMaintenanceDate: "2023-11-15",
    nextMaintenanceDate: "2023-12-15",
    type: "Brake System",
    cost: 1800.25,
    status: "scheduled",
    notes: "Complete brake system overhaul",
    garage: "West Depot",
  },
  {
    id: 7,
    truckId: 7,
    truckCode: "TR-1007",
    truckModel: "Renault T",
    lastMaintenanceDate: "2023-09-30",
    nextMaintenanceDate: "2024-01-30",
    type: "Transmission",
    cost: 3200.0,
    status: "in_progress",
    notes: "Transmission repair and fluid change",
    garage: "North Depot",
  },
  {
    id: 8,
    truckId: 8,
    truckCode: "TR-1008",
    truckModel: "Volvo FM",
    lastMaintenanceDate: "2023-07-20",
    nextMaintenanceDate: "2023-11-20",
    type: "Regular Service",
    cost: 950.5,
    status: "completed",
    notes: "Oil change, filter replacement, fluid checks",
    garage: "Main Depot",
  },
]

export default function MaintenancePage() {
  const [maintenance, setMaintenance] = useState(mockMaintenance)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredMaintenance = maintenance.filter(
    (item) =>
      item.truckCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.truckModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.garage.toLowerCase().includes(searchTerm.toLowerCase()),
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
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="mr-1 h-3 w-3" /> Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getDaysUntil = (dateString) => {
    const today = new Date()
    const targetDate = new Date(dateString)
    const diffTime = targetDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Maintenance</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Schedule Maintenance
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search maintenance records..."
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
            <CardTitle className="text-sm font-medium">Total Records</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenance.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenance.filter((m) => m.status === "scheduled").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenance.filter((m) => m.status === "in_progress").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(maintenance.reduce((sum, item) => sum + item.cost, 0))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Maintenance</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {maintenance
                .filter((m) => m.status === "scheduled" && getDaysUntil(m.nextMaintenanceDate) <= 30)
                .sort((a, b) => new Date(a.nextMaintenanceDate) - new Date(b.nextMaintenanceDate))
                .slice(0, 5)
                .map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Truck className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {item.truckCode} - {item.type}
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDate(item.nextMaintenanceDate)}</p>
                      </div>
                    </div>
                    <div className="text-sm">
                      {getDaysUntil(item.nextMaintenanceDate) <= 0 ? (
                        <span className="text-red-600 font-medium">Overdue</span>
                      ) : (
                        <span className="text-muted-foreground">{getDaysUntil(item.nextMaintenanceDate)} days</span>
                      )}
                    </div>
                  </div>
                ))}

              {maintenance.filter((m) => m.status === "scheduled" && getDaysUntil(m.nextMaintenanceDate) <= 30)
                .length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No upcoming maintenance in the next 30 days
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance by Type</CardTitle>
            <CardDescription>Distribution of maintenance types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                const types = {}
                maintenance.forEach((item) => {
                  if (!types[item.type]) {
                    types[item.type] = 0
                  }
                  types[item.type]++
                })

                const totalCount = maintenance.length

                return Object.entries(types).map(([type, count]) => (
                  <div key={type}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{type}</span>
                      <span className="font-medium">
                        {count} ({Math.round((count / totalCount) * 100)}%)
                      </span>
                    </div>
                    <div className="mt-2">
                      <Progress value={(count / totalCount) * 100} className="h-2" />
                    </div>
                  </div>
                ))
              })()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Records</CardTitle>
          <CardDescription>View and manage all maintenance activities</CardDescription>
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
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Last Maintenance</TableHead>
                  <TableHead>Next Maintenance</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaintenance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      No maintenance records found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMaintenance.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Truck className="h-4 w-4 text-muted-foreground mr-1" />
                          <div>
                            <div className="font-medium">{item.truckCode}</div>
                            <div className="text-sm text-muted-foreground">{item.truckModel}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{formatDate(item.lastMaintenanceDate)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{formatDate(item.nextMaintenanceDate)}</span>
                          {getDaysUntil(item.nextMaintenanceDate) <= 0 ? (
                            <span className="text-xs text-red-600">Overdue</span>
                          ) : getDaysUntil(item.nextMaintenanceDate) <= 7 ? (
                            <span className="text-xs text-yellow-600">
                              Soon ({getDaysUntil(item.nextMaintenanceDate)} days)
                            </span>
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(item.cost)}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                            <DropdownMenuItem>Edit Record</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
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

