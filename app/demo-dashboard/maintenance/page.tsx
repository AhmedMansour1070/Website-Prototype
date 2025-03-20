"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { mockMaintenance } from "@/components/demo-dashboard/mock-data"
import { DemoBadge } from "@/components/demo-dashboard/demo-badge"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Filter,
  PlusCircle,
  Search,
  Settings,
  TrendingUp,
  Truck,
  Wrench,
} from "lucide-react"

interface MaintenanceItem {
  id: number | string
  truckCode: string
  truckModel: string
  type: string
  status: string
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  cost: number
  garage: string
}

export default function MaintenanceDashboard() {
  const [maintenance, setMaintenance] = useState<MaintenanceItem[]>(mockMaintenance)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Calculate statistics
  const totalRecords = maintenance.length
  const scheduledCount = maintenance.filter(m => m.status === "scheduled").length
  const inProgressCount = maintenance.filter(m => m.status === "in_progress").length
  const completedCount = maintenance.filter(m => m.status === "completed").length
  const overdueCount = maintenance.filter(m => m.status === "overdue").length
  const totalCost = maintenance.reduce((sum, item) => sum + item.cost, 0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const getFilteredMaintenance = () => {
    let filtered = [...maintenance]
    
    // Apply search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.truckCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.truckModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.garage.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply status filter
    if (activeFilter !== "all") {
      filtered = filtered.filter(item => item.status === activeFilter)
    }
    
    return filtered
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="mr-1 h-3 w-3" /> Completed
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
            <AlertCircle className="mr-1 h-3 w-3" /> Overdue
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getDaysUntil = (dateString: string) => {
    const today = new Date()
    const targetDate = new Date(dateString)
    const diffTime = targetDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Get maintenance type distribution for visualization
  const getMaintenanceTypes = () => {
    const types: Record<string, number> = {}
    maintenance.forEach(item => {
      if (!types[item.type]) {
        types[item.type] = 0
      }
      types[item.type]++
    })
    return Object.entries(types).sort((a, b) => b[1] - a[1])
  }

  // Get upcoming maintenance
  const getUpcomingMaintenance = () => {
    return maintenance
      .filter(m => (m.status === "scheduled" || m.status === "overdue") && getDaysUntil(m.nextMaintenanceDate) <= 30)
      .sort((a, b) => new Date(a.nextMaintenanceDate).getTime() - new Date(b.nextMaintenanceDate).getTime())
      .slice(0, 5)
  }

  const handleMarkComplete = (id: number | string) => {
    setMaintenance(prev => 
      prev.map(item => 
        item.id === id ? { ...item, status: "completed" } : item
      )
    )
    toast({
      title: "Status Updated",
      description: "Maintenance record marked as completed",
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black tracking-tight">Fleet Maintenance</h1>
          <p className="text-muted-foreground  mt-1">
            Monitor and manage maintenance activities for your fleet
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Record
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
          <DemoBadge />
        </div>
      </div>

      {/* Dashboard overview cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRecords}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{scheduledCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueCount}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalCost)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Left column - upcoming maintenance */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Upcoming Maintenance
            </CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <div className="space-y-4">
              {getUpcomingMaintenance().map(item => (
                <div key={item.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="mr-4">
                    <div className={`rounded-full p-2 ${
                      getDaysUntil(item.nextMaintenanceDate) <= 0 ? "bg-red-100" : 
                      getDaysUntil(item.nextMaintenanceDate) <= 7 ? "bg-yellow-100" : "bg-blue-100"
                    }`}>
                      <Truck className={`h-5 w-5 ${
                        getDaysUntil(item.nextMaintenanceDate) <= 0 ? "text-red-600" : 
                        getDaysUntil(item.nextMaintenanceDate) <= 7 ? "text-yellow-600" : "text-blue-600"
                      }`} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium flex items-center">
                      {item.truckCode}
                      <span className="ml-2 text-xs px-2 py-1 rounded-full bg-gray-100">
                        {item.type}
                      </span>
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-muted-foreground">
                        {formatDate(item.nextMaintenanceDate)}
                      </p>
                      <p className={`text-sm font-medium ${
                        getDaysUntil(item.nextMaintenanceDate) <= 0 ? "text-red-600" : 
                        getDaysUntil(item.nextMaintenanceDate) <= 7 ? "text-yellow-600" : "text-blue-600"
                      }`}>
                        {getDaysUntil(item.nextMaintenanceDate) <= 0 
                          ? "Overdue" 
                          : `${getDaysUntil(item.nextMaintenanceDate)} days`}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="ml-2">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {getUpcomingMaintenance().length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No upcoming maintenance in the next 30 days
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" className="w-full">View All Scheduled</Button>
          </CardFooter>
        </Card>

        {/* Middle column - maintenance types distribution */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wrench className="mr-2 h-5 w-5 text-blue-600" />
              Maintenance by Type
            </CardTitle>
            <CardDescription>Distribution of maintenance categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {getMaintenanceTypes().map(([type, count]) => (
                <div key={type}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{type}</span>
                    <span className="text-sm text-muted-foreground">
                      {count} ({Math.round((count / totalRecords) * 100)}%)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={(count / totalRecords) * 100} className="h-2" />
                    <span className="text-sm w-8">{Math.round((count / totalRecords) * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" className="w-full">View Analysis</Button>
          </CardFooter>
        </Card>

        {/* Right column - maintenance by status and cost trends */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-blue-600" />
              Maintenance Summary
            </CardTitle>
            <CardDescription>Key metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Status Distribution</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-green-100 p-1.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">Completed</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{completedCount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-blue-100 p-1.5">
                        <Clock className="h-4 w-4 text-blue-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">In Progress</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{inProgressCount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-yellow-100 p-1.5">
                        <Calendar className="h-4 w-4 text-yellow-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{scheduledCount}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="rounded-full bg-red-100 p-1.5">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                      </div>
                      <span className="text-sm text-muted-foreground">Overdue</span>
                    </div>
                    <p className="text-2xl font-bold mt-2">{overdueCount}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Average Cost by Type</h4>
                <div className="space-y-2">
                  {(() => {
                    const typesCost: Record<string, { total: number, count: number }> = {}
                    maintenance.forEach(item => {
                      if (!typesCost[item.type]) {
                        typesCost[item.type] = { total: 0, count: 0 }
                      }
                      typesCost[item.type].total += item.cost
                      typesCost[item.type].count++
                    })
                    
                    return Object.entries(typesCost)
                      .sort((a, b) => (b[1].total / b[1].count) - (a[1].total / a[1].count))
                      .slice(0, 3)
                      .map(([type, data]) => (
                        <div key={type} className="flex items-center justify-between">
                          <span className="font-medium">{type}</span>
                          <span>{formatCurrency(data.total / data.count)}</span>
                        </div>
                      ))
                  })()}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" className="w-full">Generate Report</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Maintenance records table with tabs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Maintenance Records</CardTitle>
              <CardDescription>View and manage all maintenance activities</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search records..."
                  className="pl-8 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" onValueChange={setActiveFilter}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Records</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="in_progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="overdue">Overdue</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeFilter}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Maintenance Type</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Next Service</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getFilteredMaintenance().length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No maintenance records found
                      </TableCell>
                    </TableRow>
                  ) : (
                    getFilteredMaintenance().map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="rounded-full bg-blue-50 p-2 mr-2">
                              <Truck className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="font-medium">{item.truckCode}</div>
                              <div className="text-xs text-muted-foreground">{item.truckModel}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{item.type}</div>
                          <div className="text-xs text-muted-foreground">{item.garage}</div>
                        </TableCell>
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
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => toast({ title: "Viewing details" })}>
                              Details
                            </Button>
                            {item.status !== "completed" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                                onClick={() => handleMarkComplete(item.id)}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-6">
          <div className="text-sm text-muted-foreground">
            Showing {getFilteredMaintenance().length} of {totalRecords} records
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}