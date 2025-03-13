"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Filter,
  MoreHorizontal,
  Settings,
  Truck,
  User,
  Calendar,
  Fuel,
  PenToolIcon as Tool,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

// Mock data for alerts
const mockAlerts = [
  {
    id: 1,
    type: "maintenance",
    title: "Maintenance Due",
    description: "Vehicle TR-1002 is due for maintenance in 3 days",
    severity: "warning",
    timestamp: "2023-12-05T10:30:00",
    status: "active",
    relatedTo: "TR-1002",
  },
  {
    id: 2,
    type: "license",
    title: "License Expiring",
    description: "Driver John Doe's license expires in 15 days",
    severity: "warning",
    timestamp: "2023-12-04T14:45:00",
    status: "active",
    relatedTo: "John Doe",
  },
  {
    id: 3,
    type: "fuel",
    title: "Abnormal Fuel Consumption",
    description: "Vehicle TR-1005 showing 20% higher fuel consumption than average",
    severity: "critical",
    timestamp: "2023-12-04T09:15:00",
    status: "active",
    relatedTo: "TR-1005",
  },
  {
    id: 4,
    type: "maintenance",
    title: "Maintenance Overdue",
    description: "Vehicle TR-1008 is 5 days overdue for scheduled maintenance",
    severity: "critical",
    timestamp: "2023-12-03T16:20:00",
    status: "active",
    relatedTo: "TR-1008",
  },
  {
    id: 5,
    type: "vehicle",
    title: "Low Tire Pressure",
    description: "Vehicle TR-1003 reporting low tire pressure on rear right tire",
    severity: "warning",
    timestamp: "2023-12-03T11:10:00",
    status: "resolved",
    relatedTo: "TR-1003",
  },
  {
    id: 6,
    type: "driver",
    title: "Excessive Speed",
    description: "Driver Michael Johnson exceeded speed limit by 15 km/h for 10 minutes",
    severity: "warning",
    timestamp: "2023-12-02T13:25:00",
    status: "active",
    relatedTo: "Michael Johnson",
  },
  {
    id: 7,
    type: "vehicle",
    title: "Check Engine Light",
    description: "Vehicle TR-1007 reporting check engine light",
    severity: "critical",
    timestamp: "2023-12-02T08:50:00",
    status: "active",
    relatedTo: "TR-1007",
  },
  {
    id: 8,
    type: "maintenance",
    title: "Oil Change Due",
    description: "Vehicle TR-1001 is due for oil change in 2 days",
    severity: "info",
    timestamp: "2023-12-01T15:30:00",
    status: "resolved",
    relatedTo: "TR-1001",
  },
]

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "all") return true
    if (filter === "active") return alert.status === "active"
    if (filter === "resolved") return alert.status === "resolved"
    if (filter === "critical") return alert.severity === "critical" && alert.status === "active"
    return alert.type === filter
  })

  const markAsResolved = (id) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, status: "resolved" } : alert)))

    toast({
      title: "Alert resolved",
      description: "The alert has been marked as resolved.",
      duration: 3000,
    })
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            <AlertTriangle className="mr-1 h-3 w-3" /> Critical
          </Badge>
        )
      case "warning":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <AlertTriangle className="mr-1 h-3 w-3" /> Warning
          </Badge>
        )
      case "info":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Bell className="mr-1 h-3 w-3" /> Info
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" /> Active
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Resolved
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case "maintenance":
        return <Tool className="h-5 w-5 text-blue-600" />
      case "license":
        return <Calendar className="h-5 w-5 text-yellow-600" />
      case "fuel":
        return <Fuel className="h-5 w-5 text-red-600" />
      case "vehicle":
        return <Truck className="h-5 w-5 text-purple-600" />
      case "driver":
        return <User className="h-5 w-5 text-green-600" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-600" />
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Alerts & Notifications</h1>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Alert Settings</span>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.filter((a) => a.status === "active").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {alerts.filter((a) => a.severity === "critical" && a.status === "active").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                alerts.filter((a) => {
                  const today = new Date().toDateString()
                  const alertDate = new Date(a.timestamp).toDateString()
                  return a.status === "resolved" && alertDate === today
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setFilter}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Filter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Button>
          </div>
        </div>

        <TabsContent value={filter} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Management</CardTitle>
              <CardDescription>View and manage system alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
                </div>
              ) : filteredAlerts.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No alerts found</div>
              ) : (
                <div className="space-y-4">
                  {filteredAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0">
                      <div className="rounded-full bg-muted p-2">{getTypeIcon(alert.type)}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{alert.title}</h3>
                          <div className="flex items-center space-x-2">
                            {getSeverityBadge(alert.severity)}
                            {getStatusBadge(alert.status)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Related to: {alert.relatedTo}</span>
                          <span>{formatDate(alert.timestamp)}</span>
                        </div>
                      </div>
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
                          {alert.status === "active" && (
                            <DropdownMenuItem onClick={() => markAsResolved(alert.id)}>
                              Mark as Resolved
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Dismiss</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Alert Settings</CardTitle>
          <CardDescription>Configure your alert preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Channels</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                  </div>
                  <Switch id="email-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                  </div>
                  <Switch id="sms-alerts" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="push-alerts">Push Notifications</Label>
                  </div>
                  <Switch id="push-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="dashboard-alerts">Dashboard Alerts</Label>
                  </div>
                  <Switch id="dashboard-alerts" defaultChecked />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alert Types</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="maintenance-alerts">Maintenance Alerts</Label>
                  </div>
                  <Switch id="maintenance-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="driver-alerts">Driver Alerts</Label>
                  </div>
                  <Switch id="driver-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="vehicle-alerts">Vehicle Alerts</Label>
                  </div>
                  <Switch id="vehicle-alerts" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="fuel-alerts">Fuel Alerts</Label>
                  </div>
                  <Switch id="fuel-alerts" defaultChecked />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-medium mb-4">Alert Severity Thresholds</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="bg-red-50 rounded-t-lg">
                    <CardTitle className="text-red-800">Critical Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Maintenance Overdue</Label>
                        <span className="text-sm">5+ days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>License Expiration</Label>
                        <span className="text-sm">7 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Fuel Consumption</Label>
                        <span className="text-sm">+20%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-yellow-50 rounded-t-lg">
                    <CardTitle className="text-yellow-800">Warning Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Maintenance Due</Label>
                        <span className="text-sm">7 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>License Expiration</Label>
                        <span className="text-sm">30 days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Fuel Consumption</Label>
                        <span className="text-sm">+10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="bg-blue-50 rounded-t-lg">
                    <CardTitle className="text-blue-800">Info Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Maintenance Scheduled</Label>
                        <span className="text-sm">14+ days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>License Expiration</Label>
                        <span className="text-sm">60+ days</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Fuel Consumption</Label>
                        <span className="text-sm">+5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

