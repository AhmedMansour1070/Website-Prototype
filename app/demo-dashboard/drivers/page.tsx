"use client"

import { JSX, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, CheckCircle, Clock, AlertTriangle, Plus, 
  Search, Filter, Download, Car, CalendarClock, 
  MoreHorizontal, RefreshCw 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"

// Enhanced mock data with more detailed information
const mockDrivers = [
  {
    id: 1,
    name: "John Doe",
    avatarInitials: "JD",
    licenseNum: "DL12345678",
    licenseExpDate: "2025-06-15",
    status: "active",
    experience: "8 years",
    assignedVehicle: "HR BF-150",
    vehicleType: "Truck",
    lastTrip: "03/18/2025",
    contactNumber: "+1 (555) 123-4567",
    safetyScore: 95,
  },
  {
    id: 2,
    name: "Jane Smith",
    avatarInitials: "JS",
    licenseNum: "DL87654321",
    licenseExpDate: "2024-08-22",
    status: "active",
    experience: "12 years",
    assignedVehicle: "M AN-1192",
    vehicleType: "Van",
    lastTrip: "03/19/2025",
    contactNumber: "+1 (555) 234-5678",
    safetyScore: 98,
  },
  {
    id: 3,
    name: "Michael Johnson",
    avatarInitials: "MJ",
    licenseNum: "DL23456789",
    licenseExpDate: "2025-03-10",
    status: "active",
    experience: "5 years",
    assignedVehicle: "B OI-1932",
    vehicleType: "SUV",
    lastTrip: "03/17/2025",
    contactNumber: "+1 (555) 345-6789",
    safetyScore: 92,
  },
  {
    id: 4,
    name: "Sarah Williams",
    avatarInitials: "SW",
    licenseNum: "DL34567890",
    licenseExpDate: "2024-05-18",
    status: "active",
    experience: "10 years",
    assignedVehicle: "D AR-1795",
    vehicleType: "Sedan",
    lastTrip: "03/20/2025",
    contactNumber: "+1 (555) 456-7890",
    safetyScore: 97,
  },
  {
    id: 5,
    name: "Robert Brown",
    avatarInitials: "RB",
    licenseNum: "DL45678901",
    licenseExpDate: "2023-12-05",
    status: "inactive",
    experience: "15 years",
    assignedVehicle: "Unassigned",
    vehicleType: "N/A",
    lastTrip: "11/30/2024",
    contactNumber: "+1 (555) 567-8901",
    safetyScore: 90,
  },
  {
    id: 6,
    name: "Emily Davis",
    avatarInitials: "ED",
    licenseNum: "DL56789012",
    licenseExpDate: "2024-04-01",
    status: "active",
    experience: "3 years",
    assignedVehicle: "P ET-2201",
    vehicleType: "Van",
    lastTrip: "03/15/2025",
    contactNumber: "+1 (555) 678-9012",
    safetyScore: 89,
  },
]

// Status badge with enhanced styling
const getStatusBadge = (status: string): JSX.Element => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" /> Active
        </Badge>
      )
    case "inactive":
      return (
        <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          <Clock className="mr-1 h-3 w-3" /> Inactive
        </Badge>
      )
    default:
      return <Badge variant="outline">Unknown</Badge>
  }
}

// Enhanced license status with more visual distinction
const getLicenseStatus = (expDate: string): JSX.Element => {
  const today = new Date()
  const expiration = new Date(expDate)
  const daysUntilExpiration: number = Math.ceil(
    (expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (daysUntilExpiration < 0) {
    return (
      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
        <AlertTriangle className="mr-1 h-3 w-3" /> Expired
      </Badge>
    )
  } else if (daysUntilExpiration < 30) {
    return (
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
        <AlertTriangle className="mr-1 h-3 w-3" /> Expiring Soon
      </Badge>
    )
  } else {
    return (
      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
        <CheckCircle className="mr-1 h-3 w-3" /> Valid
      </Badge>
    )
  }
}

// Safety score badge with color coding
const getSafetyScoreBadge = (score: number): JSX.Element => {
  let colorClass = ""
  
  if (score >= 95) {
    colorClass = "bg-green-100 text-green-800"
  } else if (score >= 90) {
    colorClass = "bg-blue-100 text-blue-800"
  } else if (score >= 80) {
    colorClass = "bg-yellow-100 text-yellow-800"
  } else {
    colorClass = "bg-red-100 text-red-800"
  }
  
  return (
    <Badge variant="outline" className={`${colorClass} hover:${colorClass}`}>
      {score}
    </Badge>
  )
}

export default function DriversPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [licenseFilter, setLicenseFilter] = useState("all")
  
  // Filter drivers based on search and filters
  const filteredDrivers = mockDrivers.filter(driver => {
    // Search filter
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.licenseNum.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.assignedVehicle.toLowerCase().includes(searchTerm.toLowerCase())
    
    // Status filter
    const matchesStatus = statusFilter === "all" || driver.status === statusFilter
    
    // License filter
    let matchesLicense = true
    if (licenseFilter !== "all") {
      const today = new Date()
      const expiration = new Date(driver.licenseExpDate)
      const daysUntilExpiration = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      if (licenseFilter === "expired" && daysUntilExpiration >= 0) {
        matchesLicense = false
      } else if (licenseFilter === "expiring" && (daysUntilExpiration < 0 || daysUntilExpiration >= 30)) {
        matchesLicense = false
      } else if (licenseFilter === "valid" && daysUntilExpiration < 30) {
        matchesLicense = false
      }
    }
    
    return matchesSearch && matchesStatus && matchesLicense
  })
  
  // Stats calculation
  const activeDrivers = mockDrivers.filter(d => d.status === "active").length
  const assignedDrivers = mockDrivers.filter(d => d.assignedVehicle !== "Unassigned").length
  const licenseAlerts = mockDrivers.filter(d => {
    const today = new Date()
    const expiration = new Date(d.licenseExpDate)
    const daysUntilExpiration = Math.ceil((expiration.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiration < 30
  }).length
  const avgSafetyScore = Math.round(mockDrivers.reduce((sum, driver) => sum + driver.safetyScore, 0) / mockDrivers.length)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-black md:text-3xl font-bold">Fleet Drivers</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your driver roster</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/demo-dashboard/drivers/reports")}>
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => router.push("/demo-dashboard/drivers/add")}>
            <Plus className="mr-2 h-4 w-4" /> Add Driver
          </Button>
          <DemoBadge />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-50 pb-2">
            <CardTitle className=" text-blue-600 font-medium">Total Drivers</CardTitle>
            <User className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{mockDrivers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Fleet capacity</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-50 pb-2">
            <CardTitle className=" text-green-600 font-medium">Active Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{activeDrivers}</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((activeDrivers / mockDrivers.length) * 100)}% active rate</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-50 pb-2">
            <CardTitle className="text-indigo-600 font-medium">Vehicle Assignment</CardTitle>
            <Car className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{assignedDrivers}</div>
            <p className="text-xs text-muted-foreground mt-1">{Math.round((assignedDrivers / mockDrivers.length) * 100)}% assignment rate</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gray-50 pb-2">
            <CardTitle className=" text-green-800 font-medium">Safety Score</CardTitle>
            <Badge variant="outline" className="bg-green-100 text-green-800">{avgSafetyScore}</Badge>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-bold">{licenseAlerts}</div>
            <p className="text-xs text-muted-foreground mt-1">License alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Driver Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roster" className="mb-6">
            <TabsList>
              <TabsTrigger value="roster">Driver Roster</TabsTrigger>
              <TabsTrigger value="licenses">License Management</TabsTrigger>
              <TabsTrigger value="assignments">Vehicle Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="roster" className="pt-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                <div className="flex flex-1 items-center relative">
                  <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, license, or vehicle..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="w-40">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-40">
                    <Select value={licenseFilter} onValueChange={setLicenseFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="License" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Licenses</SelectItem>
                        <SelectItem value="valid">Valid</SelectItem>
                        <SelectItem value="expiring">Expiring Soon</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="ghost" size="icon">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                <TableHeader className="bg-indigo bg-opacity-60">
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>License</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Experience</TableHead>
                      <TableHead className="hidden md:table-cell">Safety Score</TableHead>
                      <TableHead>Vehicle</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDrivers.map((driver) => (
                      <TableRow key={driver.id} className="hover:bg-opacity-60 hover:text-blue-800">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8 border">
                              <AvatarFallback className="text-xs bg-blue-100 text-blue-800">
                                {driver.avatarInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{driver.name}</div>
                              <div className="text-xs text-muted-foreground hidden md:block">
                                {driver.contactNumber}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">{driver.licenseNum}</div>
                            <div>{getLicenseStatus(driver.licenseExpDate)}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(driver.status)}</TableCell>
                        <TableCell className="hidden md:table-cell">{driver.experience}</TableCell>
                        <TableCell className="hidden md:table-cell">{getSafetyScoreBadge(driver.safetyScore)}</TableCell>
                        <TableCell>
                          {driver.assignedVehicle === "Unassigned" ? (
                            <span className="text-muted-foreground">Unassigned</span>
                          ) : (
                            <div className="space-y-1">
                              <div className="font-medium">{driver.assignedVehicle}</div>
                              <div className="text-xs text-muted-foreground">{driver.vehicleType}</div>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => router.push(`/demo-dashboard/drivers/${driver.id}`)}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {filteredDrivers.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No drivers match your filters</p>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredDrivers.length} of {mockDrivers.length} drivers
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="licenses" className="pt-4">
              <div className="p-8 text-center">
                <CalendarClock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">License Management View</h3>
                <p className="text-muted-foreground mb-4">
                  Track and manage driver license expirations and renewals.
                </p>
                <Button variant="outline">View License Calendar</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="assignments" className="pt-4">
              <div className="p-8 text-center">
                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Vehicle Assignment View</h3>
                <p className="text-muted-foreground mb-4">
                  Manage vehicle assignments and driver rotations.
                </p>
                <Button variant="outline">Manage Assignments</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}